import { defineConfig } from 'vite'
// import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: false,
    https: undefined,
    open: true,
    proxy: {
      // forward /api to your backend
      '/api/hotels': {
      // '/api/tbo_hotel': {
        target: 'https://demo.taxivaxi.com',
        // target: 'https://demo.fleet247.in',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
      
      '/api/flights/employeeByTaxivaxi': {
        target: 'https://demo.taxivaxi.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
      },
    },
  },

    build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },

  //  test: {
  //   globals: true,
  //   environment: 'jsdom',
  //   setupFiles: ['./src/tests/setup/test-setup.ts'],
  //   css: true,
  // },
})
