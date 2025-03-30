<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// Liste des catégories et variable pour ajouter une nouvelle catégorie
const categories = ref<{ id: number; name: string }[]>([]);
const newCategoryName = ref("");
const router = useRouter();

// Charger les catégories depuis localStorage au montage du composant
onMounted(() => {
  const savedCategories = JSON.parse(localStorage.getItem("categories") || "[]");
  categories.value = savedCategories;
});

// Ajouter une nouvelle catégorie
const addCategory = () => {
  if (!newCategoryName.value.trim()) return;

  // Vérifier si la catégorie existe déjà
  if (categories.value.some(category => category.name.toLowerCase() === newCategoryName.value.toLowerCase())) {
    alert("Cette catégorie existe déjà !");
    return;
  }

  const newCategory = { id: Date.now(), name: newCategoryName.value };
  categories.value.push(newCategory);

  // Mettre à jour les catégories dans localStorage
  localStorage.setItem("categories", JSON.stringify(categories.value));
  
  // Réinitialiser le champ de saisie
  newCategoryName.value = "";
};

// Supprimer une catégorie
const deleteCategory = (categoryId: number) => {
  categories.value = categories.value.filter((category) => category.id !== categoryId);

  // Mettre à jour localStorage
  localStorage.setItem("categories", JSON.stringify(categories.value));
};

// Naviguer vers la liste des thèmes d'une catégorie
const goToThemes = (categoryId: number) => {
  router.push(`/categories/${categoryId}/themes`);
};
</script>

<template>
  <div class="container">
    <h1>📂 Mes Catégories</h1>

    <!-- Formulaire pour ajouter une catégorie -->
    <div class="category-input">
      <input v-model="newCategoryName" placeholder="Nom de la catégorie" />
      <button @click="addCategory">➕ Ajouter</button>
    </div>

    <!-- Liste des catégories -->
    <ul class="category-list">
      <li v-for="category in categories" :key="category.id" class="category-item">
        <span @click="goToThemes(category.id)">{{ category.name }}</span>
        <button @click="deleteCategory(category.id)">🗑️</button>
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

.category-input {
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
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #36996f;
}

.category-list {
  list-style: none;
  padding: 0;
}

.category-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #f3f3f3;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 5px;
}

.category-item span {
  flex: 1;
}

.category-item button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
