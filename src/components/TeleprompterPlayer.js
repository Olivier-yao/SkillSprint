import React, { useRef, useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Animated, Pressable, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, radius } from '../theme/theme';

// TeleprompterPlayer — élément signature de SkillSprint.
//
// Affiche un texte qui défile verticalement dans une "bande de focus"
// centrale, avec le reste du texte assombri au-dessus et en dessous
// (comme un vrai prompteur physique). L'utilisateur lit à voix haute au
// rythme du défilement, qu'il peut ralentir ou accélérer.
//
// Props :
// - text: string du texte à lire. "/" = respiration courte, "//" = longue.
// - focus: string, ce que l'exercice travaille (affiché en en-tête)
// - vitesseParDefaut: number (0.6 à 1.6 environ)
// - onTermine: callback appelé quand le défilement arrive en bas

const BAND_HEIGHT = 92; // hauteur de la bande de lecture nette, en px
const CONTAINER_HEIGHT = 320;

function decouperEnSegments(text) {
  // Transforme "mot mot / mot // mot" en tableau de segments avec pauses
  return text
    .split(/(\/\/|\/)/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function TeleprompterPlayer({
  text,
  focus,
  vitesseParDefaut = 1,
  onTermine,
}) {
  const [phase, setPhase] = useState('respiration'); // 'respiration' | 'lecture' | 'pause' | 'termine'
  const [vitesse, setVitesse] = useState(vitesseParDefaut);
  const scrollY = useRef(new Animated.Value(0)).current;
  const breathPulse = useRef(new Animated.Value(1)).current;
  const animationRef = useRef(null);
  const textHeightRef = useRef(0);

  const segments = useMemo(() => decouperEnSegments(text), [text]);

  // Pulsation du point de respiration avant de démarrer
  useEffect(() => {
    if (phase === 'respiration') {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(breathPulse, {
            toValue: 1.4,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(breathPulse, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      loop.start();
      return () => loop.stop();
    }
  }, [phase]);

  const demarrerLecture = () => {
    setPhase('lecture');
    const distance = Math.max(textHeightRef.current - BAND_HEIGHT, 200);
    const dureeBase = distance * 34; // ms par pixel, ajusté par la vitesse
    animationRef.current = Animated.timing(scrollY, {
      toValue: -distance,
      duration: dureeBase / vitesse,
      easing: Easing.linear,
      useNativeDriver: true,
    });
    animationRef.current.start(({ finished }) => {
      if (finished) {
        setPhase('termine');
        onTermine && onTermine();
      }
    });
  };

  const mettreEnPause = () => {
    animationRef.current && animationRef.current.stop();
    setPhase('pause');
  };

  const reprendre = () => {
    // Reprend le défilement restant à la vitesse courante
    const valeurActuelle = scrollY._value;
    const distanceRestante = Math.abs(
      valeurActuelle + (textHeightRef.current - BAND_HEIGHT)
    );
    setPhase('lecture');
    animationRef.current = Animated.timing(scrollY, {
      toValue: -(textHeightRef.current - BAND_HEIGHT),
      duration: (distanceRestante * 34) / vitesse,
      easing: Easing.linear,
      useNativeDriver: true,
    });
    animationRef.current.start(({ finished }) => {
      if (finished) {
        setPhase('termine');
        onTermine && onTermine();
      }
    });
  };

  const recommencer = () => {
    animationRef.current && animationRef.current.stop();
    scrollY.setValue(0);
    setPhase('respiration');
  };

  const ajusterVitesse = (delta) => {
    setVitesse((v) => Math.min(1.6, Math.max(0.6, +(v + delta).toFixed(1))));
  };

  return (
    <View style={styles.wrapper}>
      {!!focus && (
        <Text style={styles.focusLabel}>Objectif du jour · {focus}</Text>
      )}

      <View style={styles.promptContainer}>
        <Animated.View
          style={{ transform: [{ translateY: scrollY }] }}
          onLayout={(e) => {
            textHeightRef.current = e.nativeEvent.layout.height;
          }}
        >
          <View style={{ height: CONTAINER_HEIGHT / 2 - BAND_HEIGHT / 2 }} />
          <Text style={styles.readingText}>
            {segments.map((seg, i) => {
              if (seg === '/') return <Text key={i}> ‧ </Text>;
              if (seg === '//') return <Text key={i}>{'\n\n'}</Text>;
              return <Text key={i}>{seg} </Text>;
            })}
          </Text>
          <View style={{ height: CONTAINER_HEIGHT / 2 }} />
        </Animated.View>

        {/* Voiles de dégradé haut/bas pour assombrir hors de la bande de focus */}
        <LinearGradient
          colors={[colors.bgDeep, 'transparent']}
          style={[styles.voile, { top: 0, height: (CONTAINER_HEIGHT - BAND_HEIGHT) / 2 }]}
          pointerEvents="none"
        />
        <LinearGradient
          colors={['transparent', colors.bgDeep]}
          style={[styles.voile, { bottom: 0, height: (CONTAINER_HEIGHT - BAND_HEIGHT) / 2 }]}
          pointerEvents="none"
        />

        {/* Bande de focus */}
        <View style={styles.bandeFocus} pointerEvents="none" />
      </View>

      {phase === 'respiration' && (
        <View style={styles.respirationBloc}>
          <Animated.View
            style={[styles.pointRespiration, { transform: [{ scale: breathPulse }] }]}
          />
          <Text style={styles.respirationTexte}>
            Inspire... expire... puis lance la lecture quand tu es prêt.
          </Text>
          <Pressable style={styles.boutonPrincipal} onPress={demarrerLecture}>
            <Text style={styles.boutonPrincipalTexte}>Je suis prêt·e</Text>
          </Pressable>
        </View>
      )}

      {(phase === 'lecture' || phase === 'pause') && (
        <View style={styles.controles}>
          <View style={styles.vitesseControles}>
            <Pressable onPress={() => ajusterVitesse(-0.1)} style={styles.boutonRond}>
              <Text style={styles.boutonRondTexte}>–</Text>
            </Pressable>
            <Text style={styles.vitesseTexte}>Vitesse {vitesse.toFixed(1)}×</Text>
            <Pressable onPress={() => ajusterVitesse(0.1)} style={styles.boutonRond}>
              <Text style={styles.boutonRondTexte}>+</Text>
            </Pressable>
          </View>
          <Pressable
            style={styles.boutonPrincipal}
            onPress={phase === 'lecture' ? mettreEnPause : reprendre}
          >
            <Text style={styles.boutonPrincipalTexte}>
              {phase === 'lecture' ? 'Pause' : 'Reprendre'}
            </Text>
          </Pressable>
        </View>
      )}

      {phase === 'termine' && (
        <View style={styles.respirationBloc}>
          <Text style={styles.respirationTexte}>
            Bien joué. Comment te sentais-tu en lisant ?
          </Text>
          {/* Le check-in de ressenti est géré par l'écran parent (DayScreen) */}
          <Pressable style={styles.boutonSecondaire} onPress={recommencer}>
            <Text style={styles.boutonSecondaireTexte}>Relire une fois de plus</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: '100%' },
  focusLabel: {
    fontFamily: typography.bodyMedium,
    color: colors.accentAmber,
    fontSize: 13,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  promptContainer: {
    height: CONTAINER_HEIGHT,
    borderRadius: radius.lg,
    backgroundColor: colors.bgDeep,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.divider,
  },
  readingText: {
    fontFamily: typography.reading,
    fontSize: 26,
    lineHeight: 40,
    color: colors.textPrimary,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  voile: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  bandeFocus: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: CONTAINER_HEIGHT / 2 - BAND_HEIGHT / 2,
    height: BAND_HEIGHT,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.accentAmberDim,
  },
  respirationBloc: {
    alignItems: 'center',
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  pointRespiration: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.accentTeal,
  },
  respirationTexte: {
    fontFamily: typography.body,
    color: colors.textMuted,
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  controles: {
    marginTop: spacing.lg,
    alignItems: 'center',
    gap: spacing.md,
  },
  vitesseControles: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  boutonRond: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boutonRondTexte: {
    color: colors.textPrimary,
    fontSize: 18,
    fontFamily: typography.bodySemiBold,
  },
  vitesseTexte: {
    fontFamily: typography.bodyMedium,
    color: colors.textMuted,
    fontSize: 14,
    minWidth: 100,
    textAlign: 'center',
  },
  boutonPrincipal: {
    backgroundColor: colors.accentAmber,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.pill,
  },
  boutonPrincipalTexte: {
    fontFamily: typography.bodySemiBold,
    color: colors.bgDeep,
    fontSize: 15,
  },
  boutonSecondaire: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  boutonSecondaireTexte: {
    fontFamily: typography.bodyMedium,
    color: colors.accentTeal,
    fontSize: 14,
  },
});
