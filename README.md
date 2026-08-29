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
│   │   ├── ProgressDots.js
│   │   └── TeleprompterPlayer.js  # composant clé de lecture vocale
│   └── screens/
│       ├── HomeScreen.js
│       ├── SprintDetailScreen.js
│       └── DayScreen.js           # bascule mission classique / teleprompter
```

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
3. Ajouter les notifications de rappel quotidien (expo-notifications).
4. Sprints collaboratifs (fonctionnalité "wow" identifiée en discovery).
5. Maquettes Claude Design ("SkillSprint Maquettes") pas encore importées —
   voir note dans le dernier commit / message à l'utilisateur : accès bloqué
   par l'auth (`/design-login` non disponible en session non-interactive,
   extension Claude in Chrome non connectée). À reprendre dès qu'une des deux
   voies d'accès est débloquée.
