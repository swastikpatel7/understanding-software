import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, Loader2, ChevronDown, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionDivider from '@/components/SectionDivider';
import ContentSection from '@/components/ContentSection';
import { supabase } from '@/integrations/supabase/client';
import { groupChaptersByCategory } from '@/content/catalog';

interface Chapter {
  id: string;
  title: string;
  slug: string;
  chapter_number: number;
  description: string;
}

interface Topic {
  id: string;
  title: string;
  slug: string;
  section_number: string;
  chapter_id: string;
}

const ChaptersOverview = () => {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());

  const { data: chapters, isLoading: chaptersLoading } = useQuery({
    queryKey: ['chapters'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chapters')
        .select('*')
        .eq('is_published', true)
        .order('sort_order');
      
      if (error) throw error;
      return data as Chapter[];
    }
  });

  const { data: topics, isLoading: topicsLoading } = useQuery({
    queryKey: ['all-topics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('topics')
        .select('id, title, slug, section_number, chapter_id')
        .order('sort_order');
      
      if (error) throw error;
      return data as Topic[];
    }
  });

  const toggleChapter = (slug: string) => {
    setExpandedChapters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(slug)) {
        newSet.delete(slug);
      } else {
        newSet.add(slug);
      }
      return newSet;
    });
  };

  const getTopicsForChapter = (chapterId: string) => {
    return topics?.filter(t => t.chapter_id === chapterId) || [];
  };

  const isLoading = chaptersLoading || topicsLoading;
  const chapterGroups = useMemo(() => groupChaptersByCategory(chapters ?? []), [chapters]);

  useEffect(() => {
    if (isLoading) return;
    if (!chapters || chapters.length === 0) return;
    if (expandedChapters.size > 0) return;
    setExpandedChapters(new Set([chapters[0].slug]));
  }, [chapters, expandedChapters.size, isLoading]);

  return (
    <div className="min-h-screen relative">
      <Header />
      <SectionDivider />

      {/* Page Header */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-mono text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-6">
            TABLE OF CONTENTS
          </h1>
          <p className="font-body text-xl text-muted-foreground leading-relaxed">
            Categories → chapters → topics → sections. Pick a path, then go deep.
          </p>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Chapters List */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-4 font-mono text-muted-foreground">Loading chapters...</span>
            </div>
          ) : (
            <div className="space-y-12">
              {chapterGroups.map((group) => (
                <div key={group.category.slug} className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="font-display text-lg md:text-xl text-primary">
                      {group.category.title.toUpperCase()}
                    </h2>
                    <p className="font-body text-muted-foreground leading-relaxed">
                      {group.category.description}
                    </p>
                  </div>

                  <div className="space-y-6">
                    {group.chapters.map((chapter) => {
                      const chapterTopics = getTopicsForChapter(chapter.id);
                      const isExpanded = expandedChapters.has(chapter.slug);
                      const hasTopics = chapterTopics.length > 0;
                      const firstTopic = chapterTopics[0];

                      return (
                        <div
                          key={chapter.id}
                          className="border border-border/50 rounded-lg overflow-hidden bg-card/30 backdrop-blur-sm"
                        >
                          <button
                            onClick={() => toggleChapter(chapter.slug)}
                            className="w-full flex items-center justify-between p-6 hover:bg-card/50 transition-colors text-left"
                          >
                            <div className="flex items-center gap-6">
                              <span className="font-mono text-3xl text-primary/50">
                                {chapter.chapter_number.toString().padStart(2, '0')}
                              </span>
                              <div>
                                <h3 className="font-display text-xl md:text-2xl text-primary">
                                  {chapter.title.toUpperCase()}
                                </h3>
                                <p className="font-body text-sm text-muted-foreground mt-1 line-clamp-1">
                                  {chapter.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              {hasTopics ? (
                                <>
                                  <span className="font-mono text-xs text-muted-foreground">
                                    {chapterTopics.length} topics
                                  </span>
                                  {isExpanded ? (
                                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                  ) : (
                                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                  )}
                                </>
                              ) : (
                                <span className="font-mono text-xs text-muted-foreground italic">
                                  Coming soon
                                </span>
                              )}
                            </div>
                          </button>

                          {isExpanded && hasTopics && (
                            <div className="border-t border-border/30">
                              {chapterTopics.map((topic) => (
                                <Link
                                  key={topic.id}
                                  to={`/read/${chapter.slug}/${topic.slug}`}
                                  className="flex items-center justify-between px-6 py-4 hover:bg-primary/5 transition-colors group border-b border-border/20 last:border-b-0"
                                >
                                  <div className="flex items-center gap-4">
                                    <span className="font-mono text-sm text-muted-foreground w-10">
                                      {topic.section_number}
                                    </span>
                                    <span className="font-body text-foreground group-hover:text-primary transition-colors">
                                      {topic.title}
                                    </span>
                                  </div>
                                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                                </Link>
                              ))}

                              <div className="p-4 bg-card/20">
                                <Link
                                  to={`/read/${chapter.slug}/${firstTopic?.slug}`}
                                  className="inline-flex items-center gap-2 px-6 py-2 border border-primary text-primary font-mono text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                                >
                                  Start Chapter
                                  <ArrowRight className="w-4 h-4" />
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ContentSection>

      <SectionDivider />
      <Footer />
    </div>
  );
};

export default ChaptersOverview;
