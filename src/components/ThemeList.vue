<script setup lang="ts">
import { ref } from 'vue';

// Définir le type de thème
interface Theme {
  id: number;
  name: string;
  cards: { id: number; question: string; answer: string; showBack: boolean }[];
}

// Définir les props passées depuis HomeView.vue
const props = defineProps<{
  categoryId: number;
  themes: Theme[]; // Typage de themes comme un tableau d'objets Theme
}>();

// Définir les événements
const emit = defineEmits(['theme-selected', 'add-card', 'delete-card']);

// Variable pour garder la carte ajoutée
const newCard = ref({ question: '', answer: '' });

// Fonction pour ajouter une carte
const addCard = (themeId: number) => {
  if (newCard.value.question && newCard.value.answer) {
    emit('add-card', { themeId, ...newCard.value });
    newCard.value = { question: '', answer: '' }; // Réinitialiser
  }
};

// Fonction pour supprimer une carte
const deleteCard = (themeId: number, cardId: number) => {
  emit('delete-card', { themeId, cardId });
};
</script>

<template>
  <div>
    <ul>
      <li v-for="theme in props.themes" :key="theme.id">
        <div @click="() => emit('theme-selected', theme.id)">
          {{ theme.name }}
        </div>

        <!-- Interface pour ajouter des cartes -->
        <div>
          <input v-model="newCard.question" placeholder="Question (recto)" />
          <input v-model="newCard.answer" placeholder="Réponse (verso)" />
          <button @click="addCard(theme.id)">Ajouter une carte</button>
        </div>

        <!-- Liste des cartes pour chaque thème -->
        <div>
          <ul>
            <li v-for="(card, index) in theme.cards" :key="card.id">
              <span>{{ card.question }} - {{ card.answer }}</span>
              <button @click="deleteCard(theme.id, card.id)">Supprimer</button>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
