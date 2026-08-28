import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme/theme';

// Affiche une ligne de points représentant les jours du sprint.
// jourActuel = nombre de jours complétés (0 à total)
export default function ProgressDots({ total, jourActuel, accent = 'accentAmber' }) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => {
        const complete = i < jourActuel;
        return (
          <View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor: complete ? colors[accent] : colors.divider,
                opacity: complete ? 1 : 0.6,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
