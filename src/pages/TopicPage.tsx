import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, List } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import ContentSection from "@/components/ContentSection";
import ReactMarkdown from "react-markdown";
import InteractiveSVGWrapper from "@/components/illustrations/InteractiveSVGWrapper";
import { getLayerBySlug } from "@/content/layers";
import {
  DIGITAL_LOGIC_TOPICS,
  TopicContent,
} from "@/content/topics/digital-logic";
import { getDigitalLogicIllustrations } from "@/content/illustrations/digital-logic-illustrations";

type ParsedSection = {
  id: string;
  title: string;
  body: string;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

// Markdown components with custom styling
const markdownComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-2xl font-display text-primary mt-8 mb-4 tracking-wide uppercase">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-xl font-display text-primary mt-8 mb-4 tracking-wide">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-lg font-semibold text-primary mt-6 mb-3">{children}</h3>
  ),
  h4: ({ children }: { children?: React.ReactNode }) => (
    <h4 className="text-base font-semibold text-foreground mt-4 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-base text-foreground/90 leading-relaxed mb-4 font-body">
      {children}
    </p>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="text-primary font-semibold">{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="text-foreground/80 italic">{children}</em>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc ml-6 mb-4 space-y-1 marker:text-primary/50 font-body">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal ml-6 mb-4 space-y-1 marker:text-primary/50 font-body">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="text-foreground/90 leading-relaxed">{children}</li>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
    >
      {children}
    </a>
  ),
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="bg-muted/30 border border-border/50 rounded-lg p-4 overflow-x-auto mb-4 text-sm font-mono">
      {children}
    </pre>
  ),
  code: ({
    inline,
    children,
  }: {
    inline?: boolean;
    children?: React.ReactNode;
  }) =>
    inline ? (
      <code className="bg-muted/50 px-1.5 py-0.5 rounded text-sm font-mono text-primary">
        {children}
      </code>
    ) : (
      <code className="font-mono text-sm">{children}</code>
    ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-2 border-primary/30 pl-4 italic text-foreground/70 mb-4">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-border/60" />,
};

