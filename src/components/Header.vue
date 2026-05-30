<script setup></script>

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
    <div class="dev-credit">
      <span>Developed by</span>
      <span class="dev-name">AzoreDev</span>
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
  }

  h1 {
    font-size: 1rem;
  }

  .dev-credit {
    font-size: 0.75rem;
  }
}
</style>
