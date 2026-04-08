import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/AAAgame-AI201/',
  plugins: [react(), tailwindcss()],
})
