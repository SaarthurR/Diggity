import React, { createContext, useContext, useState, ReactNode } from "react";

interface AnalyzedArtifact {
  id: string;
  name: string;
  age: string;
  material: string;
  purpose: string;
  location: string;
  whyItMatters: string;
  type: string;
  civilizationId: string;
}

interface AnalyzedCivilization {
  id: string;
  name: string;
  period: string;
  location: string;
  dailyLife: string;
  contributions: string[];
  facts: string[];
}

interface AnalysisContextType {
  analyzedArtifact: AnalyzedArtifact | null;
  analyzedCivilization: AnalyzedCivilization | null;
  setAnalysisResult: (artifact: AnalyzedArtifact, civ: AnalyzedCivilization) => void;
  clearAnalysis: () => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [analyzedArtifact, setAnalyzedArtifact] = useState<AnalyzedArtifact | null>(null);
  const [analyzedCivilization, setAnalyzedCivilization] = useState<AnalyzedCivilization | null>(null);

  const setAnalysisResult = (artifact: AnalyzedArtifact, civ: AnalyzedCivilization) => {
    setAnalyzedArtifact(artifact);
    setAnalyzedCivilization(civ);
  };

  const clearAnalysis = () => {
    setAnalyzedArtifact(null);
    setAnalyzedCivilization(null);
  };

  return (
    <AnalysisContext.Provider value={{ analyzedArtifact, analyzedCivilization, setAnalysisResult, clearAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error("useAnalysis must be used within AnalysisProvider");
  }
  return context;
}
