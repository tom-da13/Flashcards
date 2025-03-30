import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CategoriesView from "@/views/CategoriesView.vue";
import ThemesView from "@/views/ThemesView.vue";
import FlashcardsView from "@/views/FlashcardsView.vue";
import AboutView from "@/views/AboutView.vue";
import SettingsView from "@/views/SettingsView.vue";
import AddFlashcardView from "@/views/AddFlashcardView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/categories", component: CategoriesView },
  { path: "/categories/:categoryId/themes", component: ThemesView },
  { path: "/categories/:categoryId/themes/:themeId/flashcards", component: FlashcardsView },
  { path: "/categories/:categoryId/themes/:themeId/add-flashcard", component: AddFlashcardView },
  { path: "/settings", component: SettingsView },
  { path: "/about", component: AboutView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
