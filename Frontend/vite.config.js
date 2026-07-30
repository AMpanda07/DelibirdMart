import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dns from 'dns' // 1. Add this import

// 2. Force Vite to explicitly use localhost
dns.setDefaultResultOrder('verbatim') 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: false,
    host: 'localhost', // 3. Explicitly define the host
  }
})