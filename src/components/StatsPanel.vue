<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  earthquakes: {
    type: Array,
    default: () => [],
  },
});

const isOpen = ref(true);

const stats = computed(() => {
  const now = new Date();
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).getTime();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).getTime();
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).getTime();

  let todayCount = 0;
  let weekCount = 0;
  let monthCount = 0;
  let latest = null;

  props.earthquakes.forEach((eq) => {
    const dateStr = eq.dateTime.replace(" - ", " ");
    const eqDate = new Date(dateStr).getTime();

    if (!isNaN(eqDate)) {
      if (eqDate >= today) todayCount++;
      if (eqDate >= weekAgo) weekCount++;
      if (eqDate >= monthAgo) monthCount++;

      if (
        !latest ||
        eqDate > new Date(latest.dateTime.replace(" - ", " ")).getTime()
      ) {
        latest = eq;
      }
    }
  });

  return { todayCount, weekCount, monthCount, latest };
});

function toggle() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div class="stats-panel" :class="{ 'is-open': isOpen }">
    <button class="toggle-btn" @click="toggle">
      {{ isOpen ? "Hide Reports" : "Show Reports" }}
    </button>

    <div v-if="isOpen" class="content">
      <h2>Earthquake Reports</h2>

      <div class="stat-grid">
        <div class="stat-card today">
          <span class="label">Today</span>
          <span class="value">{{ stats.todayCount }}</span>
        </div>
        <div class="stat-card week">
          <span class="label"> Week</span>
          <span class="value">{{ stats.weekCount }}</span>
        </div>
        <div class="stat-card month">
          <span class="label"> Month</span>
          <span class="value">{{ stats.monthCount }}</span>
        </div>
      </div>

      <div v-if="stats.latest" class="latest-eq">
        <div class="latest-header">
          <h3>Latest Event</h3>
          <span class="ping"></span>
        </div>
        <p class="location">{{ stats.latest.location }}</p>
        <div class="details">
          <span class="mag">M {{ stats.latest.mag }}</span>
          <span class="time">{{ stats.latest.dateTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-panel {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 320px;
  background: var(--bg-panel);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  z-index: 1000; /* Above map */
  box-shadow: var(--shadow-lg);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.95);
}

.stats-panel.is-open {
  padding: 1rem;
}

.toggle-btn {
  width: 100%;
  background: transparent;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-weight: 600;
  padding: 0.5rem;
  text-align: right;
  font-size: 0.875rem;
}

.toggle-btn:hover {
  text-decoration: underline;
}

.content h2 {
  margin-bottom: 1.25rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-light);
  padding-bottom: 0.75rem;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0.5rem;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.stat-card.today {
  background: rgba(59, 130, 246, 0.08); /* Primary blue tint */
  border-color: rgba(59, 130, 246, 0.2);
}

.stat-card.week {
  background: rgba(14, 165, 233, 0.08); /* Light blue/cyan tint */
  border-color: rgba(14, 165, 233, 0.2);
}

.stat-card.month {
  background: rgba(99, 102, 241, 0.08); /* Indigo tint */
  border-color: rgba(99, 102, 241, 0.2);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
  border-color: var(--primary-color);
}

.label {
  font-size: 0.7rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.value {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--primary-color);
  line-height: 1;
}

.latest-eq {
  margin-top: 1.5rem;
  border-top: 1px solid var(--border-light);
  padding: 1.25rem 1rem;
  background: var(--bg-color);
  border-radius: var(--radius-md);
  margin-bottom: 0.5rem;
}

.latest-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.latest-eq h3 {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
  margin: 0;
}

.location {
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
  font-size: 0.95rem;
  line-height: 1.3;
}

.details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.mag {
  background: #ef4444; /* Standardized red accent for latest mag */
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.8rem;
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
}

.ping {
  width: 8px;
  height: 8px;
  background-color: #ef4444;
  border-radius: 50%;
  position: relative;
}

.ping::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ef4444;
  border-radius: 50%;
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
  opacity: 0.7;
}

@keyframes ping {
  75%,
  100% {
    transform: scale(3);
    opacity: 0;
  }
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .stats-panel {
    top: auto;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    border: none;
    border-top: 1px solid var(--border-color);
    box-shadow: 0 -4px 10px -1px rgba(0, 0, 0, 0.1);
  }

  .toggle-btn {
    text-align: center;
    padding: 0.75rem;
    background: var(--bg-panel);
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  }
}
</style>
