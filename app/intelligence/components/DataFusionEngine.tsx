"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Signal, Map, Users, Share2, Server, Globe2, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

const DATA_SOURCES = [
    { id: 'gis', name: 'Geospatial Data', icon: Map, fresh: 99, reliable: 98, status: 'operational' },
    { id: 'survey', name: 'Field Surveys', icon: Users, fresh: 94, reliable: 92, status: 'operational' },
    { id: 'social', name: 'Social Sentiment', icon: Share2, fresh: 99, reliable: 87, status: 'operational' },
    { id: 'gov', name: 'Government Census', icon: FileText, fresh: 100, reliable: 99, status: 'operational' },
    { id: 'sat', name: 'Satellite Imagery', icon: Globe2, fresh: 96, reliable: 95, status: 'operational' },
    { id: 'crm', name: 'Voter CRM', icon: Database, fresh: 98, reliable: 94, status: 'operational' }
];

export default function DataFusionEngine() {
    const [hoveredSource, setHoveredSource] = useState<string | null>(null);

    return (
        <section className="space-y-6 mt-12">
            <div className="flex items-center justify-between px-2">
                <div>
                    <h2 className="text-xl font-sans font-bold text-[var(--navy-premium)]">
                        Multi-Source Data Fusion Engine
                    </h2>
                    <p className="text-[10px] uppercase tracking-widest text-[var(--slate-medium)] font-bold mt-1">Live Pipeline Synchronization</p>
                </div>
                <div className="px-3 py-1.5 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 rounded-md flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] uppercase tracking-widest font-bold">Fusion Core Online</span>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-8 lg:p-12 border border-[var(--slate-soft)] shadow-sm relative overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#E8ECF1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 max-w-5xl mx-auto">
                    
                    {/* Left: Sources Column */}
                    <div className="grid grid-cols-2 gap-4 w-full md:w-1/3">
                        {DATA_SOURCES.map((source, idx) => {
                            const Icon = source.icon;
                            const isHovered = hoveredSource === source.id;
                            return (
                                <motion.div
                                    key={source.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    onMouseEnter={() => setHoveredSource(source.id)}
                                    onMouseLeave={() => setHoveredSource(null)}
                                    className={`relative p-4 rounded-xl border flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 ${isHovered ? 'bg-[var(--sky-surface)] border-[var(--sky-primary)] shadow-md' : 'bg-white border-[var(--slate-soft)] hover:border-[var(--sky-primary)]/50'}`}
                                >
                                    <Icon className={`w-6 h-6 ${isHovered ? 'text-[var(--sky-primary)]' : 'text-[var(--slate-medium)]'}`} />
                                    <span className="text-[9px] uppercase tracking-widest font-bold text-center text-[var(--navy-premium)]">{source.name}</span>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Middle: Animated Flow */}
                    <div className="hidden md:flex flex-col items-center justify-center w-1/3 h-64 relative">
                        {/* Connecting lines rendered via SVG */}
                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                            {DATA_SOURCES.map((_, i) => (
                                <motion.path
                                    key={i}
                                    d={`M 0,${(i * 30) + 40} C 80,${(i * 30) + 40} 120,128 200,128`}
                                    fill="none"
                                    stroke="url(#gradient)"
                                    strokeWidth="2"
                                    className="opacity-20"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
                                />
                            ))}
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#4A90E2" stopOpacity="0" />
                                    <stop offset="50%" stopColor="#4A90E2" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#4A90E2" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Floating Data Packets */}
                        {DATA_SOURCES.map((_, i) => (
                            <motion.div
                                key={`packet-${i}`}
                                className="absolute left-0 w-2 h-2 bg-[var(--sky-primary)] rounded-full shadow-[0_0_10px_#4A90E2]"
                                animate={{
                                    x: [0, 200],
                                    y: [(i * 30) + 40, 128],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                            />
                        ))}
                    </div>

                    {/* Right: Core / Active Metrics */}
                    <div className="w-full md:w-1/3 flex flex-col items-center">
                        <motion.div 
                            className="w-32 h-32 rounded-full border border-[var(--sky-primary)]/30 bg-white flex items-center justify-center relative shadow-[0_0_40px_rgba(74,144,226,0.15)] mb-8"
                            animate={{ boxShadow: ['0 0 20px rgba(74,144,226,0.1)', '0 0 50px rgba(74,144,226,0.3)', '0 0 20px rgba(74,144,226,0.1)'] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <div className="absolute inset-2 rounded-full border border-[var(--sky-primary)] border-dashed animate-[spin_10s_linear_infinite]"></div>
                            <Server className="w-10 h-10 text-[var(--sky-primary)] relative z-10" />
                        </motion.div>

                        <div className="w-full h-[120px]">
                            <AnimatePresence mode="wait">
                                {hoveredSource ? (
                                    <motion.div
                                        key={hoveredSource}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="bg-[var(--sky-surface)] border border-[var(--sky-primary)]/20 rounded-xl p-4 w-full"
                                    >
                                        <h4 className="text-[10px] uppercase tracking-widest font-bold text-[var(--navy-premium)] mb-4 flex items-center gap-2">
                                            <Signal className="w-3 h-3 text-[var(--sky-primary)]" />
                                            Source Health Metrics
                                        </h4>
                                        {DATA_SOURCES.filter(s => s.id === hoveredSource).map(source => (
                                            <div key={source.id} className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[9px] uppercase tracking-widest text-[var(--slate-medium)]">Freshness</span>
                                                    <span className="text-xs font-bold text-[var(--navy-premium)]">{source.fresh}%</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[9px] uppercase tracking-widest text-[var(--slate-medium)]">Reliability</span>
                                                    <span className="text-xs font-bold text-[var(--navy-premium)]">{source.reliable}%</span>
                                                </div>
                                                <div className="w-full h-1 bg-white rounded-full overflow-hidden mt-1">
                                                    <motion.div initial={{ width: 0 }} animate={{ width: `${source.reliable}%` }} className="h-full bg-[var(--sky-primary)]" />
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="default"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="bg-white border border-[var(--slate-soft)] rounded-xl p-4 w-full flex flex-col items-center justify-center h-full text-center"
                                    >
                                        <Database className="w-5 h-5 text-[var(--slate-medium)] mb-2 opacity-50" />
                                        <p className="text-[9px] uppercase tracking-widest text-[var(--slate-medium)] font-bold">Hover over a data source to view synchronization health metrics.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
