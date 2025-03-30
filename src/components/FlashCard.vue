<script setup lang="ts">
import { ref } from "vue";

// Définir les props attendues pour le composant Flashcard
defineProps({
  card: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  totalCards: {
    type: Number,
    required: true
  }
});

// Propriété locale pour savoir si la carte est retournée
const flipped = ref(false);

// Fonction pour inverser l'état de la carte (recto/verso)
const flipCard = () => {
  flipped.value = !flipped.value;
};
</script>

<template>
  <div class="flashcard" @click="flipCard">
    <div v-if="!flipped">
      <!-- Affichage du recto -->
      <p>{{ card.front }}</p>
    </div>
    <div v-else>
      <!-- Affichage du verso -->
      <p>{{ card.back }}</p>
    </div>
  </div>
</template>

<style scoped>
.flashcard {
  width: 300px;
  height: 200px;
  margin: 20px;
  padding: 20px;
  background: #f9f9f9;
  border: 2px solid #ccc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
