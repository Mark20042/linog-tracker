<script setup>
const legendItems = [
  { label: 'Mag 6+', color: '#ef4444' },
  { label: 'Mag 5-5.9', color: '#f97316' },
  { label: 'Mag 4-4.9', color: '#eab308' },
  { label: 'Mag 3-3.9', color: '#84cc16' },
  { label: 'Mag < 3', color: '#22d3ee' }
];
</script>

<template>
  <div class="legend">
    <h3>Magnitude</h3>
    <div v-for="item in legendItems" :key="item.label" class="legend-item">
      <span class="color-box" :style="{ backgroundColor: item.color }"></span>
      <span class="label">{{ item.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.legend {
  position: absolute;
  bottom: 2rem;
  left: 1rem;
  background: var(--bg-panel);
  padding: 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md);
  z-index: 1000;
  font-size: 0.875rem;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.90);
}

.legend h3 {
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: var(--text-primary);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
}

.color-box {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  margin-right: 0.75rem;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}

.label {
  color: var(--text-secondary);
  font-weight: 500;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .legend {
    padding: 0.5rem;
    bottom: 1rem;
    left: 0.5rem;
    border-radius: 0.375rem;
  }

  .legend h3 {
    margin-bottom: 0.25rem;
    font-size: 0.7rem;
    letter-spacing: 0;
  }

  .legend-item {
    margin-bottom: 0.15rem;
  }

  .color-box {
    width: 0.75rem;
    height: 0.75rem;
    margin-right: 0.5rem;
  }

  .label {
    font-size: 0.7rem;
  }
}
</style>
