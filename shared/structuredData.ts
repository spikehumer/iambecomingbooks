import { SITE_NAME, SITE_URL, buildAbsoluteUrl, getSeoEntry, normalizePublicPath } from "./seo";

const authorPerson = {
  "@type": "Person",
  "@id": `${SITE_URL}/about#person`,
  name: "Spike Humer",
  url: buildAbsoluteUrl("/about"),
  image: buildAbsoluteUrl("/images/author-portrait-placeholder.jpg"),
  jobTitle: "Author",
  description:
    "Spike Humer is the author of I Am Becoming Books, a reflective series devoted to presence, becoming, and inner life.",
  worksFor: {
    "@type": "Organization",
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

const books = [
  {
    "@type": "Book",
    "@id": `${SITE_URL}/books#the-waking`,
    name: "The Waking",
    author: { "@id": `${SITE_URL}/about#person` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    isbn: "978-0-9855419-9-6",
    image: buildAbsoluteUrl("/images/book-3d.jpg"),
    bookEdition: "Book One",
    description:
      "The Waking is the first volume in the I Am Becoming series by Spike Humer, a journal of mantras, reflections, and sacred writing.",
    url: buildAbsoluteUrl("/books"),
  },
  {
    "@type": "Book",
    "@id": `${SITE_URL}/books#the-companion`,
    name: "The Companion",
    author: { "@id": `${SITE_URL}/about#person` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    image: buildAbsoluteUrl("/images/book-cover-mockup.jpg"),
    description:
      "The Companion is a collection of reflections for presence, becoming, and inner alignment within the I Am Becoming series.",
    isPartOf: { "@id": `${SITE_URL}/books#series` },
    url: buildAbsoluteUrl("/books"),
  },
  {
    "@type": "Book",
    "@id": `${SITE_URL}/books#the-standing`,
    name: "The Standing",
    author: { "@id": `${SITE_URL}/about#person` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    image: buildAbsoluteUrl("/images/book-cover-mockup.jpg"),
    description:
      "The Standing is a future volume in the I Am Becoming series focused on grounding, remaining, and living more fully.",
    isPartOf: { "@id": `${SITE_URL}/books#series` },
    url: buildAbsoluteUrl("/books"),
  },
];

function buildBreadcrumb(path: string) {
  const normalizedPath = normalizePublicPath(path);
  const labels: Record<string, string> = {
    "/": "Home",
    "/start-here": "Start Here",
    "/books": "Books",
    "/about": "About",
    "/receive": "Receive",
  };

  const trail = [{ name: "Home", item: buildAbsoluteUrl("/") }];

  if (normalizedPath !== "/") {
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
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: seo.openGraphImage,
    },
    about: { "@id": `${SITE_URL}/about#person` },
  };
}

export function getStructuredData(path: string) {
  const normalizedPath = normalizePublicPath(path);
  const seo = getSeoEntry(normalizedPath);

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: "A reflective book journey by Spike Humer.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    author: { "@id": `${SITE_URL}/about#person` },
  };

  if (normalizedPath === "/books") {
    return {
      "@context": "https://schema.org",
      "@graph": [
        website,
        publisherOrganization,
        authorPerson,
        {
          "@type": "CreativeWorkSeries",
          "@id": `${SITE_URL}/books#series`,
          name: "I Am Becoming",
          author: { "@id": `${SITE_URL}/about#person` },
          publisher: { "@id": `${SITE_URL}/#organization` },
          url: seo.canonicalUrl,
        },
        buildWebPage("/books", "CollectionPage"),
        buildBreadcrumb("/books"),
        ...books,
      ],
    };
  }

  if (normalizedPath === "/about") {
    return {
      "@context": "https://schema.org",
      "@graph": [website, publisherOrganization, authorPerson, buildWebPage("/about", "WebPage"), buildBreadcrumb("/about")],
    };
  }

  if (normalizedPath === "/") {
    return {
      "@context": "https://schema.org",
      "@graph": [website, publisherOrganization, authorPerson, buildWebPage("/", "WebPage"), buildBreadcrumb("/")],
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [website, publisherOrganization, buildWebPage(normalizedPath, "WebPage"), buildBreadcrumb(normalizedPath)],
  };
}
