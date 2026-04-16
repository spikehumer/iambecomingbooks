export const SITE_NAME = "I Am Becoming Books";
export const SITE_URL = "https://iambecomingbooks.com";

export const LEGACY_ROUTE_REDIRECTS = {
  "/the-book-series": "/books",
} as const;

export type SeoRoute = "/" | "/start-here" | "/books" | "/about" | "/receive";

export type SeoEntry = {
  path: SeoRoute;
  title: string;
  description: string;
  imagePath: string;
  type?: "website" | "article";
};

const seoEntries: Record<SeoRoute, Omit<SeoEntry, "path">> = {
  "/": {
    title: "I Am Becoming Books | A Reflective Journey by Spike Humer",
    description:
      "Discover I Am Becoming Books, a contemplative book journey by Spike Humer featuring The Waking, gentle reflections, and a path of returning to yourself.",
    imagePath: "/images/book-cover-mockup.jpg",
    type: "website",
  },
  "/start-here": {
    title: "Start Here | I Am Becoming Books by Spike Humer",
    description:
      "Begin your path with I Am Becoming Books. Start here for a quiet introduction to Spike Humer’s reflective series, reading path, and next steps.",
    imagePath: "/images/texture-paper.jpg",
    type: "article",
  },
  "/books": {
    title: "Books | The Waking and the I Am Becoming Series",
    description:
      "Explore The Waking and the I Am Becoming book series by Spike Humer, including book details, ISBN information, and how to begin the journey.",
    imagePath: "/images/book-3d.jpg",
    type: "article",
  },
  "/about": {
    title: "About Spike Humer | I Am Becoming Books",
    description:
      "Learn more about Spike Humer, the author of I Am Becoming Books, and the reflective, soul-centered philosophy behind the work.",
    imagePath: "/images/author-portrait-placeholder.jpg",
    type: "article",
  },
  "/receive": {
    title: "Receive Reflections | I Am Becoming Books",
    description:
      "Join the I Am Becoming Books circle to receive occasional reflections, updates, and gentle notes from Spike Humer.",
    imagePath: "/images/hero-dawn.jpg",
    type: "article",
  },
};

export function normalizePublicPath(pathname: string): SeoRoute {
  const legacyTarget = LEGACY_ROUTE_REDIRECTS[pathname as keyof typeof LEGACY_ROUTE_REDIRECTS];
  const resolvedPath = legacyTarget ?? pathname;
  const normalized = resolvedPath === "/" ? "/" : resolvedPath.replace(/\/+$/, "");

  if (normalized in seoEntries) {
    return normalized as SeoRoute;
  }

  return "/";
}

export function buildAbsoluteUrl(pathname: string) {
  if (!pathname || pathname === "/") {
    return SITE_URL + "/";
  }

  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${normalized.replace(/\/+$/, "")}`;
}

export function getSeoEntry(pathname: string) {
  const path = normalizePublicPath(pathname);
  const entry = seoEntries[path];

  return {
    ...entry,
    path,
    canonicalUrl: buildAbsoluteUrl(path),
    openGraphUrl: buildAbsoluteUrl(path),
    twitterUrl: buildAbsoluteUrl(path),
    openGraphImage: buildAbsoluteUrl(entry.imagePath),
    twitterImage: buildAbsoluteUrl(entry.imagePath),
    siteName: SITE_NAME,
    twitterCard: "summary_large_image" as const,
  };
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
