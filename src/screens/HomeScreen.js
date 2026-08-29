import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { SPRINTS } from '../data/sprints';
import ProgressRing from '../components/ProgressRing';
import { colors, typography, spacing, radius } from '../theme/theme';

function descriptionExercice(jour) {
  return jour.type === 'teleprompter'
    ? 'lecture au prompteur, environ 5 minutes.'
    : 'mission du jour, quelques minutes.';
}

// Le premier sprint entamé mais pas terminé — celui qu'on reprend aujourd'hui.
function trouverSprintEnCours(progression) {
  for (const sprint of SPRINTS) {
    const jourActuel = progression[sprint.id]?.jourActuel || 0;
    if (jourActuel > 0 && jourActuel < sprint.duree) {
      return { sprint, jourActuel, prochainJour: sprint.jours[jourActuel] };
    }
  }
  return null;
}

export default function HomeScreen({ navigation, progression = {} }) {
  const enCours = trouverSprintEnCours(progression);

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>SkillSprint</Text>
      <Text style={styles.titre}>Une compétence à la fois.</Text>

      {enCours && (
        <Pressable
          style={styles.heroCarte}
          onPress={() =>
            navigation.navigate('Day', {
              jour: enCours.prochainJour,
              sprintId: enCours.sprint.id,
            })
          }
        >
          <View style={styles.heroHaut}>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroEyebrow}>
                Aujourd'hui · Jour {enCours.prochainJour.jour}
              </Text>
              <Text style={styles.heroTitre}>{enCours.prochainJour.titre}</Text>
            </View>
            <ProgressRing
              progression={enCours.jourActuel / enCours.sprint.duree}
              size={52}
              strokeWidth={6}
              color={colors.surface}
              trackColor="rgba(255,255,255,0.28)"
            />
          </View>
          <Text style={styles.heroSousTitre}>
            {enCours.sprint.titre} · {descriptionExercice(enCours.prochainJour)}
          </Text>
          <View style={styles.heroBouton}>
            <Text style={styles.heroBoutonTexte}>
              Continuer — Jour {enCours.prochainJour.jour}
            </Text>
          </View>
        </Pressable>
      )}

      {enCours && <Text style={styles.sectionLabel}>Tes sprints</Text>}

      <FlatList
        data={SPRINTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: spacing.md, paddingBottom: spacing.xl }}
        renderItem={({ item }) => {
          const jourActuel = progression[item.id]?.jourActuel || 0;
          const enProgression = jourActuel > 0 && jourActuel < item.duree;
          return (
            <Pressable
              style={[styles.carte, enProgression && styles.carteEnProgression]}
              onPress={() => navigation.navigate('SprintDetail', { sprintId: item.id })}
            >
              <View style={styles.carteHaut}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.categorie, enProgression && styles.categorieClaire]}>
                    {item.categorie}
                  </Text>
                  <Text style={[styles.carteTitre, enProgression && styles.texteClair]}>
                    {item.titre}
                  </Text>
                </View>
                <ProgressRing
                  progression={jourActuel / item.duree}
                  size={44}
                  strokeWidth={5}
                  color={enProgression ? colors.surface : colors.accentIndigo}
                  trackColor={enProgression ? 'rgba(255,255,255,0.28)' : colors.divider}
                />
              </View>
              <Text style={[styles.description, enProgression && styles.descriptionClaire]}>
                {item.description}
              </Text>
              <Text style={[styles.jourTexte, enProgression && styles.descriptionClaire]}>
                {jourActuel === 0 ? 'Pas commencé' : `Jour ${jourActuel}/${item.duree}`}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
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
    fontSize: 28,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    lineHeight: 32,
  },
  heroCarte: {
    backgroundColor: colors.accentIndigo,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  heroHaut: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  heroEyebrow: {
    fontFamily: typography.bodyBold,
    color: colors.accentIndigoSoft,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroTitre: {
    fontFamily: typography.displaySemiBold,
    color: colors.surface,
    fontSize: 21,
    marginTop: spacing.xs,
  },
  heroSousTitre: {
    fontFamily: typography.body,
    color: colors.accentIndigoSoft,
    fontSize: 13,
    marginTop: spacing.sm,
    lineHeight: 19,
  },
  heroBouton: {
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  heroBoutonTexte: {
    fontFamily: typography.bodyBold,
    color: colors.accentIndigo,
    fontSize: 15,
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
  carteEnProgression: {
    backgroundColor: colors.accentIndigo,
    borderColor: colors.accentIndigo,
  },
  carteHaut: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  categorieClaire: {
    color: colors.accentIndigoSoft,
  },
  carteTitre: {
    fontFamily: typography.displaySemiBold,
    color: colors.ink,
    fontSize: 20,
    marginTop: spacing.xs,
  },
  texteClair: {
    color: colors.surface,
  },
  description: {
    fontFamily: typography.body,
    color: colors.textMuted,
    fontSize: 13,
    marginTop: spacing.sm,
    lineHeight: 19,
  },
  descriptionClaire: {
    color: colors.accentIndigoSoft,
  },
  jourTexte: {
    fontFamily: typography.bodyBold,
    color: colors.textMuted,
    fontSize: 12,
    marginTop: spacing.md,
  },
});
