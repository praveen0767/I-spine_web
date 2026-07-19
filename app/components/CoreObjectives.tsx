"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Database, LineChart, Briefcase, Users, Target } from 'lucide-react';
import { ThemeHeading, ThemeText, ThemeLabel, ThemeCard, useTheme } from './ThemeSystem';

const OBJECTIVES = [
  {
    id: "01",
    title: "Data & Technology Infrastructure",
    desc: "To develop, acquire, and use software, platforms, and technological tools for data management, analytics, campaign monitoring, and operational efficiency.",
    icon: Database
  },
  {
    id: "02",
    title: "Public Sentiment & Market Research",
    desc: "To conduct surveys, opinion polls, market research, and public sentiment analysis, and to prepare reports, publications, and presentations based on such findings.",
    icon: LineChart
  },
  {
    id: "03",
    title: "Strategic Partnerships & Collaborations",
    desc: "To collaborate, partner, or associate with individuals, firms, institutions, or organizations for the purpose of achieving the above objectives.",
    icon: Briefcase
  },
  {
    id: "04",
    title: "Professional Talent & Field Staff",
    desc: "To hire, train, and employ professionals, consultants, researchers, and field staff necessary for carrying out the business of the company.",
    icon: Users
  },
  {
    id: "05",
    title: "Comprehensive Operational Execution",
    desc: "To undertake all such lawful activities as may be necessary, incidental, or conducive to the attainment of the above objects.",
    icon: Target
  }
];

export default function CoreObjectives() {
    const { tokens, mode } = useTheme();

    return (
        <div className="py-10">
            {/* Section Header */}
            <div className="mb-20 text-center max-w-4xl mx-auto">
                <ThemeLabel>Strategic Mission</ThemeLabel>
                <ThemeHeading className="mb-6">Core Objectives</ThemeHeading>
                <ThemeText>
                    Our consulting framework is built upon five fundamental pillars registered under our corporate mandate, ensuring strategic excellence and operational discipline.
                </ThemeText>
            </div>

            {/* Symmetrical Centered Grid for 5 items */}
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {OBJECTIVES.map((obj, idx) => {
                    // Calculate perfectly symmetrical spanning for 5 items
                    let gridClasses = "md:col-span-2 lg:col-span-2";
                    
                    if (idx === 3) {
                        // 4th item: Centers the second row on desktop
                        gridClasses += " lg:col-start-2";
                    } else if (idx === 4) {
                        // 5th item: Centers the third row on tablet, resets to natural flow on desktop
                        gridClasses += " md:col-start-2 lg:col-start-auto";
                    }

                    return (
                        <motion.div
                            key={obj.id}
                            className={gridClasses}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15, duration: 0.8 }}
                        >
                        <ThemeCard className="h-full flex flex-col group hover:border-crimson-rich/50">
                            {/* Card Header: Icon & ID */}
                            <div className="flex justify-between items-start mb-10">
                                <div className={`p-4 rounded-lg ${mode === 'dark' ? 'bg-white/5' : 'bg-navy-premium/5'} text-crimson-rich transition-transform duration-500 group-hover:scale-110 group-hover:bg-crimson-rich group-hover:text-white`}>
                                    <obj.icon className="w-8 h-8" />
                                </div>
                                <span className="font-serif text-3xl font-black text-gold-refined opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                                    {obj.id}
                                </span>
                            </div>

                            {/* Card Content */}
                            <h3 className={`font-serif text-2xl font-bold mb-4 ${tokens.heading}`}>
                                {obj.title}
                            </h3>
                            <p className={`${tokens.text} text-base leading-relaxed mb-8 flex-grow opacity-80 group-hover:opacity-100 transition-opacity duration-300`}>
                                {obj.desc}
                            </p>

                            {/* Card Footer Line */}
                            <div className={`mt-auto pt-6 border-t ${tokens.border} relative overflow-hidden`}>
                                <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${tokens.muted}`}>
                                    Strategic Asset
                                </span>
                                {/* Animated underline on hover */}
                                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-crimson-rich transition-all duration-500 group-hover:w-full" />
                            </div>
                        </ThemeCard>
                    </motion.div>
                );
            })}
            </div>
        </div>
    );
}
