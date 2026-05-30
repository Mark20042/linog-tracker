import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api/phivolcs': {
        target: 'https://earthquake.phivolcs.dost.gov.ph',
        changeOrigin: true,
        secure: false, // This ignores the SSL certificate error
        rewrite: (path) => path.replace(/^\/api\/phivolcs/, '')
      }
    }
  }
})
