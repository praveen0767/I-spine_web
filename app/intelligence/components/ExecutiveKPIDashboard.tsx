"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useIntelligence } from '../context/IntelligenceContext';
import { Users, TrendingUp, ShieldCheck, Target, BarChart2, Radio, Zap, Globe, MessageCircle, AlertTriangle } from 'lucide-react';

export default function ExecutiveKPIDashboard() {
    const { selectedRegion, isLoading } = useIntelligence();

    const KPIS = [
        { name: "Registered Voters", value: "2.4M", trend: "up", change: "+1.2%", insight: "Migration from rural centers driving increase.", icon: Users },
        { name: "Development Score", value: `${selectedRegion.devIndex}/100`, trend: "up", change: "+4.1%", insight: "Infrastructure pushes elevating metric.", icon: TrendingUp },
        { name: "Campaign Reach", value: "68%", trend: "up", change: "+5.4%", insight: "Digital outreach exceeding targets.", icon: Radio },
        { name: "Survey Coverage", value: "82%", trend: "down", change: "-2.1%", insight: "Field teams encountering access issues.", icon: Target },
        { name: "Volunteer Strength", value: "14,520", trend: "up", change: "+12.0%", insight: "Recent mobilization drive highly effective.", icon: ShieldCheck },
        { name: "Public Sentiment", value: "Favorable", trend: "up", change: "+1.1%", insight: "Policy announcements resonating well.", icon: MessageCircle },
        { name: "Political Competition", value: "High", trend: "neutral", change: "0.0%", insight: "Opposition consolidating in urban pockets.", icon: AlertTriangle },
        { name: "AI Decision Confidence", value: "94%", trend: "up", change: "+0.5%", insight: "Data density supporting robust predictions.", icon: Zap },
    ];

    return (
        <section className={`space-y-6 transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
            <h2 className="text-xl font-sans font-bold text-[var(--navy-premium)] px-2">
                Executive KPI Dashboard
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {KPIS.map((kpi, index) => {
                    const Icon = kpi.icon;
                    const isPositive = kpi.trend === 'up';
                    const isNegative = kpi.trend === 'down';
                    
                    return (
                        <motion.div
                            key={kpi.name}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-2xl p-6 border border-[var(--slate-soft)] shadow-sm hover:border-[var(--sky-primary)]/40 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--slate-medium)]">
                                    {kpi.name}
                                </span>
                                <div className="p-2 rounded-lg bg-gradient-to-br from-[var(--sky-primary)]/10 to-[var(--sky-primary)]/5 text-[var(--sky-primary)] border border-[var(--sky-primary)]/10">
                                    <Icon className="w-4 h-4" />
                                </div>
                            </div>
                            
                            <div className="flex items-end gap-3 mb-4">
                                <span className="text-3xl font-bold text-[var(--navy-premium)] leading-none">{kpi.value}</span>
                                <span className={`text-xs font-bold mb-1 ${isPositive ? 'text-emerald-500' : isNegative ? 'text-red-500' : 'text-amber-500'}`}>
                                    {kpi.change}
                                </span>
                            </div>

                            <div className="pt-4 border-t border-[var(--slate-soft)]">
                                <p className="text-[11px] font-medium text-[var(--slate-medium)] leading-relaxed flex gap-2">
                                    <span className="text-[var(--sky-primary)] font-bold">Insight:</span>
                                    {kpi.insight}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
