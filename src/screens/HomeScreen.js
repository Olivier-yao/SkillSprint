import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { SPRINTS } from '../data/sprints';
import ProgressDots from '../components/ProgressDots';
import { colors, typography, spacing, radius } from '../theme/theme';

export default function HomeScreen({ navigation, progression = {} }) {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>SkillSprint</Text>
      <Text style={styles.titre}>Une compétence à la fois.</Text>

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
