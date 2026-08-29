import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { getSprintById } from '../data/sprints';
import { colors, typography, spacing, radius } from '../theme/theme';

export default function HistoriqueScreen({ route, progression = {} }) {
  const { sprintId } = route.params;
  const sprint = getSprintById(sprintId);
  const historique = progression[sprintId]?.historique || [];
  const parJour = Object.fromEntries(historique.map((h) => [h.jour, h]));

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
      <Text style={styles.eyebrow}>{sprint.categorie}</Text>
      <Text style={styles.titre}>{sprint.titre}</Text>
      <Text style={styles.sousTitre}>Ce que tu as ressenti</Text>
      <Text style={styles.compteur}>
        {historique.length === 0
          ? 'Aucun jour noté pour le moment.'
          : `${historique.length} jour${historique.length > 1 ? 's' : ''} noté${historique.length > 1 ? 's' : ''}.`}
      </Text>

      <View style={styles.liste}>
        {sprint.jours.map((jour) => {
          const entree = parJour[jour.jour];
          return (
            <View key={jour.jour} style={styles.ligne}>
              <View style={styles.ligneHaut}>
                <View
                  style={[
                    styles.jourPuce,
                    entree && { backgroundColor: colors.accentIndigo, borderColor: colors.accentIndigo },
                  ]}
                >
                  <Text style={[styles.jourPuceTexte, entree && { color: colors.surface }]}>
                    {jour.jour}
                  </Text>
                </View>
                <Text style={styles.jourTitre}>{jour.titre}</Text>
                {entree?.ressenti && (
                  <View style={styles.badgeRessenti}>
                    <Text style={styles.badgeRessentiTexte}>{entree.ressenti}</Text>
                  </View>
                )}
              </View>
              {entree ? (
                entree.reflexion ? (
                  <Text style={styles.citation}>« {entree.reflexion} »</Text>
                ) : null
              ) : (
                <Text style={styles.pasFait}>Pas encore fait</Text>
              )}
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
  },
  sousTitre: {
    fontFamily: typography.displaySemiBold,
    color: colors.ink,
    fontSize: 17,
    marginTop: spacing.md,
  },
  compteur: {
    fontFamily: typography.body,
    color: colors.textMuted,
    fontSize: 13,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  liste: {
    gap: spacing.md,
  },
  ligne: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  ligneHaut: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  jourPuce: {
    width: 26,
    height: 26,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jourPuceTexte: {
    fontFamily: typography.bodyBold,
    fontSize: 12,
    color: colors.textMuted,
  },
  jourTitre: {
    flex: 1,
    fontFamily: typography.bodySemiBold,
    color: colors.ink,
    fontSize: 15,
  },
  badgeRessenti: {
    backgroundColor: colors.accentIndigoSoft,
    borderRadius: radius.sm,
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
  },
  badgeRessentiTexte: {
    fontFamily: typography.bodyBold,
    color: colors.accentIndigo,
    fontSize: 11,
  },
  citation: {
    fontFamily: typography.body,
    fontStyle: 'italic',
    color: colors.textMuted,
    fontSize: 14,
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  pasFait: {
    fontFamily: typography.body,
    color: colors.textMuted,
    fontSize: 13,
    marginTop: spacing.sm,
    opacity: 0.6,
  },
});
