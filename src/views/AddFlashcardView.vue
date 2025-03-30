<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

// Récupérer l'ID du thème depuis l'URL
const route = useRoute();
const themeId = Number(route.params.themeId) || 0;

// Inputs de la nouvelle carte
const frontText = ref("");
const backText = ref("");

// Ajouter une carte
const addFlashcard = () => {
  if (!frontText.value.trim() || !backText.value.trim()) return;

  const newCard = { id: Date.now(), themeId, front: frontText.value, back: backText.value };

  const savedFlashcards = JSON.parse(localStorage.getItem("flashcards") || "[]");
  localStorage.setItem("flashcards", JSON.stringify([...savedFlashcards, newCard]));

  frontText.value = "";
  backText.value = "";
};
</script>

<template>
  <div class="container">
    <h1>➕ Ajouter une carte</h1>
    <input v-model="frontText" placeholder="Texte du recto" />
    <input v-model="backText" placeholder="Texte du verso" />
    <button @click="addFlashcard">💾 Ajouter</button>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  max-width: 400px;
  margin: auto;
}
input {
  display: block;
  margin: 10px auto;
  padding: 8px;
  width: 80%;
}
button {
  padding: 10px;
  background: #42b883;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
