import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { aboutPageContent } from "@shared/siteContent";
import { Link } from "wouter";

export default function About() {
  return (
    <Layout>
      <Seo path="/about" />

      <div className="mx-auto max-w-5xl space-y-16 py-4 md:py-8 animate-fade-in">
        <section className="grid gap-10 md:grid-cols-[220px_minmax(0,1fr)] md:items-start">
          <div className="mx-auto w-40 overflow-hidden rounded-full border border-border/50 md:w-[220px]">
            <picture>
              <source
                type="image/webp"
                srcSet="/images/author-portrait-256.webp 256w, /images/author-portrait-512.webp 512w"
                sizes="(min-width: 768px) 220px, 160px"
              />
              <img
                src="/images/author-portrait-512.webp"
                alt="Spike Humer"
                className="h-full w-full object-cover grayscale transition-all duration-1000 hover:grayscale-0"
                width="512"
                height="512"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>

          <div className="space-y-6 text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground/65">About the Author</p>
            <h1 className="font-serif text-4xl text-foreground md:text-5xl">{aboutPageContent.title}</h1>
            <p className="max-w-2xl text-[1.08rem] leading-relaxed text-muted-foreground/85 md:text-[1.15rem]">
              Spike Humer is the author of the <em>I Am Becoming</em> series — a nine-volume path
              of reflection, presence, and remembering published by SoulWord Press.
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-border/40 bg-card/55 px-6 py-8 md:px-10 md:py-10">
          <div className="space-y-6 text-[1.04rem] leading-relaxed text-muted-foreground/88 md:text-[1.1rem]">
            {aboutPageContent.introduction.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-border/40 bg-card/45 px-6 py-8 md:px-10 md:py-10">
          <div className="space-y-5">
            <h2 className="font-serif text-3xl text-foreground md:text-4xl">
              {aboutPageContent.soulWordPressTitle}
            </h2>
            <div className="space-y-5 text-[1.02rem] leading-relaxed text-muted-foreground/85 md:text-[1.08rem]">
              {aboutPageContent.soulWordPressBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <Link
            href="/books"
            className="rounded-[1.5rem] border border-border/50 bg-background/70 px-6 py-6 transition-colors hover:border-accent/45"
          >
            <span className="block text-xs uppercase tracking-[0.22em] text-muted-foreground/65">
              Inside the Pages
            </span>
            <span className="block pt-3 font-serif text-2xl text-foreground">Explore the published books</span>
          </Link>
          <Link
            href="/receive"
            className="rounded-[1.5rem] border border-border/50 bg-background/70 px-6 py-6 transition-colors hover:border-accent/45"
          >
            <span className="block text-xs uppercase tracking-[0.22em] text-muted-foreground/65">
              Join the Circle
            </span>
            <span className="block pt-3 font-serif text-2xl text-foreground">Receive occasional reflections</span>
          </Link>
        </section>
      </div>
    </Layout>
  );
}
