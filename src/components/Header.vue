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

defineEmits(["refresh", "toggle-sidebar"]);

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
    <div class="brand-container">
      <button class="hamburger-btn" @click="$emit('toggle-sidebar')" aria-label="Toggle Sidebar">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
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
        <svg
          class="refresh-icon"
          :class="{ spinning: refreshing }"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
          />
        </svg>
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
  background: var(--text-primary);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
  z-index: 50;
  gap: 1rem;
  flex-shrink: 0;
}

.brand-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.hamburger-btn {
  background: transparent;
  border: none;
  color: #e2e8f0;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  transition: background 0.2s;
}

.hamburger-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.hamburger-btn .icon {
  width: 24px;
  height: 24px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  color: #ef4444;
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
  color: #ffffff;
  letter-spacing: -0.025em;
  margin: 0;
}

.dev-credit {
  font-size: 0.875rem;
  color: #94a3b8;
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
  transition: transform 0.15s ease, background 0.15s ease, opacity 0.15s ease;
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
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
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
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.15);
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  border: 1px solid rgba(56, 189, 248, 0.2);
}

/* Mobile Responsiveness */
@media (max-width: 640px) {
  .app-header {
    padding: 0.4rem 0.5rem;
    flex-direction: row;
    gap: 0.4rem;
    flex-wrap: nowrap;
  }

  .brand {
    gap: 0.35rem;
    flex-shrink: 1;
    min-width: 0;
  }

  .logo-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  h1 {
    font-size: 0.75rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header-actions {
    gap: 0.35rem;
    flex-wrap: nowrap;
    flex-shrink: 0;
  }

  .refresh-meta {
    display: none;
  }

  .refresh-button {
    padding: 0.3rem 0.5rem;
    font-size: 0.65rem;
    gap: 0.2rem;
  }

  .refresh-icon {
    width: 0.85rem;
    height: 0.85rem;
  }

  .dev-credit {
    font-size: 0.6rem;
    gap: 0.15rem;
  }

  .dev-credit span:first-child {
    font-size: 0;
  }

  .dev-credit span:first-child::before {
    content: "Dev ";
    font-size: 0.55rem;
    color: #94a3b8;
  }

  .dev-name {
    font-size: 0.58rem;
    padding: 0.1rem 0.3rem;
  }

  .source-credit {
    display: none;
  }
}
</style>