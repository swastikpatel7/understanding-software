import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import SectionDivider from "@/components/SectionDivider";
import ContentSection from "@/components/ContentSection";
import Footer from "@/components/Footer";
import { getLayerBySlug } from "@/content/layers";
import { DIGITAL_LOGIC_TOPICS, TopicContent } from "@/content/topics/digital-logic";

// Topic data structure
type TopicSection = {
  number: string;
  slug: string;
  title: string;
  summary: string;
};

// Helper to convert TopicContent to TopicSection
const toTopicSection = (t: TopicContent): TopicSection => ({
  number: t.sectionNumber,
  slug: t.slug,
  title: t.title,
  summary: t.summary,
});

// Chapter topics - using actual data for digital-logic, placeholders for others
const CHAPTER_TOPICS: Record<string, TopicSection[]> = {
  // Layer 0: The Machine - using actual content
  "digital-logic": DIGITAL_LOGIC_TOPICS.map(toTopicSection),
  // Placeholder topics for other chapters (coming soon)
  "the-processor": [
    { number: "0.2.1", slug: "0-2-1", title: "Instruction Set Architecture", summary: "The contract between hardware and software." },
    { number: "0.2.2", slug: "0-2-2", title: "Registers", summary: "The fastest memory — why they matter." },
    { number: "0.2.3", slug: "0-2-3", title: "Fetch-Decode-Execute", summary: "The fundamental cycle." },
    { number: "0.2.4", slug: "0-2-4", title: "The ALU", summary: "Arithmetic and logic — where computation happens." },
    { number: "0.2.5", slug: "0-2-5", title: "Pipelining", summary: "Overlapping work — throughput vs latency." },
    { number: "0.2.6", slug: "0-2-6", title: "Hazards & Stalls", summary: "When the pipeline breaks — data, control, structural." },
    { number: "0.2.7", slug: "0-2-7", title: "Branch Prediction", summary: "Guessing the future — why CPUs speculate." },
    { number: "0.2.8", slug: "0-2-8", title: "Superscalar & OoO", summary: "Multiple instructions, out of order — modern cores." },
  ],
  "memory-hierarchy": [
    { number: "0.3.1", slug: "0-3-1", title: "The Memory Wall", summary: "Why memory can't keep up with CPUs." },
    { number: "0.3.2", slug: "0-3-2", title: "Registers", summary: "Nanoseconds — built into the CPU." },
    { number: "0.3.3", slug: "0-3-3", title: "Cache Architecture", summary: "L1/L2/L3 — locality saves the day." },
    { number: "0.3.4", slug: "0-3-4", title: "Cache Lines & Associativity", summary: "How caches organize data." },
    { number: "0.3.5", slug: "0-3-5", title: "Cache Coherence", summary: "Multi-core problem — MESI protocol." },
    { number: "0.3.6", slug: "0-3-6", title: "Main Memory (RAM)", summary: "DRAM — capacitors that forget." },
    { number: "0.3.7", slug: "0-3-7", title: "Memory Controllers", summary: "Scheduling access — row buffers and banks." },
  ],
  "io-and-buses": [
    { number: "0.4.1", slug: "0-4-1", title: "Bus Architecture", summary: "Shared highways for data." },
    { number: "0.4.2", slug: "0-4-2", title: "Programmed I/O", summary: "CPU does all the work — polling." },
    { number: "0.4.3", slug: "0-4-3", title: "Interrupts", summary: "Hardware signals — event-driven execution." },
    { number: "0.4.4", slug: "0-4-4", title: "DMA", summary: "Bypassing the CPU — memory-to-memory." },
    { number: "0.4.5", slug: "0-4-5", title: "PCIe", summary: "Modern high-speed interconnect — lanes and packets." },
    { number: "0.4.6", slug: "0-4-6", title: "Device Controllers", summary: "Translating protocols — disk, network, GPU." },
  ],
  // Layer 1: The Operating System (coming soon)
  "processes-and-threads": [
    { number: "1.1.1", slug: "1-1-1", title: "What is a Process?", summary: "Isolated execution environment — address space, resources." },
    { number: "1.1.2", slug: "1-1-2", title: "Process States", summary: "New → Ready → Running → Waiting → Terminated." },
    { number: "1.1.3", slug: "1-1-3", title: "Context Switching", summary: "Saving and restoring state — the cost of multitasking." },
    { number: "1.1.4", slug: "1-1-4", title: "Threads", summary: "Lightweight processes — shared memory, separate stacks." },
    { number: "1.1.5", slug: "1-1-5", title: "Scheduling Algorithms", summary: "FCFS, Round Robin, Priority, CFS — trade-offs." },
    { number: "1.1.6", slug: "1-1-6", title: "Multi-core Scheduling", summary: "Affinity, load balancing, NUMA awareness." },
  ],
  "memory-management": [
    { number: "1.2.1", slug: "1-2-1", title: "Address Spaces", summary: "Illusion of private memory — virtual addresses." },
    { number: "1.2.2", slug: "1-2-2", title: "Paging", summary: "Fixed-size chunks — page tables." },
    { number: "1.2.3", slug: "1-2-3", title: "The TLB", summary: "Caching translations — why it's critical." },
    { number: "1.2.4", slug: "1-2-4", title: "Page Faults", summary: "When memory isn't there — demand paging." },
    { number: "1.2.5", slug: "1-2-5", title: "Page Replacement", summary: "FIFO, LRU, Clock — what to evict." },
    { number: "1.2.6", slug: "1-2-6", title: "Memory-Mapped Files", summary: "Files as memory — mmap." },
    { number: "1.2.7", slug: "1-2-7", title: "Shared Memory", summary: "IPC through memory — zero-copy communication." },
  ],
  "concurrency": [
    { number: "1.3.1", slug: "1-3-1", title: "Race Conditions", summary: "Non-deterministic bugs — the enemy." },
    { number: "1.3.2", slug: "1-3-2", title: "Critical Sections", summary: "Code that can't be interrupted." },
    { number: "1.3.3", slug: "1-3-3", title: "Mutexes & Locks", summary: "Mutual exclusion — one at a time." },
    { number: "1.3.4", slug: "1-3-4", title: "Semaphores", summary: "Counting resources — producer/consumer." },
    { number: "1.3.5", slug: "1-3-5", title: "Deadlock", summary: "Circular waiting — the four conditions." },
    { number: "1.3.6", slug: "1-3-6", title: "Deadlock Prevention", summary: "Breaking the cycle — resource ordering." },
    { number: "1.3.7", slug: "1-3-7", title: "Lock-Free Structures", summary: "CAS and atomic operations — no locks needed." },
    { number: "1.3.8", slug: "1-3-8", title: "Memory Barriers", summary: "Ordering guarantees — why compilers lie." },
  ],
  "file-systems": [
    { number: "1.4.1", slug: "1-4-1", title: "Block Storage", summary: "Disks speak in blocks — not bytes." },
    { number: "1.4.2", slug: "1-4-2", title: "File Abstraction", summary: "Named sequences of bytes." },
    { number: "1.4.3", slug: "1-4-3", title: "Directories", summary: "Hierarchical namespace — paths." },
    { number: "1.4.4", slug: "1-4-4", title: "Inodes", summary: "Metadata separated from data." },
    { number: "1.4.5", slug: "1-4-5", title: "Free Space Management", summary: "Bitmaps, free lists — allocation." },
    { number: "1.4.6", slug: "1-4-6", title: "Journaling", summary: "Crash recovery — write-ahead logging." },
    { number: "1.4.7", slug: "1-4-7", title: "Copy-on-Write", summary: "ZFS, Btrfs — never overwrite." },
  ],
  "the-kernel": [
    { number: "1.5.1", slug: "1-5-1", title: "User vs Kernel Mode", summary: "Privilege rings — protection." },
    { number: "1.5.2", slug: "1-5-2", title: "System Calls", summary: "Crossing the boundary — trap instructions." },
    { number: "1.5.3", slug: "1-5-3", title: "Monolithic Kernels", summary: "Everything in kernel space — Linux." },
    { number: "1.5.4", slug: "1-5-4", title: "Microkernels", summary: "Minimal kernel — services in userspace." },
    { number: "1.5.5", slug: "1-5-5", title: "Kernel Modules", summary: "Dynamic loading — extensibility." },
    { number: "1.5.6", slug: "1-5-6", title: "Virtualization", summary: "VMs and containers — nested privilege." },
  ],
};

