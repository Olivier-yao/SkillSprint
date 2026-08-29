import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SPRINTS } from '../data/sprints';
import ProgressRing from '../components/ProgressRing';
import { colors, typography, spacing, radius } from '../theme/theme';

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

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Ton carnet</Text>
      <Text style={styles.titre}>
        {joursEntraines} {joursEntraines > 1 ? 'jours' : 'jour'} d'entraînement
      </Text>

      <Text style={styles.sectionLabel}>Tes sprints</Text>
      <FlatList
        data={SPRINTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: spacing.md, paddingBottom: spacing.xl }}
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
    fontSize: 26,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
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
