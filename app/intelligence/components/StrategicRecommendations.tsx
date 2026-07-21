"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useIntelligence } from '../context/IntelligenceContext';
import { Target, TrendingUp, AlertTriangle, Zap, MapPin, Shield } from 'lucide-react';

export default function StrategicRecommendations() {
    const { selectedRegion, isLoading } = useIntelligence();

    const sections = [
        {
            icon: Target,
            title: "Top Opportunities",
            color: "text-emerald-500",
            bg: "bg-emerald-50",
            borderColor: "border-emerald-200",
            items: [
                `Youth voter surge in urban ${selectedRegion.name} wards presents an immediate engagement window — deploy digital-first outreach within 72 hours.`,
                "Women voter turnout projections exceed previous cycles by 3.2%. Activate women-centric policy messaging across all channels.",
                "Graduate electorate now represents the largest educated bloc. Policy-driven communication will outperform populist messaging in this segment.",
                "Recent infrastructure improvements create a favorable narrative. Amplify development achievements through targeted social media campaigns.",
            ]
        },
        {
            icon: MapPin,
            title: "Highest Priority Regions",
            color: "text-[var(--sky-primary)]",
            bg: "bg-[var(--sky-surface)]",
            borderColor: "border-[var(--sky-primary)]/20",
            items: [
                `Rural Periphery in ${selectedRegion.name} requires urgent field deployment — sentiment scores are trending negative at -4.2%.`,
                "Eastern quadrant healthcare accessibility gap is being exploited by opposition. Recommend counter-narrative with new clinic announcements.",
                "Industrial Zone engagement exceeds development score — capitalize on existing goodwill with targeted employment messaging.",
                "Suburban Belt remains strategically neutral. A focused 7-day ground campaign could shift sentiment by an estimated 5-8%.",
            ]
        },
        {
            icon: TrendingUp,
            title: "Emerging Political Trends",
            color: "text-violet-500",
            bg: "bg-violet-50",
            borderColor: "border-violet-200",
            items: [
                "Anti-incumbency micro-clusters detected in 3 peripheral wards. Early intervention recommended before consolidation.",
                "Social media sentiment analysis reveals growing interest in environmental policy — consider integrating green infrastructure messaging.",
                "Cross-party voter migration patterns suggest 12% of opposition voters are persuadable within the next campaign phase.",
                "Local community leaders in 4 districts have signaled willingness to support — initiate confidential outreach immediately.",
            ]
        },
        {
            icon: AlertTriangle,
            title: "Strategic Risks",
            color: "text-amber-500",
            bg: "bg-amber-50",
            borderColor: "border-amber-200",
            items: [
                `Survey coverage in ${selectedRegion.name} remains 18% below target. Field teams must accelerate to prevent data blind spots.`,
                "Volunteer allocation is concentrated in metropolitan districts — redistribution required to prevent rural neglect.",
                "Opposition ground game has intensified in 2 swing wards. Recommend defensive resource allocation within 48 hours.",
                "Media narrative is shifting toward governance accountability — prepare proactive communications addressing key deliverables.",
            ]
        },
        {
            icon: Zap,
            title: "Immediate Executive Actions",
            color: "text-rose-500",
            bg: "bg-rose-50",
            borderColor: "border-rose-200",
            items: [
                "Deploy 200 additional field operatives to Rural Periphery by end of week.",
                "Launch targeted digital campaign for the 18-25 demographic within 48 hours.",
                "Schedule leadership visits to 3 highest-impact wards identified by AI models.",
                "Commission rapid survey in Industrial Zone to validate engagement assumptions.",
                "Activate crisis communication protocol for healthcare narrative in eastern quadrant.",
            ]
        },
    ];

    return (
        <section className={`space-y-6 transition-opacity duration-500 ${isLoading ? 'opacity-40' : 'opacity-100'}`}>
            <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-sans font-bold text-[var(--navy-premium)]">
                    Strategic Recommendations
                </h2>
                <span className="text-[10px] uppercase tracking-widest text-[var(--slate-medium)] font-bold flex items-center gap-2">
                    <Shield className="w-3 h-3" />
                    Prepared for Executive Review
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {sections.map((section, idx) => {
                    const Icon = section.icon;
                    return (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08 }}
                            className={`bg-white rounded-2xl border border-[var(--slate-soft)] shadow-sm p-8 ${idx === sections.length - 1 ? 'lg:col-span-2' : ''}`}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`p-2 rounded-lg ${section.bg} ${section.borderColor} border`}>
                                    <Icon className={`w-4 h-4 ${section.color}`} />
                                </div>
                                <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--navy-premium)]">
                                    {section.title}
                                </h3>
                            </div>
                            <ul className="space-y-4">
                                {section.items.map((item, i) => (
                                    <li key={i} className="flex gap-3">
                                        <span className={`w-1.5 h-1.5 rounded-full ${section.color.replace('text-', 'bg-')} mt-2 shrink-0`}></span>
                                        <p className="text-sm font-medium text-[var(--navy-premium)] leading-relaxed">{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    );
                })}
            </div>

            {/* Closing Footer */}
            <div className="bg-[var(--sky-surface)] rounded-2xl p-8 border border-[var(--sky-primary)]/10 text-center">
                <p className="text-[10px] uppercase tracking-widest text-[var(--sky-primary)] font-bold mb-2">
                    End of Executive Briefing
                </p>
                <p className="text-sm font-medium text-[var(--navy-premium)] max-w-2xl mx-auto leading-relaxed">
                    This briefing was generated using iSpine&apos;s AI-powered Political Intelligence Engine. All data, analysis, and recommendations represent fictional demonstration scenarios. For live deployment, please contact iSpine Consulting.
                </p>
            </div>
        </section>
    );
}
