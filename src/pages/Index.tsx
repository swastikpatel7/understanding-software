import { Link } from "react-router-dom";
import Header from "@/components/Header";
import SectionDivider from "@/components/SectionDivider";
import ContentSection from "@/components/ContentSection";
import Footer from "@/components/Footer";
import TableOfContents from "@/components/TableOfContents";
import LayerCard from "@/components/LayerCard";
import InteractiveSVGWrapper from "@/components/illustrations/InteractiveSVGWrapper";
import SoftwareStackBannerSVG from "@/components/illustrations/SoftwareStackBannerSVG";
import { LAYERS, getAvailableLayers, getComingSoonLayers } from "@/content/layers";

const Index = () => {
  const availableLayers = getAvailableLayers();
  const comingSoonLayers = getComingSoonLayers();

  return (
    <div className="min-h-screen relative">
      <Header />
      <TableOfContents
        items={[
          { id: "intro", label: "Overview", number: "00" },
          { id: "philosophy", label: "Philosophy", number: "01" },
          { id: "layers", label: "The Stack", number: "02" },
          { id: "roadmap", label: "Roadmap", number: "03" },
        ]}
      />

      <SectionDivider />

      {/* Hero Section */}
      <ContentSection id="intro" className="container mx-auto px-8 md:px-16 scroll-mt-8">
        <div className="mb-12">
          <InteractiveSVGWrapper className="w-full">
            <SoftwareStackBannerSVG />
          </InteractiveSVGWrapper>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-6">
              <p className="font-body text-lg leading-relaxed">
                <span className="text-4xl font-body float-left mr-2 leading-none text-primary">
                  S
                </span>
                oftware is layers. From transistors to transformers, each layer
                builds on the last—hiding complexity, enabling abstraction,
                creating the systems we use every day.
              </p>

              <p className="font-body leading-relaxed text-muted-foreground">
                Code Blueprint is a visual blueprint of the full stack.
                Not tutorials. Not code snippets. The actual mechanisms—how
                things work, why they break, and the trade-offs that shape every
                system.
              </p>
            </div>

            <div className="space-y-6">
              <p className="font-body leading-relaxed text-muted-foreground">
                This is for builders who want to understand, not just use. When
                you can explain the mechanism, you can debug the abstraction.
              </p>

              <div className="border border-border/50 rounded-none bg-card/30 backdrop-blur-sm p-6">
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-4">
                  The Journey
                </p>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-primary w-4">0</span>
                    <span className="text-muted-foreground">→</span>
                    <span>Transistors & Logic Gates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-primary w-4">↓</span>
                    <span className="text-muted-foreground"></span>
                    <span className="text-muted-foreground text-[10px]">abstraction</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-primary w-4">9</span>
                    <span className="text-muted-foreground">→</span>
                    <span>Quantum Computing & AI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Philosophy Section */}
      <ContentSection id="philosophy" className="container mx-auto px-8 md:px-16 scroll-mt-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Engineering Blueprint, Not Tutorial
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="border border-border/50 rounded-none bg-card/30 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs text-muted-foreground line-through">Tutorial Site</span>
              </div>
              <ul className="space-y-2 font-body text-sm text-muted-foreground">
                <li>"How to implement X"</li>
                <li>Step-by-step instructions</li>
                <li>Code snippets to copy</li>
                <li>"Use this library"</li>
              </ul>
            </div>

            <div className="border border-primary rounded-none bg-card/30 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs text-primary uppercase tracking-wider">This Site</span>
              </div>
              <ul className="space-y-2 font-body text-sm text-foreground">
                <li>"How X works underneath"</li>
                <li>First-principles reasoning</li>
                <li>Mental models to internalize</li>
                <li>Trade-offs and constraints</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                number: "01",
                title: "Mechanism First",
                body: "What's stored, what changes, what invariants hold. We explain the moving parts before the patterns.",
              },
              {
                number: "02",
                title: "Visual Anchors",
                body: "Strong diagrams beat walls of text. Every concept has an illustration that shows the structure.",
              },
              {
                number: "03",
                title: "Trade-offs Always",
                body: "Nothing is free. Every design choice has costs—we show them so you can reason about alternatives.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-border/50 rounded-none bg-card/30 backdrop-blur-sm p-6"
              >
                <span className="font-mono text-[10px] text-muted-foreground">{item.number}</span>
                <h3 className="font-display text-lg text-primary mb-3 mt-1">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Layers Section */}
      <ContentSection id="layers" className="container mx-auto px-8 md:px-16 scroll-mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-3 mb-10">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-2xl md:text-3xl text-primary">THE STACK</h2>
              <div className="h-px flex-1 bg-border" />
              <span className="font-mono text-xs text-muted-foreground">
                {LAYERS.length} LAYERS
              </span>
            </div>
            <p className="font-body text-muted-foreground leading-relaxed max-w-3xl">
              From silicon to intelligence. Each layer builds on the last, hiding complexity
              and enabling the next level of abstraction.
            </p>
          </div>

          {/* Available Layers */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                Available Now
              </span>
              <div className="h-px flex-1 bg-primary/30" />
              <span className="font-mono text-[10px] text-primary">
                {availableLayers.length} layers
              </span>
            </div>

            <div className="space-y-4">
              {availableLayers.map((layer) => (
                <LayerCard key={layer.slug} layer={layer} />
              ))}
            </div>
          </div>

          {/* Coming Soon Layers */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Coming Soon
              </span>
              <div className="h-px flex-1 bg-border/50" />
              <span className="font-mono text-[10px] text-muted-foreground">
                {comingSoonLayers.length} layers
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {comingSoonLayers.map((layer) => (
                <div
                  key={layer.slug}
                  className="relative border border-border/30 bg-card/10 p-5"
                >
                  {/* Layer number */}
                  <div className="absolute -left-px -top-px w-10 h-10 flex items-center justify-center border-r border-b border-border/30 bg-muted/30 text-muted-foreground">
                    <span className="font-mono text-sm">{layer.number}</span>
                  </div>

                  <div className="pl-12">
                    <h3 className="font-display text-base text-muted-foreground uppercase tracking-wide mb-1">
                      {layer.title}
                    </h3>
                    <p className="font-mono text-[10px] text-muted-foreground/70 italic mb-2">
                      "{layer.tagline}"
                    </p>
                    <p className="font-body text-xs text-muted-foreground/80 leading-relaxed">
                      {layer.chapters.length} chapters planned
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Roadmap / Progress Section */}
      <ContentSection id="roadmap" className="container mx-auto px-8 md:px-16 scroll-mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Progress
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Visual progress bar */}
          <div className="mb-10">
            <div className="flex items-center gap-1 mb-3">
              {LAYERS.map((layer) => (
                <div
                  key={layer.number}
                  className={`flex-1 h-8 flex items-center justify-center border ${
                    layer.status === "available"
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-border/30 bg-muted/10 text-muted-foreground/50"
                  }`}
                >
                  <span className="font-mono text-xs">{layer.number}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
              <span>Hardware</span>
              <span>{Math.round((availableLayers.length / LAYERS.length) * 100)}% Complete</span>
              <span>Frontier</span>
            </div>
          </div>

          <div className="text-center space-y-6">
            <p className="font-body text-muted-foreground leading-relaxed">
              Layer 0 and Layer 1 are ready. The remaining 8 layers are in development.
              Follow along as we build out the complete stack.
            </p>

            <Link
              to="/layer/the-machine"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary font-mono text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Begin at Layer 0
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </ContentSection>

      <Footer />
    </div>
  );
};

export default Index;
