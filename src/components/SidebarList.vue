<script setup>
import { ref } from "vue";

const props = defineProps({
  earthquakes: {
    type: Array,
    default: () => [],
  },
  activeFilter: {
    type: String,
    default: "today",
  },
  open: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["select-quake", "update:activeFilter", "update:open"]);

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
  emit("update:open", !props.open);
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
  <div class="sidebar" :class="{ 'is-closed': !open }">


    <div v-if="open || isMobileView" class="sidebar-content">
      <div class="header">
        <h2 v-if="open">Earthquakes</h2>
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

      <div v-if="open || isMobileView" class="list">
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
  width: 0 !important;
  min-width: 0 !important;
  border: none;
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
  min-width: 0;
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

/* ====== Mobile: fixed bottom sheet ====== */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: auto;
    width: 100% !important;
    min-width: 100% !important;
    border-right: none;
    border-radius: 12px 12px 0 0;
    border: 1px solid var(--border-color);
    border-bottom: none;
    box-shadow: 0 -2px 16px rgba(0, 0, 0, 0.12);
    background: var(--bg-panel);
    z-index: 1000;
    max-height: 40vh;
    transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    flex-direction: column;
    overflow: hidden;
  }

  .sidebar.is-closed {
    max-height: 0 !important;
    overflow: hidden;
    border: none;
  }

  .sidebar-content {
    padding-top: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 0;
  }

  .header {
    padding: 0.35rem 0.6rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-shrink: 0;
    border-bottom: 1px solid var(--border-color);
    gap: 0.4rem;
  }

  h2 {
    margin-bottom: 0;
    margin-right: 0;
    font-size: 0.7rem;
    white-space: nowrap;
  }

  .tabs {
    flex: 1;
    padding: 0.15rem;
    gap: 0.15rem;
  }

  .tabs button {
    font-size: 0.6rem;
    padding: 0.2rem 0.1rem;
  }

  .list {
    flex: 1;
    overflow-y: auto;
    padding: 0.35rem 0.5rem;
    gap: 0.35rem;
    -webkit-overflow-scrolling: touch;
  }

  .list-item {
    padding: 0.4rem 0.5rem;
    border-radius: 0.375rem;
  }

  .list-item:hover {
    transform: none;
  }

  .mag-indicator {
    width: 1.75rem;
    height: 1.75rem;
    font-size: 0.7rem;
    margin-right: 0.5rem;
  }

  .info {
    gap: 0.1rem;
  }

  .location {
    font-size: 0.75rem;
  }

  .meta {
    font-size: 0.6rem;
    flex-direction: row;
    gap: 0.5rem;
  }

  .empty-state {
    padding: 1rem;
    font-size: 0.75rem;
  }
}
</style>