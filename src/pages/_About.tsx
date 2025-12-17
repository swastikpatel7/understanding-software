import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import ContentSection from "@/components/ContentSection";
import { TOPIC_SECTION_TEMPLATE } from "@/content/catalog";

const About = () => {
  return (
    <div className="min-h-screen relative">
      <Header />
      <SectionDivider />

      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-4">
            <h1 className="font-display text-4xl md:text-5xl text-primary">ABOUT</h1>
            <p className="font-body text-xl text-muted-foreground leading-relaxed">
              Code Blueprint is a visual guide for deep, fundamental learning. It’s not a
              tutorial site. It’s a library of mental models: the few diagrams and ideas you can
              reuse forever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Minimal Surface",
                body: "Clean pages, tight typography, and visuals that earn their space.",
              },
              {
                title: "Maximum Depth",
                body: "Mechanisms, trade-offs, and failure modes—not just definitions.",
              },
              {
                title: "Structured Reading",
                body: "Category → Chapter → Topic → Sections, with consistent internal shape.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-border/50 rounded-lg bg-card/30 backdrop-blur-sm p-6"
              >
                <h2 className="font-display text-lg text-primary mb-3">{item.title}</h2>
                <p className="font-body text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">THE CONTENT SHAPE</h2>
            <p className="font-body text-muted-foreground leading-relaxed">
              Topics follow a repeatable structure so you can skim, re-read, and connect concepts
              across chapters without relearning the “layout” every time.
            </p>

            <div className="border border-border/50 rounded-lg bg-muted/20 p-6">
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">
                Recommended topic template
              </p>
              <pre className="overflow-x-auto text-sm leading-relaxed font-mono text-foreground/90">
                {TOPIC_SECTION_TEMPLATE}
              </pre>
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />
      <Footer />
    </div>
  );
};

export default About;

