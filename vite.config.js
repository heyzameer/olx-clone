import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // 👈 Output to "build" instead of "dist"
    chunkSizeWarningLimit: 1000, // 👈 Optional: silence large chunk warning
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 👇 Split vendor code from app code
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0];
          }
        }
      }
    }
  }
})
