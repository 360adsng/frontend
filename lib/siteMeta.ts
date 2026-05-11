/** Canonical site URL for Open Graph and JSON-LD (override via Vite env). */
export function siteOrigin(): string {
  const v = import.meta.env.VITE_PUBLIC_SITE_URL as string | undefined;
  return (v?.replace(/\/+$/, "") || "https://360ads.ng").trim();
}

export const SITE_NAME = "360 Ads";

export const SEO_DEFAULT_DESCRIPTION =
  "Plan, launch, and manage billboard and influencer campaigns in Nigeria. 360 Ads helps brands reach the right audience with automated digital advertising.";

export function marketingHead(opts: {
  pageTitle: string;
  description: string;
  /** Public path with leading slash, e.g. `/about` */
  canonicalPath: string;
}) {
  const origin = siteOrigin();
  const path = opts.canonicalPath.startsWith("/")
    ? opts.canonicalPath
    : `/${opts.canonicalPath}`;
  const base = origin.replace(/\/+$/, "");
  const url = path === "/" ? `${base}/` : `${base}${path}`;

  const fullTitle = `${opts.pageTitle} | ${SITE_NAME}`;

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: opts.description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: opts.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: opts.description },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
