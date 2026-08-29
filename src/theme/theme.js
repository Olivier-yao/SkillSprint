// theme.js — Système de design SkillSprint
// Direction "Graphique audacieux" : fond presque-blanc, encre quasi-noire,
// indigo saturé en accent principal (CTA, progression, marque), orange brûlé
// réservé à la mise en avant du jour en cours. Cartes en blocs pleins ou
// bordés — pas de soft-UI, la hiérarchie vient du contraste et du poids
// typographique.

export const colors = {
  bg: '#F3F2EE',            // fond principal
  surface: '#FFFFFF',       // cartes
  surfaceRaised: '#EDEBE4', // éléments surélevés (pastilles, champs)
  ink: '#14151A',           // texte principal
  textMuted: '#55524C',     // texte secondaire
  accentIndigo: '#362FE0',  // marque, CTA principal, progression, validation
  accentIndigoSoft: '#E3E1FB', // fond doux sur accent indigo
  accentOrange: '#E0592A',  // mise en avant du jour en cours, usage ciblé
  divider: '#E4E2DC',
};

export const typography = {
  display: 'BricolageGrotesque_800ExtraBold', // titres, marque
  displaySemiBold: 'BricolageGrotesque_600SemiBold',
  body: 'Archivo_400Regular',
  bodyMedium: 'Archivo_500Medium',
  bodySemiBold: 'Archivo_600SemiBold',
  bodyBold: 'Archivo_700Bold',
  reading: 'BricolageGrotesque_800ExtraBold', // texte du télé-prompteur
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
  sm: 4,
  md: 8,
  lg: 16,
};

export default { colors, typography, spacing, radius };
