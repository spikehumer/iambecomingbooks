import { Link, useLocation } from "wouter";

import { cn } from "@/lib/utils";

const footerLinks = [
  { name: "Privacy Policy", path: "/privacy" },
  { name: "Terms of Use", path: "/terms" },
  { name: "Contact", path: "/contact" },
];

const navItems = [
  { name: "Invitation", path: "/" },
  { name: "Inside the Pages", path: "/books" },
  { name: "The Author", path: "/about" },
  { name: "Join the Circle", path: "/receive" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-accent/20">
      <header className="w-full border-b border-border/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85 sticky top-0 z-40">
        <div className="container flex flex-col gap-5 py-5 md:flex-row md:items-center md:justify-between md:py-6">
          <Link
            href="/"
            className="text-center md:text-left font-serif text-xl md:text-2xl tracking-[0.24em] uppercase text-foreground/90 hover:text-foreground transition-colors duration-500"
          >
            I Am Becoming
          </Link>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <nav aria-label="Primary">
              <ul className="flex flex-wrap justify-center gap-x-5 gap-y-3 md:gap-x-7 text-[0.72rem] md:text-xs font-medium tracking-[0.22em] uppercase text-muted-foreground/85">
                {navItems.map((item) => {
                  const isActive = location === item.path;

                  return (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        className={cn(
                          "relative inline-block py-1 transition-colors duration-500 hover:text-foreground",
                          isActive ? "text-foreground" : ""
                        )}
                      >
                        {item.name}
                        <span
                          className={cn(
                            "absolute left-0 bottom-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500",
                            isActive ? "scale-x-100 bg-foreground/25" : "group-hover:scale-x-100"
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <Link
              href="/the-companion"
              className="inline-flex items-center justify-center rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 text-[0.7rem] md:text-xs font-medium tracking-[0.18em] uppercase text-foreground/90 transition-all duration-500 hover:bg-accent/20 hover:border-accent/60"
            >
              Begin with The Companion
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow container py-10 md:py-16">{children}</main>

      <footer className="w-full py-12 mt-auto border-t border-border/40">
        <div className="container flex flex-col items-center justify-center gap-5 text-center">
          <p className="font-serif italic text-muted-foreground text-lg md:text-xl">
            "Becoming is not a destination. It is a devotion."
          </p>
          <p className="text-xs text-muted-foreground/60 tracking-[0.2em] uppercase">
            — Spike Humer
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-1 text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground/70">
            {footerLinks.map((item) => (
              <Link key={item.path} href={item.path} className="transition-colors hover:text-foreground">
                {item.name}
              </Link>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/60 tracking-[0.18em] uppercase pt-1">
            © 2026 SoulWord Press. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
