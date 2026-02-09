import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [vue(), cssInjectedByJsPlugin()],
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    lib: {
      entry: 'src/main.js',
      name: 'Digital35MeinFahrzeugshopSuche',
      formats: ['iife'],
      // ważne: bez ".js" (Vite sam doda)
      fileName: 'digital35-meinfahrzeugshop-suche',
    },
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
})
