import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,                    // Habilita las funciones globales de Vitest
    environment: 'jsdom',             // Configura jsdom como entorno para pruebas de React 
    setupFiles: './src/setupTest.js', // Archivo para configuraciones iniciales
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
  },
})
