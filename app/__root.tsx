import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  ErrorComponentProps,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import sonnerCss from "sonner/dist/styles.css?url";
import appCss from "../styles/global.css?url";
import NotFoundPage from "@components/NotFoundPage";
import { SEO_DEFAULT_DESCRIPTION } from "@lib/siteMeta";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "360 Ads" },
      { name: "description", content: SEO_DEFAULT_DESCRIPTION },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "stylesheet",
        href: sonnerCss,
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  notFoundComponent: NotFoundPage,
  errorComponent: RootError,
  component: RootLayout,
});

function RootError({ error }: ErrorComponentProps) {
  useEffect(() => {
    void import("@lib/sentry-browser").then((m) => {
      if (m.isSentryEnabled()) {
        m.Sentry.captureException(error);
      }
    });
  }, [error]);

  const message =
    error instanceof Error ? error.message : "An unexpected error occurred.";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-xl font-semibold text-stone-900">Something went wrong</h1>
      <p className="mt-2 max-w-md text-sm text-stone-600">{message}</p>
      <a
        href="/"
        className="mt-6 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white"
      >
        Go home
      </a>
    </div>
  );
}

function RootLayout() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60 * 1000 },
        },
      }),
  );

  useEffect(() => {
    void import("@lib/sentry-browser").then((m) => m.initSentryClient());
  }, []);

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <Outlet />
          <Toaster theme="light" position="top-center" richColors closeButton />
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  );
}
