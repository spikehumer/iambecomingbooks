import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Start Here", path: "/start-here" },
    { name: "The Book Series", path: "/books" },
    { name: "About", path: "/about" },
    { name: "Receive", path: "/receive" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-accent/20">
      {/* Navigation - Minimal and Top Aligned */}
      <header className="w-full py-8 md:py-12 animate-fade-in">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <Link href="/">
            <a className="font-serif text-2xl md:text-3xl tracking-wider hover:text-foreground/80 transition-colors duration-500">
              I Am Becoming
            </a>
          </Link>
          
          <nav>
            <ul className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm md:text-base font-normal tracking-widest uppercase text-muted-foreground">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link href={item.path}>
                    <a 
                      className={cn(
                        "hover:text-foreground transition-colors duration-500 relative group py-1",
                        location === item.path ? "text-foreground" : ""
                      )}
                    >
                      {item.name}
                      <span className={cn(
                        "absolute bottom-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100",
                        location === item.path ? "scale-x-100 bg-foreground/20" : ""
                      )} />
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container py-12 md:py-20 animate-fade-in delay-100">
        {children}
      </main>

      {/* Footer - Minimal */}
      <footer className="w-full py-12 mt-auto border-t border-border/40">
        <div className="container flex flex-col items-center justify-center gap-4 text-center">
          <p className="font-serif italic text-muted-foreground text-lg">
            "Becoming is not a destination. It is a devotion."
          </p>
          <p className="text-xs text-muted-foreground/60 tracking-widest uppercase mt-4">
            © 2026 SoulWord Press. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
