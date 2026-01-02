import { X, Download } from "lucide-react";
import { useEffect } from "react";

interface ResearchModalProps {
  onClose: () => void;
  researchReport: string;
}

const ResearchModal = ({ onClose, researchReport }: ResearchModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleExport = () => {
    const blob = new Blob([researchReport], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'health-research-report.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-4xl max-h-[85vh] bg-card border border-border shadow-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h2 className="font-display text-lg text-primary uppercase tracking-wider">
              Full Research Report
            </h2>
            <p className="font-mono text-[10px] text-muted-foreground">
              Evidence-graded analysis with citations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Export as Markdown"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose prose-sm max-w-none">
            <div className="font-body text-foreground leading-relaxed whitespace-pre-line">
              {researchReport}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-border">
          <p className="font-mono text-[10px] text-muted-foreground text-center">
            This is not medical advice. Consult a healthcare professional before making changes to your supplement regimen.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResearchModal;
