import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, ScrollView } from 'react-native';
import TeleprompterPlayer from '../components/TeleprompterPlayer';
import { colors, typography, spacing, radius } from '../theme/theme';

const RESSENTIS = ['Confiant·e', 'Stressé·e', 'Neutre', 'Fier·e'];

export default function DayScreen({ route, onCompleter }) {
  const { jour } = route.params; // objet jour venant de sprints.js
  const [reflexion, setReflexion] = useState('');
  const [ressenti, setRessenti] = useState(null);
  const [pretAValider, setPretAValider] = useState(jour.type === 'mission');

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
      <Text style={styles.eyebrow}>Jour {jour.jour}</Text>
      <Text style={styles.titre}>{jour.titre}</Text>
      <Text style={styles.consigne}>{jour.consigne}</Text>

      {jour.type === 'teleprompter' && (
        <View style={{ marginTop: spacing.lg }}>
          <TeleprompterPlayer
            text={jour.text}
            focus={jour.focus}
            vitesseParDefaut={jour.vitesseParDefaut}
            onTermine={() => setPretAValider(true)}
          />
        </View>
      )}

      {pretAValider && (
        <View style={styles.reflexionBloc}>
          <Text style={styles.reflexionLabel}>Comment tu te sentais ?</Text>
          <View style={styles.ressentisRow}>
            {RESSENTIS.map((r) => (
              <Pressable
                key={r}
                onPress={() => setRessenti(r)}
                style={[
                  styles.tag,
                  ressenti === r && { backgroundColor: colors.accentAmber },
                ]}
              >
                <Text
                  style={[
                    styles.tagTexte,
                    ressenti === r && { color: colors.bgDeep },
                  ]}
                >
                  {r}
                </Text>
              </Pressable>
            ))}
          </View>

          <TextInput
            placeholder="Une phrase, si tu veux (optionnel)"
            placeholderTextColor={colors.textMuted}
            value={reflexion}
            onChangeText={setReflexion}
            style={styles.input}
            multiline
          />

          <Pressable
            style={styles.boutonValider}
            onPress={() => onCompleter({ jour: jour.jour, ressenti, reflexion })}
          >
            <Text style={styles.boutonValiderTexte}>Marquer comme fait</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
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
    fontSize: 26,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  consigne: {
    fontFamily: typography.body,
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  reflexionBloc: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  reflexionLabel: {
    fontFamily: typography.bodyMedium,
    color: colors.textPrimary,
    fontSize: 15,
  },
  ressentisRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
  },
  tagTexte: {
    fontFamily: typography.bodyMedium,
    color: colors.textPrimary,
    fontSize: 13,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    color: colors.textPrimary,
    fontFamily: typography.body,
    fontSize: 14,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  boutonValider: {
    backgroundColor: colors.accentTeal,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  boutonValiderTexte: {
    fontFamily: typography.bodySemiBold,
    color: colors.bgDeep,
    fontSize: 15,
  },
});
