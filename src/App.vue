<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { PhivolcsService } from "./services/PhivolcsService";
import MapContainer from "./components/MapContainer.vue";
import StatsPanel from "./components/StatsPanel.vue";
import SidebarList from "./components/SidebarList.vue";
import MapLegend from "./components/MapLegend.vue";
import Header from "./components/Header.vue";

const earthquakes = ref([]);
const loading = ref(true);
const refreshing = ref(false);
const error = ref(null);
const mapRef = ref(null);
const currentFilter = ref("today");
const lastUpdated = ref(null);
const sidebarOpen = ref(true);
const statsPanelOpen = ref(true);
const windowWidth = ref(window.innerWidth);

const isMobile = computed(() => windowWidth.value <= 768);
const showLegend = computed(() => {
  if (isMobile.value) return !statsPanelOpen.value;
  return true;
});

function onResize() {
  windowWidth.value = window.innerWidth;
}

onMounted(() => {
  window.addEventListener("resize", onResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});

const filteredEarthquakes = computed(() => {
  const now = new Date();
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).getTime();
  const yesterdayStart = todayStart - 24 * 60 * 60 * 1000;
  const weekStart = now.getTime() - 7 * 24 * 60 * 60 * 1000;
  const monthStart = now.getTime() - 30 * 24 * 60 * 60 * 1000;

  return earthquakes.value.filter((eq) => {
    const dateStr = eq.dateTime.replace(" - ", " ");
    const eqTime = new Date(dateStr).getTime();

    if (isNaN(eqTime)) return false;

    if (currentFilter.value === "today") {
      return eqTime >= todayStart;
    } else if (currentFilter.value === "yesterday") {
      return eqTime >= yesterdayStart && eqTime < todayStart;
    } else if (currentFilter.value === "week") {
      return eqTime >= weekStart;
    } else if (currentFilter.value === "month") {
      return eqTime >= monthStart;
    }
    return true;
  });
});

onMounted(async () => {
  await loadEarthquakes();
});

async function loadEarthquakes() {
  const isInitialLoad = loading.value;

  if (!isInitialLoad) {
    refreshing.value = true;
  }

  try {
    earthquakes.value = await PhivolcsService.getEarthquakes();
    error.value = null;
    lastUpdated.value = new Date();
  } catch (e) {
    error.value = "Failed to load data. Please try again later.";
    console.error(e);
  } finally {
    loading.value = false;
    refreshing.value = false;
  }
}

function handleRefresh() {
  loadEarthquakes();
}

function handleQuakeSelect(quake) {
  if (mapRef.value) {
    mapRef.value.focusQuake(quake);
  }
}

function handleStatsToggle(open) {
  statsPanelOpen.value = open;
}
</script>

<template>
  <div class="app-container">
    <Header
      :refreshing="refreshing"
      :last-updated="lastUpdated"
      @refresh="handleRefresh"
      @toggle-sidebar="sidebarOpen = !sidebarOpen"
    />

    <div class="main-content">
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
        <p>Loading Seismic Data...</p>
      </div>

      <div v-else-if="error" class="error-overlay">
        <p>{{ error }}</p>
        <button @click="location.reload()">Retry</button>
      </div>

      <template v-else>
        <SidebarList
          :earthquakes="filteredEarthquakes"
          v-model:activeFilter="currentFilter"
          v-model:open="sidebarOpen"
          @select-quake="handleQuakeSelect"
          class="sidebar-container"
        />

        <div class="map-wrapper">
          <MapContainer ref="mapRef" :earthquakes="filteredEarthquakes" />
          <StatsPanel
            :earthquakes="earthquakes"
            @toggle-stats="handleStatsToggle"
          />
          <MapLegend :visible="showLegend" />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background: var(--bg-color);
  overflow: hidden;
}

.main-content {
  display: flex;
  flex: 1;
  position: relative;
  overflow: hidden;
}

.sidebar-container {
  width: 350px;
  flex-shrink: 0;
  z-index: 20;
}

.map-wrapper {
  flex-grow: 1;
  position: relative;
}

.loading-overlay,
.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--bg-color);
  z-index: 2000;
  color: var(--text-primary);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--border-color);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s cubic-bezier(0.55, 0.15, 0.45, 0.85) infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: var(--primary-color);
  border: none;
  border-radius: 0.25rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

/* Mobile */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }

  .sidebar-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100% !important;
    min-width: 100% !important;
    height: auto;
    flex-shrink: 0;
    z-index: 1000;
    pointer-events: auto;
  }

  .map-wrapper {
    flex: 1;
    min-height: 0;
    position: relative;
  }
}
</style>