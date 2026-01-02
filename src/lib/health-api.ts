/**
 * Health API Client
 * 
 * This module provides functions to interact with the health analysis API.
 * In production, these would call actual backend endpoints.
 * Currently returns mock data based on the static health-data.ts file.
 */

import { 
  SUPPLEMENTS, 
  BIOMARKERS,
  type Supplement,
  type Biomarker,
  type HealthProfile,
  type AnalyzeRequest,
  type AnalyzeResponse 
} from "@/data/health-data";

// Simulated API base URL - in production, this would be an environment variable
const API_BASE = "/api/health";

/**
 * Fetch the current health profile
 * GET /health/profile
 */
export async function fetchHealthProfile(): Promise<HealthProfile> {
  // In production, this would be:
  // const response = await fetch(`${API_BASE}/profile`);
  // return response.json();
  
  // Mock implementation
  return {
    supplements: SUPPLEMENTS,
    daily_nutrient_totals: computeDailyNutrients(SUPPLEMENTS),
    monitoring_recommendations: BIOMARKERS,
    references: extractReferences(SUPPLEMENTS),
  };
}

/**
 * Analyze a custom supplement stack
 * POST /health/analyze
 */
export async function analyzeSupplements(request: AnalyzeRequest): Promise<AnalyzeResponse> {
  // In production, this would be:
  // const response = await fetch(`${API_BASE}/analyze`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(request),
  // });
  // return response.json();
  
  // Mock implementation - matches request supplements to our database
  const matchedSupplements = SUPPLEMENTS.filter(supp => 
    request.supplements.some(reqSupp => 
      supp.name.toLowerCase().includes(reqSupp.name.toLowerCase()) ||
      reqSupp.name.toLowerCase().includes(supp.name.toLowerCase())
    )
  );
  
  return {
    supplements: matchedSupplements.map(supp => ({
      name: supp.name,
      source_url: supp.sourceUrl,
      ingredients: supp.ingredients,
      evidence_grade: supp.evidenceGrade,
      recommended_change: supp.recommendedChange,
      risks: supp.risks,
    })),
    daily_nutrient_totals: computeDailyNutrients(matchedSupplements),
    monitoring_recommendations: BIOMARKERS.map(b => ({
      biomarker: b.name,
      cadence: b.cadence,
      rationale: b.rationale,
    })),
    references: extractReferences(matchedSupplements),
  };
}

/**
 * Compute daily nutrient totals from a list of supplements
 * This is a pure function suitable for unit testing
 */
export function computeDailyNutrients(
  supplements: Supplement[]
): Record<string, { amount: string; rda: string; ul: string; status: string }> {
  // Simplified nutrient tracking - in production, this would parse
  // actual amounts and units from ingredient lists
  
  const nutrients: Record<string, { amount: string; rda: string; ul: string; status: string }> = {};
  
  // Track known nutrients across supplements
  const nutrientMap: Record<string, { sources: string[]; rda: string; ul: string }> = {
    "Magnesium": { sources: ["magnesium"], rda: "400-420mg", ul: "350mg (suppl.)" },
    "Omega-3 (EPA+DHA)": { sources: ["fish-oil"], rda: "250-500mg", ul: "3000mg" },
    "Vitamin D": { sources: ["multivitamin"], rda: "600-800 IU", ul: "4000 IU" },
    "Zinc": { sources: ["multivitamin", "nac-glycine"], rda: "11mg", ul: "40mg" },
    "NAC": { sources: ["nac-glycine"], rda: "N/A", ul: "N/A (clinical: 1800mg)" },
    "Creatine": { sources: ["creatine"], rda: "N/A", ul: "N/A" },
    "Probiotics": { sources: ["probiotic"], rda: "N/A", ul: "N/A" },
  };
  
  for (const [nutrient, config] of Object.entries(nutrientMap)) {
    const hasSources = config.sources.some(source => 
      supplements.some(s => s.id === source)
    );
    
    if (hasSources) {
      const supplement = supplements.find(s => config.sources.includes(s.id));
      nutrients[nutrient] = {
        amount: supplement?.userDose || "See product",
        rda: config.rda,
        ul: config.ul,
        status: supplement?.doseStatus === "meets" ? "Optimal" : 
                supplement?.doseStatus === "exceeds" ? "High" : "Below RDA",
      };
    }
  }
  
  return nutrients;
}

/**
 * Extract all unique references from supplements
 */
export function extractReferences(
  supplements: Supplement[]
): Array<{ title: string; url: string; date: string; type: string }> {
  const refs: Array<{ title: string; url: string; date: string; type: string }> = [];
  
  supplements.forEach(supp => {
    supp.citations.forEach(citation => {
      // Parse citation string to extract components
      const doiMatch = citation.match(/DOI:(10\.\d+\/[^\s]+)/);
      const yearMatch = citation.match(/\b(19|20)\d{2}\b/);
      
      refs.push({
        title: citation.split('. DOI:')[0],
        url: doiMatch ? `https://doi.org/${doiMatch[1]}` : "#",
        date: yearMatch ? yearMatch[0] : "Unknown",
        type: citation.toLowerCase().includes('meta-analysis') ? "Meta-analysis" :
              citation.toLowerCase().includes('rct') || citation.toLowerCase().includes('trial') ? "RCT" :
              "Study",
      });
    });
  });
  
  // Remove duplicates by URL
  const unique = refs.filter((ref, index, self) => 
    index === self.findIndex(r => r.url === ref.url)
  );
  
  return unique;
}

/**
 * Get supplement by ID
 */
export function getSupplementById(id: string): Supplement | undefined {
  return SUPPLEMENTS.find(s => s.id === id);
}

/**
 * Get biomarkers related to a specific supplement
 */
export function getBiomarkersForSupplement(supplementName: string): Biomarker[] {
  return BIOMARKERS.filter(b => 
    b.relatedSupplements.some(s => 
      s.toLowerCase().includes(supplementName.toLowerCase()) ||
      supplementName.toLowerCase().includes(s.toLowerCase())
    )
  );
}
