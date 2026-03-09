import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  root: '.',
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'data',
          dest: ''
        },
        {
          src: 'images',
          dest: ''
        }
      ]
    })
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: 'index.html'
    }
  }
})