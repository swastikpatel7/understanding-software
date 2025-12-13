-- =============================================
-- CHAPTERS & CONTENT MANAGEMENT TABLES
-- =============================================

-- Create chapters table for main chapter data
CREATE TABLE public.chapters (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    chapter_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT NOT NULL,
    introduction TEXT,
    icon_name TEXT,
    is_published BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create topics/sections within chapters
CREATE TABLE public.topics (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
    slug TEXT NOT NULL,
    section_number TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    code_example TEXT,
    illustration_key TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(chapter_id, slug)
);

-- Create chapter cards for homepage display
CREATE TABLE public.chapter_cards (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE UNIQUE,
    figure_number TEXT NOT NULL,
    card_description TEXT NOT NULL,
    illustration_key TEXT NOT NULL,
    is_reversed BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for faster queries
CREATE INDEX idx_chapters_slug ON public.chapters(slug);
CREATE INDEX idx_chapters_sort_order ON public.chapters(sort_order);
CREATE INDEX idx_topics_chapter_id ON public.topics(chapter_id);
CREATE INDEX idx_topics_sort_order ON public.topics(sort_order);
CREATE INDEX idx_chapter_cards_chapter_id ON public.chapter_cards(chapter_id);

-- Enable Row Level Security (public read access for content)
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapter_cards ENABLE ROW LEVEL SECURITY;

-- Public read access policies (content is publicly viewable)
CREATE POLICY "Chapters are publicly readable" 
ON public.chapters 
FOR SELECT 
USING (is_published = true);

CREATE POLICY "Topics are publicly readable" 
ON public.topics 
FOR SELECT 
USING (true);

CREATE POLICY "Chapter cards are publicly readable" 
ON public.chapter_cards 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_chapters_updated_at
BEFORE UPDATE ON public.chapters
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_topics_updated_at
BEFORE UPDATE ON public.topics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_chapter_cards_updated_at
BEFORE UPDATE ON public.chapter_cards
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();