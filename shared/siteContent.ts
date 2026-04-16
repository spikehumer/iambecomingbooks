import { publishedBooks } from "./books";

export const aboutPageContent = {
  title: "A Fellow Traveler",
  introduction: [
    "I write as someone still listening. Not above the path, not beyond the questions, and not outside the daily practice of remembering. The work gathered in I Am Becoming comes from a life lived close to both tenderness and difficulty — from seasons of striving, seasons of rebuilding, and seasons where the only honest movement was to pause and begin again.",
    "For many years, my professional life moved through strategy, systems, leadership, and restoration. I stepped into companies that were growing, straining, changing, or trying to find their footing again. That work taught me how to read what is happening beneath the surface — in people, in structures, in the unseen dynamics that quietly shape what becomes possible.",
    "Yet long before I had language for any of that, I was drawn to the inner life. I have always been interested in what people carry, what they hide, what they hope for, and what they are trying to return to beneath the noise of expectation and performance. The writing emerged from that same place. It did not begin as a plan. It began as a listening.",
    "There came a point when the outer work and the inner work could no longer remain separate. The pace had to soften. The doing had to make room for presence. In that pause, I found myself writing not to teach, but to accompany — to offer words that could sit beside another person in quiet, in grief, in becoming, in return.",
    "The I Am Becoming series is an extension of that practice. These books are not meant to impress, persuade, or fix. They are meant to keep company with the reader. They are places to breathe, to reflect, to remember, and to stay a little longer with what is true.",
    "If these words meet you anywhere, I hope they meet you gently. I hope they offer a little steadiness, a little room, and a little more trust in the wisdom already alive within your own life.",
  ],
  soulWordPressTitle: "About SoulWord Press",
  soulWordPressBody: [
    "SoulWord Press exists to publish contemplative work that honors the inner life with clarity, beauty, and emotional truth. It is a home for books and offerings that do not compete with the noise, but make room for quiet presence.",
    "At its heart, SoulWord Press is devoted to language that helps people slow down, listen more deeply, and live more honestly. The aim is not volume, urgency, or performance. The aim is resonance — words that stay with you, return to you, and continue unfolding after the page is turned.",
    "The I Am Becoming series is the first major path being carried through the press, but the deeper intention is wider: to create books, reflections, and companion pieces that serve remembering, presence, and the human work of becoming.",
  ],
};

const waking = publishedBooks.find((book) => book.slug === "/the-waking")!;
const companion = publishedBooks.find((book) => book.slug === "/the-companion")!;
const standing = publishedBooks.find((book) => book.slug === "/the-standing")!;

export const bookPageContent = {
  "/the-waking": {
    ...waking,
    metaTitle: "The Waking by Spike Humer | Book One of I Am Becoming",
    metaDescription:
      "Discover The Waking by Spike Humer, the first volume in the I Am Becoming series — a contemplative book of mantras, reflections, and sacred writings.",
    coverImage: "/images/book-cover-mockup.jpg",
    extendedDescription: [
      "The Waking is the first stirring in the I Am Becoming path. It belongs to that hour before the day fully arrives — the quiet threshold where something in you begins to notice, soften, and turn toward the light.",
      "This book gathers mantras, reflections, and sacred writings for the reader who is not looking for noise, but for language that can accompany an inner opening. It does not rush the process. It stays near the subtle movements that come before change has found its visible form.",
      "There is tenderness in this volume, but also honesty. The Waking is not interested in pretending that awakening is effortless. It honors the ache, the uncertainty, and the often-fragile courage required to stay present to your own life as it begins to speak more clearly.",
      "For some readers, this will feel like a beginning. For others, it may feel like a return to something known long ago and quietly set aside. Either way, it offers a place to stop, listen, and remember what is already stirring within you.",
    ],
    excerpt:
      "The waking comes before the rising. It comes in the dark, in the quiet hours when the world still sleeps. It comes as a whisper, a stirring, a gentle invitation to remember who you are beneath all you have become.",
    whatItsFor: [
      "For readers standing at the threshold of inner change.",
      "For moments when you need language for awakening, uncertainty, and return.",
      "For a quiet daily practice of reflection rather than a book to race through.",
      "For anyone who senses that something true is asking to be remembered.",
    ],
    continuePath: ["/the-companion", "/the-standing"],
  },
  "/the-companion": {
    ...companion,
    metaTitle: "The Companion by Spike Humer | A Natural Entry into I Am Becoming",
    metaDescription:
      "Explore The Companion by Spike Humer, a collection of 208 reflections for presence, becoming, and inner alignment within the I Am Becoming series.",
    coverImage: "/images/book-cover-flat.jpg",
    extendedDescription: [
      "The Companion is a book meant to be lived with. It is not arranged as a single argument or a sequence of conclusions. It is a gathering of 208 reflections that can meet you one page at a time, right where you are.",
      "For readers entering the I Am Becoming series for the first time, The Companion offers a gentle beginning. It creates room for presence without demanding that you have everything figured out. It asks very little except honesty, openness, and a willingness to pause.",
      "This is a book for mornings when you need steadiness, evenings when you need perspective, and passing moments when life asks you to come back to yourself. Its reflections are brief enough to carry into the day, yet spacious enough to continue unfolding after you close the page.",
      "If The Waking is the first stirring, The Companion is the hand beside you on the road. It offers company without pressure — a quiet way of staying close to what matters while your own life continues to teach you how to become.",
    ],
    excerpt:
      "A companion does not walk the road for you. A companion stays near enough that you do not forget you are not alone while you walk it.",
    whatItsFor: [
      "For readers who want a gentle, natural place to begin the series.",
      "For a daily rhythm of short reflections rooted in presence and return.",
      "For seasons when you need companionship more than instruction.",
      "For keeping close to yourself in the midst of movement, change, and becoming.",
    ],
    continuePath: ["/the-waking", "/the-standing"],
  },
  "/the-standing": {
    ...standing,
    metaTitle: "The Standing by Spike Humer | Book Three of I Am Becoming",
    metaDescription:
      "Learn about The Standing by Spike Humer, a contemplative volume in the I Am Becoming series devoted to remaining upright, open, and unwavering.",
    coverImage: "/images/book-3d.jpg",
    extendedDescription: [
      "The Standing asks a different question from the first two volumes: what remains when the first awakening has come and you are asked to live from it? This book is about staying. About remaining upright in the life you have, rather than disappearing from it.",
      "There is grounding here, but not rigidity. The Standing is not about hardening yourself against the world. It is about learning to inhabit your center with openness, steadiness, and sincerity — to keep your feet beneath you while life moves around you.",
      "Its pages hold reflections for the work of remaining present through complexity, clearing what no longer belongs, and returning again and again to the deeper ground of your own life. It speaks to the quiet discipline of not abandoning yourself.",
      "If The Waking is about the first stirring and The Companion is about company along the road, The Standing is about practice. It is the shape of becoming when it has entered the body, the day, the choices, and the way you continue forward.",
    ],
    excerpt:
      "To stand is not to harden. It is to remain open without collapsing, grounded without becoming closed, and present without needing to flee.",
    whatItsFor: [
      "For readers learning the practice of remaining present in real life.",
      "For seasons that ask for steadiness, clearing, and grounded courage.",
      "For deepening reflection beyond the first moments of awakening.",
      "For anyone called to live more fully from what has already been revealed.",
    ],
    continuePath: ["/the-waking", "/the-companion"],
  },
} as const;
