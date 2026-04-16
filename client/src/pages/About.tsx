import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { Link } from "wouter";

export default function About() {
  return (
    <Layout>
      <Seo path="/about" />

      <div className="drift-content space-y-12 py-8 md:py-12 animate-fade-in">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
          <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 overflow-hidden rounded-full border border-border/50">
            <picture>
              <source
                type="image/webp"
                srcSet="/images/author-portrait-256.webp 256w, /images/author-portrait-512.webp 512w"
                sizes="(min-width: 768px) 10rem, 8rem"
              />
              <img
                src="/images/author-portrait-512.webp"
                alt="Spike Humer"
                className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-1000"
                width="512"
                height="512"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>

          <header className="space-y-4 text-center md:text-left pt-4">
            <h1 className="text-3xl md:text-4xl font-serif text-foreground">About the Author</h1>
            <p className="text-lg text-foreground/80 font-normal italic">Spike Humer</p>
          </header>
        </div>

        <div className="space-y-8 text-muted-foreground/90 border-l border-accent/20 pl-6 md:pl-10 text-[1.17rem] leading-loose font-normal">
          <p>I write to remember what I’ve always known but sometimes forget.</p>

          <p>
            My work is born from the deepest parts of my own human experience—the becoming, the returning, the slow discovery that presence matters more than performance.
          </p>

          <p>
            I do not claim to have answers. I only have my own questions, and the willingness to stay with them until something true emerges.
          </p>

          <p>
            <em>I Am Becoming</em> is an invitation to the path I walk every day—toward alignment, toward honesty, toward the self that was always there beneath the roles and expectations.
          </p>

          <p>
            If you would like to encounter the work itself, the <Link href="/books" className="underline decoration-accent/50 underline-offset-4 hover:text-foreground transition-colors">Books page</Link> is the best place to begin with <em>The Waking</em>. If you prefer a gentler entrance, you can also visit <Link href="/start-here" className="underline decoration-accent/50 underline-offset-4 hover:text-foreground transition-colors">Start Here</Link> before moving into the series.
          </p>

          <p>It is my offering to you, a fellow traveler.</p>

          <p>
            We are all constantly becoming. Not toward some finished version of ourselves, but deeper into who we already are.
          </p>

          <div className="pt-4 space-y-2">
            <p>Thank you for the gift of this day, and for walking this part of the journey with me.</p>
            <p className="font-serif italic text-foreground/80 text-xl pt-2">Namaste.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
