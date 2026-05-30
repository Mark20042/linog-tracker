<script setup>
import { ref } from "vue";

defineProps({
  earthquakes: {
    type: Array,
    default: () => [],
  },
  activeFilter: {
    type: String,
    default: "today",
  },
});

const emit = defineEmits(["select-quake", "update:activeFilter"]);
const isOpen = ref(true);

function setFilter(newFilter) {
  emit("update:activeFilter", newFilter);
}

function selectQuake(quake) {
  emit("select-quake", quake);
}

const isMobileView = ref(window.innerWidth <= 768);
window.addEventListener("resize", () => {
  isMobileView.value = window.innerWidth <= 768;
});

function toggleSidebar() {
  isOpen.value = !isOpen.value;
}

function getMagColor(mag) {
  if (mag >= 6) return "#ef4444";
  if (mag >= 5) return "#f97316";
  if (mag >= 4) return "#eab308";
  if (mag >= 3) return "#84cc16";
  return "#22d3ee";
}
</script>

<template>
  <div class="sidebar" :class="{ 'is-closed': !isOpen }">
    <button
      class="toggle-btn"
      @click="toggleSidebar"
      :aria-label="isOpen ? 'Close sidebar' : 'Open sidebar'"
    >
      <svg
        v-if="!isMobileView"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2.5"
        stroke="currentColor"
        class="icon"
      >
        <path
          v-if="isOpen"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
        <path
          v-else
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>

      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2.5"
        stroke="currentColor"
        class="icon"
      >
        <path
          v-if="isOpen"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 12l-7.5 7.5-7.5-7.5"
        />
        <path
          v-else
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.5 15.75l7.5-7.5 7.5 7.5"
        />
      </svg>
    </button>

    <div v-if="isOpen" class="sidebar-content">
      <div class="header">
        <h2>Earthquakes</h2>
        <div class="tabs">
          <button
            :class="{ active: activeFilter === 'all' }"
            @click="setFilter('all')"
          >
            All
          </button>
          <button
            :class="{ active: activeFilter === 'today' }"
            @click="setFilter('today')"
          >
            Today
          </button>
          <button
            :class="{ active: activeFilter === 'yesterday' }"
            @click="setFilter('yesterday')"
          >
            Yest
          </button>
          <button
            :class="{ active: activeFilter === 'week' }"
            @click="setFilter('week')"
          >
            Week
          </button>
          <button
            :class="{ active: activeFilter === 'month' }"
            @click="setFilter('month')"
          >
            Month
          </button>
        </div>
      </div>

      <div class="list">
        <div v-if="earthquakes.length === 0" class="empty-state">
          No earthquakes found for this period.
        </div>
        <div
          v-for="eq in earthquakes"
          :key="eq.id"
          class="list-item"
          @click="selectQuake(eq)"
        >
          <div
            class="mag-indicator"
            :style="{ backgroundColor: getMagColor(eq.mag) }"
          >
            {{ eq.mag }}
          </div>
          <div class="info">
            <div class="location">{{ eq.location }}</div>
            <div class="meta">
              <span>{{ eq.dateTime }}</span>
              <span>Depth: {{ eq.depth }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  height: 100%;
  background: var(--card-bg);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: row;
  overflow: hidden;
  position: relative;
  transition: width 0.3s ease;
}

.sidebar.is-closed {
  width: 48px !important;
  min-width: 48px !important;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .sidebar {
    height: auto;
    max-height: 45vh;
    width: 100%;
    border-right: none;
    border-top: 1px solid var(--border-color);
    transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sidebar.is-closed {
    width: 100% !important;
    max-height: 60px !important;
    overflow: hidden;
  }

  .toggle-btn {
    top: 0;
    right: 1rem;
    left: auto;
    width: 40px;
    height: 40px;
    transform: translateY(10px);
    border: 1px solid var(--border-color);
    border-radius: 50%;
    background: var(--bg-panel);
    box-shadow: var(--shadow-sm);
  }

  .sidebar-content {
    padding-top: 5px;
  }

  .header {
    padding: 0.75rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  h2 {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
}

.toggle-btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 24px;
  height: 48px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-right: none;
  border-radius: 0.5rem 0 0 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  color: var(--primary-color);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.05);
}

.toggle-btn:hover {
  background: var(--bg-color);
  color: var(--text-primary);
}

.toggle-btn .icon {
  width: 16px;
  height: 16px;
}

.sidebar-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
}

.header {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}

h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.tabs {
  display: flex;
  gap: 0.25rem;
  background: var(--bg-color);
  padding: 0.25rem;
  border-radius: 0.5rem;
}

.tabs button {
  flex: 1;
  padding: 0.5rem 0.25rem;
  border: none;
  background: transparent;
  border-radius: 0.375rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.tabs button:hover {
  color: var(--text-primary);
  background: var(--border-light);
}

.tabs button.active {
  background: var(--bg-panel);
  color: var(--primary-color);
  border-color: var(--primary-color);
  box-shadow: var(--shadow-sm);
}

.list {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background-color: var(--bg-color);
}

.list-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: var(--bg-panel);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
}

.list-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.mag-indicator {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  margin-right: 1rem;
  flex-shrink: 0;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info {
  flex: 1;
  min-width: 0; /* Allow text truncation */
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.location {
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.95rem;
}

.meta {
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.empty-state {
  padding: 2rem;
  text-align: center;
  color: #94a3b8;
}
</style>
