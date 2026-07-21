"use client";
import dynamic from 'next/dynamic';

const MapComponentDynamic = dynamic(() => import('./MapComponent'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-[var(--sky-surface)] animate-pulse rounded-xl flex items-center justify-center text-[var(--slate-medium)] text-[10px] uppercase tracking-widest font-semibold border border-[var(--slate-soft)]">
            Initializing Geospatial Engine...
        </div>
    )
});

interface MapWrapperProps {
    constituency: string;
    onRegionSelect?: (regionId: string) => void;
    selectedRegionId?: string;
}

export default function MapWrapper({ constituency, onRegionSelect, selectedRegionId }: MapWrapperProps) {
    return <MapComponentDynamic constituency={constituency} onRegionSelect={onRegionSelect} selectedRegionId={selectedRegionId} />;
}
