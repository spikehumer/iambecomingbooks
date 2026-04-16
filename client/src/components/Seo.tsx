import { useEffect } from "react";
import { getSeoEntry } from "@shared/seo";
import { getStructuredData } from "@shared/structuredData";

type SeoProps = {
  path: string;
};

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);

  if (!tag) {
    tag = document.createElement("meta");
    document.head.appendChild(tag);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    tag?.setAttribute(key, value);
  });
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
}

function upsertStructuredData(path: string) {
  const data = JSON.stringify(getStructuredData(path));
  let script = document.head.querySelector<HTMLScriptElement>('script[data-seo="structured-data"]');

  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-seo", "structured-data");
    document.head.appendChild(script);
  }

  script.textContent = data;
}

export default function Seo({ path }: SeoProps) {
  useEffect(() => {
    const entry = getSeoEntry(path);

    document.title = entry.title;
    document.documentElement.lang = "en";

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: entry.description,
    });

    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: "index,follow",
    });

    upsertCanonical(entry.canonicalUrl);

    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: entry.title,
    });

    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: entry.description,
    });

    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: entry.openGraphUrl,
    });

    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: entry.openGraphImage,
    });

    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: entry.type ?? "website",
    });

    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: entry.siteName,
    });

    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: entry.twitterCard,
    });

    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: entry.title,
    });

    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: entry.description,
    });

    upsertMeta('meta[name="twitter:url"]', {
      name: "twitter:url",
      content: entry.twitterUrl,
    });

    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: entry.twitterImage,
    });

    upsertStructuredData(path);
  }, [path]);

  return null;
}
