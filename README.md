# SkillSprint

App de développement personnel : des sprints de 7 jours pour muscler une
compétence concrète (prise de parole, écoute, gestion du stress...) via une
mission quotidienne minimale.

## Fonctionnalité clé : le télé-prompteur vocal

Le sprint "Voix & Assurance" utilise `TeleprompterPlayer` pour faire lire un
texte à voix haute à l'utilisateur, avec :
- un défilement à vitesse réglable (0.6× à 1.6×)
- une bande de focus centrale et un assombrissement du texte hors-bande,
  comme un vrai prompteur
- un temps de respiration guidé avant de démarrer (utile contre le stress)
- des marqueurs `/` (pause courte) et `//` (pause longue) dans les textes
  pour travailler le rythme
- un check-in de ressenti après la lecture (Confiant·e / Stressé·e / Neutre / Fier·e)
- un enregistrement audio (`expo-av`) de la lecture, avec réécoute possible
  juste après (dégrade proprement si le micro n'est pas accessible — l'exercice
  reste utilisable sans)

## Structure du projet

```
skillsprint/
├── App.js                        # navigation + polices + progression persistée
├── src/
│   ├── theme/theme.js             # couleurs, typographie, espacements
│   ├── data/sprints.js            # contenu éditorial des sprints (à enrichir)
│   ├── components/
│   │   ├── ProgressRing.js
│   │   ├── icons.js               # icônes de la barre d'onglets
│   │   └── TeleprompterPlayer.js  # composant clé de lecture vocale
│   └── screens/
│       ├── OnboardingScreen.js    # premier lancement uniquement
│       ├── HomeScreen.js
│       ├── SprintDetailScreen.js
│       ├── ProfilScreen.js        # onglet "Profil" — carnet minimal
│       └── DayScreen.js           # bascule mission classique / teleprompter
```

## Navigation

Premier lancement : `OnboardingScreen` (choix d'un sprint), affiché tant que
`@skillsprint_onboarde` n'est pas en storage. Ensuite : une barre d'onglets
(`Accueil` / `Profil`) — l'onglet Accueil contient la pile Home → SprintDetail
→ Day comme avant. Choisir un sprint pendant l'onboarding ouvre directement
son détail au premier lancement de l'onglet Accueil.

## Lancer le projet

```bash
npm install
npx expo start
```

Scanner le QR code avec l'app Expo Go (Android/iOS), ou appuyer sur `w` pour
tester dans le navigateur.

## Prochaines étapes suggérées

1. ~~Compléter le contenu des jours 2 à 7 du sprint "Écoute active"~~ — fait.
2. ~~Enregistrement audio (expo-av) pour se réécouter après le télé-prompteur~~ —
   fait. Testé en navigateur sur le chemin "micro indisponible" (dégradation
   propre) ; le chemin d'enregistrement réel nécessite un test sur appareil
   (Expo Go) ou navigateur avec accès micro, pas encore fait.
3. ~~Notifications de rappel quotidien~~ — fait. Réglage dans l'onglet
   Profil (interrupteur + choix de l'heure parmi 8h/12h/19h/21h), rappel
   global — pas par sprint. Testé en navigateur sur le chemin "permission
   refusée" (dégradation propre, message explicite) ; la planification
   réelle (`Notifications.scheduleNotificationAsync`) nécessite un test sur
   appareil, pas encore fait.
4. ~~Sprints collaboratifs~~ — fait. Défini avec l'utilisateur : faire le
   même sprint à plusieurs, sans compte. Nouveau projet Supabase dédié
   (`skillsprint`, région eu-west-1, palier gratuit) avec 3 tables
   (`groupes`, `participants`, `completions`, RLS activée, migrations
   `sprints_groupe` + `completions_groupe_id`). Chaque appareil a un
   identifiant local (pas d'auth) ; le code de groupe à 6 caractères fait
   office de secret partagé — adapté à un usage entre amis, pas à des
   données sensibles (à documenter clairement si l'app grandit). Sur
   `SprintDetailScreen`, nouvelle carte `GroupeSprint` : créer/rejoindre un
   groupe, voir qui a fait quoi (grille de coches par participant/jour) via
   Supabase Realtime. `marquerJourComplete` pousse la completion au groupe
   si l'appareil en a un pour ce sprint.

   Testé en conditions réelles avec deux onglets simulant deux appareils
   (identifiants locaux différents) : création de groupe, jonction par
   code, complétion d'un jour au télé-prompteur → la coche apparaît en
   direct sur l'autre appareil sans rafraîchir. Aucune erreur console.
   Donnée de test nettoyée de la base après vérification.
5. ~~Importer les maquettes Claude Design~~ — fait (accès débloqué via export
   HTML manuel de l'utilisateur, cf. commit "Apply Claude Design maquettes").
   Appliqué : accueil (carte "aujourd'hui" + liste), détail sprint (liste des
   7 jours, bouton "Refaire le sprint"), bande du télé-prompteur (repères
   latéraux au lieu des filets pleine largeur), et un vrai bug corrigé au
   passage (le défilement finissait sur du vide au lieu de montrer la
   dernière ligne).
6. ~~Onboarding~~ — fait. Direction "choix direct de compétence" (maquette 1m) :
   au tout premier lancement, on choisit un sprint et on entre directement
   dans son détail. Pas de tunnel à rallonge. Flag persisté dans
   `@skillsprint_onboarde`.
7. ~~Navigation par barre d'onglets~~ — fait. `Accueil` (pile Home →
   SprintDetail → Day, comme avant) et `Profil` (nouvel onglet).
8. ~~Historique des ressentis~~ — fait. `marquerJourComplete` persiste
   maintenant `{ jour, ressenti, reflexion, date }` par jour complété (pas
   seulement `jourActuel`). Nouvel écran `HistoriqueScreen` (maquette 1o),
   accessible depuis "Voir mes ressentis" sur chaque carte de l'onglet
   Profil : ressenti + citation par jour fait, "Pas encore fait" pour le
   reste — pas de série/tendance inventée, juste un décompte honnête
   ("Nombre de jours notés"). "Refaire le sprint" efface aussi l'historique
   du sprint (recommencer à zéro, cohérent avec la remise à zéro de
   `jourActuel`). Toujours pas de jours consécutifs — ça demanderait de
   comparer des dates d'un jour sur l'autre, pas juste de stocker une date
   par entrée ; à faire séparément si besoin.
9. ~~Refonte de l'identité visuelle~~ — fait. La première identité (fond
   encre bleu-nuit, ambre/teal, Fraunces/Work Sans/Literata) a été jugée
   trop générique. Remplacée par la direction "Graphique audacieux" choisie
   parmi 3 propositions : fond presque-blanc, indigo saturé (`#362FE0`) en
   accent principal, orange (`#E0592A`) pour le jour en cours, typographie
   Bricolage Grotesque (titres) + Archivo (corps), cartes en blocs pleins ou
   bordés (2px, coins peu arrondis), anneaux de progression SVG
   (`ProgressRing`) à la place des points. Le télé-prompteur garde son fond
   sombre en "spotlight" volontaire, avec une bande de surlignage indigo
   pleine largeur au lieu des repères latéraux.
