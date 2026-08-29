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
    jours: [
      {
        jour: 1,
        type: 'teleprompter',
        titre: 'Poser sa respiration',
        focus: 'Respiration et calme avant de parler',
        consigne:
          "Avant de lire, inspire lentement 4 secondes, retiens 2 secondes, expire 6 secondes. Puis lis le texte à voix haute, à ton rythme, sans te presser.",
        text:
          "Je prends un instant, / avant de parler. // Ma voix n'a pas besoin d'être parfaite, / elle a besoin d'être claire. // Je respire, / je pose mes mots, / un par un. // Ce que je dis compte, / même si ma voix tremble un peu au début. // Avant de commencer, / je laisse mes épaules descendre. // Je ne cherche pas à impressionner, / je cherche juste à être entendu·e. // Une voix calme / n'est pas une voix forte, / c'est une voix qui prend son temps. // Je peux parler lentement, / personne ne va s'impatienter. // Le silence entre mes phrases / n'est pas une faiblesse, / c'est de l'espace pour que mes mots respirent. // Si je perds le fil, / je m'arrête, / je respire, / et je reprends où j'en étais. // Ce n'est pas grave. // Chaque prise de parole / est une occasion de m'entraîner, / pas un examen à réussir du premier coup. // Je suis ici, / debout ou assis·e, / et j'ai le droit de prendre la place / que ma voix mérite. // C'est tout ce qu'il faut retenir / avant de commencer à parler : / respirer, / ralentir, / et faire confiance à ce que j'ai à dire.",
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
          "Six chaises sèchent chez ces charmantes sœurs suisses. / Trois gros rats gris grattent trois gros tapis gras. // Un chasseur sachant chasser doit savoir chasser sans son chien. / Si six scies scient six cyprès, / six cent six scies scient six cent six cyprès. // Je parle lentement, / j'articule chaque syllabe, / comme si chaque mot comptait vraiment. // Ma bouche s'ouvre plus que d'habitude, / mes lèvres travaillent, / ma langue touche mes dents sur chaque consonne. // Didon dîna, dit-on, du dos d'un dodu dindon. / Un dragon gradé dégrade un gradé dragon. // Je ne cherche pas la vitesse, / je cherche la netteté. // Chaque syllabe a sa place, / chaque mot mérite d'être entendu clairement, / du début à la fin. // Si je m'emmêle, / je ralentis encore, / je reprends la phrase, / sans stress. // L'articulation, / ça se muscle / comme un geste qu'on répète, / jusqu'à ce qu'il devienne naturel.",
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
          "Il y a des phrases / qu'il faut dire lentement. // Elles portent quelque chose d'important, / et elles ont besoin d'espace pour qu'on les entende vraiment. // Et d'autres, plus légères, / qui peuvent filer plus vite, / sans s'arrêter, / comme une respiration naturelle dans la conversation. // Le silence, / n'est pas un vide à combler. / C'est un outil. // Un silence bien placé / attire l'attention / bien mieux qu'un mot de plus. // Je peux ralentir / juste avant l'idée la plus importante, / pour que mon auditoire se penche un peu en avant, / sans même s'en rendre compte. // Et je peux accélérer / sur les détails, / sur les transitions, / sur ce qui compte un peu moins, / pour garder l'attention en mouvement. // Varier le rythme, / ce n'est pas une technique compliquée. / C'est juste écouter / ce que chaque phrase a besoin de dire, / et lui donner le temps / — ou la vitesse — / qui lui correspond. // Une voix qui varie / est une voix vivante. / Une voix qui reste toujours pareille / finit par se faire oublier.",
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
          "Mon cœur bat un peu plus vite, / et c'est normal. // Mes mains sont peut-être moites, / ma voix hésite peut-être sur le premier mot. // Rien de tout ça / n'empêche ce que j'ai à dire d'être vrai / et d'avoir de la valeur. // Le stress n'est pas mon ennemi, / c'est juste de l'énergie mal placée. // Cette énergie, / je peux la mettre dans mes mots / plutôt que la laisser bloquer ma gorge. // Je respire, / je continue à parler, / une phrase à la fois. // Je ne suis pas obligé·e d'avoir toutes les réponses / ni de parler sans la moindre hésitation. // Je n'ai pas besoin d'être calme / pour être clair. // Je peux trembler un peu / et quand même me faire comprendre. // Les gens en face de moi / ne cherchent pas la perfection, / ils cherchent quelqu'un de sincère. // Alors je garde mes pieds bien ancrés, / je garde ma respiration lente, / et je laisse ma voix sortir, / même imparfaite, / même un peu tremblante. // C'est ça, / parler malgré le stress : / pas l'effacer, / juste avancer avec.",
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
    jours: [
      {
        jour: 1,
        type: 'mission',
        titre: 'Reformuler',
        consigne:
          "Dans une conversation aujourd'hui, reformule ce que l'autre vient de dire avant de répondre.",
      },
      {
        jour: 2,
        type: 'mission',
        titre: 'Ne pas préparer sa réponse',
        consigne:
          "Pendant que quelqu'un te parle aujourd'hui, résiste à l'envie de préparer ta réponse dans ta tête. Écoute juste jusqu'au bout, puis réfléchis.",
      },
      {
        jour: 3,
        type: 'mission',
        titre: 'Laisser le silence',
        consigne:
          "Après que l'autre a fini de parler, compte trois secondes dans ta tête avant de répondre, au lieu de combler tout de suite.",
      },
      {
        jour: 4,
        type: 'mission',
        titre: 'Poser une question ouverte',
        consigne:
          "Dans une conversation, pose une question qui ne se répond pas par oui ou non, du style « Qu'est-ce qui t'a fait penser ça ? »",
      },
      {
        jour: 5,
        type: 'mission',
        titre: 'Écouter ce qui n\'est pas dit',
        consigne:
          "Repère aujourd'hui un ton, une hésitation ou un silence qui en dit plus long que les mots eux-mêmes. Ne dis rien, remarque-le juste.",
      },
      {
        jour: 6,
        type: 'mission',
        titre: 'Ranger le téléphone',
        consigne:
          "Choisis une conversation aujourd'hui où tu poses ton téléphone, hors de vue, du début à la fin. Sans exception.",
      },
      {
        jour: 7,
        type: 'mission',
        titre: 'Bilan de la semaine',
        consigne:
          "Repense à un moment cette semaine où tu as vraiment écouté quelqu'un, pas juste entendu. Note-le en une phrase.",
      },
    ],
  },
  {
    id: 'respiration-ancrage',
    titre: 'Respiration & Ancrage',
    categorie: 'Gestion du stress',
    description:
      "7 jours pour retrouver ton calme : respiration, ancrage dans le corps, et un vrai plan pour les moments de tension.",
    duree: 7,
    jours: [
      {
        jour: 1,
        type: 'teleprompter',
        titre: 'Respirer en quatre temps',
        focus: 'Respiration carrée, quatre temps égaux',
        consigne:
          "Suis le rythme : inspire 4 secondes, retiens 4, expire 4, retiens 4. Lis le texte en calant tes mots sur ce rythme, sans te presser.",
        text:
          "J'inspire, / je compte jusqu'à quatre. // Un, / deux, / trois, / quatre. // Je retiens, / un temps de pause. // Un, / deux, / trois, / quatre. // J'expire, / je laisse partir. // Un, / deux, / trois, / quatre. // Je retiens à nouveau, / poumons vides, / calme. // Un, / deux, / trois, / quatre. // Et je recommence, / aussi souvent qu'il le faut. // Ce carré de respiration / n'a pas besoin d'être parfait. / Il a juste besoin d'être répété. // À chaque cycle, / mes épaules descendent un peu plus. / Mes pensées ralentissent, / même si elles ne s'arrêtent pas complètement. // Ce n'est pas grave. // Je ne cherche pas à vider ma tête. / Je cherche juste à donner à mon corps / un rythme plus lent / que celui de mon stress. // Quatre temps pour inspirer, / quatre temps pour retenir, / quatre temps pour expirer, / quatre temps pour faire une pause. // Un carré simple, / que je peux emporter partout, / même sans ce texte sous les yeux.",
        vitesseParDefaut: 0.8,
      },
      {
        jour: 2,
        type: 'mission',
        titre: 'Nommer ce qui se passe',
        consigne:
          "Dès que tu sens une tension monter aujourd'hui, dis-toi intérieurement (ou à voix basse) ce qui se passe : « Je suis stressé·e parce que... ». Nommer, sans juger.",
      },
      {
        jour: 3,
        type: 'teleprompter',
        titre: 'Ancrer son corps',
        focus: 'Ancrage par les sens',
        consigne:
          "Pendant que tu lis, sens vraiment tes pieds au sol et tes mains posées. C'est ça, l'ancrage.",
        text:
          "Mes pieds touchent le sol. // Je sens le contact, / le poids qui descend, / la stabilité qui vient d'en bas. // Mes mains sont posées, / immobiles. // Je sens leur température, / leur poids, / la texture de ce qu'elles touchent. // Je remarque cinq choses que je peux voir autour de moi. / Je ne les juge pas, / je les remarque, / simplement. // Je remarque quatre choses que je peux entendre. / Un bruit lointain, / peut-être ma propre respiration. // Je remarque trois choses que je peux sentir / sous mes doigts, / sous mes pieds, / contre mon dos. // Je sens le poids de mon corps, / ici, / maintenant. // Pas hier, / pas demain. / Ici. // Le stress est dans ma tête. / Il parle de choses passées / ou de choses qui n'arrivent pas encore. // Mon corps, lui, / est déjà calme. / Il n'a pas besoin d'attendre / que ma tête se calme aussi. // Je peux commencer par lui, / et laisser le reste suivre, / doucement.",
        vitesseParDefaut: 0.9,
      },
      {
        jour: 4,
        type: 'mission',
        titre: 'Faire une pause de deux minutes',
        consigne:
          "Aujourd'hui, dès que tu sens la pression monter, arrête-toi deux minutes. Pas de téléphone, juste respirer. Deux minutes, pas plus, pas moins.",
      },
      {
        jour: 5,
        type: 'teleprompter',
        titre: 'Parler à son stress',
        focus: 'Changer le dialogue intérieur',
        consigne:
          "Lis ce texte comme si tu te parlais à toi-même, avec douceur, pas avec dureté.",
        text:
          "Mon stress n'est pas mon ennemi. // Il essaie juste de me protéger, / maladroitement, / comme un ami un peu trop nerveux / qui veut bien faire. // Il pense que s'il m'alerte assez fort, / je serai prêt·e pour n'importe quoi. // Mais parfois, / il en fait trop, / et il m'épuise avant même que la difficulté n'arrive. // Je peux lui dire merci, / et respirer quand même. // Merci d'essayer de me protéger, / mais je n'ai pas besoin de toute cette alarme / pour ce moment précis. // Je n'ai pas besoin qu'il disparaisse / pour avancer. // Je peux avancer avec lui à côté de moi, / un peu bruyant, / mais pas aux commandes. // Je respire, / je pose une main sur ma poitrine / si ça m'aide à sentir que je suis là, / présent·e, / entier·e. // Le stress va et vient. / Il n'est pas moi. / Il est juste une vague / qui traverse un corps / qui, lui, / reste debout.",
        vitesseParDefaut: 0.9,
      },
      {
        jour: 6,
        type: 'mission',
        titre: 'Préparer son plan anti-tension',
        consigne:
          "Note trois choses simples que tu peux faire la prochaine fois que le stress monte (respirer, sortir marcher, appeler quelqu'un...). Garde cette liste à portée de main.",
      },
      {
        jour: 7,
        type: 'mission',
        titre: 'Bilan de la semaine',
        consigne:
          "Repense à un moment cette semaine où tu as géré ton stress un peu mieux qu'avant. Note-le en une phrase.",
      },
    ],
  },
  {
    id: 'focus-discipline',
    titre: 'Focus & Discipline',
    categorie: 'Concentration',
    description:
      "7 jours pour muscler ta concentration : couper les distractions, tenir un cap, et retrouver le plaisir de finir ce que tu commences.",
    duree: 7,
    jours: [
      {
        jour: 1,
        type: 'mission',
        titre: 'Une seule tâche à la fois',
        consigne:
          "Aujourd'hui, choisis une tâche importante et fais-la sans rien ouvrir d'autre — pas d'onglet, pas de notification, pas de téléphone — pendant 10 minutes d'affilée.",
      },
      {
        jour: 2,
        type: 'teleprompter',
        titre: 'Se recentrer',
        focus: 'Revenir à l\'instant présent, encore et encore',
        consigne:
          "Lis lentement. Chaque fois que le texte te fait remarquer que ton attention est partie, c'est exactement l'exercice.",
        text:
          "Mon attention part, / encore. // Elle va voir ailleurs, / une pensée, / une envie de vérifier mon téléphone, / un bruit dans la pièce. // Ce n'est pas un échec. / C'est juste ce que fait une attention, / naturellement. // Je la remarque, / sans me juger, / et je la ramène, / doucement, / vers ce que je suis en train de faire. // Une tâche à la fois. / Une phrase à la fois. / Un mot à la fois. // Je n'ai pas besoin d'être concentré·e parfaitement / pendant des heures. // J'ai juste besoin de revenir, / une fois de plus, / chaque fois que je pars. // C'est ça, / la concentration : / pas l'absence de distraction, / mais le geste de revenir, / répété, / patiemment. // Je respire, / je repose les yeux sur ce qui compte, / et je continue, / un peu plus loin qu'avant.",
        vitesseParDefaut: 0.9,
      },
      {
        jour: 3,
        type: 'mission',
        titre: 'Couper les notifications',
        consigne:
          "Mets ton téléphone en mode avion ou « ne pas déranger » pendant une heure de travail aujourd'hui. Observe ce que ça change.",
      },
      {
        jour: 4,
        type: 'teleprompter',
        titre: 'Tenir jusqu\'au bout',
        focus: 'Aller au bout d\'une chose avant d\'en commencer une autre',
        consigne:
          "Lis ce texte sans t'arrêter, même si l'envie de faire autre chose te vient. C'est exactement ce dont il parle.",
        text:
          "J'ai envie de tout commencer, / et de ne rien finir. // Une nouvelle idée arrive, / plus excitante que celle d'hier, / et je veux déjà sauter dessus. // Mais aujourd'hui, / je choisis de rester. // Je finis ce que j'ai commencé, / même si c'est moins excitant maintenant / que ça l'était au début. // Le début est facile. / Tout le monde aime les débuts. // C'est le milieu qui est difficile, / cette partie où l'enthousiasme est parti / mais le travail n'est pas fini. // Je reste, / un peu plus longtemps que ce qui est confortable. // Pas éternellement, / juste un peu plus. // Chaque fois que je vais jusqu'au bout d'une chose, / même petite, / j'apprends à me faire confiance. // Je peux commencer une nouvelle idée demain. / Aujourd'hui, / je finis celle-ci.",
        vitesseParDefaut: 0.9,
      },
      {
        jour: 5,
        type: 'mission',
        titre: 'La règle des cinq minutes',
        consigne:
          "Quand tu repousses une tâche aujourd'hui, dis-toi que tu vas juste faire cinq minutes. Souvent, tu continueras après — et sinon, cinq minutes, c'est déjà ça.",
      },
      {
        jour: 6,
        type: 'mission',
        titre: 'Ranger son espace de travail',
        consigne:
          "Avant de commencer à travailler aujourd'hui, dégage ton espace : range ce qui traîne, ferme les onglets inutiles. Un espace clair, une tête plus claire.",
      },
      {
        jour: 7,
        type: 'mission',
        titre: 'Bilan de la semaine',
        consigne:
          "Repense à un moment cette semaine où tu es resté·e concentré·e plus longtemps que d'habitude. Note-le en une phrase.",
      },
    ],
  },
];

export function getSprintById(id) {
  return SPRINTS.find((s) => s.id === id);
}
