import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { getSprintById } from '../data/sprints';
import ProgressRing from '../components/ProgressRing';
import { colors, typography, spacing, radius } from '../theme/theme';

export default function SprintDetailScreen({ route, navigation, progression = {}, onRefaireSprint }) {
  const { sprintId } = route.params;
  const sprint = getSprintById(sprintId);
  const jourActuel = progression[sprintId]?.jourActuel || 0;
  const prochainJour = sprint.jours[jourActuel]; // 0-indexé : jour à faire

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
      <Text style={styles.categorie}>{sprint.categorie}</Text>
      <Text style={styles.titre}>{sprint.titre}</Text>
      <Text style={styles.description}>{sprint.description}</Text>

      <View style={styles.progressionBloc}>
        <ProgressRing progression={jourActuel / sprint.duree} size={44} strokeWidth={5} />
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
          <Pressable
            style={styles.boutonRefaire}
            onPress={() => onRefaireSprint && onRefaireSprint(sprintId)}
          >
            <Text style={styles.boutonRefaireTexte}>Refaire le sprint</Text>
          </Pressable>
        </View>
      )}

      <Text style={styles.joursLabel}>Les {sprint.duree} jours</Text>
      <View style={styles.joursListe}>
        {sprint.jours.map((jour, index) => {
          const etat = index < jourActuel ? 'fait' : index === jourActuel ? 'actuel' : 'a_venir';
          return (
            <View key={jour.jour} style={styles.jourLigne}>
              <View
                style={[
                  styles.jourPuce,
                  etat === 'fait' && { backgroundColor: colors.accentIndigo, borderColor: colors.accentIndigo },
                  etat === 'actuel' && { backgroundColor: colors.accentOrange, borderColor: colors.accentOrange },
                  etat === 'a_venir' && { borderColor: colors.divider },
                ]}
              >
                <Text
                  style={[
                    styles.jourPuceTexte,
                    (etat === 'fait' || etat === 'actuel') && { color: colors.surface },
                    etat === 'a_venir' && { color: colors.textMuted },
                  ]}
                >
                  {jour.jour}
                </Text>
              </View>
              <Text
                style={[
                  styles.jourTitre,
                  etat === 'actuel' && styles.jourTitreActuel,
                  etat === 'a_venir' && { opacity: 0.5 },
                ]}
              >
                {jour.titre}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
  },
  categorie: {
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  progressionTexte: {
    fontFamily: typography.bodyBold,
    color: colors.textMuted,
    fontSize: 13,
  },
  boutonPrincipal: {
    marginTop: spacing.xl,
    backgroundColor: colors.accentIndigo,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  boutonPrincipalTexte: {
    fontFamily: typography.bodyBold,
    color: colors.surface,
    fontSize: 15,
  },
  termineBloc: {
    marginTop: spacing.xl,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  termineTexte: {
    fontFamily: typography.body,
    color: colors.textMuted,
    fontSize: 14,
  },
  boutonRefaire: {
    marginTop: spacing.md,
    alignSelf: 'flex-start',
    borderWidth: 2,
    borderColor: colors.ink,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
  },
  boutonRefaireTexte: {
    fontFamily: typography.bodyBold,
    color: colors.ink,
    fontSize: 14,
  },
  joursLabel: {
    fontFamily: typography.bodyBold,
    color: colors.textMuted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    borderTopWidth: 2,
    borderTopColor: colors.ink,
    paddingTop: spacing.lg,
  },
  joursListe: {
    gap: spacing.sm,
  },
  jourLigne: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  jourPuce: {
    width: 26,
    height: 26,
    borderRadius: radius.sm,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jourPuceTexte: {
    fontFamily: typography.bodyBold,
    fontSize: 12,
  },
  jourTitre: {
    fontFamily: typography.body,
    color: colors.textMuted,
    fontSize: 15,
    flexShrink: 1,
  },
  jourTitreActuel: {
    fontFamily: typography.bodySemiBold,
    color: colors.ink,
  },
});
