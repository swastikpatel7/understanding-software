export type LayerStatus = "available" | "coming_soon";

export type Layer = {
  number: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  status: LayerStatus;
  chapters: LayerChapter[];
};

export type LayerChapter = {
  number: string; // e.g., "0.1", "0.2"
  slug: string;
  title: string;
  topicCount: number;
};

export const LAYERS: Layer[] = [
  {
    number: 0,
    slug: "the-machine",
    title: "The Machine",
    tagline: "Before software, there is silicon.",
    description:
      "How computation physically happens. Transistors become gates, gates become circuits, circuits become processors. This is where abstraction begins.",
    status: "available",
    chapters: [
      { number: "0.1", slug: "digital-logic", title: "Digital Logic", topicCount: 6 },
      { number: "0.2", slug: "the-processor", title: "The Processor", topicCount: 8 },
      { number: "0.3", slug: "memory-hierarchy", title: "Memory Hierarchy", topicCount: 7 },
      { number: "0.4", slug: "io-and-buses", title: "I/O & Buses", topicCount: 6 },
    ],
  },
  {
    number: 1,
    slug: "the-operating-system",
    title: "The Operating System",
    tagline: "The software that makes software possible.",
    description:
      "How software interfaces with hardware. Process isolation, memory management, concurrency, and the kernel—the foundation every program stands on.",
    status: "available",
    chapters: [
      { number: "1.1", slug: "processes-and-threads", title: "Processes & Threads", topicCount: 6 },
      { number: "1.2", slug: "memory-management", title: "Memory Management", topicCount: 7 },
      { number: "1.3", slug: "concurrency", title: "Concurrency", topicCount: 8 },
      { number: "1.4", slug: "file-systems", title: "File Systems", topicCount: 7 },
      { number: "1.5", slug: "the-kernel", title: "The Kernel", topicCount: 6 },
    ],
  },
  {
    number: 2,
    slug: "data-and-algorithms",
    title: "Data & Algorithms",
    tagline: "The primitives of computation.",
    description:
      "How we organize and manipulate information. Arrays, trees, graphs, hash tables—not interview trivia, but the shapes that make software fast and predictable.",
    status: "coming_soon",
    chapters: [
      { number: "2.1", slug: "fundamental-structures", title: "Fundamental Structures", topicCount: 4 },
      { number: "2.2", slug: "hash-based-structures", title: "Hash-Based Structures", topicCount: 4 },
      { number: "2.3", slug: "algorithm-paradigms", title: "Algorithm Paradigms", topicCount: 4 },
      { number: "2.4", slug: "complexity-and-limits", title: "Complexity & Limits", topicCount: 4 },
      { number: "2.5", slug: "search-and-sort", title: "Search & Sort", topicCount: 4 },
    ],
  },
  {
    number: 3,
    slug: "the-runtime",
    title: "The Runtime",
    tagline: "How code becomes execution.",
    description:
      "From source code to running program. Compilation, interpretation, memory models, type systems—the machinery that turns text into behavior.",
    status: "coming_soon",
    chapters: [
      { number: "3.1", slug: "compilation", title: "Compilation", topicCount: 5 },
      { number: "3.2", slug: "memory-models", title: "Memory Models", topicCount: 5 },
      { number: "3.3", slug: "type-systems", title: "Type Systems", topicCount: 4 },
      { number: "3.4", slug: "execution-models", title: "Execution Models", topicCount: 4 },
    ],
  },
  {
    number: 4,
    slug: "networks-and-protocols",
    title: "Networks & Protocols",
    tagline: "How systems communicate.",
    description:
      "From electrical signals to HTTP requests. The network stack, protocols, the web platform—how machines talk to each other across the world.",
    status: "coming_soon",
    chapters: [
      { number: "4.1", slug: "the-network-stack", title: "The Network Stack", topicCount: 4 },
      { number: "4.2", slug: "application-protocols", title: "Application Protocols", topicCount: 4 },
      { number: "4.3", slug: "the-web-platform", title: "The Web Platform", topicCount: 4 },
      { number: "4.4", slug: "api-design", title: "API Design", topicCount: 4 },
    ],
  },
  {
    number: 5,
    slug: "data-persistence",
    title: "Data Persistence",
    tagline: "How we store and retrieve.",
    description:
      "Where data lives when programs end. Storage fundamentals, database internals, transactions, and data modeling—the art of durability.",
    status: "coming_soon",
    chapters: [
      { number: "5.1", slug: "storage-fundamentals", title: "Storage Fundamentals", topicCount: 5 },
      { number: "5.2", slug: "database-internals", title: "Database Internals", topicCount: 4 },
      { number: "5.3", slug: "transactions", title: "Transactions", topicCount: 4 },
      { number: "5.4", slug: "data-modeling", title: "Data Modeling", topicCount: 4 },
    ],
  },
  {
    number: 6,
    slug: "distributed-systems",
    title: "Distributed Systems",
    tagline: "How systems scale and survive.",
    description:
      "When one machine isn't enough. Consistency models, consensus algorithms, failure modes—building reliable systems from unreliable parts.",
    status: "coming_soon",
    chapters: [
      { number: "6.1", slug: "fundamentals", title: "Fundamentals", topicCount: 4 },
      { number: "6.2", slug: "consistency-models", title: "Consistency Models", topicCount: 4 },
      { number: "6.3", slug: "consensus", title: "Consensus", topicCount: 4 },
      { number: "6.4", slug: "patterns-at-scale", title: "Patterns at Scale", topicCount: 4 },
    ],
  },
  {
    number: 7,
    slug: "security-and-cryptography",
    title: "Security & Cryptography",
    tagline: "How we establish trust.",
    description:
      "Protecting systems and data. Cryptographic primitives, protocols, threat models—turning raw computation into guarantees.",
    status: "coming_soon",
    chapters: [
      { number: "7.1", slug: "cryptographic-primitives", title: "Cryptographic Primitives", topicCount: 4 },
      { number: "7.2", slug: "protocols", title: "Protocols", topicCount: 4 },
      { number: "7.3", slug: "system-security", title: "System Security", topicCount: 4 },
      { number: "7.4", slug: "attack-and-defense", title: "Attack & Defense", topicCount: 4 },
    ],
  },
  {
    number: 8,
    slug: "intelligent-systems",
    title: "Intelligent Systems",
    tagline: "How machines learn.",
    description:
      "From linear algebra to language models. Neural architectures, training at scale, transformers—the mathematics of artificial intelligence.",
    status: "coming_soon",
    chapters: [
      { number: "8.1", slug: "foundations", title: "Foundations", topicCount: 4 },
      { number: "8.2", slug: "neural-architectures", title: "Neural Architectures", topicCount: 4 },
      { number: "8.3", slug: "training-at-scale", title: "Training at Scale", topicCount: 4 },
      { number: "8.4", slug: "language-models", title: "Language Models", topicCount: 4 },
    ],
  },
  {
    number: 9,
    slug: "the-frontier",
    title: "The Frontier",
    tagline: "What's next.",
    description:
      "Beyond classical computing. Quantum mechanics, emerging paradigms, the limits of computation—where the field is heading.",
    status: "coming_soon",
    chapters: [
      { number: "9.1", slug: "quantum-computing", title: "Quantum Computing", topicCount: 4 },
      { number: "9.2", slug: "emerging-paradigms", title: "Emerging Paradigms", topicCount: 3 },
      { number: "9.3", slug: "limits-of-computation", title: "Limits of Computation", topicCount: 3 },
    ],
  },
];

export const getAvailableLayers = () => LAYERS.filter((l) => l.status === "available");
export const getComingSoonLayers = () => LAYERS.filter((l) => l.status === "coming_soon");
export const getLayerBySlug = (slug: string) => LAYERS.find((l) => l.slug === slug);
export const getLayerByNumber = (num: number) => LAYERS.find((l) => l.number === num);
