"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, TrendingUp, Activity, CheckCircle, Crosshair } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export default function ExecutiveSummary() {
    const { selectedRegion, isLoading } = useIntelligence();

    return (
        <section>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-sans font-bold text-[var(--navy-premium)]">
                    Strategic Intelligence
                </h1>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] uppercase tracking-widest text-[var(--slate-medium)] font-bold">Live Sync</span>
                </div>
            </div>

            <motion.div 
                key={selectedRegion.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-2xl p-8 lg:p-10 border border-[var(--slate-soft)] shadow-sm transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Main Focus Area */}
                    <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[var(--slate-soft)] pb-8 lg:pb-0 lg:pr-10">
                        <div>
                            <span className="text-[10px] uppercase tracking-widest text-[var(--sky-primary)] font-bold bg-[var(--sky-surface)] px-3 py-1 rounded-full mb-4 inline-block">
                                Quick Executive Summary
                            </span>
                            <h2 className="text-4xl font-sans font-bold text-[var(--navy-premium)] mt-4 mb-2">
                                {selectedRegion.name}
                            </h2>
                            <p className="text-xs uppercase tracking-widest text-[var(--slate-medium)] font-semibold mb-6">
                                {selectedRegion.type}
                            </p>
                        </div>
                        
                        <div className="bg-[var(--sky-surface)] rounded-xl p-5 border border-[var(--sky-primary)]/10 mt-auto">
                            <div className="flex items-start gap-3">
                                <ShieldAlert className="w-5 h-5 text-[var(--sky-primary)] shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-widest text-[var(--sky-primary)] font-bold mb-1">Strategic Recommendation</h4>
                                    <p className="text-sm font-medium text-[var(--navy-premium)] leading-relaxed">
                                        Immediate deployment of field operatives required in {selectedRegion.name} to counter sudden shifts in demographic sentiment. Development metrics indicate a {selectedRegion.devIndex}% baseline, requiring targeted messaging on infrastructure.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* KPI Highlights */}
                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest text-[var(--slate-medium)] font-semibold mb-2">Development Index</span>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-bold text-[var(--navy-premium)]">{selectedRegion.devIndex}/100</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest text-[var(--slate-medium)] font-semibold mb-2">Campaign Readiness</span>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-bold text-[var(--navy-premium)]">{selectedRegion.readiness}%</span>
                                <TrendingUp className="w-4 h-4 text-emerald-500 mb-1" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest text-[var(--slate-medium)] font-semibold mb-2">Research Confidence</span>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-bold text-[var(--navy-premium)]">94.2%</span>
                                <CheckCircle className="w-4 h-4 text-emerald-500 mb-1" />
                            </div>
                        </div>
                        
                        <div className="col-span-2 md:col-span-3 h-[1px] bg-[var(--slate-soft)] my-2" />

                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest text-[var(--slate-medium)] font-semibold mb-2">Political Competition</span>
                            <div className="flex items-center gap-2 mt-1">
                                <Activity className="w-4 h-4 text-amber-500" />
                                <span className="text-sm font-bold text-[var(--navy-premium)]">Highly Contested</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest text-[var(--slate-medium)] font-semibold mb-2">Sentiment Snapshot</span>
                            <div className="flex items-center gap-2 mt-1">
                                <Crosshair className="w-4 h-4 text-[var(--sky-primary)]" />
                                <span className="text-sm font-bold text-[var(--navy-premium)]">Favorable (Urban)</span>
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </section>
    );
}
