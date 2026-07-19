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

const emit = defineEmits(['toggle-stats']);

function toggle() {
  isOpen.value = !isOpen.value;
  emit('toggle-stats', isOpen.value);
}
</script>

<template>
  <div class="stats-panel" :class="{ 'is-open': isOpen }">
    <button class="toggle-btn" @click="toggle">
      <span class="toggle-icon">{{ isOpen ? '-' : '+' }}</span>
      <span class="toggle-label">{{ isOpen ? "Hide" : "Reports" }}</span>
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
  width: auto;
  background: var(--bg-panel);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  z-index: 1000;
  box-shadow: var(--shadow-lg);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.95);
}

.stats-panel.is-open {
  width: 320px;
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
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.35rem;
}

.toggle-btn:hover {
  text-decoration: underline;
}

.toggle-icon {
  font-size: 1.1rem;
  line-height: 1;
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
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card.today {
  background: rgba(59, 130, 246, 0.08);
  border-color: rgba(59, 130, 246, 0.2);
}

.stat-card.week {
  background: rgba(14, 165, 233, 0.08);
  border-color: rgba(14, 165, 233, 0.2);
}

.stat-card.month {
  background: rgba(99, 102, 241, 0.08);
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
  background: #ef4444;
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

/* Mobile Responsiveness - compact modal card */
@media (max-width: 768px) {
  .stats-panel {
    top: 0.35rem;
    right: 0.35rem;
    width: auto;
    max-width: calc(100% - 0.7rem);
    border-radius: 0.5rem;
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-sm);
  }

  .stats-panel.is-open {
    width: 220px;
    padding: 0.5rem;
  }

  .toggle-btn {
    padding: 0.25rem 0.4rem;
    font-size: 0.65rem;
    gap: 0.2rem;
  }

  .toggle-icon {
    font-size: 0.8rem;
  }

  .content h2 {
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
    padding-bottom: 0.35rem;
  }

  .stat-grid {
    gap: 0.3rem;
    margin-bottom: 0.5rem;
  }

  .stat-card {
    padding: 0.35rem 0.25rem;
    border-radius: 0.3rem;
  }

  .label {
    font-size: 0.5rem;
    margin-bottom: 0.1rem;
  }

  .value {
    font-size: 1rem;
  }

  .latest-eq {
    margin-top: 0.5rem;
    padding: 0.5rem 0.4rem;
    margin-bottom: 0;
  }

  .latest-header {
    margin-bottom: 0.25rem;
  }

  .latest-eq h3 {
    font-size: 0.55rem;
  }

  .location {
    font-size: 0.7rem;
    margin-bottom: 0.3rem;
  }

  .details {
    font-size: 0.6rem;
  }

  .mag {
    padding: 0.1rem 0.4rem;
    font-size: 0.6rem;
  }

  .ping {
    width: 5px;
    height: 5px;
  }
}
</style>