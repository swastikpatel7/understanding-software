export type CatalogChapter = {
  slug: string;
  title: string;
};

export type CatalogCategory = {
  slug: string;
  title: string;
  description: string;
  chapterSlugs?: string[];
};

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    slug: "foundations",
    title: "Foundations",
    description: "The machine model: how code becomes computation.",
    chapterSlugs: ["computer-architecture", "memory-management", "operating-systems"],
  },
  {
    slug: "data",
    title: "Data",
    description: "How information is represented, organized, and transformed.",
    chapterSlugs: ["data-structures", "algorithms"],
  },
  {
    slug: "persistence",
    title: "Persistence",
    description: "Where data lives, why it’s fast, and what it costs.",
    chapterSlugs: ["databases", "databases-storage", "storage", "indexes"],
  },
  {
    slug: "networks",
    title: "Networks",
    description: "From packets to requests: the internet’s moving parts.",
    chapterSlugs: ["networking", "how-the-web-works", "web"],
  },
  {
    slug: "security",
    title: "Security",
    description: "Trust at scale: encryption, identity, and failure modes.",
    chapterSlugs: ["cryptography", "authentication", "authorization"],
  },
];

export type ChapterGroup<TChapter extends CatalogChapter> = {
  category: CatalogCategory;
  chapters: TChapter[];
};

const OTHER_CATEGORY: CatalogCategory = {
  slug: "other",
  title: "More",
  description: "Additional chapters not yet categorized.",
};

const matchesCategoryByTitle = (categorySlug: string, title: string) => {
  const t = title.toLowerCase();
  switch (categorySlug) {
    case "foundations":
      return /(cpu|memory|operating system|os|process|thread|runtime|compiler|architecture)/i.test(t);
    case "data":
      return /(data structure|algorithm|hash|tree|graph|sort|search)/i.test(t);
    case "persistence":
      return /(database|storage|index|b-?tree|cache|log|transaction)/i.test(t);
    case "networks":
      return /(network|packet|tcp|udp|http|dns|web|distributed)/i.test(t);
    case "security":
      return /(crypto|encryption|security|auth|tls|key|hashing)/i.test(t);
    default:
      return false;
  }
};

export const groupChaptersByCategory = <TChapter extends CatalogChapter>(
  chapters: TChapter[]
): ChapterGroup<TChapter>[] => {
  const remaining = new Map(chapters.map((c) => [c.slug, c]));
  const groups: ChapterGroup<TChapter>[] = [];

  for (const category of CATALOG_CATEGORIES) {
    const categoryChapters: TChapter[] = [];

    for (const slug of category.chapterSlugs ?? []) {
      const chapter = remaining.get(slug);
      if (!chapter) continue;
      categoryChapters.push(chapter);
      remaining.delete(slug);
    }

    for (const chapter of remaining.values()) {
      if (!matchesCategoryByTitle(category.slug, chapter.title)) continue;
      categoryChapters.push(chapter);
      remaining.delete(chapter.slug);
    }

    if (categoryChapters.length > 0) {
      groups.push({ category, chapters: categoryChapters });
    }
  }

  const otherChapters = [...remaining.values()];
  if (otherChapters.length > 0) {
    groups.push({ category: OTHER_CATEGORY, chapters: otherChapters });
  }

  return groups;
};

export const TOPIC_SECTION_TEMPLATE = [
  "## The Idea",
  "What it is, what problem it solves, and the mental model.",
  "",
  "## The Mechanics",
  "The internal steps; what’s stored; what changes over time.",
  "",
  "## Trade-offs",
  "Time/space costs, latency vs throughput, complexity vs simplicity.",
  "",
  "## Failure Modes",
  "What breaks in the real world and how to reason about it.",
  "",
  "## Where You’ll See It",
  "Systems and scenarios where this shows up (and how to recognize it).",
].join("\n");

