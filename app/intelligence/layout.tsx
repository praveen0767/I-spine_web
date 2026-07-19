'use client';

import { GeoProvider } from './context/GeoContext';

export default function IntelligenceLayout({ children }: { children: React.ReactNode }) {
  return (
    <GeoProvider>
      <div className="min-h-screen w-full bg-[#050E1F] text-white overflow-hidden" style={{ fontFamily: 'var(--font-sans, monospace)' }}>
        {children}
      </div>
    </GeoProvider>
  );
}
