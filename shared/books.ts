export type PublishedBook = {
  slug: "/the-waking" | "/the-companion" | "/the-standing";
  shortLabel: string;
  title: string;
  subtitle: string;
  quote: string;
  summary: string;
  availabilityNote: string;
  amazonLinks: Array<{
    label: string;
    href: string;
  }>;
};

export const publishedBooks: PublishedBook[] = [
  {
    slug: "/the-waking",
    shortLabel: "Book One",
    title: "The Waking",
    subtitle: "A Journal of Mantras, Reflections, and Sacred Writings",
    quote: "The waking comes before the rising.",
    summary:
      "The first stirring of awakening, before the rising. A quiet opening into remembrance, reflection, and the earliest movements of return.",
    availabilityNote: "Available now.",
    amazonLinks: [
      {
        label: "Paperback",
        href: "https://www.amazon.com/dp/B0GJLY61W5",
      },
      {
        label: "Kindle",
        href: "https://www.amazon.com/dp/B0GJM271Q3",
      },
    ],
  },
  {
    slug: "/the-companion",
    shortLabel: "The Companion",
    title: "The Companion",
    subtitle: "208 Reflections for Presence, Becoming, and Inner Alignment",
    quote: "Company for the road.",
    summary:
      "A natural entry point for the journey. A quiet companion for presence, becoming, and inner alignment, meant to be opened in the moments when you need to pause and return.",
    availabilityNote: "Paperback edition now available.",
    amazonLinks: [
      {
        label: "Paperback / Kindle",
        href: "https://www.amazon.com/dp/B0GN2XX7KQ",
      },
    ],
  },
  {
    slug: "/the-standing",
    shortLabel: "Book Three",
    title: "The Standing",
    subtitle: "A Journal of Mantras, Reflections, and Sacred Writings",
    quote: "The practice of remaining.",
    summary:
      "The practice of remaining — upright, open, unwavering. A book for staying present long enough to see clearly, return gently, and live more fully.",
    availabilityNote: "Available now.",
    amazonLinks: [
      {
        label: "Paperback / Kindle",
        href: "https://www.amazon.com/dp/B0GV3PXT54",
      },
    ],
  },
];

export const upcomingVolumes = [
  { title: "Volume Four", description: "Description to be added", status: "Coming" },
  { title: "Volume Five", description: "Description to be added", status: "Coming" },
  { title: "Volume Six", description: "Description to be added", status: "Coming" },
  { title: "Volume Seven", description: "Description to be added", status: "Coming" },
  { title: "Volume Eight", description: "Description to be added", status: "Coming" },
  { title: "Volume Nine", description: "Description to be added", status: "Coming" },
] as const;
