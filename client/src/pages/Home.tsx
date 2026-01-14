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
      </div>
    </Layout>
  );
}
