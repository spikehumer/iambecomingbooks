import Layout from "@/components/Layout";
import { Link } from "wouter";

export default function StartHere() {
  return (
    <Layout>
      <div className="drift-content space-y-12 md:space-y-16 py-8 md:py-12">
        
        <header className="space-y-6 border-l border-accent/30 pl-6 md:pl-10 py-2">
          <h1 className="text-3xl md:text-4xl font-serif text-foreground">
            Welcome to this quiet space.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light italic">
            There is no rush here. No destination to reach.
          </p>
        </header>

        <div className="prose prose-lg prose-stone prose-p:font-light prose-p:leading-loose prose-p:mb-12 prose-headings:font-serif prose-headings:font-normal max-w-none text-muted-foreground/90">
          <p>
            If you have found your way here, you may be seeking a moment of stillness in a noisy world.
          </p>
          <p>
            Or perhaps you are simply ready to begin.
          </p>
          <p>
            <em>I Am Becoming</em> is not a program to follow. It is a companion for where you already are — a collection of journal entries, mantras, and reflections born from the honest journey of living and the enduring presence of love.
          </p>
          <p>
            This work invites you to slow down. To breathe. To honor the shape of your own becoming.
          </p>
          
          <h3 className="text-2xl pt-8 pb-4 text-foreground/80">Being here</h3>
          <p>
            Wander freely. Read a page, then close the tab. Stay as long as you need, or leave whenever you're ready. There is no right way to be here.
          </p>
          <p>
            If you feel called, explore the <Link href="/books"><a className="underline decoration-accent/50 underline-offset-4 hover:text-foreground transition-colors">forthcoming volumes of the I Am Becoming Book Series</a></Link> or learn more <Link href="/about"><a className="underline decoration-accent/50 underline-offset-4 hover:text-foreground transition-colors">About</a></Link> the origin of these writings.
          </p>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50 my-12" />
        
        <div className="flex justify-center">
           <img 
            src="/images/texture-paper.jpg" 
            alt="Paper texture" 
            className="w-24 h-24 rounded-full object-cover opacity-20 mix-blend-multiply"
          />
        </div>

      </div>
    </Layout>
  );
}
