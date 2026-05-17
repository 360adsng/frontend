import * as Sentry from '@sentry/react';

const dsn = import.meta.env.VITE_SENTRY_DSN?.trim();

export function isSentryEnabled(): boolean {
  return Boolean(dsn);
}

let initialized = false;

/** Call once on the client (browser only). */
export function initSentryClient(): void {
  if (initialized || typeof window === 'undefined' || !dsn) {
    return;
  }
  initialized = true;

  Sentry.init({
    dsn,
    environment:
      import.meta.env.VITE_SENTRY_ENVIRONMENT?.trim() ||
      import.meta.env.MODE ||
      'development',
    release: import.meta.env.VITE_SENTRY_RELEASE?.trim() || undefined,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    tracesSampleRate: import.meta.env.PROD
      ? Number(import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE ?? '0.1')
      : 1,
    replaysSessionSampleRate: import.meta.env.PROD ? 0.1 : 0,
    replaysOnErrorSampleRate: import.meta.env.PROD ? 1 : 0,
    sendDefaultPii: false,
    beforeSend(event) {
      if (event.request?.headers) {
        delete event.request.headers.Authorization;
        delete event.request.headers.authorization;
      }
      return event;
    },
  });
}

export { Sentry };
