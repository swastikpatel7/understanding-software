import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import ContentSection from "@/components/ContentSection";
import ViewportCornerMarks from "@/components/ViewportCornerMarks";
import CircuitPatternBackground from "@/components/CircuitPatternBackground";
import FloatingGridOverlay from "@/components/FloatingGridOverlay";
import SupplementCard from "@/components/health/SupplementCard";
import BiomarkerCard from "@/components/health/BiomarkerCard";
import HealthHeroSVG from "@/components/health/HealthHeroSVG";
import ResearchModal from "@/components/health/ResearchModal";
import { SUPPLEMENTS, BIOMARKERS, RESEARCH_REPORT, TLDR_RUNNER, TECHNICAL_SUMMARY } from "@/data/health-data";
import { Download, FileText, Activity, Microscope, Dna, Heart } from "lucide-react";

const Health = () => {
  const [selectedSupplement, setSelectedSupplement] = useState<string | null>(null);
  const [showResearchModal, setShowResearchModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"supplements" | "evidence" | "monitoring">("supplements");

  const handleSupplementClick = (id: string) => {
    setSelectedSupplement(selectedSupplement === id ? null : id);
  };

  const handleExportPDF = () => {
    // In production, this would generate a PDF using a library like jsPDF
    const content = `
HEALTH & LONGEVITY ANALYSIS REPORT
Generated: ${new Date().toISOString().split('T')[0]}

ASSUMPTIONS
Target: Healthy adult male, 30-40 years, recreational runner
No chronic disease, not on blood thinners or reactive medications

TL;DR FOR A RUNNER
${TLDR_RUNNER}

TECHNICAL SUMMARY
${TECHNICAL_SUMMARY}

RESEARCH REPORT
${RESEARCH_REPORT}
    `.trim();
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'health-longevity-report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen relative noise-overlay">
      <ViewportCornerMarks />
      <FloatingGridOverlay />
      <Header />
      
      <SectionDivider variant="technical" />

      {/* Hero Section */}
      <ContentSection id="health-hero" className="container mx-auto px-8 md:px-16 scroll-mt-8">
        <CircuitPatternBackground variant="hero" />
        
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                Fitness • Health • Longevity
              </span>
              <div className="h-px flex-1 bg-border" />
              <span className="font-mono text-[10px] text-primary">
                ANALYSIS v1.0
              </span>
            </div>
            
            <h1 className="font-display text-3xl md:text-5xl text-primary tracking-wider mb-4">
              HEALTH BLUEPRINT
            </h1>
            
            <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-2xl">
              An evidence-graded analysis of your supplement stack—mechanisms, 
              dosing, synergies, and biomarkers to optimize for longevity and performance.
            </p>
          </div>

          {/* Hero SVG */}
          <div className="mb-8">
            <HealthHeroSVG 
              supplements={SUPPLEMENTS}
              onSupplementClick={handleSupplementClick}
              activeSupplementId={selectedSupplement}
            />
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-12">
            <button
              onClick={() => setShowResearchModal(true)}
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary font-mono text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <FileText className="w-4 h-4" />
              View Full Analysis
            </button>
            <button
              onClick={handleExportPDF}
              className="inline-flex items-center gap-2 px-8 py-3 border border-border text-muted-foreground font-mono text-sm uppercase tracking-wider hover:border-primary hover:text-primary transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>

          {/* Assumptions Banner */}
          <div className="border border-border/50 bg-card/30 backdrop-blur-sm p-4 mb-8">
            <div className="flex items-start gap-3">
              <Dna className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
                  Analysis Assumptions
                </p>
                <p className="font-body text-sm text-foreground">
                  Target persona: healthy adult male, 30–40 years old, recreational runner, 
                  no chronic disease, not pregnant, not on prescribed blood thinners or reactive medications.
                </p>
                <p className="font-mono text-[10px] text-muted-foreground mt-2">
                  ⚠ Flags that would change recommendations: blood thinners (warfarin, aspirin), SSRIs, 
                  BP medications, kidney disease, pregnancy, autoimmune conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider variant="gradient" />

      {/* TL;DR Section */}
      <ContentSection id="tldr" className="container mx-auto px-8 md:px-16 scroll-mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-5 h-5 text-primary" />
            <h2 className="font-display text-xl text-primary">TL;DR FOR A RUNNER</h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          
          <div className="border-l-2 border-primary pl-6">
            <p className="font-body text-lg leading-relaxed text-foreground">
              {TLDR_RUNNER}
            </p>
          </div>
        </div>
      </ContentSection>

      <SectionDivider variant="technical" label="analysis" />

      {/* Main Content Grid */}
      <ContentSection id="analysis" className="container mx-auto px-8 md:px-16 scroll-mt-8">
        <CircuitPatternBackground variant="stack" />
        
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex items-center gap-1 mb-8 border-b border-border">
            {[
              { id: "supplements" as const, label: "Supplements", icon: Heart },
              { id: "evidence" as const, label: "Evidence & Actions", icon: Microscope },
              { id: "monitoring" as const, label: "Biomarkers", icon: Activity },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-mono text-xs uppercase tracking-wider transition-all border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Supplements Tab */}
          {activeTab === "supplements" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SUPPLEMENTS.map((supplement) => (
                <SupplementCard
                  key={supplement.id}
                  supplement={supplement}
                  isExpanded={selectedSupplement === supplement.id}
                  onClick={() => handleSupplementClick(supplement.id)}
                />
              ))}
            </div>
          )}

          {/* Evidence Tab */}
          {activeTab === "evidence" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SUPPLEMENTS.map((supplement) => (
                  <div
                    key={supplement.id}
                    className="border border-border/50 bg-card/30 backdrop-blur-sm p-5"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display text-sm text-primary uppercase tracking-wide">
                          {supplement.name}
                        </h3>
                        <p className="font-mono text-[10px] text-muted-foreground">
                          {supplement.brand}
                        </p>
                      </div>
                      <span className={`px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                        supplement.evidenceGrade === "Strong" ? "bg-primary/20 text-primary" :
                        supplement.evidenceGrade === "Moderate" ? "bg-secondary text-secondary-foreground" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {supplement.evidenceGrade}
                      </span>
                    </div>
                    
                    <p className="font-body text-sm text-foreground mb-3">
                      {supplement.keyMechanism}
                    </p>
                    
                    {supplement.recommendedChange && (
                      <div className="border-t border-border/50 pt-3 mt-3">
                        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
                          Recommended Action
                        </p>
                        <p className="font-body text-sm text-primary">
                          {supplement.recommendedChange}
                        </p>
                      </div>
                    )}
                    
                    {supplement.risks.length > 0 && (
                      <div className="mt-3">
                        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
                          Safety Notes
                        </p>
                        <ul className="space-y-1">
                          {supplement.risks.slice(0, 2).map((risk, idx) => (
                            <li key={idx} className="font-body text-xs text-muted-foreground">
                              • {risk}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Monitoring Tab */}
          {activeTab === "monitoring" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {BIOMARKERS.map((biomarker) => (
                <BiomarkerCard key={biomarker.name} biomarker={biomarker} />
              ))}
            </div>
          )}
        </div>
      </ContentSection>

      <SectionDivider variant="gradient" />

      {/* Technical Summary */}
      <ContentSection id="technical" className="container mx-auto px-8 md:px-16 scroll-mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Microscope className="w-5 h-5 text-primary" />
            <h2 className="font-display text-xl text-primary">TECHNICAL SUMMARY</h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          
          <div className="prose prose-sm max-w-none">
            <div className="font-body text-foreground leading-relaxed space-y-4 whitespace-pre-line">
              {TECHNICAL_SUMMARY}
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Research Modal */}
      {showResearchModal && (
        <ResearchModal
          onClose={() => setShowResearchModal(false)}
          researchReport={RESEARCH_REPORT}
        />
      )}

      <Footer />
    </div>
  );
};

export default Health;
