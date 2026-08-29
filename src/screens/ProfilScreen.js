import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Pressable, Switch, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SPRINTS } from '../data/sprints';
import ProgressRing from '../components/ProgressRing';
import {
  demanderPermissionNotifications,
  planifierRappelQuotidien,
  annulerRappelQuotidien,
} from '../lib/rappels';
import { colors, typography, spacing, radius } from '../theme/theme';

const RAPPEL_KEY = '@skillsprint_rappel';
const HEURES_PROPOSEES = [8, 12, 19, 21];

function statutSprint(jourActuel, duree) {
  if (jourActuel === 0) return 'Pas commencé';
  if (jourActuel >= duree) return 'Terminé';
  return `En cours · jour ${jourActuel}`;
}

export default function ProfilScreen({ progression = {} }) {
  const joursEntraines = SPRINTS.reduce(
    (total, sprint) => total + (progression[sprint.id]?.jourActuel || 0),
    0
  );

  const [rappelActif, setRappelActif] = useState(false);
  const [rappelHeure, setRappelHeure] = useState(19);
  const [permissionRefusee, setPermissionRefusee] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(RAPPEL_KEY).then((data) => {
      if (!data) return;
      const { actif, heure } = JSON.parse(data);
      setRappelActif(actif);
      setRappelHeure(heure);
    });
  }, []);

  const sauvegarderPreference = useCallback((actif, heure) => {
    AsyncStorage.setItem(RAPPEL_KEY, JSON.stringify({ actif, heure }));
  }, []);

  const basculerRappel = useCallback(
    async (valeur) => {
      if (valeur) {
        const accorde = await demanderPermissionNotifications();
        if (!accorde) {
          setPermissionRefusee(true);
          return;
        }
        setPermissionRefusee(false);
        await planifierRappelQuotidien(rappelHeure);
      } else {
        await annulerRappelQuotidien();
      }
      setRappelActif(valeur);
      sauvegarderPreference(valeur, rappelHeure);
    },
    [rappelHeure, sauvegarderPreference]
  );

  const choisirHeure = useCallback(
    async (heure) => {
      setRappelHeure(heure);
      if (rappelActif) {
        await planifierRappelQuotidien(heure);
        sauvegarderPreference(true, heure);
      }
    },
    [rappelActif, sauvegarderPreference]
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.xxl, paddingBottom: spacing.xl }}
      data={SPRINTS}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      ListHeaderComponent={
        <View>
          <Text style={styles.eyebrow}>Ton carnet</Text>
          <Text style={styles.titre}>
            {joursEntraines} {joursEntraines > 1 ? 'jours' : 'jour'} d'entraînement
          </Text>

          <View style={styles.carteRappel}>
            <View style={styles.rappelLigne}>
              <View style={{ flex: 1 }}>
                <Text style={styles.carteTitre}>Rappel quotidien</Text>
                <Text style={styles.statutMuted}>
                  Une notification pour ne pas oublier ta mission du jour.
                </Text>
              </View>
              <Switch
                value={rappelActif}
                onValueChange={basculerRappel}
                trackColor={{ false: colors.divider, true: colors.accentIndigo }}
                thumbColor={colors.surface}
              />
            </View>

            {rappelActif && (
              <View style={styles.heuresRow}>
                {HEURES_PROPOSEES.map((h) => (
                  <Pressable
                    key={h}
                    style={[styles.heureChip, h === rappelHeure && styles.heureChipChoisie]}
                    onPress={() => choisirHeure(h)}
                  >
                    <Text style={[styles.heureChipTexte, h === rappelHeure && styles.texteClair]}>
                      {h}h
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}

            {permissionRefusee && (
              <Text style={styles.messageRefus}>
                Autorise les notifications dans les réglages de ton téléphone pour activer les
                rappels.
              </Text>
            )}
          </View>

          <Text style={styles.sectionLabel}>Tes sprints</Text>
        </View>
      }
      renderItem={({ item }) => {
        const jourActuel = progression[item.id]?.jourActuel || 0;
        return (
          <View style={styles.carte}>
            <View style={styles.carteHaut}>
              <View style={{ flex: 1 }}>
                <Text style={styles.categorie}>{item.categorie}</Text>
                <Text style={styles.carteTitre}>{item.titre}</Text>
                <Text style={styles.statut}>{statutSprint(jourActuel, item.duree)}</Text>
              </View>
              <ProgressRing progression={jourActuel / item.duree} size={44} strokeWidth={5} />
            </View>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  eyebrow: {
    fontFamily: typography.bodyBold,
    color: colors.accentIndigo,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  titre: {
    fontFamily: typography.display,
    color: colors.ink,
    fontSize: 26,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  carteRappel: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.ink,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  rappelLigne: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  statutMuted: {
    fontFamily: typography.body,
    color: colors.textMuted,
    fontSize: 12,
    marginTop: spacing.xs,
    lineHeight: 17,
  },
  heuresRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  heureChip: {
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: radius.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  heureChipChoisie: {
    backgroundColor: colors.accentIndigo,
    borderColor: colors.accentIndigo,
  },
  heureChipTexte: {
    fontFamily: typography.bodyBold,
    color: colors.ink,
    fontSize: 13,
  },
  texteClair: {
    color: colors.surface,
  },
  messageRefus: {
    fontFamily: typography.body,
    color: colors.accentOrange,
    fontSize: 12,
    marginTop: spacing.md,
    lineHeight: 17,
  },
  sectionLabel: {
    fontFamily: typography.bodyBold,
    color: colors.textMuted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  carte: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.ink,
    padding: spacing.lg,
  },
  carteHaut: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  categorie: {
    fontFamily: typography.bodyBold,
    color: colors.textMuted,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  carteTitre: {
    fontFamily: typography.displaySemiBold,
    color: colors.ink,
    fontSize: 18,
    marginTop: spacing.xs,
  },
  statut: {
    fontFamily: typography.bodyBold,
    color: colors.accentIndigo,
    fontSize: 12,
    marginTop: spacing.xs,
  },
});
