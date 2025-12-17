import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import SectionDivider from "@/components/SectionDivider";
import ContentSection from "@/components/ContentSection";
import Footer from "@/components/Footer";
import { getLayerBySlug, LAYERS } from "@/content/layers";

const LayerPage = () => {
  const { layerSlug } = useParams<{ layerSlug: string }>();
  const layer = getLayerBySlug(layerSlug || "");

  if (!layer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-display text-2xl text-primary">Layer Not Found</h1>
          <Link to="/" className="font-mono text-sm text-muted-foreground hover:text-primary">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const prevLayer = LAYERS.find((l) => l.number === layer.number - 1);
  const nextLayer = LAYERS.find((l) => l.number === layer.number + 1);
  const totalTopics = layer.chapters.reduce((sum, ch) => sum + ch.topicCount, 0);

  return (
    <div className="min-h-screen relative">
      <Header />

      <SectionDivider />

      {/* Layer Header */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 font-mono text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-primary">Layer {layer.number}</span>
          </div>

          {/* Layer title section */}
          <div className="flex items-start gap-6 mb-8">
            {/* Layer number badge */}
            <div className="w-20 h-20 flex items-center justify-center border-2 border-primary bg-primary/10 text-primary">
              <span className="font-mono text-3xl font-medium">{layer.number}</span>
            </div>

            <div className="flex-1">
              <h1 className="font-display text-3xl md:text-4xl text-primary uppercase tracking-wide mb-2">
                {layer.title}
              </h1>
              <p className="font-mono text-sm text-primary/70 italic mb-4">
                "{layer.tagline}"
              </p>
              <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {layer.description}
              </p>
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex items-center gap-6 py-4 border-y border-border/50">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground uppercase">Chapters</span>
              <span className="font-mono text-lg text-primary">{layer.chapters.length}</span>
            </div>
            <div className="w-px h-6 bg-border/50" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground uppercase">Topics</span>
              <span className="font-mono text-lg text-primary">{totalTopics}</span>
            </div>
            <div className="w-px h-6 bg-border/50" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground uppercase">Status</span>
              <span className={`font-mono text-sm ${layer.status === "available" ? "text-primary" : "text-muted-foreground"}`}>
                {layer.status === "available" ? "Available" : "Coming Soon"}
              </span>
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Chapters List */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Chapters in This Layer
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-6">
            {layer.chapters.map((chapter, index) => (
              <div
                key={chapter.slug}
                className="group relative border border-border/50 hover:border-primary/50 bg-card/30 hover:bg-card/50 transition-all duration-200"
              >
                {/* Chapter number marker */}
                <div className="absolute -left-px -top-px w-16 h-full border-r border-border/50 group-hover:border-primary/50 bg-muted/20 group-hover:bg-primary/5 flex items-center justify-center transition-all duration-200">
                  <span className="font-mono text-lg text-muted-foreground group-hover:text-primary transition-colors">
                    {chapter.number}
                  </span>
                </div>

                <div className="pl-20 pr-6 py-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-display text-xl text-primary uppercase tracking-wide mb-2">
                        {chapter.title}
                      </h3>
                      <p className="font-mono text-xs text-muted-foreground mb-4">
                        {chapter.topicCount} topics
                      </p>

                      {/* Placeholder for chapter description - can be enhanced later */}
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">
                        Deep dive into {chapter.title.toLowerCase()}. Understanding the mechanisms,
                        trade-offs, and failure modes.
                      </p>
                    </div>

                    {layer.status === "available" && (
                      <Link
                        to={`/layer/${layer.slug}/${chapter.slug}`}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary font-mono text-xs uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-200 shrink-0"
                      >
                        Enter
                        <svg
                          className="w-3 h-3"
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
                    )}
                  </div>

                  {/* Topics preview */}
                  {index === 0 && layer.status === "available" && (
                    <div className="mt-4 pt-4 border-t border-border/30">
                      <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
                        Sample Topics
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["The Idea", "The Mechanics", "Trade-offs", "Failure Modes"].map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-1 bg-muted/30 text-muted-foreground font-mono text-xs"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress indicator placeholder */}
                <div className="absolute bottom-0 left-16 right-0 h-0.5 bg-border/30">
                  <div className="h-full bg-primary/30 w-0 group-hover:w-1/4 transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Navigation to other layers */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            {prevLayer ? (
              <Link
                to={`/layer/${prevLayer.slug}`}
                className="group flex items-center gap-3 hover:text-primary transition-colors"
              >
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase">Previous Layer</p>
                  <p className="font-display text-sm text-primary">
                    {prevLayer.number}. {prevLayer.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            <Link
              to="/"
              className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              All Layers
            </Link>

            {nextLayer ? (
              <Link
                to={nextLayer.status === "available" ? `/layer/${nextLayer.slug}` : "#"}
                className={`group flex items-center gap-3 text-right ${
                  nextLayer.status === "available"
                    ? "hover:text-primary transition-colors"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase">Next Layer</p>
                  <p className="font-display text-sm text-primary">
                    {nextLayer.number}. {nextLayer.title}
                  </p>
                  {nextLayer.status === "coming_soon" && (
                    <p className="font-mono text-[10px] text-muted-foreground">Coming Soon</p>
                  )}
                </div>
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors"
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
            ) : (
              <div />
            )}
          </div>
        </div>
      </ContentSection>

      <Footer />
    </div>
  );
};

export default LayerPage;
