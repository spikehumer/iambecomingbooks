import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { Link } from "wouter";

export default function Home() {
  return (
    <Layout>
      <Seo path="/" />

      <div className="flex flex-col items-center justify-center min-h-screen gap-12 md:gap-20">
        <div className="w-full max-w-6xl px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="w-full overflow-hidden relative aspect-[4/3] md:aspect-[3/2] opacity-90 order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
              <picture>
                <source
                  type="image/webp"
                  srcSet="/images/hero-dawn-960.webp 960w, /images/hero-dawn-1600.webp 1600w"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <img
                  src="/images/hero-dawn-1600.webp"
                  alt="Ethereal morning light"
                  className="w-full h-full object-cover object-center opacity-80 hover:opacity-100 transition-opacity duration-[2000ms]"
                  width="1600"
                  height="893"
                  fetchPriority="low"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>

            <div className="w-full flex justify-center lg:justify-start order-1 lg:order-2">
              <div className="relative group max-w-sm">
                <div className="absolute -inset-4 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <picture>
                  <source
                    type="image/webp"
                  srcSet="/images/book-cover-mockup-480.webp 480w, /images/book-cover-mockup-640.webp 640w, /images/book-cover-mockup-800.webp 800w"
                  sizes="(min-width: 1024px) 24rem, 80vw"

                  />
                  <img
                    src="/images/book-cover-mockup-640.webp"
                    alt="I Am Becoming: The Waking - Book One"
                    className="relative w-full shadow-2xl shadow-muted-foreground/20 rounded-sm opacity-100 transition-all duration-700 transform hover:-translate-y-1"
                    width="800"
                    height="1433"
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl text-center space-y-8 px-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-foreground/90 leading-tight">
            The waking comes <br />
            <span className="text-muted-foreground/90">before the rising.</span>
          </h1>

          <h2 className="text-[1.2rem] md:text-[1.35rem] font-normal text-muted-foreground/90 leading-relaxed max-w-lg mx-auto">
            A quiet space for the <em>I Am Becoming</em> book series. <br />
            Reflections, mantras, and sacred writing for the journey of awakening, healing, and love.
          </h2>

          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/start-here"
              className="inline-block px-8 py-3 border border-border hover:border-accent text-muted-foreground hover:text-foreground transition-all duration-700 tracking-widest uppercase text-sm font-medium rounded-sm"
            >
              Begin Here
            </Link>
            <a
              href="https://www.amazon.com/s?k=the+waking+spike+humer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-accent/10 hover:bg-accent/20 border border-accent/30 hover:border-accent text-accent hover:text-accent transition-all duration-700 tracking-widest uppercase text-sm font-medium rounded-sm"
            >
              Begin with Book One
            </a>
          </div>
        </div>

        <div className="w-full max-w-3xl mt-12 md:mt-20 pt-12 md:pt-20 border-t border-border/30">
          <div className="space-y-8 px-4 md:px-0">
            <div className="space-y-2">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/60 font-normal">
                A Glimpse Inside
              </p>
              <h3 className="text-2xl md:text-3xl font-serif text-foreground">From The Waking</h3>
            </div>
            <div className="space-y-6 max-w-2xl">
              <p className="text-lg md:text-xl font-serif italic text-foreground/80 leading-relaxed">
                The waking comes before the rising.
              </p>
              <div className="space-y-4 text-[1.1rem] md:text-[1.15rem] text-muted-foreground/85 leading-relaxed font-normal">
                <p>
                  Before we stand, before we move into the day, there is a moment of opening. A moment where we remember ourselves. Not the version we perform, not the self we show the world—but the quiet presence that has been here all along, waiting beneath the noise.
                </p>
                <p>
                  This is where the work begins. Not in the doing, but in the returning. To breath. To stillness. To the simple truth that we are enough, exactly as we are in this moment.
                </p>
                <p>
                  The becoming is not about becoming someone new. It is about waking to who we have always been. It is about honoring the shape of your own journey, the pace of your own unfolding.
                </p>
                <p>
                  There is no rush here. No destination to reach. Only the gentle invitation to slow down, to breathe, and to remember.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/start-here"
                  className="inline-block text-sm md:text-base text-muted-foreground hover:text-foreground underline decoration-accent/40 underline-offset-4 transition-colors duration-500 font-normal"
                >
                  Explore the full work →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