const TopicPage = () => {
  const { layerSlug, chapterSlug, topicSlug } = useParams();

  // Get layer and chapter data
  const layer = getLayerBySlug(layerSlug || "");
  const chapter = layer?.chapters.find((c) => c.slug === chapterSlug);

  // Get all topics for this chapter
  const allTopics = getTopicsForChapter(chapterSlug || "");

  // Find current topic
  const currentTopic = allTopics.find((t) => t.slug === topicSlug);
  const currentIndex = allTopics.findIndex((t) => t.slug === topicSlug);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic =
    currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  // Parse content into sections, memoized to avoid re-running on every render.
  // The hook is placed before the early return to respect the Rules of Hooks.
  const { sections, illustrations } = useMemo(() => {
    if (!currentTopic) {
      // Return a default state that matches the expected structure.
      return { sections: [], illustrations: { main: null, inline: [] } };
    }
    return parseContentWithIllustrations(
      currentTopic.content,
      currentTopic.illustrationKey
    );
  }, [currentTopic]);

  if (!layer || !chapter || !currentTopic) {
    return (
      <div className="min-h-screen relative">
        <Header />
        <ContentSection className="container mx-auto px-8 md:px-16">
          <div className="max-w-4xl mx-auto text-center py-24">
            <h1 className="font-display text-3xl text-primary mb-4">
              Topic Not Found
            </h1>
            <p className="font-body text-muted-foreground mb-8">
              The topic you're looking for doesn't exist.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-2 border border-primary text-primary font-mono text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Return Home
            </Link>
          </div>
        </ContentSection>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <Header />
      <SectionDivider />

      {/* Breadcrumb & Navigation */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 font-mono text-xs text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              to={`/layer/${layer.slug}`}
              className="hover:text-primary transition-colors"
            >
              Layer {layer.number}
            </Link>
            <span>/</span>
            <Link
              to={`/layer/${layer.slug}/${chapter.slug}`}
              className="hover:text-primary transition-colors"
            >
              {chapter.number} {chapter.title}
            </Link>
            <span>/</span>
            <span className="text-primary">{currentTopic.sectionNumber}</span>
          </div>

          {/* Section Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 flex items-center justify-center border-2 border-primary bg-primary/10 text-primary">
                <span className="font-mono text-sm font-medium">
                  {currentTopic.sectionNumber}
                </span>
              </div>
              <div>
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  {chapter.title}
                </p>
                <h1 className="font-display text-2xl md:text-3xl lg:text-4xl text-primary tracking-wide uppercase">
                  {currentTopic.title}
                </h1>
              </div>
            </div>
            <p className="font-mono text-sm text-primary/70 italic max-w-2xl">
              "{currentTopic.summary}"
            </p>
          </div>

          {/* On This Topic navigation */}
          {sections.length > 1 && (
            <div className="border border-border/50 bg-card/30 backdrop-blur-sm p-5 mb-8">
              <h2 className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-3">
                On This Topic
              </h2>
              <div className="flex flex-wrap gap-2">
                {sections.map((s, index) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="px-3 py-2 text-xs font-mono border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  >
                    {(index + 1).toString().padStart(2, "0")} · {s.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </ContentSection>

      {/* Main Content with Inline Illustrations */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section with Main Illustration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            <div className="space-y-4">
              <h2
                id={sections[0]?.id}
                className="scroll-mt-24 font-display text-lg text-primary uppercase tracking-wide"
              >
                {sections[0]?.title ?? "Overview"}
              </h2>
              <ReactMarkdown components={markdownComponents}>
                {sections[0]?.body ?? ""}
              </ReactMarkdown>
            </div>
            <div className="flex items-start">
              <div className="w-full bg-card/30 border border-border/30 p-4">
                <InteractiveSVGWrapper>
                  {illustrations.main}
                </InteractiveSVGWrapper>
              </div>
            </div>
          </div>

          {/* Content Sections with Alternating Illustrations */}
          {sections.slice(1).map((section, index) => {
            const inlineIllustration =
              illustrations.inline.length > 0
                ? illustrations.inline[index % illustrations.inline.length]
                : null;
            const isReversed = index % 2 === 1;

            return (
              <div
                key={section.id}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 mb-10"
              >
                {/* Text Content - Takes 2 columns */}
                <div
                  className={`lg:col-span-2 ${isReversed ? "lg:order-2" : "lg:order-1"}`}
                >
                  <h2
                    id={section.id}
                    className="scroll-mt-24 text-xl font-display text-primary mt-8 mb-4 tracking-wide uppercase"
                  >
                    {section.title}
                  </h2>
                  <ReactMarkdown components={markdownComponents}>
                    {section.body}
                  </ReactMarkdown>
                </div>

                {/* Illustration - Takes 1 column */}
                {inlineIllustration && (
                  <div
                    className={`lg:col-span-1 ${isReversed ? "lg:order-1" : "lg:order-2"}`}
                  >
                    <div className="sticky top-24 bg-card/30 border border-border/30 p-4">
                      <InteractiveSVGWrapper>
                        {inlineIllustration.component}
                      </InteractiveSVGWrapper>
                      <p className="text-center text-xs text-muted-foreground mt-2 font-mono uppercase tracking-wide">
                        {inlineIllustration.title}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Topics in Chapter */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="border border-border/50 bg-card/30 p-6">
            <h3 className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-4">
              In This Chapter
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {allTopics.map((topic) => (
                <Link
                  key={topic.slug}
                  to={`/layer/${layer.slug}/${chapter.slug}/${topic.slug}`}
                  className={`px-3 py-2 text-xs font-mono border transition-colors ${
                    topic.slug === currentTopic.slug
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {topic.sectionNumber} · {topic.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Prev/Next Navigation */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            {prevTopic ? (
              <Link
                to={`/layer/${layer.slug}/${chapter.slug}/${prevTopic.slug}`}
                className="group flex items-center gap-3 hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase">
                    Previous
                  </p>
                  <p className="font-display text-sm text-primary">
                    {prevTopic.sectionNumber} {prevTopic.title}
                  </p>
                </div>
              </Link>
            ) : (
              <Link
                to={`/layer/${layer.slug}/${chapter.slug}`}
                className="group flex items-center gap-3 hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase">
                    Back to
                  </p>
                  <p className="font-display text-sm text-primary">
                    {chapter.title}
                  </p>
                </div>
              </Link>
            )}

            <Link
              to={`/layer/${layer.slug}/${chapter.slug}`}
              className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <List className="w-4 h-4" />
            </Link>

            {nextTopic ? (
              <Link
                to={`/layer/${layer.slug}/${chapter.slug}/${nextTopic.slug}`}
                className="group flex items-center gap-3 text-right hover:text-primary transition-colors"
              >
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase">
                    Next
                  </p>
                  <p className="font-display text-sm text-primary">
                    {nextTopic.sectionNumber} {nextTopic.title}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ) : (
              <Link
                to={`/layer/${layer.slug}/${chapter.slug}`}
                className="group flex items-center gap-3 text-right hover:text-primary transition-colors"
              >
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase">
                    Completed
                  </p>
                  <p className="font-display text-sm text-primary">
                    {chapter.title}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            )}
          </div>
        </div>
      </ContentSection>

      <Footer />
    </div>
  );
};

// Helper function to get topics for a chapter
function getTopicsForChapter(chapterSlug: string): TopicContent[] {
  // For now, only digital-logic has content
  if (chapterSlug === "digital-logic") {
    return DIGITAL_LOGIC_TOPICS;
  }
  return [];
}

// Parse content into sections with illustrations
function parseContentWithIllustrations(
  content: string,
  illustrationKey: string
) {
  const illustrations = getDigitalLogicIllustrations(illustrationKey);

  const normalized = content
    .replace(/^#\s+.*\n+/, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const rawSections = normalized
    .split(/(?=^##\s)/gm)
    .filter((s) => s.trim().length > 0);
  const sections: ParsedSection[] = [];
  const usedIds = new Map<string, number>();

  const makeId = (title: string) => {
    const base = slugify(title) || "section";
    const seen = usedIds.get(base) ?? 0;
    usedIds.set(base, seen + 1);
    return seen === 0 ? base : `${base}-${seen + 1}`;
  };

  if (rawSections.length === 0) {
    sections.push({ id: "overview", title: "Overview", body: normalized });
    return { sections, illustrations };
  }

  for (const raw of rawSections) {
    if (raw.startsWith("## ")) {
      const [headingLine, ...rest] = raw.split("\n");
      const title = headingLine.replace(/^##\s+/, "").trim() || "Section";
      sections.push({ id: makeId(title), title, body: rest.join("\n").trim() });
    } else {
      sections.push({ id: "overview", title: "Overview", body: raw.trim() });
    }
  }

  return { sections, illustrations };
}

export default TopicPage;
