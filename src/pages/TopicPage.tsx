import { Link, useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, Loader2, List } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionDivider from '@/components/SectionDivider';
import ContentSection from '@/components/ContentSection';
import { supabase } from '@/integrations/supabase/client';
import ReactMarkdown from 'react-markdown';
import TopicIllustration from '@/components/TopicIllustration';

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
  const navigate = useNavigate();

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

  // Strip code blocks from content for cleaner reading
  const cleanContent = (content: string) => {
    // Remove code blocks but keep the explanatory text
    return content
      .replace(/```[\s\S]*?```/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
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
          <div className="text-center mb-12">
            <span className="font-mono text-lg text-primary/70 block mb-2">
              Section {currentTopic.section_number}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary">
              {currentTopic.title.toUpperCase()}
            </h1>
          </div>
        </div>
      </ContentSection>

      {/* Main Illustration */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-card/30 border border-border/50 rounded-lg overflow-hidden flex items-center justify-center p-8">
            <TopicIllustration illustrationKey={currentTopic.illustration_key} />
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Content */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-invert prose-lg max-w-none
            prose-headings:font-display prose-headings:text-primary
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
            prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-3
            prose-p:font-body prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:text-lg
            prose-strong:text-primary prose-strong:font-semibold
            prose-ul:text-foreground/80 prose-ol:text-foreground/80
            prose-li:marker:text-primary prose-li:text-lg prose-li:leading-relaxed
            prose-a:text-primary prose-a:underline-offset-4 hover:prose-a:text-primary/80
          ">
            <ReactMarkdown>
              {cleanContent(currentTopic.content)}
            </ReactMarkdown>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Topic Navigation Sidebar */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="border border-border/50 rounded-lg bg-card/30 p-6">
            <h3 className="font-display text-sm text-muted-foreground uppercase tracking-widest mb-4">
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
                <p className="font-display text-lg text-foreground group-hover:text-primary transition-colors">
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
                <p className="font-display text-lg text-foreground group-hover:text-primary transition-colors">
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
                <p className="font-display text-lg text-primary group-hover:text-primary-foreground transition-colors">
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

export default TopicPage;
