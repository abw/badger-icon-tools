import { defineConfig } from 'vite'
import jsconfigPaths    from 'vite-jsconfig-paths'
import react            from '@vitejs/plugin-react'
import define           from  './vite.defs.js'
import copy             from 'rollup-plugin-copy'

const MODULE_NAME = `badger-icon-tools`
const MODULE_DIST = `@abw/${MODULE_NAME}`

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
      name: MODULE_DIST,
      fileName: MODULE_NAME,
    },
    rollupOptions: {
      external: [
        '@abw/badger',
        '@abw/badger-filesystem',
        '@abw/badger-codecs',
        '@abw/badger-utils',
        'node:crypto',
      ],
      output: {
        globals: {
          '@abw/badger': 'badger',
          '@abw/badger-utils': 'badgerUtils',
          '@abw/badger-filesystem': 'badgerFilesystem',
          '@abw/badger-codecs': 'badgerCodecs',
          'node:crypto': 'crypto'
        },
      },
      plugins: [
        copy({
          targets: [
            {
              src: 'styles/*',
              dest: 'dist/styles',
            },
            {
              src: 'bin/badger-icon-tools.js',
              dest: 'dist/bin',
              transform: (contents) =>
                contents
                  .toString()
                  .replace(
                    "'MODULE_VERSION'",
                    define.MODULE_VERSION
                  )
                  .replace(
                    '../lib/index.js',
                    MODULE_DIST
                  )
            },
          ],
          hook: 'writeBundle'
        })
      ]
    },
  },
})
