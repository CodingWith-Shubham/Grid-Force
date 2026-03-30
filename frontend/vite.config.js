import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: false,
    allowedHosts: ['sb-6eqdz8516iqm.vercel.run', 'localhost', '127.0.0.1']
  }
})
