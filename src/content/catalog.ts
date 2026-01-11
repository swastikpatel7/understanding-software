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
  // Optimization: This function was refactored from a nested-loop approach (O(M*N))
  // to a more efficient single pass over the chapters. By using maps for efficient
  // lookups, we avoid repeated iteration and reduce the overall complexity, making it
  // faster, especially as the number of chapters grows.

  const groupsByCatSlug = new Map<string, TChapter[]>();

  // Pre-build a map for quick slug-to-category lookups.
  const categorySlugByChapterSlug = new Map<string, string>();
  for (const category of CATALOG_CATEGORIES) {
    for (const chapterSlug of category.chapterSlugs ?? []) {
      categorySlugByChapterSlug.set(chapterSlug, category.slug);
    }
  }

  // Single pass over all chapters to assign them to a category.
  for (const chapter of chapters) {
    let assignedCategorySlug: string | undefined = categorySlugByChapterSlug.get(
      chapter.slug
    );

    // If not found by explicit slug, try to match by title.
    if (!assignedCategorySlug) {
      for (const category of CATALOG_CATEGORIES) {
        if (matchesCategoryByTitle(category.slug, chapter.title)) {
          assignedCategorySlug = category.slug;
          break; // Assign to the first matching category.
        }
      }
    }

    const finalCategorySlug = assignedCategorySlug ?? OTHER_CATEGORY.slug;

    if (!groupsByCatSlug.has(finalCategorySlug)) {
      groupsByCatSlug.set(finalCategorySlug, []);
    }
    groupsByCatSlug.get(finalCategorySlug)!.push(chapter);
  }

  // Format the output array, preserving the original category order.
  const result: ChapterGroup<TChapter>[] = [];
  for (const category of CATALOG_CATEGORIES) {
    const groupedChapters = groupsByCatSlug.get(category.slug);
    if (groupedChapters && groupedChapters.length > 0) {
      result.push({ category, chapters: groupedChapters });
    }
  }

  // Add any remaining chapters (e.g., "other") to the end.
  const otherChapters = groupsByCatSlug.get(OTHER_CATEGORY.slug);
  if (otherChapters && otherChapters.length > 0) {
    result.push({ category: OTHER_CATEGORY, chapters: otherChapters });
  }

  return result;
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

