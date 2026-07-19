import React, { createContext, useContext, useState, ReactNode } from 'react';

export type GeoLevel =
  | 'country'
  | 'state'
  | 'parliamentary'
  | 'assembly'
  | 'district'
  | 'taluk'
  | 'block'
  | 'ward'
  | 'booth';

export interface GeoSelection {
  level: GeoLevel;
  name: string;
  id?: string;
}

interface GeoContextProps {
  selection: GeoSelection | null;
  setSelection: (selection: GeoSelection | null) => void;
}

const GeoContext = createContext<GeoContextProps | undefined>(undefined);

export const GeoProvider = ({ children }: { children: ReactNode }) => {
  const [selection, setSelection] = useState<GeoSelection | null>(null);
  return (
    <GeoContext.Provider value={{ selection, setSelection }}>
      {children}
    </GeoContext.Provider>
  );
};

export const useGeo = () => {
  const context = useContext(GeoContext);
  if (!context) {
    throw new Error('useGeo must be used within a GeoProvider');
  }
  return context;
};
