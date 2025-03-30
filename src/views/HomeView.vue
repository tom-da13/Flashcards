<template>
  <div class="home-container">
    <h1>📚 Bienvenue dans l'application de révision !</h1>

    <!-- Liste des catégories -->
    <CategoryList :categories="categories" @category-selected="onCategorySelected" />

    <!-- Liste des thèmes si une catégorie est sélectionnée -->
    <ThemeList 
      v-if="selectedCategory" 
      :categoryId="selectedCategory" 
      :themes="filteredThemes" 
      @theme-selected="onThemeSelected" 
      @add-card="addCard"
      @delete-card="deleteCard"
    />

    <!-- Bouton pour commencer la révision -->
    <div>
      <button @click="startRevision" :disabled="!selectedCategory || !selectedTheme">Commencer la révision</button>
    </div>

    <!-- Bouton pour accéder aux paramètres -->
    <div>
      <button @click="goToSettings">⚙️ Paramètres</button>
    </div>
  </div>

    <!-- Liste des cartes de révision -->
    <div v-if="selectedTheme">
      <h2>Révision - Thème {{ selectedTheme }}</h2>
      <div v-if="flashcards.length > 0">
        <div v-for="(flashcard, index) in flashcards" :key="flashcard.id">
          <div class="card" @click="flipCard(flashcard)">
            <p v-if="!flashcard.showBack">{{ flashcard.question }}</p>
            <p v-else>{{ flashcard.answer }}</p>
          </div>
        </div>
      </div>
      <p v-else>🚨 Aucune carte disponible pour ce thème.</p>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import CategoryList from '@/components/CategoryList.vue';
import ThemeList from '@/components/ThemeList.vue';

// Initialisation des flashcards (exemple vide ou avec des données par défaut)
const flashcards = ref<{ id: number; question: string; answer: string; showBack: boolean }[]>([]);

// Définir un type pour la carte
interface Card {
  id: number;
  question: string;
  answer: string;
  showBack: boolean;
}

// Définir un type pour le thème
interface Theme {
  id: number;
  name: string;
  categoryId: number;
  cards: Card[];  // Tableau de cartes
}

// Liste des catégories (remplacer par des données persistées si nécessaire)
const categories = ref<{ id: number; name: string }[]>([
  { id: 1, name: 'Catégorie 1' },
  { id: 2, name: 'Catégorie 2' },
]);

// Liste des thèmes
const themesData = ref<Theme[]>([
  { id: 1, name: 'Thème 1', categoryId: 1, cards: [] },
  { id: 2, name: 'Thème 2', categoryId: 1, cards: [] },
  { id: 3, name: 'Thème 3', categoryId: 2, cards: [] },
  { id: 4, name: 'Thème 4', categoryId: 2, cards: [] },
]);

// Variables pour la catégorie et le thème sélectionnés
const selectedCategory = ref<number | null>(null);
const selectedTheme = ref<number | null>(null);

// Filtrer les thèmes par catégorie sélectionnée
const filteredThemes = computed(() => {
  if (selectedCategory.value === null) return [];
  return themesData.value.filter((theme) => theme.categoryId === selectedCategory.value);
});

// Gestion de la sélection d'une catégorie
const onCategorySelected = (categoryId: number) => {
  selectedCategory.value = categoryId;
  selectedTheme.value = null; // Réinitialiser le thème sélectionné
};

// Gestion de la sélection d'un thème
const onThemeSelected = (themeId: number) => {
  selectedTheme.value = themeId;
};

// Gestion de l'ajout d'une carte
const addCard = (themeId: number, card: Card) => {
  const theme = themesData.value.find((t) => t.id === themeId);
  if (theme) {
    theme.cards.push(card);  // Ajouter la carte au tableau des cartes du thème
  }
};

// Gestion de la suppression d'une carte
const deleteCard = (themeId: number, cardId: number) => {
  const theme = themesData.value.find((t) => t.id === themeId);
  if (theme) {
    theme.cards = theme.cards.filter((card) => card.id !== cardId);  // Supprimer la carte par son ID
  }
};

// Rediriger vers la révision
const router = useRouter();
const startRevision = () => {
  if (selectedCategory.value !== null && selectedTheme.value !== null) {
    router.push(`/categories/${selectedCategory.value}/themes/${selectedTheme.value}/flashcards`);
  }
};

// Navigation vers la vue des paramètres
const goToSettings = () => {
  router.push('/settings');  // Accède à la vue des paramètres
};
</script>

<style scoped>
.home-container {
  text-align: center;
  margin: 20px;
}

button {
  padding: 10px;
  background-color: #42b883;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 20px;
}

button:disabled {
  background-color: gray;
  cursor: not-allowed;
}
</style>
