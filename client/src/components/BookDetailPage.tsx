import Layout from "@/components/Layout";
import { publishedBooks } from "@shared/books";
import { bookPageContent } from "@shared/siteContent";
import { Link } from "wouter";

type BookPageKey = keyof typeof bookPageContent;
type BookPageEntry = (typeof bookPageContent)[BookPageKey];

export default function BookDetailPage({
  book,
  seo,
}: {
  book: BookPageEntry;
  seo: React.ReactNode;
}) {
  return (
    <Layout>
      {seo}

      <div className="mx-auto max-w-6xl space-y-16 py-4 md:py-8 animate-fade-in">
        <section className="grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start">
          <div className="mx-auto w-full max-w-[320px] rounded-[2rem] border border-border/50 bg-card/65 p-6 shadow-sm shadow-muted-foreground/10">
            <div className="space-y-5 text-center">
              <div className="overflow-hidden rounded-[1.6rem] border border-accent/20 bg-background/70 p-4">
                <img
                  src={book.coverImage}
                  alt={`${book.title} cover`}
                  className="mx-auto aspect-[2/3] w-full max-w-[240px] object-cover rounded-[1rem] shadow-lg shadow-muted-foreground/10"
                  width="800"
                  height="1200"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="space-y-2">
                <span className="block text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground/65">
                  {book.shortLabel}
                </span>
                <h1 className="font-serif text-4xl text-foreground">{book.title}</h1>
                <p className="text-sm leading-relaxed text-muted-foreground/75">{book.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <header className="space-y-5 text-center lg:text-left">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground/65">Inside the Pages</p>
              <h2 className="font-serif text-4xl text-foreground md:text-5xl">{book.title}</h2>
              <p className="max-w-3xl text-[1.08rem] leading-relaxed text-muted-foreground/85 md:text-[1.15rem]">
                {book.subtitle}
              </p>
            </header>

            <section className="space-y-5 text-[1.03rem] leading-relaxed text-muted-foreground/88 md:text-[1.08rem]">
              {book.extendedDescription.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>

            <blockquote className="rounded-[1.75rem] border border-border/45 bg-card/55 px-6 py-8 font-serif text-2xl italic leading-relaxed text-foreground/85 md:px-8">
              “{book.excerpt}”
            </blockquote>

            <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="rounded-[1.75rem] border border-border/45 bg-card/55 px-6 py-8">
                <h3 className="font-serif text-2xl text-foreground">What this book is for</h3>
                <ul className="mt-5 space-y-4 text-[1rem] leading-relaxed text-muted-foreground/85">
                  {book.whatItsFor.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full border border-accent/45 bg-accent/15" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.75rem] border border-border/45 bg-card/55 px-6 py-8">
                <h3 className="font-serif text-2xl text-foreground">Formats</h3>
                <div className="mt-5 flex flex-col gap-3">
                  {book.amazonLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-accent/30 bg-accent/10 px-5 py-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-foreground transition-all duration-500 hover:border-accent/55 hover:bg-accent/20"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <p className="pt-5 text-sm leading-relaxed text-muted-foreground/75">{book.availabilityNote}</p>
              </div>
            </section>
          </div>
        </section>

        <section className="space-y-6 rounded-[2rem] border border-border/45 bg-card/45 px-6 py-8 md:px-8 md:py-10">
          <div className="space-y-2 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground/65">Continue the Path</p>
            <h3 className="font-serif text-3xl text-foreground">Keep walking</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {publishedBooks.map((candidate) => {
              const isCurrent = candidate.slug === book.slug;

              return (
                <Link
                  key={candidate.slug}
                  href={candidate.slug}
                  className={`rounded-[1.5rem] border px-5 py-5 transition-colors ${
                    isCurrent
                      ? "border-accent/45 bg-accent/8"
                      : "border-border/50 bg-background/70 hover:border-accent/40"
                  }`}
                >
                  <span className="block text-xs uppercase tracking-[0.22em] text-muted-foreground/65">
                    {candidate.shortLabel}
                  </span>
                  <span className="block pt-3 font-serif text-2xl text-foreground">{candidate.title}</span>
                  <span className="block pt-3 text-sm leading-relaxed text-muted-foreground/80">
                    {candidate.quote}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </Layout>
  );
}
