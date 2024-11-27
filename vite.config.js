import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [
    react(),
    eslint()
  ],
  build: {
    terserOptions: {
      compress: {
        drop_console: false
      }
    }
  }
})