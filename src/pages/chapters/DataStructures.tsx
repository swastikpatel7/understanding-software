import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionDivider from '@/components/SectionDivider';
import ContentSection from '@/components/ContentSection';
import InteractiveSVGWrapper from '@/components/illustrations/InteractiveSVGWrapper';
import BinaryTreeSVG from '@/components/illustrations/BinaryTreeSVG';
import { supabase } from '@/integrations/supabase/client';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Topic {
  id: string;
  title: string;
  slug: string;
  section_number: string;
  content: string;
  illustration_key: string | null;
  sort_order: number;
}

const DataStructures = () => {
  const { data: chapter, isLoading: chapterLoading } = useQuery({
    queryKey: ['chapter', 'data-structures'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chapters')
        .select('*')
        .eq('slug', 'data-structures')
        .maybeSingle();
      
      if (error) throw error;
      return data;
    }
  });

  const { data: topics, isLoading: topicsLoading } = useQuery({
    queryKey: ['topics', 'data-structures'],
    queryFn: async () => {
      const { data: chapterData } = await supabase
        .from('chapters')
        .select('id')
        .eq('slug', 'data-structures')
        .maybeSingle();
      
      if (!chapterData) return [];

      const { data, error } = await supabase
        .from('topics')
        .select('*')
        .eq('chapter_id', chapterData.id)
        .order('sort_order');
      
      if (error) throw error;
      return data as Topic[];
    }
  });

  const isLoading = chapterLoading || topicsLoading;

  return (
    <div className="min-h-screen relative">
      <Header />
      <SectionDivider />

      {/* Chapter Header */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-mono text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Overview
          </Link>
          
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-4">
            Chapter {chapter?.chapter_number?.toString().padStart(2, '0') ?? '01'}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-6">
            {chapter?.title?.toUpperCase() ?? 'DATA STRUCTURES'}
          </h1>
          <p className="font-body text-xl text-muted-foreground leading-relaxed">
            {chapter?.description ?? 'The fundamental building blocks that organize and store data in efficient, meaningful ways.'}
          </p>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Introduction */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="font-body text-lg leading-relaxed">
                <span className="text-4xl font-body float-left mr-2 leading-none text-primary">E</span>
                very piece of software you use relies on data structures. When you search 
                for a file, scroll through a playlist, or send a message – data structures 
                are working behind the scenes to make it fast and efficient.
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                {chapter?.introduction ?? 'A data structure is simply a way of organizing data so that it can be used effectively. The right choice of data structure can mean the difference between an app that responds instantly and one that freezes.'}
              </p>
            </div>
            <InteractiveSVGWrapper>
              <BinaryTreeSVG />
            </InteractiveSVGWrapper>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Loading State */}
      {isLoading && (
        <ContentSection className="container mx-auto px-8 md:px-16">
          <div className="max-w-4xl mx-auto flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-4 font-mono text-muted-foreground">Loading content...</span>
          </div>
        </ContentSection>
      )}

      {/* Dynamic Topics */}
      {topics?.map((topic, index) => (
        <div key={topic.id}>
          <ContentSection className="container mx-auto px-8 md:px-16">
            <div className="max-w-4xl mx-auto space-y-8">
              <div id={topic.slug}>
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                  Section {topic.section_number}
                </span>
                <h2 className="font-display text-2xl md:text-3xl text-primary mt-2">
                  {topic.title.toUpperCase()}
                </h2>
              </div>
              
              <div className="prose prose-invert prose-lg max-w-none
                prose-headings:font-display prose-headings:text-primary
                prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg
                prose-p:font-body prose-p:text-foreground/90 prose-p:leading-relaxed
                prose-strong:text-primary prose-strong:font-semibold
                prose-code:text-primary prose-code:bg-card/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-transparent prose-pre:p-0
                prose-ul:text-foreground/80 prose-ol:text-foreground/80
                prose-li:marker:text-primary
                prose-a:text-primary prose-a:underline-offset-4 hover:prose-a:text-primary/80
              ">
                <ReactMarkdown
                  components={{
                    code({ className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      const isInline = !match;
                      return !isInline && match ? (
                        <SyntaxHighlighter
                          style={oneDark as Record<string, React.CSSProperties>}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-lg border border-border !bg-card/50"
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }
                  }}
                >
                  {topic.content}
                </ReactMarkdown>
              </div>
            </div>
          </ContentSection>
          {index < (topics?.length ?? 0) - 1 && <SectionDivider />}
        </div>
      ))}

      <SectionDivider />

      {/* Navigation */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Overview
          </Link>
          <Link 
            to="/chapters/algorithms" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-mono text-sm"
          >
            Chapter 02: Algorithms
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </ContentSection>

      <Footer />
    </div>
  );
};

export default DataStructures;
