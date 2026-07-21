"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Fictional Regions for Demo - North West Delhi MP Constituency Segments
export const REGIONS = [
  { id: "AC-13", name: "Rohini", type: "Assembly Constituency", devIndex: 85, readiness: 92 },
  { id: "AC-12", name: "Rithala", type: "Assembly Constituency", devIndex: 78, readiness: 85 },
  { id: "AC-07", name: "Bawana", type: "Assembly Constituency", devIndex: 65, readiness: 72 },
  { id: "AC-01", name: "Narela", type: "Assembly Constituency", devIndex: 68, readiness: 65 },
  { id: "AC-08", name: "Mundka", type: "Assembly Constituency", devIndex: 62, readiness: 58 },
  { id: "AC-09", name: "Kirari", type: "Assembly Constituency", devIndex: 58, readiness: 45 }
];

export interface RegionData {
  id: string;
  name: string;
  type: string;
  devIndex: number;
  readiness: number;
}

interface IntelligenceContextType {
  selectedRegion: RegionData;
  setSelectedRegion: (regionId: string) => void;
  isLoading: boolean;
}

const IntelligenceContext = createContext<IntelligenceContextType | undefined>(undefined);

export function IntelligenceProvider({ children }: { children: ReactNode }) {
  const [activeRegionId, setActiveRegionId] = useState<string>("AC-13");
  const [isLoading, setIsLoading] = useState(false);

  const setSelectedRegion = (id: string) => {
    setIsLoading(true);
    setActiveRegionId(id);
    // Simulate data loading delay for realism
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  const selectedRegion = REGIONS.find(r => r.id === activeRegionId) || REGIONS[0];

  return (
    <IntelligenceContext.Provider value={{ selectedRegion, setSelectedRegion, isLoading }}>
      {children}
    </IntelligenceContext.Provider>
  );
}

export function useIntelligence() {
  const context = useContext(IntelligenceContext);
  if (context === undefined) {
    throw new Error('useIntelligence must be used within an IntelligenceProvider');
  }
  return context;
}
