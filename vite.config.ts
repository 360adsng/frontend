import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import viteReact from '@vitejs/plugin-react'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import path from 'node:path'

/** Cloudflare Workers — https://tanstack.com/start/latest/docs/framework/react/guide/hosting */
export default defineConfig(({ mode }) => {
  const useCloudflare =
    mode === 'cloudflare' ||
    process.env.CLOUDFLARE === 'true' ||
    process.env.CF_PAGES === 'true'

  const sentryOrg = process.env.SENTRY_ORG?.trim()
  const sentryProject = process.env.SENTRY_PROJECT?.trim()
  const sentryAuthToken = process.env.SENTRY_AUTH_TOKEN?.trim()
  const useSentrySourceMaps = Boolean(
    sentryOrg && sentryProject && sentryAuthToken,
  )

  return {
  server: {
    port: 3000,
    // On Windows + OneDrive/network folders, file watching can miss changes or stall.
    // If dev is flaky, set VITE_FS_POLLING=1 in .env (uses more CPU).
    watch: {
      usePolling: process.env.VITE_FS_POLLING === '1',
    },
  },
  // Bundle react-icons into SSR output — avoids Node ESM interop issues with mixed CJS/ESM entry points.
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
    ...(useCloudflare
      ? [cloudflare({ viteEnvironment: { name: 'ssr' } })]
      : []),
    tanstackStart({
      srcDirectory: '.',
      router: {
        routesDirectory: 'app',
        generatedRouteTree: 'routeTree.gen.ts',
      },
    }),
    viteReact(),
    ...(useSentrySourceMaps
      ? [
          sentryVitePlugin({
            org: sentryOrg,
            project: sentryProject,
            authToken: sentryAuthToken,
            telemetry: false,
          }),
        ]
      : []),
  ],
  build: {
    sourcemap: useSentrySourceMaps || mode === 'production',
  },
  }
})
