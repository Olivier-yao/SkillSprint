import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { getSprintById } from '../data/sprints';
import ProgressDots from '../components/ProgressDots';
import { colors, typography, spacing, radius } from '../theme/theme';

export default function SprintDetailScreen({ route, navigation, progression = {} }) {
  const { sprintId } = route.params;
  const sprint = getSprintById(sprintId);
  const jourActuel = progression[sprintId]?.jourActuel || 0;
  const prochainJour = sprint.jours[jourActuel]; // 0-indexé : jour à faire

  return (
    <View style={styles.container}>
      <Text style={styles.categorie}>{sprint.categorie}</Text>
      <Text style={styles.titre}>{sprint.titre}</Text>
      <Text style={styles.description}>{sprint.description}</Text>

      <View style={styles.progressionBloc}>
        <ProgressDots
          total={sprint.duree}
          jourActuel={jourActuel}
          accent={sprint.couleurAccent}
        />
        <Text style={styles.progressionTexte}>
          {jourActuel}/{sprint.duree} jours complétés
        </Text>
      </View>

      {prochainJour ? (
        <Pressable
          style={styles.boutonPrincipal}
          onPress={() =>
            navigation.navigate('Day', { jour: prochainJour, sprintId })
          }
        >
          <Text style={styles.boutonPrincipalTexte}>
            {jourActuel === 0 ? 'Commencer le sprint' : `Continuer — Jour ${prochainJour.jour}`}
          </Text>
        </Pressable>
      ) : (
        <View style={styles.termineBloc}>
          <Text style={styles.termineTexte}>
            Sprint terminé. Tu peux le refaire ou choisir un autre sprint.
          </Text>
        </View>
      )}
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
  categorie: {
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
  },
  description: {
    fontFamily: typography.body,
    color: colors.textMuted,
    fontSize: 15,
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  progressionBloc: {
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  progressionTexte: {
    fontFamily: typography.bodyMedium,
    color: colors.textMuted,
    fontSize: 13,
  },
  boutonPrincipal: {
    marginTop: spacing.xl,
    backgroundColor: colors.accentAmber,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  boutonPrincipalTexte: {
    fontFamily: typography.bodySemiBold,
    color: colors.bgDeep,
    fontSize: 15,
  },
  termineBloc: {
    marginTop: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  termineTexte: {
    fontFamily: typography.body,
    color: colors.textMuted,
    fontSize: 14,
  },
});
