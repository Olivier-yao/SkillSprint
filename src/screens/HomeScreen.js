import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { SPRINTS } from '../data/sprints';
import ProgressDots from '../components/ProgressDots';
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
          <Text style={styles.heroEyebrow}>
            Aujourd'hui · Jour {enCours.prochainJour.jour}
          </Text>
          <Text style={styles.heroTitre}>{enCours.prochainJour.titre}</Text>
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
          return (
            <Pressable
              style={styles.carte}
              onPress={() => navigation.navigate('SprintDetail', { sprintId: item.id })}
            >
              <Text style={styles.categorie}>{item.categorie}</Text>
              <Text style={styles.carteTitre}>{item.titre}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <View style={styles.pied}>
                <ProgressDots
                  total={item.duree}
                  jourActuel={jourActuel}
                  accent={item.couleurAccent}
                />
                <Text style={styles.jourTexte}>
                  {jourActuel === 0 ? 'Pas commencé' : `Jour ${jourActuel}/${item.duree}`}
                </Text>
              </View>
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
    backgroundColor: colors.bgDeep,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
  },
  eyebrow: {
    fontFamily: typography.bodyMedium,
    color: colors.accentAmber,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  titre: {
    fontFamily: typography.display,
    color: colors.textPrimary,
    fontSize: 30,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  heroCarte: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  heroEyebrow: {
    fontFamily: typography.bodyMedium,
    color: colors.accentAmber,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroTitre: {
    fontFamily: typography.display,
    color: colors.textPrimary,
    fontSize: 24,
    marginTop: spacing.xs,
  },
  heroSousTitre: {
    fontFamily: typography.body,
    color: colors.textMuted,
    fontSize: 14,
    marginTop: spacing.xs,
    lineHeight: 20,
  },
  heroBouton: {
    marginTop: spacing.md,
    backgroundColor: colors.accentAmber,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  heroBoutonTexte: {
    fontFamily: typography.bodySemiBold,
    color: colors.bgDeep,
    fontSize: 15,
  },
  sectionLabel: {
    fontFamily: typography.bodyMedium,
    color: colors.textMuted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  carte: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  categorie: {
    fontFamily: typography.bodyMedium,
    color: colors.textMuted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  carteTitre: {
    fontFamily: typography.display,
    color: colors.textPrimary,
    fontSize: 22,
    marginTop: spacing.xs,
  },
  description: {
    fontFamily: typography.body,
    color: colors.textMuted,
    fontSize: 14,
    marginTop: spacing.xs,
    lineHeight: 20,
  },
  pied: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  jourTexte: {
    fontFamily: typography.bodyMedium,
    color: colors.textMuted,
    fontSize: 12,
  },
});
