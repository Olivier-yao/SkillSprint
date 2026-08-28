// theme.js — Système de design SkillSprint
// Palette pensée comme une "salle d'entraînement" calme : fond encre profonde,
// accent ambre pour la progression, teal pour la validation, corail réservé
// aux signaux de stress/attention (utilisé avec parcimonie).

export const colors = {
  bgDeep: '#1B1F2A',       // fond principal
  surface: '#242A3B',      // cartes
  surfaceRaised: '#2E3548',// cartes surélevées / modales
  textPrimary: '#F3EFE7',  // texte principal (blanc chaud papier)
  textMuted: '#9AA1B4',    // texte secondaire
  accentAmber: '#E8A23C',  // CTA principal, progression
  accentAmberDim: '#7A5A2C',
  accentTeal: '#5FBFA0',   // validation, complété, calme
  accentCoral: '#E2705F',  // stress / attention, usage rare
  divider: '#333A4E',
};

export const typography = {
  display: 'Fraunces_600SemiBold',   // titres, numéros de jour
  displayItalic: 'Fraunces_500Medium_Italic',
  body: 'WorkSans_400Regular',
  bodyMedium: 'WorkSans_500Medium',
  bodySemiBold: 'WorkSans_600SemiBold',
  reading: 'Literata_400Regular',    // texte du télé-prompteur (lecture longue)
  readingMedium: 'Literata_500Medium',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 22,
  pill: 999,
};

export default { colors, typography, spacing, radius };
