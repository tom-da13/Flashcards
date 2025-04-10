FlashMemory est une application de mémorisation basée sur la répétition espacée, développée avec Vue.js 3 (TypeScript). Elle permet de créer et réviser des cartes mémoire organisées par thèmes et catégories, tout en assurant un mode hors-ligne grâce à un Service Worker et un fichier manifest.json.

Fonctionnalités Principales : 

Création & Gestion de Catégories et Thèmes
- L'utilisateur peut ajouter, modifier et supprimer des catégories contenant des thèmes.
- Chaque thème contient des cartes mémoire avec texte, image, audio ou vidéo.

Révision Basée sur la Répétition Espacée
- Chaque carte suit un système de niveaux qui détermine sa fréquence de révision.
- L'utilisateur peut configurer le nombre de nouvelles cartes à voir chaque jour.

Mode Hors-ligne & PWA (Progressive Web App)
- Installation sur mobile grâce au fichier manifest.json.
- Service Worker pour une navigation hors-ligne fluide.

Paramètres Personnalisables
- Activer/désactiver les notifications de rappel.
- Configurer le nombre de niveaux et nouvelles cartes par jour.

Suivi des Statistiques
- Nombre de cartes révisées aujourd'hui.
- Nombre total de cartes enregistrées.

Structure du Projet : 

📦 flashmemory/ (Dossier racine du projet)
├── 📁 src/ (Code source de l'application)
│ ├── 📁 components/ (Composants réutilisables)
│ │ ├── FlashCard.vue (Composant d'une carte mémoire)
│ │ ├── ThemeList.vue (Liste des thèmes d’une catégorie)
│ │ ├── CategoryList.vue (Liste des catégories)
│ ├── 📁 views/ (Pages principales de l'application)
│ │ ├── HomeView.vue (Accueil)
│ │ ├── CategoriesView.vue (Gestion des catégories)
│ │ ├── ThemesView.vue (Gestion des thèmes)
│ │ ├── FlashCardsView.vue (Révision des cartes mémoire)
│ │ ├── SettingsView.vue (Paramètres de l'application)
│ ├── 📁 router/ (Configuration des routes Vue Router)
│ │ ├── index.ts (Définition des routes)
│ ├── 📁 assets/ (Images, styles et icônes)
│ ├── App.vue (Composant principal)
│ ├── main.ts (Point d'entrée de l'application Vue.js)
├── 📁 public/ (Fichiers statiques & PWA)
│ ├── index.html (Fichier HTML principal)
│ ├── manifest.json (Fichier PWA - Icônes & métadonnées)
│ ├── service-worker.js (Gestion du mode hors-ligne)
├── 📄 package.json (Dépendances et scripts NPM)
├── 📄 vite.config.ts

Installation & Lancement : 

Etape 1️⃣ : Cloner le projet
git clone https://github.com/mon-utilisateur/flashmemory.git
cd flashmemory

Etape 2️⃣ : Installer les dépendances
npm install

Etape 3️⃣  : Lancer le serveur de développement
npm run dev

Déploiement sur Vercel/GitHub Pages :

🚀 Déploiement sur Vercel : 

Etape 1️⃣ : Installer Vercel
npm install -g vercel
vercel

Etape 2️⃣ : Suivre les instructions pour déployer l'application 

🚀 Déploiement sur GitHub Pages : 

Etape 1️⃣ : Ajouter à package.json
"homepage": "https://mon-utilisateur.github.io/flashmemory"

Etape 2️⃣ : Installer gh-pages 
npm install --save-dev gh-pages

Etape 3️⃣  : Ajouter ces scripts à package.json
"scripts": {
  "build": "vite build",
  "deploy": "npm run build && gh-pages -d dist"
}

Etape 4️⃣ : Déployer
npm run deploy

Fonctionnalités Techniques : 

✔ Vue.js 3 + TypeScript (Framework moderne, typage sécurisé)
✔ Vue Router (Navigation entre les pages)
✔ LocalStorage (Sauvegarde des cartes & stats utilisateur)
✔ Service Worker (Mode hors-ligne)
✔ PWA (Progressive Web App) (Installation possible sur mobile)
✔ Vite.js (Serveur de développement rapide)


📚 Merci d'utiliser FlashMemory ! 📚
Bonne révision et bon apprentissage ! ✨#   F l a s h c a r d s  
 