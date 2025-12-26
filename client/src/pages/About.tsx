import Layout from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="drift-content space-y-12 py-8 md:py-12">
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
          {/* Author Image - Small and Artistic */}
          <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 overflow-hidden rounded-full border border-border/50">
            <img 
              src="/images/author-portrait-placeholder.jpg" 
              alt="Spike Humer" 
              className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>

          <header className="space-y-4 text-center md:text-left pt-4">
            <h1 className="text-3xl md:text-4xl font-serif text-foreground">
              About the Author
            </h1>
            <p className="text-lg text-foreground/80 font-normal italic">
              Spike Humer
            </p>
          </header>
        </div>

        <div className="prose prose-lg prose-stone prose-p:font-normal prose-p:leading-loose max-w-none text-foreground/90 border-l border-accent/20 pl-6 md:pl-10">
          <p>
            I write to remember. I write to heal. I write to find the path back to myself.
          </p>
          <p>
            My work is born from the deepest parts of my own human experience—the joy, the sorrow, the loss, and the love. 
            I do not claim to have answers. I only have my own questions, and the willingness to sit with them until they reveal their own quiet truths.
          </p>
          <p>
            <em>I Am Becoming</em> is a reflection of my journey through grief, particularly the profound loss that changes the landscape of a life forever. 
            It is my offering to you, a fellow traveler.
          </p>
          <p>
            I believe that we are all constantly becoming. It is not a process that ends, but a devotion we practice every day. 
            Thank you for the gift of this day, and for sharing this space with me.
          </p>
          <p className="pt-4 font-serif italic text-foreground/80">
            Namaste.
          </p>
        </div>

      </div>
    </Layout>
  );
}
