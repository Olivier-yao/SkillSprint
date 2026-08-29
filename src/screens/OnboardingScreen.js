import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SPRINTS } from '../data/sprints';
import { colors, typography, spacing, radius } from '../theme/theme';

export default function OnboardingScreen({ onTerminer }) {
  const [choisiId, setChoisiId] = useState(SPRINTS[0].id);

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Première ouverture</Text>
      <Text style={styles.titre}>
        Qu'est-ce que tu veux muscler cette semaine ?
      </Text>
      <Text style={styles.sousTitre}>
        Un sprint dure 7 jours, une mission par jour, 5 minutes suffisent.
      </Text>

      <View style={styles.liste}>
        {SPRINTS.map((sprint) => {
          const choisi = sprint.id === choisiId;
          return (
            <Pressable
              key={sprint.id}
              style={[styles.carte, choisi && styles.carteChoisie]}
              onPress={() => setChoisiId(sprint.id)}
            >
              <View style={styles.carteHaut}>
                <Text style={[styles.categorie, choisi && styles.texteClair]}>
                  {sprint.categorie}
                </Text>
                {choisi && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeTexte}>Choisi</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.carteTitre, choisi && styles.texteClair]}>
                {sprint.titre}
              </Text>
              <Text style={[styles.description, choisi && styles.descriptionClaire]}>
                {sprint.description}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        style={styles.boutonPrincipal}
        onPress={() => onTerminer(choisiId)}
      >
        <Text style={styles.boutonPrincipalTexte}>Commencer le sprint</Text>
      </Pressable>
      <Pressable style={styles.boutonSecondaire} onPress={() => onTerminer(null)}>
        <Text style={styles.boutonSecondaireTexte}>Je regarde d'abord</Text>
      </Pressable>
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
    lineHeight: 32,
  },
  sousTitre: {
    fontFamily: typography.body,
    color: colors.textMuted,
    fontSize: 14,
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  liste: {
    marginTop: spacing.xl,
    gap: spacing.md,
    flex: 1,
  },
  carte: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.ink,
    padding: spacing.lg,
  },
  carteChoisie: {
    backgroundColor: colors.accentIndigo,
    borderColor: colors.accentIndigo,
  },
  carteHaut: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categorie: {
    fontFamily: typography.bodyBold,
    color: colors.textMuted,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  badge: {
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    paddingVertical: 3,
    paddingHorizontal: spacing.sm,
  },
  badgeTexte: {
    fontFamily: typography.bodyBold,
    color: colors.accentIndigo,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  carteTitre: {
    fontFamily: typography.displaySemiBold,
    color: colors.ink,
    fontSize: 19,
    marginTop: spacing.xs,
  },
  description: {
    fontFamily: typography.body,
    color: colors.textMuted,
    fontSize: 13,
    marginTop: spacing.xs,
    lineHeight: 18,
  },
  texteClair: {
    color: colors.surface,
  },
  descriptionClaire: {
    color: colors.accentIndigoSoft,
  },
  boutonPrincipal: {
    marginTop: spacing.lg,
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
  boutonSecondaire: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  boutonSecondaireTexte: {
    fontFamily: typography.bodyBold,
    color: colors.textMuted,
    fontSize: 13,
  },
});
