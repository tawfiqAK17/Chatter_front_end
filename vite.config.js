import { defineConfig } from "vite"
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Listen on all available network interfaces
    port: 5173, // You can change this to any port you prefer
  },
})
