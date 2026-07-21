"use client";
import React, { useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// We will handle icon paths inside useEffect to ensure window is ready

const CARTO_POSITRON = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

interface MapComponentProps {
    constituency: string;
    onRegionSelect?: (regionId: string) => void;
    selectedRegionId?: string;
}

// Custom marker icon for key nodes
function createCustomIcon(color: string) {
    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="width:12px;height:12px;background:${color};border:2px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.15);"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
    });
}

// GeoJSON zones representing Assembly Constituencies in North West Delhi MP Constituency
const politicalZones: any = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": { "name": "Bawana", "regionId": "AC-07", "devIndex": 65 },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[77.01, 28.85], [77.10, 28.84], [77.08, 28.78], [77.02, 28.79], [77.01, 28.85]]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Narela", "regionId": "AC-01", "devIndex": 68 },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[77.10, 28.84], [77.16, 28.85], [77.14, 28.79], [77.08, 28.78], [77.10, 28.84]]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Rithala", "regionId": "AC-12", "devIndex": 78 },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[77.08, 28.78], [77.12, 28.78], [77.12, 28.73], [77.07, 28.73], [77.08, 28.78]]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Rohini", "regionId": "AC-13", "devIndex": 85 },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[77.12, 28.78], [77.15, 28.76], [77.14, 28.71], [77.11, 28.73], [77.12, 28.78]]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Mundka", "regionId": "AC-08", "devIndex": 62 },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[76.95, 28.74], [77.04, 28.73], [77.03, 28.66], [76.96, 28.67], [76.95, 28.74]]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Kirari", "regionId": "AC-09", "devIndex": 58 },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[77.04, 28.73], [77.08, 28.72], [77.06, 28.68], [77.02, 28.69], [77.04, 28.73]]]
            }
        }
    ]
};

// Key locations for markers within North West Delhi
const KEY_LOCATIONS = [
    { id: "AC-13", lat: 28.7350, lng: 77.1250, label: "Rohini Command HQ", type: "Main Operations Node" },
    { id: "AC-07", lat: 28.8100, lng: 77.0500, label: "Bawana Sector", type: "Field Operations" },
    { id: "AC-01", lat: 28.8300, lng: 77.1100, label: "Narela Outpost", type: "Survey Node" },
    { id: "AC-08", lat: 28.6850, lng: 76.9900, label: "Mundka Hub", type: "Logistics Node" },
];

export default function MapComponent({ constituency, onRegionSelect, selectedRegionId }: MapComponentProps) {
    const center: [number, number] = [28.75, 77.05];

    React.useEffect(() => {
        // Fix Leaflet's default icon path issues with Next.js after component mounts
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
    }, []);

    const onEachFeature = useCallback((feature: any, layer: any) => {
        const props = feature.properties;
        
        // Tooltip on hover
        layer.bindTooltip(
            `<div style="font-family:system-ui;padding:4px 0;">
                <div style="font-size:11px;font-weight:700;color:#16324F;margin-bottom:2px;">${props.name}</div>
                <div style="font-size:10px;color:#5B7083;">Development Index: ${props.devIndex}/100</div>
            </div>`,
            { sticky: true, className: 'custom-tooltip', direction: 'top', offset: [0, -10] }
        );

        // Click to select
        layer.on('click', () => {
            if (onRegionSelect) {
                onRegionSelect(props.regionId);
            }
        });

        // Hover effects
        layer.on('mouseover', () => {
            layer.setStyle({ weight: 3, fillOpacity: 0.5, color: '#16324F' });
        });
        layer.on('mouseout', () => {
            layer.setStyle(getStyle(feature));
        });
    }, [onRegionSelect]);

    const getStyle = useCallback((feature: any) => {
        const isSelected = feature.properties.regionId === selectedRegionId;
        return {
            color: isSelected ? '#16324F' : '#4A90E2',
            weight: isSelected ? 3 : 1.5,
            opacity: 0.8,
            fillColor: isSelected ? '#4A90E2' : '#A8D0F5',
            fillOpacity: isSelected ? 0.45 : 0.25,
        };
    }, [selectedRegionId]);

    return (
        <div className="w-full h-full rounded-xl overflow-hidden relative z-0">
            <style jsx global>{`
                .custom-tooltip {
                    background: white !important;
                    border: 1px solid #E8ECF1 !important;
                    border-radius: 10px !important;
                    padding: 8px 12px !important;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
                    font-family: system-ui, -apple-system, sans-serif !important;
                }
                .custom-tooltip::before { display: none !important; }
                .leaflet-control-zoom a {
                    background: white !important;
                    color: #16324F !important;
                    border: 1px solid #E8ECF1 !important;
                    border-radius: 8px !important;
                    width: 32px !important;
                    height: 32px !important;
                    line-height: 32px !important;
                    font-size: 16px !important;
                }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
            `}</style>

            <MapContainer 
                center={center} 
                zoom={11} 
                style={{ height: '100%', width: '100%', background: '#F7FBFF' }}
                zoomControl={true}
            >
                <TileLayer
                    url={CARTO_POSITRON}
                    attribution='&copy; OpenStreetMap contributors &copy; CARTO'
                />
                
                {/* Political overlay zones with 40-50% transparency */}
                <GeoJSON 
                    key={selectedRegionId}
                    data={politicalZones} 
                    style={getStyle}
                    onEachFeature={onEachFeature}
                />

                {/* Key location markers */}
                {KEY_LOCATIONS.map((loc) => (
                    <Marker 
                        key={loc.id} 
                        position={[loc.lat, loc.lng]}
                        icon={createCustomIcon(loc.id === selectedRegionId ? '#16324F' : '#4A90E2')}
                    >
                        <Popup>
                            <div className="font-sans p-1">
                                <p className="text-xs font-bold text-[#16324F]">{loc.label}</p>
                                <p className="text-[10px] text-[#5B7083]">{loc.type}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#E8ECF1] shadow-sm z-[400] pointer-events-none">
                <h4 className="text-[9px] uppercase tracking-widest font-bold text-[#5B7083] mb-3">Map Legend</h4>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-3 rounded-sm bg-[#4A90E2] opacity-45 border border-[#16324F]"></span>
                        <span className="text-[10px] text-[#16324F] font-medium">Selected Region</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-3 rounded-sm bg-[#A8D0F5] opacity-40 border border-[#4A90E2]"></span>
                        <span className="text-[10px] text-[#16324F] font-medium">Political Zone</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#4A90E2] border-2 border-white shadow-sm"></span>
                        <span className="text-[10px] text-[#16324F] font-medium">Operations Node</span>
                    </div>
                </div>
            </div>

            {/* Region Label */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-lg border border-[#E8ECF1] shadow-sm z-[400] pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#5B7083]">Viewing: </span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#16324F]">{constituency}</span>
            </div>
        </div>
    );
}
