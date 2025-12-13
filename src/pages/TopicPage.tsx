import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, Loader2, List } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionDivider from '@/components/SectionDivider';
import ContentSection from '@/components/ContentSection';
import { supabase } from '@/integrations/supabase/client';
import ReactMarkdown from 'react-markdown';
import { getTopicIllustrations } from '@/components/TopicIllustration';
import InteractiveSVGWrapper from '@/components/illustrations/InteractiveSVGWrapper';

interface Topic {
  id: string;
  title: string;
  slug: string;
  section_number: string;
  content: string;
  illustration_key: string | null;
  sort_order: number;
  chapter_id: string;
}

interface Chapter {
  id: string;
  title: string;
  slug: string;
  chapter_number: number;
}

const TopicPage = () => {
  const { chapterSlug, topicSlug } = useParams();

  // Fetch current chapter
  const { data: chapter, isLoading: chapterLoading } = useQuery({
    queryKey: ['chapter', chapterSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chapters')
        .select('*')
        .eq('slug', chapterSlug)
        .maybeSingle();
      
      if (error) throw error;
      return data as Chapter;
    },
    enabled: !!chapterSlug
  });

  // Fetch all topics for this chapter
  const { data: allTopics, isLoading: topicsLoading } = useQuery({
    queryKey: ['chapter-topics', chapter?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('topics')
        .select('*')
        .eq('chapter_id', chapter!.id)
        .order('sort_order');
      
      if (error) throw error;
      return data as Topic[];
    },
    enabled: !!chapter?.id
  });

  // Current topic
  const currentTopic = allTopics?.find(t => t.slug === topicSlug);
  const currentIndex = allTopics?.findIndex(t => t.slug === topicSlug) ?? -1;
  const prevTopic = currentIndex > 0 ? allTopics?.[currentIndex - 1] : null;
  const nextTopic = currentIndex < (allTopics?.length ?? 0) - 1 ? allTopics?.[currentIndex + 1] : null;

  const isLoading = chapterLoading || topicsLoading;

  // Parse content into sections with illustrations
  const parseContentWithIllustrations = (content: string, illustrationKey: string | null) => {
    const illustrations = getTopicIllustrations(illustrationKey);
    
    // Clean content - remove code blocks and tables
    const cleanedContent = content
      .replace(/```[\s\S]*?```/g, '')
      .replace(/^\|.*\|$/gm, '')
      .replace(/^\s*[-:|\s]+$/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    // Split content by h2 headers
    const sections = cleanedContent.split(/(?=##\s)/);
    
    return { sections, illustrations };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <Header />
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-4 font-mono text-muted-foreground">Loading...</span>
        </div>
        <Footer />
      </div>
    );
  }

  if (!currentTopic) {
    return (
      <div className="min-h-screen relative">
        <Header />
        <ContentSection className="container mx-auto px-8 md:px-16">
          <div className="max-w-4xl mx-auto text-center py-24">
            <h1 className="font-display text-3xl text-primary mb-4">Topic Not Found</h1>
            <p className="font-body text-muted-foreground mb-8">
              The topic you're looking for doesn't exist.
            </p>
            <Link
              to="/chapters"
              className="inline-flex items-center gap-2 px-6 py-2 border border-primary text-primary font-mono text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              View All Chapters
            </Link>
          </div>
        </ContentSection>
        <Footer />
      </div>
    );
  }

  const { sections, illustrations } = parseContentWithIllustrations(
    currentTopic.content,
    currentTopic.illustration_key
  );

  return (
    <div className="min-h-screen relative">
      <Header />
      <SectionDivider />

      {/* Breadcrumb & Navigation */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <Link to="/chapters" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm">
              <List className="w-4 h-4" />
              All Chapters
            </Link>
            
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                Chapter {chapter?.chapter_number?.toString().padStart(2, '0')} / {chapter?.title}
              </span>
            </div>
          </div>

          {/* Section Header */}
          <div className="text-center mb-8">
            <span className="font-mono text-sm text-primary/70 block mb-2">
              Section {currentTopic.section_number}
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary tracking-wide">
              {currentTopic.title.toUpperCase()}
            </h1>
          </div>
        </div>
      </ContentSection>

      {/* Main Content with Inline Illustrations */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          
          {/* Hero Section with Main Illustration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            <div className="space-y-4">
              <ReactMarkdown components={markdownComponents}>
                {sections[0] || ''}
              </ReactMarkdown>
            </div>
            <div className="flex items-start">
              <div className="w-full bg-card/30 border border-border/30 rounded-lg p-4">
                <InteractiveSVGWrapper>
                  {illustrations.main}
                </InteractiveSVGWrapper>
              </div>
            </div>
          </div>

          {/* Content Sections with Alternating Illustrations */}
          {sections.slice(1).map((section, index) => {
            const inlineIllustration = illustrations.inline[index % illustrations.inline.length];
            const isReversed = index % 2 === 1;

            return (
              <div 
                key={index} 
                className={`grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 mb-10 ${isReversed ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Text Content - Takes 2 columns */}
                <div className={`lg:col-span-2 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <ReactMarkdown components={markdownComponents}>
                    {section}
                  </ReactMarkdown>
                </div>
                
                {/* Illustration - Takes 1 column */}
                {inlineIllustration && (
                  <div className={`lg:col-span-1 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="sticky top-24 bg-card/30 border border-border/30 rounded-lg p-4">
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

      {/* Topic Navigation Sidebar */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="border border-border/50 rounded-lg bg-card/30 p-6">
            <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
              In This Chapter
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {allTopics?.map((topic) => (
                <Link
                  key={topic.id}
                  to={`/read/${chapterSlug}/${topic.slug}`}
                  className={`px-3 py-2 text-sm font-mono rounded transition-colors ${
                    topic.slug === topicSlug
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-primary hover:bg-card/50'
                  }`}
                >
                  {topic.section_number}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Prev/Next Navigation */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-stretch gap-4">
            {prevTopic ? (
              <Link
                to={`/read/${chapterSlug}/${prevTopic.slug}`}
                className="flex-1 group border border-border/50 rounded-lg p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors mb-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-mono text-xs uppercase tracking-wider">Previous</span>
                </div>
                <p className="text-lg text-foreground group-hover:text-primary transition-colors">
                  {prevTopic.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            
            {nextTopic ? (
              <Link
                to={`/read/${chapterSlug}/${nextTopic.slug}`}
                className="flex-1 group border border-border/50 rounded-lg p-6 hover:border-primary/50 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-2 text-muted-foreground group-hover:text-primary transition-colors mb-2">
                  <span className="font-mono text-xs uppercase tracking-wider">Next</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
                <p className="text-lg text-foreground group-hover:text-primary transition-colors">
                  {nextTopic.title}
                </p>
              </Link>
            ) : (
              <Link
                to="/chapters"
                className="flex-1 group border border-primary rounded-lg p-6 hover:bg-primary transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-2 text-primary group-hover:text-primary-foreground transition-colors mb-2">
                  <span className="font-mono text-xs uppercase tracking-wider">Completed</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
                <p className="text-lg text-primary group-hover:text-primary-foreground transition-colors">
                  View All Chapters
                </p>
              </Link>
            )}
          </div>
        </div>
      </ContentSection>

      <SectionDivider />
      <Footer />
    </div>
  );
};

// Consistent markdown components with readable typography
const markdownComponents = {
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-xl font-semibold text-primary mt-8 mb-4 tracking-wide">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-lg font-semibold text-primary mt-6 mb-3">
      {children}
    </h3>
  ),
  h4: ({ children }: { children?: React.ReactNode }) => (
    <h4 className="text-base font-semibold text-foreground mt-4 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-base text-foreground/90 leading-relaxed mb-4">
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
    <ul className="text-base text-foreground/90 leading-relaxed mb-4 ml-5 list-disc marker:text-primary/60">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="text-base text-foreground/90 leading-relaxed mb-4 ml-5 list-decimal marker:text-primary/60">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="mb-1.5">{children}</li>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a href={href} className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
      {children}
    </a>
  ),
  code: ({ children }: { children?: React.ReactNode }) => (
    <code className="font-mono text-sm bg-muted/50 text-primary px-1.5 py-0.5 rounded">
      {children}
    </code>
  ),
};

export default TopicPage;