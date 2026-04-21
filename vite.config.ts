import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import netlify from '@netlify/vite-plugin-tanstack-start'
import viteReact from '@vitejs/plugin-react'
import path from 'node:path'

// Netlify injects NETLIFY=true during builds. Running the Netlify adapter on every
// `vite dev` adds work you do not need locally and can make dev feel sluggish.
const useNetlifyPlugin = process.env.NETLIFY === 'true'

export default defineConfig({
  server: {
    port: 3000,
    // On Windows + OneDrive/network folders, file watching can miss changes or stall.
    // If dev is flaky, set VITE_FS_POLLING=1 in .env (uses more CPU).
    watch: {
      usePolling: process.env.VITE_FS_POLLING === '1',
    },
  },
  // Bundle react-icons into SSR output. Netlify's Node ESM loader fails on
  // named imports from react-icons' CJS/ESM entry (see AiOutlineDownload error).
  ssr: {
    noExternal: ['react-icons'],
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'components'),
      '@endpoint': path.resolve(__dirname, 'endpoint'),
      '@public': path.resolve(__dirname, 'public'),
      '@styles': path.resolve(__dirname, 'styles'),
      '@utils': path.resolve(__dirname, 'utils'),
      '@lib': path.resolve(__dirname, 'lib'),
    },
  },
  plugins: [
    tanstackStart({
      srcDirectory: '.',
      router: {
        routesDirectory: 'app',
        generatedRouteTree: 'routeTree.gen.ts',
        // Extra logging / work; keep off unless debugging route generation.
        verboseFileRoutes: process.env.VITE_VERBOSE_FILE_ROUTES === '1',
      },
    }),
    ...(useNetlifyPlugin ? [netlify()] : []),
    viteReact(),
  ],
})
