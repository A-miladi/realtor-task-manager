import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import dynamicImport from 'vite-plugin-dynamic-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dynamicImport()],
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
  },

  define: {
    __APP_ENV__: JSON.stringify(process.env.NODE_ENV),
  },
})
