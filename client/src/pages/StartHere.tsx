import Layout from "@/components/Layout";

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

        <div className="prose prose-lg prose-stone prose-p:font-light prose-p:leading-loose prose-headings:font-serif prose-headings:font-normal max-w-none text-muted-foreground/90">
          <p>
            If you have found your way here, you may be carrying something heavy. 
            Or perhaps you are simply seeking a moment of stillness in a noisy world.
          </p>
          <p>
            <em>I Am Becoming</em> is not a program to fix you. It is a companion for where you are right now.
            It is a collection of journal entries, mantras, and reflections born from the raw, honest journey of grief and the enduring power of love.
          </p>
          <p>
            This work invites you to slow down. To breathe. To honor the complexity of your own becoming.
          </p>
          
          <h3 className="text-2xl pt-8 pb-4 text-foreground/80">How to use this space</h3>
          <p>
            Wander freely. Read a page, then close the tab. Stay as long as you need, or leave as soon as you wish.
            There is no right way to be here.
          </p>
          <p>
            If you feel called, you can explore the <a href="/books" className="underline decoration-accent/50 underline-offset-4 hover:text-foreground transition-colors">Book Series</a> or learn more <a href="/about" className="underline decoration-accent/50 underline-offset-4 hover:text-foreground transition-colors">About</a> the origin of these writings.
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
