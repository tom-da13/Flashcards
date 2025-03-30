<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

// Paramètres stockés
const newCardsPerDay = ref(10); // Nombre de nouvelles cartes par jour
const maxLevels = ref(5); // Nombre de niveaux de révision
const notificationsEnabled = ref(false); // Notifications activées/désactivées

// Charger les paramètres au montage du composant
onMounted(() => {
  const savedSettings = JSON.parse(localStorage.getItem("settings") || "{}");
  if (savedSettings.newCardsPerDay) newCardsPerDay.value = savedSettings.newCardsPerDay;
  if (savedSettings.maxLevels) maxLevels.value = savedSettings.maxLevels;
  if (savedSettings.notificationsEnabled !== undefined) notificationsEnabled.value = savedSettings.notificationsEnabled;
});

// Sauvegarde automatique en localStorage à chaque modification
watch([newCardsPerDay, maxLevels, notificationsEnabled], () => {
  localStorage.setItem(
    "settings",
    JSON.stringify({
      newCardsPerDay: newCardsPerDay.value,
      maxLevels: maxLevels.value,
      notificationsEnabled: notificationsEnabled.value,
    })
  );
});

// Demander la permission pour les notifications
const requestNotificationPermission = () => {
  if (!("Notification" in window)) {
    alert("Les notifications ne sont pas supportées par votre navigateur.");
    return;
  }

  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      notificationsEnabled.value = true;
      localStorage.setItem("settings", JSON.stringify({ ...JSON.parse(localStorage.getItem("settings") || "{}"), notificationsEnabled: true }));
    } else {
      notificationsEnabled.value = false;
    }
  });
};
</script>

<template>
  <div class="container">
    <h1>⚙️ Paramètres</h1>

    <div class="setting">
      <label>📅 Nouvelles cartes par jour :</label>
      <input type="number" v-model="newCardsPerDay" min="1" max="50" />
    </div>

    <div class="setting">
      <label>📊 Nombre de niveaux :</label>
      <input type="number" v-model="maxLevels" min="1" max="10" />
    </div>

    <div class="setting">
      <label>🔔 Notifications :</label>
      <input type="checkbox" v-model="notificationsEnabled" @change="requestNotificationPermission" />
    </div>

    <p class="info">Les paramètres sont sauvegardés automatiquement.</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: 20px auto;
  text-align: center;
}
.setting {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  background: #f3f3f3;
  padding: 10px;
  border-radius: 5px;
}
input[type="number"] {
  width: 60px;
  text-align: center;
}
input[type="checkbox"] {
  transform: scale(1.2);
}
.info {
  font-size: 0.9rem;
  color: #666;
  margin-top: 10px;
}
</style>
