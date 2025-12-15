import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-border py-12 mt-20">
      <div className="container mx-auto px-8 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h4 className="font-display text-primary text-sm">CODE BLUEPRINT</h4>
            <p className="font-body text-sm text-muted-foreground italic">
              A visual guide for curious minds.
            </p>
          </div>
          
          <div className="flex gap-8">
            <Link
              to="/about"
              className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
            >
              About
            </Link>
            <Link
              to="/chapters"
              className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
            >
              Chapters
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border">
          <p className="font-mono text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Code Blueprint.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
