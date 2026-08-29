# Prompt pour Claude Design — SkillSprint

Copie tout le texte ci-dessous dans Claude Design.

---

Je développe **SkillSprint**, une app mobile (React Native / Expo) de développement personnel : des sprints de 7 jours pour muscler une compétence concrète (prise de parole, écoute active, gestion du stress...) via une mission quotidienne minimale. L'app existe déjà en code fonctionnel — je veux des maquettes qui respectent fidèlement son système de design actuel, tout en explorant proprement quelques écrans qui n'existent pas encore.

## Ton et ambiance

Une "salle d'entraînement calme" : sobre, encourageant, jamais infantilisant. Pas de gamification bruyante (pas de confettis, pas de badges criards) — la récompense est la sensation de progrès. Interface mobile-first, portrait uniquement, **thème sombre uniquement** (pas de mode clair).

Référence d'objet : un carnet de répétition d'acteur, un vrai prompteur de théâtre, la salle calme et bien éclairée d'un coach vocal le soir. Pas une app "tech/productivité" — un objet personnel et un peu littéraire.

## Ce que ça ne doit surtout PAS être

Le risque avec un générateur de design, c'est de retomber sur le style "produit IA" générique qu'on voit partout, qui n'a rien à voir avec l'identité de cette app. À proscrire explicitement :

- **Dégradés violet→bleu ou "AI startup glow"**, glow/lueur autour des boutons, cartes ou icônes
- **Glassmorphism** (fonds flous translucides, bordures blanches semi-transparentes qui flottent)
- **Neumorphism** (doubles ombres molles genre bouton "pressable" 3D)
- **Icônes/illustrations 3D glossy** façon Duolingo/Fluent, personnages "corporate memphis" ou blobs organiques flottants
- **Ombres portées lourdes** sous les cartes/boutons — ici la hiérarchie visuelle vient uniquement du contraste entre `bgDeep` / `surface` / `surfaceRaised`, pas d'ombre
- **Polices par défaut des générateurs IA** (Inter, Poppins, Manrope, Space Grotesk...) — uniquement Fraunces / Work Sans / Literata, non négociable
- **Gamification criarde** : confettis, trophées, barres de "streak" façon appli fitness, badges dorés brillants
- **Emoji dans l'UI**, icônes trop mignonnes/rondes
- **Layout "dashboard SaaS"** (grilles de KPI, sidebar, widgets multiples serrés) — ici c'est un flux linéaire, un écran = une intention

