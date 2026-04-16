import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { publishedBooks } from "@shared/books";
import { Link } from "wouter";

export default function Books() {
  return (
    <Layout>
      <Seo path="/books" />

      <div className="mx-auto max-w-6xl space-y-16 py-4 md:py-8 animate-fade-in">
        <section className="mx-auto max-w-4xl space-y-6 text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground/65">Inside the Pages</p>
          <h1 className="font-serif text-4xl text-foreground md:text-5xl">The Published Volumes</h1>
          <p className="text-[1.08rem] leading-relaxed text-muted-foreground/85 md:text-[1.15rem]">
            Three volumes are available now. Each is a doorway into the larger <em>I Am Becoming</em>{" "}
            path, and each meets a different season of the inner life.
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-3">
          {publishedBooks.map((book, index) => (
            <article
              key={book.slug}
              className="flex h-full flex-col rounded-[2rem] border border-border/50 bg-card/65 p-6"
            >
              <div className="mx-auto flex w-full max-w-[220px] flex-col justify-between rounded-[1.5rem] border border-accent/20 bg-gradient-to-b from-background via-card to-muted/20 px-6 py-8 text-center aspect-[2/3]">
                <span className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground/65">
                  {book.shortLabel}
                </span>
                <div className="space-y-3">
                  <h2 className="font-serif text-3xl text-foreground">{book.title}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground/75">{book.subtitle}</p>
                </div>
                <span className="text-xs uppercase tracking-[0.22em] text-accent/80">SoulWord Press</span>
              </div>

              <div className="flex flex-1 flex-col space-y-5 pt-7 text-center">
                <p className="text-lg font-serif italic text-foreground/85">“{book.quote}”</p>
                <p className="text-[1rem] leading-relaxed text-muted-foreground/85">{book.summary}</p>
                <p className="text-sm text-muted-foreground/75">{book.availabilityNote}</p>
                <div className="flex flex-wrap justify-center gap-3">
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
                  className="pt-2 text-sm text-muted-foreground underline decoration-accent/40 underline-offset-4 transition-colors hover:text-foreground"
                >
                  Read more
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <Link
            href="/start-here"
            className="rounded-[1.5rem] border border-border/50 bg-background/70 px-6 py-6 transition-colors hover:border-accent/45"
          >
            <span className="block text-xs uppercase tracking-[0.22em] text-muted-foreground/65">Start Here</span>
            <span className="block pt-3 font-serif text-2xl text-foreground">Find a gentle entrance</span>
          </Link>
          <Link
            href="/about"
            className="rounded-[1.5rem] border border-border/50 bg-background/70 px-6 py-6 transition-colors hover:border-accent/45"
          >
            <span className="block text-xs uppercase tracking-[0.22em] text-muted-foreground/65">The Author</span>
            <span className="block pt-3 font-serif text-2xl text-foreground">Read about Spike</span>
          </Link>
          <Link
            href="/receive"
            className="rounded-[1.5rem] border border-border/50 bg-background/70 px-6 py-6 transition-colors hover:border-accent/45"
          >
            <span className="block text-xs uppercase tracking-[0.22em] text-muted-foreground/65">Join the Circle</span>
            <span className="block pt-3 font-serif text-2xl text-foreground">Receive quiet reflections</span>
          </Link>
        </section>
      </div>
    </Layout>
  );
}
