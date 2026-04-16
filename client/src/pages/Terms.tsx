import Layout from "@/components/Layout";
import Seo from "@/components/Seo";

export default function Terms() {
  return (
    <Layout>
      <Seo path="/terms" />
      <div className="mx-auto max-w-4xl space-y-10 py-4 md:py-8 animate-fade-in">
        <header className="space-y-4 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground/65">Legal</p>
          <h1 className="font-serif text-4xl text-foreground md:text-5xl">Terms of Use</h1>
          <p className="text-[1.04rem] leading-relaxed text-muted-foreground/85 md:text-[1.1rem]">
            These terms describe the simple understanding that governs use of this site and its
            published materials.
          </p>
        </header>

        <div className="space-y-8 text-[1.02rem] leading-relaxed text-muted-foreground/88">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-foreground">Use of the site</h2>
            <p>
              By accessing this website, you agree to use it lawfully and respectfully. The site is
              offered as a place to explore books, reflections, and related offerings from SoulWord
              Press.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-foreground">Intellectual property</h2>
            <p>
              Unless otherwise stated, the writing, design, branding, and original materials on this
              site belong to Spike Humer and SoulWord Press. They may not be reproduced,
              republished, or distributed without permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-foreground">External links</h2>
            <p>
              This site may include links to third-party websites, including booksellers or service
              providers. We are not responsible for the content, policies, or practices of those
              external sites.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-foreground">No guarantees</h2>
            <p>
              The site and its content are provided as-is. While care is taken to keep information
              thoughtful and accurate, no guarantee is made that all content will always be current,
              complete, or free from interruption.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-foreground">Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, Spike Humer and SoulWord Press are not liable
              for damages arising from your use of this site or reliance on its content.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-foreground">Updates to these terms</h2>
            <p>
              These terms may be revised from time to time. Continued use of the site after updates
              means you accept the revised terms.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
