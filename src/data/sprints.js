// sprints.js — Contenu éditorial des sprints de 7 jours.
// Chaque jour a une mission textuelle classique OU un exercice de type
// "teleprompter" (lecture à voix haute) quand `type === 'teleprompter'`.
//
// Pour les exercices teleprompter :
// - `text` est le texte à lire, avec des marqueurs "/" indiquant une
//   respiration courte et "//" une respiration plus longue.
// - `focus` précise l'objectif travaillé ce jour-là (diction, rythme,
//   volume, gestion du stress...).

export const SPRINTS = [
  {
    id: 'voix-assurance',
    titre: 'Voix & Assurance',
    categorie: 'Prise de parole',
    description:
      "7 jours pour muscler ta voix : diction, rythme, respiration et gestion du stress avant de parler.",
    duree: 7,
    couleurAccent: 'accentAmber',
    jours: [
      {
        jour: 1,
        type: 'teleprompter',
        titre: 'Poser sa respiration',
        focus: 'Respiration et calme avant de parler',
        consigne:
          "Avant de lire, inspire lentement 4 secondes, retiens 2 secondes, expire 6 secondes. Puis lis le texte à voix haute, à ton rythme, sans te presser.",
        text:
          "Je prends un instant, / avant de parler. // Ma voix n'a pas besoin d'être parfaite, / elle a besoin d'être claire. // Je respire, / je pose mes mots, / un par un. // Ce que je dis compte, / même si ma voix tremble un peu au début.",
        vitesseParDefaut: 1,
      },
      {
        jour: 2,
        type: 'teleprompter',
        titre: 'Articuler chaque mot',
        focus: 'Diction et articulation',
        consigne:
          "Exagère volontairement l'ouverture de ta bouche sur chaque syllabe. L'objectif n'est pas la vitesse mais la clarté.",
        text:
          "Six chaises sèchent chez ces charmantes sœurs suisses. / Trois gros rats gris grattent trois gros tapis gras. // Je parle lentement, / j'articule chaque syllabe, / comme si chaque mot comptait vraiment.",
        vitesseParDefaut: 0.8,
      },
      {
        jour: 3,
        type: 'mission',
        titre: 'Parler en réunion',
        consigne:
          "Aujourd'hui, prends la parole au moins une fois dans un groupe (réunion, cours, appel) même pour une phrase courte.",
      },
      {
        jour: 4,
        type: 'teleprompter',
        titre: 'Varier le rythme',
        focus: 'Rythme et intonation',
        consigne:
          "Ralentis sur les passages importants, accélère légèrement sur les transitions. Laisse les silences (/) exister vraiment.",
        text:
          "Il y a des phrases / qu'il faut dire lentement. // Et d'autres, plus légères, qui peuvent filer plus vite, sans s'arrêter. / Le silence, / n'est pas un vide à combler, / c'est un outil.",
        vitesseParDefaut: 1,
      },
      {
        jour: 5,
        type: 'mission',
        titre: 'Enregistre-toi',
        consigne:
          "Enregistre-toi en train de raconter ta journée pendant 1 minute. Réécoute une seule fois, sans te juger.",
      },
      {
        jour: 6,
        type: 'teleprompter',
        titre: 'Parler malgré le stress',
        focus: 'Gestion du stress en direct',
        consigne:
          "Lis ce texte en imaginant que tu es un peu stressé. Le but : continuer à articuler et respirer même si la voix tremble un peu.",
        text:
          "Mon cœur bat un peu plus vite, / et c'est normal. // Le stress n'est pas mon ennemi, / c'est juste de l'énergie mal placée. // Je respire, / je continue à parler, / une phrase à la fois. // Je n'ai pas besoin d'être calme pour être clair.",
        vitesseParDefaut: 0.9,
      },
      {
        jour: 7,
        type: 'mission',
        titre: 'Bilan de la semaine',
        consigne:
          "Repense à un moment cette semaine où tu as parlé avec plus d'assurance qu'avant. Note-le en une phrase.",
      },
    ],
  },
  {
    id: 'ecoute-active',
    titre: 'Écoute active',
    categorie: 'Communication',
    description: "7 jours pour vraiment écouter, au-delà des mots.",
    duree: 7,
    couleurAccent: 'accentTeal',
    jours: [
      {
        jour: 1,
        type: 'mission',
        titre: 'Reformuler',
        consigne:
          "Dans une conversation aujourd'hui, reformule ce que l'autre vient de dire avant de répondre.",
      },
      // ... jours 2-7 à compléter
    ],
  },
];

export function getSprintById(id) {
  return SPRINTS.find((s) => s.id === id);
}
