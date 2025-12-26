import Layout from "@/components/Layout";

export default function Books() {
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center lg:items-start py-8 md:py-16">
        
        {/* Book Cover Image - Floating and Soft */}
        <div className="w-full max-w-md lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative group">
            <div className="absolute -inset-4 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <img 
              src="/images/book-3d.jpg" 
              alt="I Am Becoming: Book One" 
              className="relative w-full max-w-[300px] md:max-w-[400px] shadow-xl shadow-muted-foreground/20 rounded-sm opacity-100 transition-all duration-700 transform hover:-translate-y-1"
            />
          </div>
        </div>

        {/* Book Details - Minimal and Descriptive */}
        <div className="w-full lg:w-1/2 space-y-10 text-center lg:text-left">
          <div className="space-y-2">
            <h2 className="text-sm tracking-[0.2em] uppercase text-muted-foreground">Book One</h2>
            <h1 className="text-4xl md:text-5xl font-serif text-foreground">The Waking</h1>
            <p className="text-lg font-serif italic text-muted-foreground/80 pt-2">
              A Journal of Mantras, Reflections, and Sacred Writing
            </p>
          </div>

          <div className="prose prose-stone prose-p:font-light prose-p:leading-loose text-muted-foreground/90 max-w-md mx-auto lg:mx-0">
            <p>
              <em>"Becoming is not a destination. It is a devotion."</em>
            </p>
            <p>
              <strong>The Waking</strong> is the first volume in the <em>I Am Becoming</em> series. 
              It is a collection of 20 intimate entries that traverse the landscape of loss, offering a hand to hold in the dark.
            </p>
            <p>
              Written for those who are learning to rise gently, this book creates a sanctuary for the heart. 
              It acknowledges the pain of grief while illuminating the enduring presence of love.
            </p>
          </div>

          <div className="pt-4 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4 justify-center lg:justify-start items-center">
              <span className="text-sm font-light text-muted-foreground tracking-wide">
                Available soon in Paperback & Kindle
              </span>
            </div>
            
            {/* Subtle separator */}
            <div className="w-12 h-px bg-border mx-auto lg:mx-0" />
            
            <p className="text-xs text-muted-foreground/60 font-light max-w-xs mx-auto lg:mx-0">
              ISBN: [Pending] <br/>
              Published by [Imprint Name]
            </p>
          </div>
        </div>

      </div>
    </Layout>
  );
}
