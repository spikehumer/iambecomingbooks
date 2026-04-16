import Layout from "@/components/Layout";
import Seo from "@/components/Seo";

export default function Contact() {
  return (
    <Layout>
      <Seo path="/contact" />
      <div className="mx-auto max-w-4xl space-y-10 py-4 md:py-8 animate-fade-in">
        <header className="space-y-4 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground/65">Contact</p>
          <h1 className="font-serif text-4xl text-foreground md:text-5xl">Get in Touch</h1>
          <p className="text-[1.04rem] leading-relaxed text-muted-foreground/85 md:text-[1.1rem]">
            If you would like to reach out regarding the books, speaking, media, or related
            inquiries, you are welcome to be in touch.
          </p>
        </header>

        <div className="rounded-[2rem] border border-border/45 bg-card/55 px-6 py-8 md:px-10 md:py-10">
          <div className="space-y-5 text-[1.02rem] leading-relaxed text-muted-foreground/88">
            <p>
              For general inquiries, collaboration requests, or questions related to the <em>I Am
              Becoming</em> series, please email:
            </p>
            <p className="font-serif text-2xl text-foreground">hello@iambecomingbooks.com</p>
            <p>
              If the message is a reader note, thank you in advance for the care behind it. If it
              is a professional inquiry, including media, podcast, workshop, or speaking-related
              outreach, please include a little context so the conversation can begin clearly.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
