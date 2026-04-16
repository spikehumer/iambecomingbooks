export const SITE_NAME = "I Am Becoming Books";
export const SITE_URL = "https://iambecomingbooks.com";

export const LEGACY_ROUTE_REDIRECTS = {
  "/the-book-series": "/books",
} as const;

export type SeoRoute =
  | "/"
  | "/start-here"
  | "/books"
  | "/about"
  | "/receive"
  | "/privacy"
  | "/terms"
  | "/contact"
  | "/the-waking"
  | "/the-companion"
  | "/the-standing";

export type SeoEntry = {
  path: SeoRoute;
  title: string;
  description: string;
  imagePath: string;
  type?: "website" | "article";
};

const seoEntries: Record<SeoRoute, Omit<SeoEntry, "path">> = {
  "/": {
    title: "I Am Becoming: A Nine-Book Journey by Spike Humer | SoulWord Press",
    description:
      "The I Am Becoming series by Spike Humer — a nine-book path of reflection, presence, and lived transformation. Begin with The Companion, or enter anywhere the path calls you.",
    imagePath: "/images/book-cover-mockup.jpg",
    type: "website",
  },
  "/start-here": {
    title: "Start Here | Begin the I Am Becoming Path",
    description:
      "Find a gentle way into I Am Becoming. Begin with The Companion, explore the books, and choose the doorway that feels true for this season.",
    imagePath: "/images/texture-paper.jpg",
    type: "article",
  },
  "/books": {
    title: "Inside the Pages | I Am Becoming Books by Spike Humer",
    description:
      "Explore the published volumes of I Am Becoming by Spike Humer, including The Waking, The Companion, and The Standing.",
    imagePath: "/images/book-3d.jpg",
    type: "article",
  },
  "/about": {
    title: "About Spike Humer — Author of the I Am Becoming Series",
    description:
      "Spike Humer is the author of the I Am Becoming series — a nine-volume path of reflection and presence published by SoulWord Press.",
    imagePath: "/images/author-portrait-placeholder.jpg",
    type: "article",
  },
  "/receive": {
    title: "Receive Quiet Reflections | I Am Becoming Books",
    description:
      "Join the circle to receive occasional reflections, book news, and quiet notes from Spike Humer and SoulWord Press.",
    imagePath: "/images/hero-dawn.jpg",
    type: "article",
  },
  "/privacy": {
    title: "Privacy Policy | SoulWord Press",
    description:
      "Read the privacy policy for I Am Becoming Books and SoulWord Press, including how reader information is collected, used, and respected.",
    imagePath: "/images/hero-dawn.jpg",
    type: "article",
  },
  "/terms": {
    title: "Terms of Use | SoulWord Press",
    description:
      "Review the terms of use for I Am Becoming Books and SoulWord Press, including permitted use, intellectual property, and external links.",
    imagePath: "/images/hero-dawn.jpg",
    type: "article",
  },
  "/contact": {
    title: "Contact | SoulWord Press",
    description:
      "Get in touch with Spike Humer and SoulWord Press regarding the books, speaking, media, or related inquiries.",
    imagePath: "/images/author-portrait-placeholder.jpg",
    type: "article",
  },
  "/the-waking": {
    title: "The Waking by Spike Humer | Book One of I Am Becoming",
    description:
      "Discover The Waking by Spike Humer, the first volume in the I Am Becoming series — a contemplative book of mantras, reflections, and sacred writings.",
    imagePath: "/images/book-cover-mockup.jpg",
    type: "article",
  },
  "/the-companion": {
    title: "The Companion by Spike Humer | A Natural Entry into I Am Becoming",
    description:
      "Explore The Companion by Spike Humer, a collection of 208 reflections for presence, becoming, and inner alignment within the I Am Becoming series.",
    imagePath: "/images/book-cover-flat.jpg",
    type: "article",
  },
  "/the-standing": {
    title: "The Standing by Spike Humer | Book Three of I Am Becoming",
    description:
      "Learn about The Standing by Spike Humer, a contemplative volume in the I Am Becoming series devoted to remaining upright, open, and unwavering.",
    imagePath: "/images/book-3d.jpg",
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
