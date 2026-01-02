import { useMemo, useState } from "react";
import { Download, FileText, Activity, Microscope, Dna, Heart } from "lucide-react";

import ViewportCornerMarks from "@/components/decorative/ViewportCornerMarks";
import FloatingGridOverlay from "@/components/decorative/FloatingGridOverlay";
import CircuitPatternBackground from "@/components/decorative/CircuitPatternBackground";

import SupplementCard from "@/components/health/SupplementCard";
import BiomarkerCard from "@/components/health/BiomarkerCard";
import HealthHeroSVG from "@/components/health/HealthHeroSVG";
import ResearchModal from "@/components/health/ResearchModal";

import {
  SUPPLEMENTS,
  BIOMARKERS,
  RESEARCH_REPORT,
  TLDR_RUNNER,
  TECHNICAL_SUMMARY,
} from "@/data/health-data";

type TabId = "supplements" | "evidence" | "monitoring";

export default function HealthPage() {
  const [selectedSupplement, setSelectedSupplement] = useState<string | null>(null);
  const [showResearchModal, setShowResearchModal] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("supplements");

  const tabConfig = useMemo(
    () => [
      { id: "supplements" as const, label: "Supplements", icon: Heart },
      { id: "evidence" as const, label: "Evidence & Actions", icon: Microscope },
      { id: "monitoring" as const, label: "Biomarkers", icon: Activity },
    ],
    [],
  );

  const handleSupplementClick = (id: string) => {
    setSelectedSupplement((prev) => (prev === id ? null : id));
  };

  const handleExportReport = () => {
    const date = new Date();
    const isoDay = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(
      date.getUTCDate(),
    ).padStart(2, "0")}`;

    const content = `HEALTH & LONGEVITY ANALYSIS REPORT\nGenerated: ${isoDay}\n\nASSUMPTIONS\nTarget: Healthy adult male, 30-40 years, recreational runner\nNo chronic disease, not on blood thinners or reactive medications\n\nTL;DR FOR A RUNNER\n${TLDR_RUNNER}\n\nTECHNICAL SUMMARY\n${TECHNICAL_SUMMARY}\n\nRESEARCH REPORT\n${RESEARCH_REPORT}`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "health-longevity-report.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen relative noise-overlay">
      <ViewportCornerMarks />
      <FloatingGridOverlay />

      {/* Hero */}
      <section id="health-hero" className="relative z-10 py-12 md:py-16 container mx-auto px-8 md:px-16 scroll-mt-8">
        <CircuitPatternBackground variant="hero" />

        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                Fitness • Health • Longevity
              </span>
              <div className="h-px flex-1 bg-border" />
              <span className="font-mono text-[10px] text-primary">ANALYSIS v1.0</span>
            </div>

            <h1 className="font-display text-3xl md:text-5xl text-primary tracking-wider mb-4">
              HEALTH BLUEPRINT
            </h1>

            <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-2xl">
              An evidence-graded analysis of your supplement stack—mechanisms, dosing, synergies, and biomarkers
              to optimize for longevity and performance.
            </p>
          </div>

          <div className="mb-8">
            <HealthHeroSVG
              supplements={SUPPLEMENTS}
              onSupplementClick={handleSupplementClick}
              activeSupplementId={selectedSupplement}
            />
          </div>

          <div className="flex flex-wrap gap-4 mb-12">
            <button
              type="button"
              onClick={() => setShowResearchModal(true)}
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary font-mono text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              aria-label="View full analysis"
            >
              <FileText className="w-4 h-4" aria-hidden="true" />
              View Full Analysis
            </button>

            <button
              type="button"
              onClick={handleExportReport}
              className="inline-flex items-center gap-2 px-8 py-3 border border-border text-muted-foreground font-mono text-sm uppercase tracking-wider hover:border-primary hover:text-primary transition-all duration-300"
              aria-label="Export report"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Export Report
            </button>
          </div>

          <div className="border border-border/50 bg-card/30 backdrop-blur-sm p-4">
            <div className="flex items-start gap-3">
              <Dna className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
                  Analysis Assumptions
                </p>
                <p className="font-body text-sm text-foreground">
                  Target persona: healthy adult male, 30–40 years old, recreational runner, no chronic disease,
                  not pregnant, not on prescribed blood thinners or reactive medications.
                </p>
                <p className="font-mono text-[10px] text-muted-foreground mt-2">
                  ⚠ Flags that would change recommendations: blood thinners (warfarin, aspirin), SSRIs, BP
                  medications, kidney disease, pregnancy, autoimmune conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TL;DR */}
      <section id="tldr" className="relative z-10 py-12 container mx-auto px-8 md:px-16 scroll-mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-5 h-5 text-primary" aria-hidden="true" />
            <h2 className="font-display text-xl text-primary">TL;DR FOR A RUNNER</h2>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="border-l-2 border-primary pl-6">
            <p className="font-body text-lg leading-relaxed text-foreground">{TLDR_RUNNER}</p>
          </div>
        </div>
      </section>

      {/* Analysis */}
      <section id="analysis" className="relative z-10 py-12 container mx-auto px-8 md:px-16 scroll-mt-8">
        <CircuitPatternBackground variant="stack" />

        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-1 mb-8 border-b border-border" role="tablist" aria-label="Health analysis tabs">
            {tabConfig.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-mono text-xs uppercase tracking-wider transition-all border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
              >
                <tab.icon className="w-4 h-4" aria-hidden="true" />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "supplements" && (
            <div id="panel-supplements" role="tabpanel" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

          {activeTab === "evidence" && (
            <div id="panel-evidence" role="tabpanel" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SUPPLEMENTS.map((supplement) => (
                <div key={supplement.id} className="border border-border/50 bg-card/30 backdrop-blur-sm p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display text-sm text-primary uppercase tracking-wide">{supplement.name}</h3>
                      <p className="font-mono text-[10px] text-muted-foreground">{supplement.brand}</p>
                    </div>
                    <span
                      className={`px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                        supplement.evidenceGrade === "Strong"
                          ? "bg-primary/20 text-primary"
                          : supplement.evidenceGrade === "Moderate"
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {supplement.evidenceGrade}
                    </span>
                  </div>

                  <p className="font-body text-sm text-foreground mb-3">{supplement.keyMechanism}</p>

                  {supplement.recommendedChange && (
                    <div className="border-t border-border/50 pt-3 mt-3">
                      <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
                        Recommended Action
                      </p>
                      <p className="font-body text-sm text-primary">{supplement.recommendedChange}</p>
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
          )}

          {activeTab === "monitoring" && (
            <div id="panel-monitoring" role="tabpanel" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {BIOMARKERS.map((biomarker) => (
                <BiomarkerCard key={biomarker.name} biomarker={biomarker} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Technical Summary */}
      <section id="technical" className="relative z-10 py-12 container mx-auto px-8 md:px-16 scroll-mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Microscope className="w-5 h-5 text-primary" aria-hidden="true" />
            <h2 className="font-display text-xl text-primary">TECHNICAL SUMMARY</h2>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="font-body text-foreground leading-relaxed space-y-4 whitespace-pre-line">
            {TECHNICAL_SUMMARY}
          </div>
        </div>
      </section>

      {showResearchModal && (
        <ResearchModal onClose={() => setShowResearchModal(false)} researchReport={RESEARCH_REPORT} />
      )}
    </div>
  );
}
