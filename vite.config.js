import { defineConfig } from 'vite'
import jsconfigPaths    from 'vite-jsconfig-paths'
import react            from '@vitejs/plugin-react'
import define           from  './vite.defs.js'

const NAME   = `badger-icon-tools`
const MODULE = `abw/${NAME}`

export default defineConfig({
  plugins: [
    react(),
    jsconfigPaths()
  ],
  define,
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setup.js',
    include: ['test/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['test/setup.js', 'test/lib', 'test/old']
  },
  build: {
    minify: true,
    sourcemap: false,
    lib: {
      entry: 'lib/index.js',
      name: MODULE,
      fileName: NAME,
    },
    rollupOptions: {
    },
  },
})
