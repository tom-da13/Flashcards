<script setup lang="ts">
import { ref } from "vue";

// Définir les variables et les méthodes
const showBack = ref(false);

const flashcards = ref<{ id: number; front: string; back: string }[]>([
  { id: 1, front: "Question 1", back: "Réponse 1" },
  { id: 2, front: "Question 2", back: "Réponse 2" },
]);

const currentIndex = ref(0);

// Méthode pour retourner la carte
const flipCard = () => {
  showBack.value = !showBack.value;
};

const nextCard = () => {
  if (currentIndex.value < flashcards.value.length - 1) {
    currentIndex.value++;
    showBack.value = false;
  }
};

const prevCard = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    showBack.value = false;
  }
};
</script>

<template>
  <div class="flashcards-container">
    <h1>Révision</h1>

    <div v-if="flashcards.length > 0">
      <!-- Affichage de la carte actuelle -->
      <div class="card" @click="flipCard">
        <p v-if="!showBack">{{ flashcards[currentIndex].front }}</p>
        <p v-else>{{ flashcards[currentIndex].back }}</p>
      </div>

      <div class="navigation">
        <button @click="prevCard" :disabled="currentIndex === 0">← Précédente</button>
        <button @click="nextCard" :disabled="currentIndex === flashcards.length - 1">Suivante →</button>
      </div>
    </div>

    <p v-else>🚨 Aucune carte disponible pour ce thème.</p>
  </div>
</template>
