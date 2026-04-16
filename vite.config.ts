import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import netlify from '@netlify/vite-plugin-tanstack-start'
import viteReact from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  server: {
    port: 3000,
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
    },
  },
  plugins: [
    tanstackStart({
      srcDirectory: '.',
      router: {
        routesDirectory: 'app',
        generatedRouteTree: 'routeTree.gen.ts',
        verboseFileRoutes: true,
      },
    }),
    netlify(),
    viteReact(),
  ],
})
