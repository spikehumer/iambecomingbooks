import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function Receive() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setEmail("");
        toast.success("Thank you. You have been added to the circle.");
      } else if (data.message?.includes("already subscribed")) {
        toast.info("You are already part of the circle.");
        setEmail("");
      } else {
        toast.error(data.error || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Seo path="/receive" />

      <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-12 py-10 text-center animate-fade-in">
        <div className="space-y-5 px-4">
          <p className="text-xs tracking-[0.24em] uppercase text-muted-foreground/65">Stay Close</p>
          <h1 className="text-4xl md:text-5xl font-serif text-foreground">Receive</h1>
          <p className="mx-auto max-w-xl text-[1.12rem] md:text-[1.2rem] font-normal leading-relaxed text-muted-foreground/90">
            Occasional notes of quiet presence — reflections, not noise.
          </p>
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted-foreground/75">
            If you would like to spend time with the books first, you can visit the{" "}
            <Link
              href="/books"
              className="underline decoration-accent/50 underline-offset-4 transition-colors hover:text-foreground"
            >
              Inside the Pages
            </Link>{" "}
            or read more about{" "}
            <Link
              href="/about"
              className="underline decoration-accent/50 underline-offset-4 transition-colors hover:text-foreground"
            >
              Spike Humer
            </Link>
            .
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 px-4">
          <label className="block space-y-3 text-left">
            <span className="block text-xs tracking-[0.22em] uppercase text-muted-foreground/65">
              Email Address
            </span>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 rounded-full border-border/70 bg-background/80 px-6 text-base text-center placeholder:text-muted-foreground/45 focus-visible:ring-0 focus-visible:border-accent"
              required
            />
          </label>

          <Button
            type="submit"
            disabled={isSubmitting}
            variant="ghost"
            className="w-full rounded-full border border-accent/35 bg-accent/10 py-7 text-xs font-medium uppercase tracking-[0.22em] text-foreground transition-all duration-500 hover:bg-accent/20 hover:text-foreground"
          >
            {isSubmitting ? "Entering..." : "Enter the Circle"}
          </Button>
        </form>

        <p className="max-w-sm px-4 text-xs leading-relaxed text-muted-foreground/65">
          We respect your inbox as a sacred space. Unsubscribe at any time.
        </p>
      </section>
    </Layout>
  );
}
