import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Share } from 'react-native';
import {
  obtenirGroupeLocal,
  creerGroupe,
  rejoindreGroupe,
  chargerGroupe,
  ecouterGroupe,
  quitterGroupeLocal,
} from '../lib/groupe';
import { colors, typography, spacing, radius } from '../theme/theme';

const VUES = { CHARGEMENT: 'chargement', PROPOSITION: 'proposition', CREER: 'creer', REJOINDRE: 'rejoindre', GROUPE: 'groupe' };

export default function GroupeSprint({ sprintId, sprintTitre, duree }) {
  const [vue, setVue] = useState(VUES.CHARGEMENT);
  const [groupeInfo, setGroupeInfo] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [pseudo, setPseudo] = useState('');
  const [code, setCode] = useState('');
  const [erreur, setErreur] = useState('');
  const [enCours, setEnCours] = useState(false);

  const rafraichir = useCallback((groupeId) => {
    chargerGroupe(groupeId)
      .then(setParticipants)
      .catch(() => {});
  }, []);

  useEffect(() => {
    let actif = true;
    obtenirGroupeLocal(sprintId).then((info) => {
      if (!actif) return;
      if (info) {
        setGroupeInfo(info);
        setVue(VUES.GROUPE);
        rafraichir(info.groupeId);
      } else {
        setVue(VUES.PROPOSITION);
      }
    });
    return () => {
      actif = false;
    };
  }, [sprintId, rafraichir]);

  useEffect(() => {
    if (!groupeInfo) return;
    const arreter = ecouterGroupe(groupeInfo.groupeId, () => rafraichir(groupeInfo.groupeId));
    return arreter;
  }, [groupeInfo, rafraichir]);

  const handleCreer = async () => {
    if (!pseudo.trim()) return;
    setEnCours(true);
    setErreur('');
    try {
      const info = await creerGroupe(sprintId, pseudo.trim());
      setGroupeInfo(info);
      setVue(VUES.GROUPE);
      rafraichir(info.groupeId);
    } catch (e) {
      setErreur("Impossible de créer le groupe. Vérifie ta connexion.");
    } finally {
      setEnCours(false);
    }
  };

  const handleRejoindre = async () => {
    if (!pseudo.trim() || !code.trim()) return;
    setEnCours(true);
    setErreur('');
    try {
      const info = await rejoindreGroupe(code, pseudo.trim());
      if (info.sprintId !== sprintId) {
        setErreur('Ce code correspond à un autre sprint.');
        return;
      }
      setGroupeInfo(info);
      setVue(VUES.GROUPE);
      rafraichir(info.groupeId);
    } catch (e) {
      setErreur('Code introuvable.');
    } finally {
      setEnCours(false);
    }
  };

  const handleQuitter = async () => {
    await quitterGroupeLocal(sprintId);
    setGroupeInfo(null);
    setParticipants([]);
    setVue(VUES.PROPOSITION);
  };

  const partagerCode = () => {
    Share.share({
      message: `Fais le sprint "${sprintTitre}" avec moi sur SkillSprint ! Rejoins avec le code ${groupeInfo.code}.`,
    }).catch(() => {});
  };

  if (vue === VUES.CHARGEMENT) return null;

  return (
    <View style={styles.carte}>
      <Text style={styles.titre}>Sprint en groupe</Text>

      {vue === VUES.PROPOSITION && (
        <View style={styles.colonne}>
          <Text style={styles.description}>Fais ce sprint avec des amis, chacun voit qui avance.</Text>
          <View style={styles.rangeeBoutons}>
            <Pressable style={styles.boutonSecondaire} onPress={() => setVue(VUES.CREER)}>
              <Text style={styles.boutonSecondaireTexte}>Créer un groupe</Text>
            </Pressable>
            <Pressable style={styles.boutonSecondaire} onPress={() => setVue(VUES.REJOINDRE)}>
              <Text style={styles.boutonSecondaireTexte}>Rejoindre avec un code</Text>
            </Pressable>
          </View>
        </View>
      )}

      {vue === VUES.CREER && (
        <View style={styles.colonne}>
          <TextInput
            placeholder="Ton pseudo"
            placeholderTextColor={colors.textMuted}
            value={pseudo}
            onChangeText={setPseudo}
            style={styles.input}
          />
          {!!erreur && <Text style={styles.erreur}>{erreur}</Text>}
          <Pressable style={styles.boutonPrincipal} onPress={handleCreer} disabled={enCours}>
            <Text style={styles.boutonPrincipalTexte}>{enCours ? 'Création…' : 'Créer le groupe'}</Text>
          </Pressable>
        </View>
      )}

      {vue === VUES.REJOINDRE && (
        <View style={styles.colonne}>
          <TextInput
            placeholder="Code du groupe"
            placeholderTextColor={colors.textMuted}
            value={code}
            onChangeText={(t) => setCode(t.toUpperCase())}
            autoCapitalize="characters"
            style={styles.input}
          />
          <TextInput
            placeholder="Ton pseudo"
            placeholderTextColor={colors.textMuted}
            value={pseudo}
            onChangeText={setPseudo}
            style={styles.input}
          />
          {!!erreur && <Text style={styles.erreur}>{erreur}</Text>}
          <Pressable style={styles.boutonPrincipal} onPress={handleRejoindre} disabled={enCours}>
            <Text style={styles.boutonPrincipalTexte}>{enCours ? 'Connexion…' : 'Rejoindre'}</Text>
          </Pressable>
        </View>
      )}

      {vue === VUES.GROUPE && groupeInfo && (
        <View style={styles.colonne}>
          <Pressable style={styles.codeLigne} onPress={partagerCode}>
            <Text style={styles.codeLabel}>Code du groupe</Text>
            <Text style={styles.codeTexte}>{groupeInfo.code}</Text>
          </Pressable>

          <View style={styles.listeParticipants}>
            {participants.map((p) => (
              <View key={p.id} style={styles.participantLigne}>
                <Text style={styles.participantPseudo} numberOfLines={1}>
                  {p.pseudo}
                </Text>
                <View style={styles.ticksRow}>
                  {Array.from({ length: duree }).map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.tick,
                        p.joursCompletes.includes(i + 1) && styles.tickFait,
                      ]}
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>

          <Pressable onPress={handleQuitter}>
            <Text style={styles.quitter}>Quitter le groupe</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  carte: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginTop: spacing.xl,
  },
  titre: {
    fontFamily: typography.displaySemiBold,
    color: colors.ink,
    fontSize: 17,
  },
  colonne: {
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  description: {
    fontFamily: typography.body,
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  rangeeBoutons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  boutonSecondaire: {
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  boutonSecondaireTexte: {
    fontFamily: typography.bodyBold,
    color: colors.ink,
    fontSize: 13,
  },
  input: {
    backgroundColor: colors.bg,
    borderWidth: 2,
    borderColor: colors.divider,
    borderRadius: radius.md,
    padding: spacing.md,
    color: colors.ink,
    fontFamily: typography.body,
    fontSize: 14,
  },
  erreur: {
    fontFamily: typography.body,
    color: colors.accentOrange,
    fontSize: 12,
  },
  boutonPrincipal: {
    backgroundColor: colors.accentIndigo,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  boutonPrincipalTexte: {
    fontFamily: typography.bodyBold,
    color: colors.surface,
    fontSize: 14,
  },
  codeLigne: {
    backgroundColor: colors.accentIndigoSoft,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  codeLabel: {
    fontFamily: typography.bodyBold,
    color: colors.accentIndigo,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  codeTexte: {
    fontFamily: typography.display,
    color: colors.accentIndigo,
    fontSize: 22,
    letterSpacing: 4,
    marginTop: 2,
  },
  listeParticipants: {
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  participantLigne: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  participantPseudo: {
    fontFamily: typography.bodySemiBold,
    color: colors.ink,
    fontSize: 14,
    flexShrink: 1,
    maxWidth: 100,
  },
  ticksRow: {
    flexDirection: 'row',
    gap: 4,
  },
  tick: {
    width: 14,
    height: 14,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: colors.divider,
  },
  tickFait: {
    backgroundColor: colors.accentIndigo,
    borderColor: colors.accentIndigo,
  },
  quitter: {
    fontFamily: typography.bodyBold,
    color: colors.textMuted,
    fontSize: 12,
    marginTop: spacing.xs,
  },
});
