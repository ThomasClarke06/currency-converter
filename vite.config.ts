import react from '@vitejs/plugin-react'
import { configDefaults, defineConfig } from 'vitest/config'

// CurrencyBeacon doesn't send CORS headers, so browser requests are proxied
// through the Vite dev server: /api/v1/... -> https://api.currencybeacon.com/v1/...
const apiProxy = {
  '/api': {
    target: 'https://api.currencybeacon.com',
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/api/, ''),
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 3000, proxy: apiProxy },
  preview: { proxy: apiProxy },
    test: { environment: 'jsdom', exclude: [...configDefaults.exclude, 'e2e/**'] },
})
