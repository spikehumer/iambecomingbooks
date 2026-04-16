import Layout from "@/components/Layout";
import Seo from "@/components/Seo";

export default function Privacy() {
  return (
    <Layout>
      <Seo path="/privacy" />
      <div className="mx-auto max-w-4xl space-y-10 py-4 md:py-8 animate-fade-in">
        <header className="space-y-4 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground/65">Legal</p>
          <h1 className="font-serif text-4xl text-foreground md:text-5xl">Privacy Policy</h1>
          <p className="text-[1.04rem] leading-relaxed text-muted-foreground/85 md:text-[1.1rem]">
            We treat your information with care and respect. This page explains what is collected,
            how it is used, and how your privacy is honored on this site.
          </p>
        </header>

        <div className="space-y-8 text-[1.02rem] leading-relaxed text-muted-foreground/88">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-foreground">Information you share</h2>
            <p>
              If you choose to join the mailing list, we collect the email address you provide so we
              can send occasional reflections, updates, and related notes from SoulWord Press.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-foreground">How your information is used</h2>
            <p>
              Your information is used only to communicate with you, respond to your inquiries, and
              support the reader relationship you have chosen to begin with this site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-foreground">What we do not do</h2>
            <p>
              We do not sell your personal information. We do not knowingly share your information
              for unrelated marketing purposes. We do not use your inbox casually.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-foreground">Third-party services</h2>
            <p>
              This site may use trusted third-party tools for email delivery, hosting, analytics, or
              commerce. Those providers may process limited information as needed to perform their
              services securely and effectively.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-foreground">Your choices</h2>
            <p>
              You may unsubscribe from email communications at any time by using the unsubscribe link
              included in any message or by contacting us directly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-foreground">Updates</h2>
            <p>
              This policy may be updated from time to time as the site evolves. Continued use of the
              site after updates means you accept the revised policy.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
