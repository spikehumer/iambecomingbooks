import { SITE_NAME, SITE_URL, buildAbsoluteUrl, getSeoEntry, normalizePublicPath } from "./seo";
import { bookPageContent } from "./siteContent";

const authorPerson = {
  "@type": "Person",
  "@id": `${SITE_URL}/about#person`,
  name: "Spike Humer",
  url: buildAbsoluteUrl("/about"),
  image: buildAbsoluteUrl("/images/author-portrait-placeholder.jpg"),
  jobTitle: "Author",
  description:
    "Spike Humer is the author of the I Am Becoming series, a contemplative body of work devoted to reflection, presence, and remembering.",
  worksFor: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "SoulWord Press",
    url: SITE_URL,
  },
  sameAs: [SITE_URL],
};

const publisherOrganization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "SoulWord Press",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: buildAbsoluteUrl("/images/book-cover-mockup.jpg"),
  },
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  description: "A contemplative nine-book journey by Spike Humer.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  author: { "@id": `${SITE_URL}/about#person` },
};

const series = {
  "@type": "CreativeWorkSeries",
  "@id": `${SITE_URL}/books#series`,
  name: "I Am Becoming",
  author: { "@id": `${SITE_URL}/about#person` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  url: buildAbsoluteUrl("/books"),
};

const bookSchemas = {
  "/the-waking": {
    "@type": "Book",
    "@id": `${SITE_URL}/the-waking#book`,
    name: bookPageContent["/the-waking"].title,
    author: { "@id": `${SITE_URL}/about#person` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    image: buildAbsoluteUrl(bookPageContent["/the-waking"].coverImage),
    bookEdition: "Book One",
    description: getSeoEntry("/the-waking").description,
    isPartOf: { "@id": `${SITE_URL}/books#series` },
    url: buildAbsoluteUrl("/the-waking"),
  },
  "/the-companion": {
    "@type": "Book",
    "@id": `${SITE_URL}/the-companion#book`,
    name: bookPageContent["/the-companion"].title,
    author: { "@id": `${SITE_URL}/about#person` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    image: buildAbsoluteUrl(bookPageContent["/the-companion"].coverImage),
    description: getSeoEntry("/the-companion").description,
    isPartOf: { "@id": `${SITE_URL}/books#series` },
    url: buildAbsoluteUrl("/the-companion"),
  },
  "/the-standing": {
    "@type": "Book",
    "@id": `${SITE_URL}/the-standing#book`,
    name: bookPageContent["/the-standing"].title,
    author: { "@id": `${SITE_URL}/about#person` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    image: buildAbsoluteUrl(bookPageContent["/the-standing"].coverImage),
    bookEdition: "Book Three",
    description: getSeoEntry("/the-standing").description,
    isPartOf: { "@id": `${SITE_URL}/books#series` },
    url: buildAbsoluteUrl("/the-standing"),
  },
} as const;

function buildBreadcrumb(path: string) {
  const normalizedPath = normalizePublicPath(path);
  const labels: Record<string, string> = {
    "/": "Home",
    "/start-here": "Start Here",
    "/books": "Inside the Pages",
    "/about": "About",
    "/receive": "Receive",
    "/privacy": "Privacy Policy",
    "/terms": "Terms of Use",
    "/contact": "Contact",
    "/the-waking": "The Waking",
    "/the-companion": "The Companion",
    "/the-standing": "The Standing",
  };

  const trail = [{ name: "Home", item: buildAbsoluteUrl("/") }];

  if (normalizedPath !== "/") {
    if (["/the-waking", "/the-companion", "/the-standing"].includes(normalizedPath)) {
      trail.push({ name: "Inside the Pages", item: buildAbsoluteUrl("/books") });
    }

    trail.push({
      name: labels[normalizedPath],
      item: buildAbsoluteUrl(normalizedPath),
    });
  }

  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };
}

function buildWebPage(path: string, pageType: "WebPage" | "CollectionPage") {
  const seo = getSeoEntry(path);

  return {
    "@type": pageType,
    "@id": `${seo.canonicalUrl}#webpage`,
    name: seo.title,
    description: seo.description,
    url: seo.canonicalUrl,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: seo.openGraphImage,
    },
    about: { "@id": `${SITE_URL}/about#person` },
  };
}

export function getStructuredData(path: string) {
  const normalizedPath = normalizePublicPath(path);

  if (normalizedPath === "/books") {
    return {
      "@context": "https://schema.org",
      "@graph": [
        website,
        publisherOrganization,
        authorPerson,
        series,
        buildWebPage("/books", "CollectionPage"),
        buildBreadcrumb("/books"),
        ...Object.values(bookSchemas),
      ],
    };
  }

  if (normalizedPath === "/about") {
    return {
      "@context": "https://schema.org",
      "@graph": [website, publisherOrganization, authorPerson, buildWebPage("/about", "WebPage"), buildBreadcrumb("/about")],
    };
  }

  if (normalizedPath in bookSchemas) {
    const bookPath = normalizedPath as keyof typeof bookSchemas;

    return {
      "@context": "https://schema.org",
      "@graph": [
        website,
        publisherOrganization,
        authorPerson,
        series,
        bookSchemas[bookPath],
        buildWebPage(bookPath, "WebPage"),
        buildBreadcrumb(bookPath),
      ],
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [website, publisherOrganization, authorPerson, buildWebPage(normalizedPath, "WebPage"), buildBreadcrumb(normalizedPath)],
  };
}
