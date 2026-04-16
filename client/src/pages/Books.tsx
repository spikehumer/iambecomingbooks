import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { Link } from "wouter";

export default function Books() {
  return (
    <Layout>
      <Seo path="/books" />

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-center lg:items-start py-12 md:py-24 animate-fade-in">
        <div className="w-full max-w-md lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative group">
            <div className="absolute -inset-4 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <picture>
              <source
                type="image/webp"
                srcSet="/images/book-3d-480.webp 480w, /images/book-3d-800.webp 800w"
                sizes="(min-width: 1024px) 33vw, 80vw"
              />
              <img
                src="/images/book-3d-800.webp"
                alt="I Am Becoming: The Waking - Book One"
                className="relative w-full max-w-[300px] md:max-w-[400px] shadow-xl shadow-muted-foreground/20 rounded-sm opacity-100 transition-all duration-700 transform hover:-translate-y-1"
                width="800"
                height="800"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-12 text-center lg:text-left">
          <div className="space-y-4">
            <h2 className="text-sm tracking-[0.2em] uppercase text-muted-foreground">Book One</h2>
            <h1 className="text-4xl md:text-5xl font-serif text-foreground">The Waking</h1>
            <p className="text-lg font-serif italic text-muted-foreground/80 pt-2">
              A Journal of Mantras, Reflections, and Sacred Writing
            </p>
          </div>
          <div className="space-y-8 text-muted-foreground/90 max-w-md mx-auto lg:mx-0 text-[1.17rem] leading-loose font-normal">
            <p>
              <em>&quot;Becoming is not a destination. It is a devotion.&quot;</em>
            </p>
            <p>
              <strong>The Waking</strong> is the first volume in the <em>I Am Becoming</em> series, a collection of nine books designed to accompany you through the unfolding seasons of the self.
            </p>
            <p>
              This first offering contains 20 intimate entries that traverse the landscape of the heart, offering a hand to hold in the quiet moments.
            </p>
            <p>
              Written for those who are learning to rise gently, this book creates a sanctuary for the spirit. It honors the depth of our experience while illuminating the enduring presence of love.
            </p>
            <p>
              If you are new to the work, the <Link href="/start-here" className="underline decoration-accent/50 underline-offset-4 hover:text-foreground transition-colors">Start Here page</Link> offers a gentle entrance into the path, while <Link href="/about" className="underline decoration-accent/50 underline-offset-4 hover:text-foreground transition-colors">About</Link> shares more of Spike Humer&apos;s voice and the intention behind these writings.
            </p>
          </div>
          <div className="pt-8 space-y-6">
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center">
              <a
                href="https://www.amazon.com/s?k=the+waking+spike+humer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-accent/10 hover:bg-accent/20 border border-accent/30 hover:border-accent text-accent hover:text-accent transition-all duration-700 tracking-widest uppercase text-sm font-medium rounded-sm"
              >
                Begin with Book One
              </a>
              <span className="text-sm font-normal text-muted-foreground/90 tracking-wide">Available January 23, 2026</span>
            </div>

            <div className="w-12 h-px bg-border mx-auto lg:mx-0" />

            <p className="text-xs text-muted-foreground/80 font-normal max-w-xs mx-auto lg:mx-0">
              ISBN: 978-0-9855419-9-6 <br />
              Published by SoulWord Press
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 pt-2">
            <Link
              href="/start-here"
              className="block rounded-sm border border-border/60 px-5 py-4 text-left hover:border-accent/60 transition-colors"
            >
              <span className="block text-xs tracking-[0.2em] uppercase text-muted-foreground/70">Start Here</span>
              <span className="block pt-2 text-lg font-serif text-foreground">Begin the journey gently</span>
            </Link>
            <Link
              href="/about"
              className="block rounded-sm border border-border/60 px-5 py-4 text-left hover:border-accent/60 transition-colors"
            >
              <span className="block text-xs tracking-[0.2em] uppercase text-muted-foreground/70">About the Author</span>
              <span className="block pt-2 text-lg font-serif text-foreground">Meet Spike Humer</span>
            </Link>
            <Link
              href="/receive"
              className="block rounded-sm border border-border/60 px-5 py-4 text-left hover:border-accent/60 transition-colors sm:col-span-2"
            >
              <span className="block text-xs tracking-[0.2em] uppercase text-muted-foreground/70">Receive</span>
              <span className="block pt-2 text-lg font-serif text-foreground">Stay close to future volumes and reflections</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