const ChapterPage = () => {
  const { layerSlug, chapterSlug } = useParams<{ layerSlug: string; chapterSlug: string }>();
  const layer = getLayerBySlug(layerSlug || "");
  const chapter = layer?.chapters.find((c) => c.slug === chapterSlug);
  const topics = CHAPTER_TOPICS[chapterSlug || ""] || [];

  if (!layer || !chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-display text-2xl text-primary">Chapter Not Found</h1>
          <Link to="/" className="font-mono text-sm text-muted-foreground hover:text-primary">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const chapterIndex = layer.chapters.findIndex((c) => c.slug === chapterSlug);
  const prevChapter = layer.chapters[chapterIndex - 1];
  const nextChapter = layer.chapters[chapterIndex + 1];

  return (
    <div className="min-h-screen relative">
      <Header />

      <SectionDivider />

      {/* Chapter Header */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 font-mono text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to={`/layer/${layer.slug}`} className="hover:text-primary transition-colors">
              Layer {layer.number}: {layer.title}
            </Link>
            <span>/</span>
            <span className="text-primary">{chapter.number}</span>
          </div>

          {/* Chapter title section */}
          <div className="flex items-start gap-6 mb-8">
            {/* Chapter number badge */}
            <div className="w-20 h-20 flex items-center justify-center border-2 border-primary bg-primary/10 text-primary">
              <span className="font-mono text-xl font-medium">{chapter.number}</span>
            </div>

            <div className="flex-1">
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Layer {layer.number}: {layer.title}
              </p>
              <h1 className="font-display text-3xl md:text-4xl text-primary uppercase tracking-wide mb-4">
                {chapter.title}
              </h1>
              <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Deep dive into {chapter.title.toLowerCase()}. Understanding the mechanisms,
                trade-offs, and failure modes that shape how software interacts with {
                  layer.number === 0 ? "hardware" : "the operating system"
                }.
              </p>
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex items-center gap-6 py-4 border-y border-border/50">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground uppercase">Topics</span>
              <span className="font-mono text-lg text-primary">{topics.length}</span>
            </div>
            <div className="w-px h-6 bg-border/50" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground uppercase">Est. Time</span>
              <span className="font-mono text-sm text-muted-foreground">{topics.length * 8} min</span>
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Topics List */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Topics
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-3">
            {topics.map((topic, index) => (
              <Link
                key={topic.number}
                to={`/layer/${layer.slug}/${chapter.slug}/${topic.number.replace(/\./g, "-")}`}
                className="group block relative border border-border/50 hover:border-primary/50 bg-card/30 hover:bg-card/50 transition-all duration-200"
              >
                {/* Topic number marker */}
                <div className="absolute -left-px -top-px w-14 h-full border-r border-border/50 group-hover:border-primary/50 bg-muted/20 group-hover:bg-primary/5 flex items-center justify-center transition-all duration-200">
                  <span className="font-mono text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    {topic.number}
                  </span>
                </div>

                <div className="pl-18 pr-6 py-4 flex items-center justify-between gap-4" style={{ paddingLeft: '4.5rem' }}>
                  <div className="flex-1">
                    <h3 className="font-display text-lg text-primary group-hover:text-primary transition-colors mb-1">
                      {topic.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground">
                      {topic.summary}
                    </p>
                  </div>

                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0"
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
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-14 right-0 h-0.5 bg-border/30">
                  <div className="h-full bg-primary w-0 group-hover:w-full transition-all duration-300" />
                </div>
              </Link>
            ))}
          </div>

          {/* Quick start CTA */}
          {topics.length > 0 && (
            <div className="mt-8 text-center">
              <Link
                to={`/layer/${layer.slug}/${chapter.slug}/${topics[0].number.replace(/\./g, "-")}`}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-mono text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Start with {topics[0].title}
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
          )}
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Navigation to other chapters */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            {prevChapter ? (
              <Link
                to={`/layer/${layer.slug}/${prevChapter.slug}`}
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
                  <p className="font-mono text-[10px] text-muted-foreground uppercase">Previous</p>
                  <p className="font-display text-sm text-primary">
                    {prevChapter.number} {prevChapter.title}
                  </p>
                </div>
              </Link>
            ) : (
              <Link
                to={`/layer/${layer.slug}`}
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
                  <p className="font-mono text-[10px] text-muted-foreground uppercase">Back to</p>
                  <p className="font-display text-sm text-primary">Layer {layer.number}</p>
                </div>
              </Link>
            )}

            <Link
              to={`/layer/${layer.slug}`}
              className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              All Chapters
            </Link>

            {nextChapter ? (
              <Link
                to={`/layer/${layer.slug}/${nextChapter.slug}`}
                className="group flex items-center gap-3 text-right hover:text-primary transition-colors"
              >
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase">Next</p>
                  <p className="font-display text-sm text-primary">
                    {nextChapter.number} {nextChapter.title}
                  </p>
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

export default ChapterPage;
