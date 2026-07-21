"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio } from 'lucide-react';

const FEED_ITEMS = [
    { type: 'sync', text: 'Field survey batch #4721 synchronized — North District coverage now at 84%.' },
    { type: 'gis', text: 'Geospatial layer updated — Administrative boundaries refreshed for New Delhi Central.' },
    { type: 'ai', text: 'AI sentiment model recalculated — Public sentiment shifted +1.2% favorable in South District.' },
    { type: 'media', text: 'Media intelligence analyzed — 142 articles processed, 3 trending narratives detected.' },
    { type: 'risk', text: 'Risk model completed — Rural Periphery elevated to "Medium-High" alert status.' },
    { type: 'volunteer', text: 'Volunteer movement synchronized — 840 operatives active across 5 districts.' },
    { type: 'knowledge', text: 'Knowledge graph updated — 12 new entity relationships discovered in East District.' },
    { type: 'report', text: 'Executive briefing auto-generated — Weekly constituency profile for West District ready.' },
    { type: 'survey', text: 'Survey confidence recalibrated — Overall data reliability at 94.2%.' },
    { type: 'workflow', text: 'Workflow pipeline executed — Full intelligence cycle completed in 2.4 seconds.' },
    { type: 'satellite', text: 'Satellite imagery refreshed — Infrastructure development detected in Suburban Belt.' },
    { type: 'social', text: 'Social sentiment pulse — Twitter/X engagement up 8% following policy announcement.' },
];

function getTimeStr(offset: number): string {
    const d = new Date(Date.now() - offset * 1000);
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
}

export default function LiveIntelligenceFeed() {
    const [visibleItems, setVisibleItems] = useState<Array<{ id: number; text: string; time: string }>>([]);
    const counterRef = useRef(0);

    useEffect(() => {
        // Seed initial items
        const initial = FEED_ITEMS.slice(0, 4).map((item, i) => ({
            id: i,
            text: item.text,
            time: getTimeStr((4 - i) * 12),
        }));
        counterRef.current = 4;
        setVisibleItems(initial);

        const interval = setInterval(() => {
            const idx = counterRef.current % FEED_ITEMS.length;
            const newItem = {
                id: counterRef.current,
                text: FEED_ITEMS[idx].text,
                time: getTimeStr(0),
            };
            counterRef.current++;
            setVisibleItems(prev => [newItem, ...prev].slice(0, 8));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="space-y-6 mt-12">
            <div className="flex items-center justify-between px-2">
                <div>
                    <h2 className="text-xl font-sans font-bold text-[var(--navy-premium)]">
                        Live Intelligence Feed
                    </h2>
                    <p className="text-[10px] uppercase tracking-widest text-[var(--slate-medium)] font-bold mt-1">Real-time Platform Activity</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                    <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-600">Streaming</span>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-[var(--slate-soft)] shadow-sm overflow-hidden">
                <div className="divide-y divide-[var(--slate-soft)]">
                    <AnimatePresence initial={false}>
                        {visibleItems.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.4 }}
                                className="px-6 py-4 flex items-start gap-4"
                            >
                                <span className="text-[10px] font-mono font-bold text-[var(--slate-medium)] whitespace-nowrap mt-0.5 min-w-[70px]">
                                    {item.time}
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--sky-primary)] mt-1.5 shrink-0"></span>
                                <p className="text-sm text-[var(--navy-premium)] leading-relaxed font-medium">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