Le style doit rester reconnaissable comme SkillSprint et pas interchangeable avec n'importe quelle autre app générée : c'est la typographie serif chaleureuse (Fraunces/Literata) sur fond encre profonde, le vocabulaire visuel du prompteur physique (bande de lecture, texte qui s'assombrit en périphérie), et la sobriété qui font l'identité — pas des effets décoratifs ajoutés par-dessus.

## Système de design (à respecter strictement)

**Couleurs**
- Fond principal `#1B1F2A` (encre profonde)
- Cartes `#242A3B`
- Cartes surélevées / modales `#2E3548`
- Texte principal `#F3EFE7` (blanc chaud papier)
- Texte secondaire `#9AA1B4`
- Accent ambre `#E8A23C` — CTA principal, progression
- Accent ambre atténué `#7A5A2C` — bordures discrètes sur fond sombre
- Accent teal `#5FBFA0` — validation, complété, calme
- Accent corail `#E2705F` — stress/attention, **usage très rare**
- Séparateurs `#333A4E`

**Typographie**
- Titres et numéros de jour : *Fraunces* SemiBold (serif expressive, chaleureuse)
- Corps de texte / UI : *Work Sans* (Regular/Medium/SemiBold)
- Texte de lecture longue (télé-prompteur) : *Literata* (serif de lecture, plus douce)

**Formes** : coins très arrondis (rayon ~14-22px sur les cartes, boutons en pilule), **aucune ombre portée, aucun glow** — tout est plat sur fond sombre, la hiérarchie vient uniquement du contraste de surface (`bgDeep` → `surface` → `surfaceRaised`).

**Densité** : beaucoup d'air, un seul CTA principal par écran, cartes generreuses en padding.

---

## Écrans existants à maquetter fidèlement

### 1. Accueil
- En-tête : petit label "SKILLSPRINT" en ambre (majuscules, letter-spacing), puis titre "Une compétence à la fois." en Fraunces
- Liste verticale de cartes "sprint" (une par compétence). Chaque carte :
  - Catégorie en majuscules, discrète (ex. "PRISE DE PAROLE")
  - Titre du sprint en Fraunces (ex. "Voix & Assurance")
  - Description courte (1-2 lignes)
  - Pied de carte : une rangée de points de progression (7 points, un par jour — pleins en couleur d'accent si le jour est complété, sinon gris atténué) + un texte d'état à droite ("Pas commencé" ou "Jour 3/7")
- Actuellement 2 sprints visibles : "Voix & Assurance" (accent ambre) et "Écoute active" (accent teal)

### 2. Détail d'un sprint
- Catégorie, titre, description (même hiérarchie typographique que la carte, en plus grand)
- Bloc progression : points de progression + texte "X/7 jours complétés"
- Un CTA pilule pleine largeur en ambre : "Commencer le sprint" (si 0 jour fait) ou "Continuer — Jour N"
- Si les 7 jours sont complétés : un bloc discret sur fond `surface` disant que le sprint est terminé, avec possibilité de le refaire

### 3. Écran "Jour" — type mission (texte simple)
- Label "JOUR N" en ambre, majuscules
- Titre de la mission en Fraunces (ex. "Reformuler")
- Consigne en texte courant, 2-3 phrases
- Un bloc "check-in de ressenti" en bas :
  - Label "Comment tu te sentais ?"
  - 4 pills sélectionnables : Confiant·e / Stressé·e / Neutre / Fier·e (la sélectionnée passe en fond ambre, texte foncé)
  - Un champ texte optionnel multiligne ("Une phrase, si tu veux")
  - CTA pilule teal "Marquer comme fait"

### 4. Écran "Jour" — type télé-prompteur (élément signature de l'app)
Même en-tête que l'écran mission (jour, titre, consigne), puis en dessous un composant télé-prompteur avec **3 états successifs** :

**État A — Respiration (avant lecture)**
- Un point teal qui pulse doucement (respiration guidée)
- Texte : "Inspire... expire... puis lance la lecture quand tu es prêt."
- CTA pilule ambre : "Je suis prêt·e"

**État B — Lecture en cours / Pause**
- Un cadre sombre avec bordure fine (`divider`), hauteur fixe (~320px), qui contient le texte à lire en Literata, grande taille, centré
- Une **bande de focus horizontale** au centre du cadre (bordée de traits ambre atténué) : le texte défile verticalement à travers cette bande, comme un vrai prompteur physique
- Le texte hors de la bande de focus (au-dessus et en dessous) est progressivement assombri via un dégradé vers le fond
- Les pauses courtes dans le texte apparaissent comme un point médian " ‧ ", les pauses longues comme un saut de ligne
- Sous le cadre : contrôle de vitesse (boutons ronds "–" / "+" autour d'un texte "Vitesse 1.0×") et un CTA pilule ambre "Pause" / "Reprendre"

**État C — Terminé**
- Texte : "Bien joué. Comment te sentais-tu en lisant ?"
- Puis le même bloc de check-in de ressenti que l'écran mission (pills + champ texte + "Marquer comme fait")
- Un lien secondaire discret (texte teal, pas de fond) : "Relire une fois de plus"

---

## Pistes d'extension à explorer (n'existent pas encore dans le code — à proposer, pas à considérer comme figées)

### 5. Onboarding / première ouverture
2-3 écrans courts qui expliquent le concept avant l'accueil : "un sprint = 7 jours, une mission par jour, 5 minutes suffisent". Garder le ton sobre — pas de tunnel d'onboarding à rallonge. Un écran de bienvenue avec le nom de l'app et une accroche, puis éventuellement un choix de première compétence à démarrer.

### 6. Profil / historique
Un écran qui répond à "qu'est-ce que j'ai accompli ?" : liste des sprints terminés ou en cours, un indicateur simple de régularité (ex. jours consécutifs), et un accès à l'historique des ressentis notés jour après jour (utile pour un sprint comme "Voix & Assurance" où on veut voir son évolution émotionnelle face au stress). Éviter tout ce qui ressemble à des stats de fitness-tracker agressives — rester dans le ton "carnet personnel".

---

Merci de produire des maquettes haute fidélité pour ces écrans, cohérentes entre elles, en respectant strictement la palette et la typographie données ci-dessus.
