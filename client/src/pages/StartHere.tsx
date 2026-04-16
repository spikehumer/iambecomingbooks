import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { Link } from "wouter";

export default function StartHere() {
  return (
    <Layout>
      <Seo path="/start-here" />

      <div className="drift-content space-y-12 md:space-y-16 py-8 md:py-12 animate-fade-in">
        <header className="space-y-6 border-l border-accent/30 pl-6 md:pl-10 py-2">
          <h1 className="text-3xl md:text-4xl font-serif text-foreground">Welcome to this quiet space.</h1>
          <p className="text-[1.17rem] md:text-[1.3rem] text-muted-foreground/90 font-normal italic">
            There is no rush here. No destination to reach.
          </p>
        </header>

        <div className="space-y-12 text-muted-foreground/90 max-w-none text-[1.17rem] leading-loose font-normal">
          <p>
            If you have found your way here, you may be seeking a moment of stillness in a noisy world. Or perhaps you are simply ready to begin.
          </p>
          <p>
            <em>I Am Becoming</em> is not a program to follow. It is a companion for where you already are — a collection of journal entries, mantras, and reflections born from the honest journey of living and the enduring presence of love.
          </p>
          <p>
            This work invites you to slow down. To breathe. To honor the shape of your own becoming.
          </p>

          <div>
            <h3 className="text-2xl pt-8 pb-4 text-foreground/80 font-serif font-normal">Being here</h3>
            <p className="mb-12">
              Wander freely. Read a page, then close the tab. Stay as long as you need, or leave whenever you&apos;re ready. There is no right way to be here.
            </p>
            <p>
              If you feel called, begin with the <Link href="/books" className="underline decoration-accent/50 underline-offset-4 hover:text-foreground transition-colors">Books page</Link> to explore <em>The Waking</em>, or spend a moment on <Link href="/about" className="underline decoration-accent/50 underline-offset-4 hover:text-foreground transition-colors">About</Link> to learn more about Spike Humer and the origin of these writings.
            </p>
            <p className="pt-6">
              If these words feel like a companion you would like to return to, you can also <Link href="/receive" className="underline decoration-accent/50 underline-offset-4 hover:text-foreground transition-colors">Receive occasional reflections</Link> and quiet updates from the work.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 pt-4">
          <Link
            href="/books"
            className="block rounded-sm border border-border/60 px-6 py-5 text-left hover:border-accent/60 transition-colors"
          >
            <span className="block text-xs tracking-[0.2em] uppercase text-muted-foreground/70">Continue</span>
            <span className="block pt-2 text-xl font-serif text-foreground">Explore the Books</span>
            <span className="block pt-2 text-sm text-muted-foreground/85">
              See where to begin with <em>The Waking</em> and the wider series.
            </span>
          </Link>
          <Link
            href="/receive"
            className="block rounded-sm border border-border/60 px-6 py-5 text-left hover:border-accent/60 transition-colors"
          >
            <span className="block text-xs tracking-[0.2em] uppercase text-muted-foreground/70">Stay Connected</span>
            <span className="block pt-2 text-xl font-serif text-foreground">Receive Reflections</span>
            <span className="block pt-2 text-sm text-muted-foreground/85">
              Join the circle for occasional notes, updates, and gentle invitations back to the work.
            </span>
          </Link>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50 my-12" />

        <div className="flex justify-center">
          <picture>
            <source type="image/webp" srcSet="/images/texture-paper-128.webp 128w, /images/texture-paper-256.webp 256w" sizes="6rem" />
            <img
              src="/images/texture-paper-256.webp"
              alt="Paper texture"
              className="w-24 h-24 rounded-full object-cover opacity-20 mix-blend-multiply"
              width="256"
              height="143"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
      </div>
    </Layout>
  );
}
