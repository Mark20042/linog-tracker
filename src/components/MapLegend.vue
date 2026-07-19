<script setup>
import { ref } from "vue";

defineProps({
  visible: {
    type: Boolean,
    default: true,
  },
});

const isOpen = ref(true);

function toggle() {
  isOpen.value = !isOpen.value;
}

const legendItems = [
  { label: 'Mag 6+', color: '#ef4444' },
  { label: 'Mag 5-5.9', color: '#f97316' },
  { label: 'Mag 4-4.9', color: '#eab308' },
  { label: 'Mag 3-3.9', color: '#84cc16' },
  { label: 'Mag < 3', color: '#22d3ee' }
];
</script>

<template>
  <div v-if="visible" class="legend" :class="{ collapsed: !isOpen }">
    <button v-if="!isOpen" class="legend-toggle" @click="toggle" aria-label="Show legend">
      <span class="legend-toggle-icon">+</span>
      <span class="legend-toggle-label">Legend</span>
    </button>
    <div v-if="isOpen" class="legend-body">
      <div class="legend-header">
        <h3>Magnitude</h3>
       
      </div>
      <div v-for="item in legendItems" :key="item.label" class="legend-item">
        <span class="color-box" :style="{ backgroundColor: item.color }"></span>
        <span class="label">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.legend {
  position: absolute;
  bottom: 2rem;
  left: 1rem;
  background: var(--bg-panel);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md);
  z-index: 1001;
  font-size: 0.875rem;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.90);
  min-width: 120px;
}

.legend.collapsed {
  padding: 0.35rem 0.5rem;
}

.legend-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  background: transparent;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.8rem;
  padding: 0.3rem 0.5rem;
}

.legend-toggle:hover {
  color: var(--text-primary);
}

.legend-toggle-icon {
  font-size: 1rem;
  line-height: 1;
}

.legend-toggle-label {
  font-size: 0.7rem;
}

.legend-body {
  padding: 0.75rem;
}

.legend-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.legend-header h3 {
  margin: 0;
  font-size: 0.8rem;
  color: var(--text-primary);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.legend-close {
  background: transparent;
  border: none;
  font-size: 1.25rem;
  line-height: 1;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.legend-close:hover {
  color: var(--text-primary);
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.2rem;
}

.color-box {
  width: 0.85rem;
  height: 0.85rem;
  border-radius: 50%;
  margin-right: 0.6rem;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}

.label {
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.8rem;
}

/* Mobile: Position at TOP */
@media (max-width: 768px) {
  .legend {
    top: 0.35rem;
    bottom: auto;
    left: 0.35rem;
    right: auto;
    border-radius: var(--radius-md);
    min-width: auto;
  }

  .legend.collapsed {
    padding: 0.25rem 0.4rem;
  }

  .legend-toggle {
    font-size: 0.7rem;
    padding: 0.2rem 0.35rem;
  }

  .legend-toggle-icon {
    font-size: 0.85rem;
  }

  .legend-toggle-label {
    font-size: 0.65rem;
  }

  .legend-body {
    padding: 0.5rem;
  }

  .legend-header {
    margin-bottom: 0.3rem;
  }

  .legend-header h3 {
    font-size: 0.65rem;
  }

  .legend-item {
    margin-bottom: 0.1rem;
  }

  .color-box {
    width: 0.65rem;
    height: 0.65rem;
    margin-right: 0.4rem;
  }

  .label {
    font-size: 0.65rem;
  }
}
</style>