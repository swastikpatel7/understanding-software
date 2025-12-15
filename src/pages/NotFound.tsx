import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentSection from "@/components/ContentSection";
import SectionDivider from "@/components/SectionDivider";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative">
      <Header />
      <SectionDivider />
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-3xl mx-auto py-20 text-center space-y-4">
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">404</p>
          <h1 className="font-display text-3xl md:text-4xl text-primary">Page Not Found</h1>
          <p className="font-body text-muted-foreground leading-relaxed">
            The page you requested doesn’t exist (or it moved).
          </p>
          <div className="pt-4 flex items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-2 border border-primary text-primary font-mono text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to="/chapters"
              className="inline-flex items-center gap-2 px-6 py-2 border border-border text-muted-foreground font-mono text-sm uppercase tracking-wider hover:text-primary hover:border-primary/50 transition-all duration-300"
            >
              Chapters
            </Link>
          </div>
        </div>
      </ContentSection>
      <Footer />
    </div>
  );
};

export default NotFound;
