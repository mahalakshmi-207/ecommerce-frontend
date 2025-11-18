import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'src', 
  build: {
    outDir: '../dist', 
    emptyOutDir: true, 
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', //  backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
})