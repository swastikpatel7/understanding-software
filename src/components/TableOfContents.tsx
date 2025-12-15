import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type TocItem = { id: string; label: string; number?: string };

const defaultItems: TocItem[] = [
  { id: 'intro', label: 'Overview', number: '01' },
  { id: 'method', label: 'Method', number: '02' },
  { id: 'paths', label: 'Reading Paths', number: '03' },
  { id: 'chapters', label: 'Chapters', number: '04' },
];

const TableOfContents = ({ items = defaultItems }: { items?: TocItem[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState(items[0]?.id ?? 'intro');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0 
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsExpanded(false);
    }
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div 
        className={`
          bg-background/90 backdrop-blur-sm border border-primary/20 rounded-lg
          shadow-lg transition-all duration-300 ease-out overflow-hidden
          ${isExpanded ? 'w-56' : 'w-12'}
        `}
      >
        {/* Toggle button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-3 flex items-center justify-between hover:bg-primary/5 transition-colors"
          aria-label="Toggle table of contents"
        >
          <span className="font-mono text-xs text-primary uppercase tracking-wider whitespace-nowrap overflow-hidden">
            {isExpanded ? 'On This Page' : ''}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-primary shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-primary shrink-0" />
          )}
        </button>

        {/* Chapter list */}
        <div className={`transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <ul className="py-2 px-2 space-y-1">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    w-full text-left px-3 py-2 rounded-md
                    font-mono text-xs transition-all duration-200
                    flex items-center gap-3 group
                    ${activeSection === item.id 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                    }
                  `}
                >
                  <span className={`
                    w-5 h-5 flex items-center justify-center rounded-sm border text-[10px]
                    ${activeSection === item.id 
                      ? 'border-primary bg-primary text-primary-foreground' 
                      : 'border-muted-foreground/30 group-hover:border-primary/50'
                    }
                  `}>
                    {item.number ?? '•'}
                  </span>
                  <span className="truncate">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Mini indicators when collapsed */}
        {!isExpanded && (
          <div className="py-2 px-3 space-y-1.5">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  w-full h-1.5 rounded-full transition-all duration-200
                  ${activeSection === item.id 
                    ? 'bg-primary' 
                    : 'bg-primary/20 hover:bg-primary/40'
                  }
                `}
                aria-label={`Go to ${item.label}`}
              />
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default TableOfContents;
