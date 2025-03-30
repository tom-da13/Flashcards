<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Récupération des paramètres de l'URL
const route = useRoute();
const router = useRouter();
const categoryId = Number(route.params.categoryId) || 0;

// Stockage des thèmes
const themes = ref<{ id: number; categoryId: number; name: string }[]>([]);
const newThemeName = ref('');

// Charger les thèmes au montage du composant
onMounted(() => {
  const savedThemes = JSON.parse(localStorage.getItem('themes') || '[]');

  if (!Array.isArray(savedThemes)) {
    localStorage.setItem('themes', '[]');
    themes.value = [];
    return;
  }

  themes.value = savedThemes.filter((theme: any) => theme.categoryId === categoryId);
});

// Ajouter un thème
const addTheme = () => {
  if (!newThemeName.value.trim()) return;

  if (themes.value.some((t) => t.name.toLowerCase() === newThemeName.value.toLowerCase())) {
    alert('Ce thème existe déjà !');
    return;
  }

  const newTheme = { id: Date.now(), categoryId, name: newThemeName.value };
  themes.value.push(newTheme);
  localStorage.setItem('themes', JSON.stringify([...themes.value]));

  newThemeName.value = '';
};

// Supprimer un thème
const deleteTheme = (themeId: number) => {
  themes.value = themes.value.filter((theme) => theme.id !== themeId);

  const allThemes = JSON.parse(localStorage.getItem('themes') || '[]').filter((theme: any) => theme.id !== themeId);
  localStorage.setItem('themes', JSON.stringify(allThemes));
};

// Naviguer vers les cartes de révision d'un thème
const goToFlashcards = (themeId: number) => {
  router.push(`/categories/${categoryId}/themes/${themeId}/flashcards`);
};
</script>

<template>
  <div class="container">
    <h1>📁 Thèmes de la catégorie</h1>

    <!-- Formulaire pour ajouter un thème -->
    <div class="theme-input">
      <input v-model="newThemeName" placeholder="Nom du thème" />
      <button @click="addTheme">➕ Ajouter</button>
    </div>

    <!-- Liste des thèmes -->
    <ul class="theme-list">
      <li v-for="theme in themes" :key="theme.id" class="theme-item">
        <!-- Lien pour commencer la révision -->
        <router-link :to="`/categories/${categoryId}/themes/${theme.id}/flashcards`">
          🎓 Commencer une révision
        </router-link>
        <span @click="goToFlashcards(theme.id)">{{ theme.name }}</span>
        <button @click="deleteTheme(theme.id)">🗑️</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 20px auto;
  text-align: center;
}

.theme-input {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 8px;
}

button {
  padding: 8px 12px;
  cursor: pointer;
  border: none;
  background: #42b883;
  color: white;
  border-radius: 5px;
}

button:hover {
  background: #36996f;
}

.theme-list {
  list-style: none;
  padding: 0;
}

.theme-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #f3f3f3;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 5px;
}

.theme-item span {
  flex: 1;
}

.theme-item button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
