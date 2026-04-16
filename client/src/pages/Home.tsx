import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { publishedBooks, upcomingVolumes } from "@shared/books";
import { Link } from "wouter";

const compassItems = [
  {
    title: "No Prescriptions",
    description:
      "We offer no rigid formulas. Your path is yours alone to walk, and these books are meant to accompany rather than instruct.",
  },
  {
    title: "Gentle Inquiry",
    description:
      "Instead of answers, we offer reflections and questions that open a quieter conversation within you.",
  },
  {
    title: "Sacred Pause",
    description:
      "Designed to help you slow down, breathe, return, and remember the wisdom already living beneath the noise.",
  },
];

export default function Home() {
  return (
    <Layout>
      <Seo path="/" />

      <div className="space-y-24 md:space-y-32 animate-fade-in">
        <section className="relative overflow-hidden rounded-[2.5rem] border border-border/40 bg-card/60 px-6 py-16 md:px-12 md:py-24">
          <div className="absolute inset-0 opacity-20">
            <picture>
              <source
                type="image/webp"
                srcSet="/images/hero-dawn-960.webp 960w, /images/hero-dawn-1600.webp 1600w"
                sizes="100vw"
              />
              <img
                src="/images/hero-dawn-1600.webp"
                alt="Soft morning light over a quiet horizon"
                className="h-full w-full object-cover"
                width="1600"
                height="893"
                fetchPriority="high"
                loading="eager"
                decoding="async"
              />
            </picture>
          </div>

          <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground/65">SoulWord Press</p>
            <h1 className="mt-6 font-serif text-5xl leading-tight text-foreground md:text-7xl">
              This Is Not a Book You Finish.
              <br />
              <span className="italic text-muted-foreground/90">It&apos;s a Path You Walk.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-[1.08rem] leading-relaxed text-muted-foreground/85 md:text-[1.22rem]">
              The <em>I Am Becoming</em> series by Spike Humer is a nine-book path of reflection,
              presence, and lived transformation. Begin with <strong>The Companion</strong>, or
              enter anywhere the path calls you.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/the-companion"
                className="inline-flex items-center justify-center rounded-full border border-accent/35 bg-accent/10 px-8 py-3 text-xs font-medium uppercase tracking-[0.22em] text-foreground transition-all duration-500 hover:border-accent/60 hover:bg-accent/20"
              >
                Begin with The Companion
              </Link>
              <Link
                href="/books"
                className="inline-flex items-center justify-center rounded-full border border-border/60 px-8 py-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground transition-all duration-500 hover:border-accent/40 hover:text-foreground"
              >
                Inside the Pages
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl space-y-8 text-center">
          <p className="text-2xl font-serif italic leading-relaxed text-foreground/85 md:text-3xl">
            “The waking comes before the rising. It comes in the dark, in the quiet hours when the
            world still sleeps. It comes as a whisper, a stirring, a gentle invitation to remember
            who you are beneath all you have become.”
          </p>
          <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground/65">
            — From <em>The Waking</em>, Entry 1
          </p>
          <div className="mx-auto h-px w-20 bg-border/60" />
          <div className="space-y-5 text-[1.04rem] leading-relaxed text-muted-foreground/85 md:text-[1.12rem]">
            <p>
              In seasons of profound change, we are not meant to walk alone. <em>I Am Becoming</em>{" "}
              is a quiet companion for such seasons — a place of reflection, remembering, and
              return.
            </p>
            <p>
              These are not books to be rushed through or completed. They are books to live with,
              to return to, and to open again when the next threshold appears.
            </p>
          </div>
        </section>

        <section className="space-y-10">
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground/65">
              Current Offerings
            </p>
            <h2 className="font-serif text-3xl text-foreground md:text-4xl">The Current Offerings</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {publishedBooks.map((book, index) => (
              <article
                key={book.slug}
                className="flex h-full flex-col rounded-[2rem] border border-border/50 bg-card/70 p-6 shadow-sm shadow-muted-foreground/5"
              >
                <div className="mx-auto flex w-full max-w-[220px] flex-col items-center rounded-[1.5rem] border border-accent/20 bg-gradient-to-b from-background via-card to-muted/20 px-6 py-8 text-center aspect-[2/3] justify-between">
                  <span className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground/65">
                    {book.shortLabel}
                  </span>
                  <div className="space-y-3">
                    <h3 className="font-serif text-3xl text-foreground">{book.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground/75">{book.subtitle}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.22em] text-accent/80">SoulWord Press</span>
                </div>

                <div className="flex flex-1 flex-col space-y-5 pt-7 text-center">
                  <p className="text-lg font-serif italic text-foreground/85">“{book.quote}”</p>
                  <p className="text-[1rem] leading-relaxed text-muted-foreground/85">{book.summary}</p>
                  <p className="text-sm text-muted-foreground/75">{book.availabilityNote}</p>
                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    {book.amazonLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-foreground transition-all duration-500 hover:border-accent/55 hover:bg-accent/20"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                  <Link
                    href={book.slug}
                    className="pt-3 text-sm text-muted-foreground underline decoration-accent/40 underline-offset-4 transition-colors hover:text-foreground"
                  >
                    Read more
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-border/40 bg-card/50 px-6 py-10 md:px-10 md:py-12">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="space-y-3 text-center">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground/65">
                The Series Arc
              </p>
              <h2 className="font-serif text-3xl text-foreground md:text-4xl">
                Nine Volumes, One Unfolding
              </h2>
            </div>
            <p className="mx-auto max-w-3xl text-center text-[1.04rem] leading-relaxed text-muted-foreground/85 md:text-[1.12rem]">
              The <em>I Am Becoming</em> series unfolds across nine volumes, each meeting you in a
              different season of the inner life. The first three are available now. The others
              will arrive in their own time.
            </p>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-[1.5rem] border border-border/50 bg-background/70 p-5">
                <h3 className="font-serif text-2xl text-foreground">The Waking</h3>
                <p className="pt-3 text-sm leading-relaxed text-muted-foreground/80">
                  The first stirring of awakening, before the rising.
                  <span className="font-medium text-foreground/80"> Available now.</span>
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-border/50 bg-background/70 p-5">
                <h3 className="font-serif text-2xl text-foreground">The Companion</h3>
                <p className="pt-3 text-sm leading-relaxed text-muted-foreground/80">
                  208 reflections for presence, becoming, and inner alignment. A natural entry
                  point.
                  <span className="font-medium text-foreground/80"> Available now.</span>
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-border/50 bg-background/70 p-5">
                <h3 className="font-serif text-2xl text-foreground">The Standing</h3>
                <p className="pt-3 text-sm leading-relaxed text-muted-foreground/80">
                  The practice of remaining — upright, open, unwavering.
                  <span className="font-medium text-foreground/80"> Available now.</span>
                </p>
              </div>
              {upcomingVolumes.map((volume) => (
                <div
                  key={volume.title}
                  className="rounded-[1.5rem] border border-dashed border-border/50 bg-background/60 p-5"
                >
                  <h3 className="font-serif text-2xl text-foreground">[{volume.title}]</h3>
                  <p className="pt-3 text-sm leading-relaxed text-muted-foreground/80">
                    [{volume.description}] — <span className="font-medium">{volume.status}</span>
                  </p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm leading-relaxed text-muted-foreground/70">
              Titles and descriptions for upcoming volumes will be shared as each is prepared for
              release.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl space-y-8 text-center">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground/65">The Path</p>
            <h2 className="font-serif text-3xl text-foreground md:text-4xl">The Path Unfolds Over Time</h2>
          </div>
          <div className="space-y-5 text-[1.04rem] leading-relaxed text-muted-foreground/85 md:text-[1.12rem]">
            <p>
              <em>I Am Becoming</em> is a quiet path for those ready to walk with themselves rather
              than outrun themselves. The journey unfolds over nine volumes, each created to meet
              you in a different season of the inner life — from the first stirring of awakening to
              the grounding work of standing and seeing, and on through the essential acts of
              clearing, returning, and living more fully.
            </p>
            <p>
              Every book is a doorway, and there is no single right place to enter. That said, for
              those just beginning the journey, <strong>The Companion</strong> offers a gentle hand
              — a natural starting point for a path that deepens with each step.
            </p>
            <p>
              These books do not tell you what to fix, achieve, or optimize. They offer a quieter
              practice — a place to pause, listen more closely, and let your own wisdom rise in its
              own time.
            </p>
          </div>
          <div>
            <Link
              href="/the-companion"
              className="inline-flex items-center justify-center rounded-full border border-border/60 px-7 py-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground transition-all duration-500 hover:border-accent/40 hover:text-foreground"
            >
              Begin with The Companion
            </Link>
          </div>
        </section>

        <section className="space-y-8">
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground/65">Orientation</p>
            <h2 className="font-serif text-3xl text-foreground md:text-4xl">A Compass, Not a Map</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {compassItems.map((item, index) => (
              <article
                key={item.title}
                className="rounded-[1.75rem] border border-border/50 bg-card/65 px-6 py-8 text-center"
              >
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-accent/35 text-sm font-serif italic text-foreground/80 shadow-[inset_0_0_0_6px_rgba(173,141,98,0.06)]">
                  {index + 1}
                </div>
                <h3 className="font-serif text-2xl text-foreground">{item.title}</h3>
                <p className="pt-4 text-[0.98rem] leading-relaxed text-muted-foreground/82">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-4xl rounded-[2rem] border border-border/40 bg-card/50 px-6 py-10 text-center md:px-10 md:py-12">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground/65">
              Reader Reflections
            </p>
            <h2 className="font-serif text-3xl text-foreground md:text-4xl">
              What Readers Are Sitting With
            </h2>
            <p className="text-[1.04rem] leading-relaxed text-muted-foreground/82 md:text-[1.1rem]">
              Reflections from early readers will appear here soon.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl rounded-[2rem] border border-border/40 bg-card/55 px-6 py-10 text-center md:px-10 md:py-12">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground/65">A Note from the Author</p>
            <h2 className="font-serif text-3xl text-foreground md:text-4xl">A Fellow Traveler</h2>
            <p className="text-[1.04rem] leading-relaxed text-muted-foreground/85 md:text-[1.12rem]">
              “I wrote these words not as a teacher, but as a fellow traveler. Like you, I am
              navigating the beautiful, messy, and sacred terrain of being human.”
            </p>
            <p className="text-[1.04rem] leading-relaxed text-muted-foreground/85 md:text-[1.12rem]">
              My hope is that these books offer a gentle mirror — a place of rest when you are
              weary, and a companion when you are ready to return more fully to your own life.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="text-sm text-muted-foreground underline decoration-accent/40 underline-offset-4 transition-colors hover:text-foreground"
              >
                Read more about Spike
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
