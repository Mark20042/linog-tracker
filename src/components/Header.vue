<script setup>
defineProps({
  refreshing: {
    type: Boolean,
    default: false,
  },
  lastUpdated: {
    type: Date,
    default: null,
  },
});

defineEmits(["refresh"]);

function formatLastUpdated(value) {
  if (!value) return "Not updated yet";

  return new Intl.DateTimeFormat("en-PH", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(value);
}
</script>

<template>
  <header class="app-header">
    <div class="brand">
      <div class="logo-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="icon"
        >
          <path
            fill-rule="evenodd"
            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <h1>Philippines Linog Tracker</h1>
    </div>
    <div class="header-actions">
      <div class="refresh-meta">
        <span class="refresh-label">Last updated</span>
        <span class="refresh-time">{{ formatLastUpdated(lastUpdated) }}</span>
      </div>

      <button
        class="refresh-button"
        :disabled="refreshing"
        @click="$emit('refresh')"
      >
        <span v-if="refreshing" class="refresh-icon spinning">↻</span>
        <span v-else class="refresh-icon">↻</span>
        {{ refreshing ? "Refreshing..." : "Refresh" }}
      </button>

      <div class="dev-credit">
        <span>Developed by</span>
        <span class="dev-name">AzoreDev</span>
      </div>

      <div class="source-credit">
        <span>Data source</span>
        <a
          href="https://earthquake.phivolcs.dost.gov.ph/"
          target="_blank"
          rel="noreferrer"
        >
          PHIVOLCS
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.875rem 1.5rem;
  background: var(--text-primary); /* Deep Navy/Slate background */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
  z-index: 50;
  gap: 1rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  color: #ef4444; /* Standardized red accent for logo */
  width: 24px;
  height: 24px;
}

.icon {
  width: 100%;
  height: 100%;
}

h1 {
  font-size: 1.25rem;
  font-weight: 800;
  color: #ffffff; /* White text for dark header */
  letter-spacing: -0.025em;
  margin: 0;
}

.dev-credit {
  font-size: 0.875rem;
  color: #94a3b8; /* Lighter slate for dark bg */
  display: flex;
  gap: 0.35rem;
  align-items: center;
}

.source-credit {
  font-size: 0.8rem;
  color: #cbd5e1;
  display: flex;
  gap: 0.35rem;
  align-items: center;
}

.source-credit a {
  color: #f8fafc;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.refresh-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.15rem;
}

.refresh-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
}

.refresh-time {
  font-size: 0.875rem;
  color: #e2e8f0;
}

.refresh-button {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    background 0.15s ease,
    opacity 0.15s ease;
}

.refresh-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.14);
  transform: translateY(-1px);
}

.refresh-button:disabled {
  cursor: wait;
  opacity: 0.75;
}

.refresh-icon {
  display: inline-block;
  font-size: 0.95rem;
}

.spinning {
  animation: spin 0.85s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.dev-name {
  font-weight: 700;
  color: #38bdf8; /* Lighter, vibrant blue for dark bg */
  background: rgba(56, 189, 248, 0.15);
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  border: 1px solid rgba(56, 189, 248, 0.2);
}

/* Mobile Responsiveness */
@media (max-width: 640px) {
  .app-header {
    padding: 0.75rem 1rem;
    align-items: flex-start;
    flex-direction: column;
  }

  h1 {
    font-size: 1rem;
  }

  .header-actions {
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    gap: 0.6rem;
  }

  .refresh-meta {
    align-items: flex-start;
  }

  .refresh-button {
    width: 100%;
    justify-content: center;
    padding: 0.7rem 1rem;
  }

  .dev-credit {
    font-size: 0.75rem;
    justify-content: center;
    width: 100%;
  }

  .source-credit {
    justify-content: center;
    width: 100%;
  }
}
</style>
