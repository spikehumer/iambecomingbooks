import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export default function Receive() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      toast.success("Thank you. You have been added to the list.");
    }, 1000);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[50vh] py-12 text-center space-y-10">
        
        <div className="space-y-4 max-w-lg mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif text-foreground">
            Receive
          </h1>
          <p className="text-[1.17rem] font-normal text-muted-foreground/90 leading-relaxed">
            A gentle invitation to stay connected. <br/>
            Receive occasional updates on the <em>I Am Becoming</em> series.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6 px-4">
          <div className="space-y-2">
            <Input 
              type="email" 
              placeholder="your@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-center bg-transparent border-b border-border border-t-0 border-x-0 rounded-none focus-visible:ring-0 focus-visible:border-accent px-4 py-3 placeholder:text-muted-foreground/40 font-normal transition-colors"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            variant="ghost"
            className="w-full hover:bg-accent/10 text-muted-foreground hover:text-foreground tracking-widest uppercase text-xs py-6 transition-all duration-500"
          >
            {isSubmitting ? "Sending..." : "Join the Circle"}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground/60 font-normal max-w-xs mx-auto pt-8">
          No spam. No noise. Just the work.
        </p>

      </div>
    </Layout>
  );
}
