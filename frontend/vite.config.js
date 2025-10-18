import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // Listen on all network interfaces (enables access from other devices)
    port: 5173,
    strictPort: true   // Don't try other ports if 5173 is busy
  }
})
