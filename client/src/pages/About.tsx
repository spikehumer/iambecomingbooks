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

        <div className="prose prose-lg prose-stone max-w-none text-muted-foreground/90 border-l border-accent/20 pl-6 md:pl-10 space-y-8">
          <p className="font-normal leading-loose">
            I write to remember what I’ve always known but sometimes forget.
          </p>
          
          <p className="font-normal leading-loose">
            My work is born from the deepest parts of my own human experience—the becoming, the returning, the slow discovery that presence matters more than performance.
          </p>
          
          <p className="font-normal leading-loose">
            I do not claim to have answers. I only have my own questions, and the willingness to stay with them until something true emerges.
          </p>
          
          <p className="font-normal leading-loose">
            <em>I Am Becoming</em> is an invitation to the path I walk every day—toward alignment, toward honesty, toward the self that was always there beneath the roles and expectations.
          </p>
          
          <p className="font-normal leading-loose">
            It is my offering to you, a fellow traveler.
          </p>
          
          <p className="font-normal leading-loose">
            We are all constantly becoming. Not toward some finished version of ourselves, but deeper into who we already are.
          </p>
          
          <div className="pt-4 space-y-2">
            <p className="font-normal leading-loose">
              Thank you for the gift of this day, and for walking this part of the journey with me.
            </p>
            <p className="font-serif italic text-foreground/80 text-xl pt-2">
              Namaste.
            </p>
          </div>
        </div>

      </div>
    </Layout>
  );
}
