/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enables global test APIs like `describe`, `it`, etc.
    environment: 'jsdom', // Simulates the DOM for React components
  },
})
