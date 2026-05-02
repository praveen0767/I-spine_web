"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, Compass, Play, Eye, RefreshCw, Trophy } from 'lucide-react';
import { ThemeHeading, ThemeText, ThemeLabel, useTheme } from './ThemeSystem';

const STEPS = [
    {
        id: "01",
        title: "Discovery",
        desc: "Initial assessment, stakeholder alignment, and boundary setting.",
        icon: Search
    },
    {
        id: "02",
        title: "Research",
        desc: "Deep-dive data collection, polling, and competitive intelligence.",
        icon: FileText
    },
    {
        id: "03",
        title: "Strategy",
        desc: "Formulating the roadmap, narrative, and targeting matrices.",
        icon: Compass
    },
    {
        id: "04",
        title: "Execution",
        desc: "Deploying ground assets, digital campaigns, and war rooms.",
        icon: Play
    },
    {
        id: "05",
        title: "Monitoring",
        desc: "Real-time tracking of voter sentiment and feedback loops.",
        icon: Eye
    },
    {
        id: "06",
        title: "Refinement",
        desc: "Agile course correction based on emerging tactical data.",
        icon: RefreshCw
    },
    {
        id: "07",
        title: "Victory",
        desc: "Post-election stability, policy planning, and governance.",
        icon: Trophy
    }
];

export default function Workflow() {
    const { tokens, mode } = useTheme();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="w-full relative">
            
            {/* Full-Section Background Diagram (Covering entire background area) */}
            <div className="absolute left-1/2 top-1/2 w-[100vw] h-[100%] -translate-x-1/2 -translate-y-1/2 z-[-1] pointer-events-none">
                <div 
                    className={`absolute inset-0 bg-cover bg-center opacity-[0.45] transition-all duration-1000 ${mode === 'dark' ? 'mix-blend-lighten' : 'mix-blend-multiply'}`}
                    style={{ backgroundImage: "url('/images/workflow-bg-v2.png')" }}
                />
                {/* Minimal gradient to prevent hard edges at section boundaries */}
                <div className={`absolute inset-x-0 top-0 h-32 ${mode === 'dark' ? 'bg-gradient-to-b from-[#0B1F45]' : 'bg-gradient-to-b from-[#FAF9F6]'} to-transparent`} />
                <div className={`absolute inset-x-0 bottom-0 h-32 ${mode === 'dark' ? 'bg-gradient-to-t from-[#0B1F45]' : 'bg-gradient-to-t from-[#FAF9F6]'} to-transparent`} />
            </div>

            <div className="max-w-[1600px] mx-auto relative z-10">
                
                {/* Section Header */}
                <div className="mb-24 text-center max-w-4xl mx-auto">
                    <ThemeLabel>Strategic Roadmap</ThemeLabel>
                    <ThemeHeading className="mb-6">
                        Campaign Workflow
                    </ThemeHeading>
                    <ThemeText>
                        A disciplined, end-to-end operational timeline designed to convert strategic planning into decisive electoral outcomes.
                    </ThemeText>
                </div>

                {/* Timeline Container */}
                <div className="relative">
                    
                    {/* Desktop Horizontal Line */}
                    <div className="hidden lg:block absolute top-[45px] left-[5%] right-[5%] h-1 bg-gradient-to-r from-transparent via-[#0A1F44]/20 dark:via-white/20 to-transparent" />
                    
                    {/* Mobile Vertical Line */}
                    <div className="lg:hidden absolute top-0 bottom-0 left-[39px] w-1 bg-gradient-to-b from-[#0A1F44]/10 via-[#0A1F44]/20 dark:from-white/10 dark:via-white/20 to-transparent" />

                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 lg:gap-4 relative z-10">
                        {STEPS.map((step, i) => (
                            <motion.div
                                key={step.id}
                                className="relative flex flex-row lg:flex-col items-start lg:items-center w-full lg:w-[14%] group"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {/* Node Icon */}
                                <div className={`relative z-10 flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full border-[4px] ${mode === 'dark' ? 'bg-[#0B1F45] border-[#10285A]' : 'bg-[#FAF9F6] border-white'} shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:border-crimson-rich group-hover:bg-crimson-rich lg:mb-8`}>
                                    <step.icon className={`w-8 h-8 ${mode === 'dark' ? 'text-white/80' : 'text-[#0A1F44]'} group-hover:text-white transition-colors duration-500`} />
                                </div>

                                {/* Content Card */}
                                <div className={`ml-8 lg:ml-0 lg:text-center p-6 lg:p-4 rounded-lg border ${tokens.border} ${tokens.card} w-full transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:border-crimson-rich/30`}>
                                    <div className="mb-3">
                                        <span className="text-[10px] font-mono font-bold tracking-widest text-crimson-rich uppercase">
                                            Phase {step.id}
                                        </span>
                                    </div>
                                    <h3 className={`text-xl lg:text-2xl font-serif font-bold mb-3 ${tokens.heading}`}>
                                        {step.title}
                                    </h3>
                                    <p className={`text-sm lg:text-base font-sans leading-relaxed ${tokens.muted}`}>
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
