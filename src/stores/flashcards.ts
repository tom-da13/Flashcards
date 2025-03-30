import { defineStore } from "pinia";

export const useFlashcardStore = defineStore("flashcards", {
  state: () => ({
    categories: [],
    themes: [],
    flashcards: [],
  }),
  actions: {
    addCategory(name: string) {
      this.categories.push({ id: Date.now(), name });
    },
    addTheme(categoryId: number, name: string) {
      this.themes.push({ id: Date.now(), categoryId, name });
    },
    addFlashcard(themeId: number, front: string, back: string) {
      this.flashcards.push({ id: Date.now(), themeId, front, back });
    },
  },
});
