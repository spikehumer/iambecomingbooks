import Layout from "@/components/Layout";
import { Link } from "wouter";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "I Am Becoming | The Waking by Spike Humer";
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-12 md:gap-20">
        
        {/* Hero Image Section - Ethereal and Spacious */}
        <div className="w-full max-w-4xl overflow-hidden relative aspect-[21/9] md:aspect-[21/8] opacity-90">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <img 
            src="/images/hero-dawn.jpg" 
            alt="Ethereal morning light" 
            className="w-full h-full object-cover object-center opacity-80 hover:opacity-100 transition-opacity duration-[2000ms]"
          />
        </div>

        {/* Text Content - Centered but drifting */}
        <div className="max-w-2xl text-center space-y-8 px-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-foreground/90 leading-tight">
            The waking comes <br/>
            <span className="text-muted-foreground/90">before the rising.</span>
          </h1>
          
          <h2 className="text-[1.2rem] md:text-[1.35rem] font-normal text-muted-foreground/90 leading-relaxed max-w-lg mx-auto">
            A quiet space for the <em>I Am Becoming</em> book series. <br/>
            Reflections, mantras, and sacred writing for the journey of awakening, healing, and love.
          </h2>

          <div className="pt-8">
            <Link href="/start-here" className="inline-block px-8 py-3 border border-border hover:border-accent text-muted-foreground hover:text-foreground transition-all duration-700 tracking-widest uppercase text-sm font-medium rounded-sm">
                Begin Here
            </Link>
          </div>
        </div>

        {/* Excerpt Section - A Glimpse Inside */}
        <div className="w-full max-w-3xl mt-12 md:mt-20 pt-12 md:pt-20 border-t border-border/30">
          <div className="space-y-8 px-4 md:px-0">
            <div className="space-y-2">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/60 font-normal">
                A Glimpse Inside
              </p>
              <h3 className="text-2xl md:text-3xl font-serif text-foreground">
                From The Waking
              </h3>
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
                <Link href="/start-here" className="inline-block text-sm md:text-base text-muted-foreground hover:text-foreground underline decoration-accent/40 underline-offset-4 transition-colors duration-500 font-normal">
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
