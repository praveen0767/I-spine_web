"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const HEADLINES = [
    {
        title: "Strategy creates momentum. Momentum wins elections.",
        desc: "I-SPINE PVT LTD makes both happen. We deliver data-driven campaigns that convert ground reality into undeniable political mandates."
    },
    {
        title: "No noise. No guesswork. Just winning strategy.",
        desc: "I-SPINE PVT LTD transforms complex electoral data into precision-guided execution, giving candidates a decisive edge."
    },
    {
        title: "Elections are not fought. They are engineered.",
        desc: "I-SPINE PVT LTD builds the strategy, intelligence, and operational infrastructure required to secure victory."
    }
];

export default function Hero() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % HEADLINES.length);
        }, 8000); // Slower interval for better readability
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center pt-32 pb-24 overflow-hidden bg-[#FAF9F6]">
            
            {/* 1. FULL-SECTION MOMENTUM WAVES (Background) */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <svg className="absolute bottom-[-10%] right-[-10%] w-[150%] md:w-[120%] h-[120%] opacity-[0.08]" viewBox="0 0 1000 1000">
                    {[...Array(6)].map((_, i) => (
                        <motion.circle
                            key={i}
                            cx="800"
                            cy="800"
                            r={200 + (i * 150)}
                            fill="none"
                            stroke="#0A1F44"
                            strokeWidth="1.5"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ 
                                opacity: [0, 0.5, 0], 
                                scale: [0.8, 1.05, 1.2],
                            }}
                            transition={{ 
                                duration: 10, 
                                delay: i * 1.5, 
                                repeat: Infinity, 
                                ease: "easeOut" 
                            }}
                        />
                    ))}
                </svg>
                
                <div className="absolute inset-0 z-[-1] opacity-[0.03] grayscale">
                    <img 
                        src="/images/heroim.png" 
                        alt="Strategic Vision Background" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/90 to-transparent" />
            </div>

            {/* 2. MAIN CONTENT GRID (Split Layout) */}
            <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-16">
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-center">
                    
                    {/* LEFT COLUMN: Strategic Messaging */}
                    <div className="lg:col-span-7 flex flex-col items-start text-left">
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <div className="w-12 h-[2px] bg-crimson-rich" />
                            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-crimson-rich">
                                Strategic Political Intelligence
                            </span>
                        </motion.div>

                        <div className="min-h-[280px] md:min-h-[340px] flex flex-col justify-start w-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="w-full"
                                >
                                    <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] text-[#0A1F44] leading-[1.05] mb-8 font-serif font-black tracking-tight">
                                        {HEADLINES[index].title}
                                    </h1>
                                    
                                    <p className="text-[#0A1F44]/70 text-xl md:text-2xl lg:text-3xl max-w-2xl font-sans leading-relaxed">
                                        {HEADLINES[index].desc.split('I-SPINE PVT LTD').map((part, i, arr) => (
                                            <React.Fragment key={i}>
                                                {part}
                                                {i < arr.length - 1 && <span className="text-gold-refined font-bold">I-SPINE PVT LTD</span>}
                                            </React.Fragment>
                                        ))}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* CTA BUTTONS */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-6 mt-8 w-full sm:w-auto"
                        >
                            <Link href="#services" className="w-full sm:w-auto">
                                <button className="w-full bg-crimson-rich hover:bg-red-700 text-white px-10 md:px-12 py-5 md:py-6 text-sm md:text-base uppercase tracking-[0.3em] font-bold transition-all duration-300 rounded-sm shadow-xl hover:shadow-2xl">
                                    Explore Solutions
                                </button>
                            </Link>
                            <Link href="#contact" className="w-full sm:w-auto">
                                <button className="w-full border-2 border-[#0A1F44] text-[#0A1F44] px-10 md:px-12 py-5 md:py-6 text-sm md:text-base uppercase tracking-[0.3em] font-bold hover:bg-[#0A1F44] hover:text-white transition-all duration-300 rounded-sm">
                                    Initiate Contact
                                </button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Visual Authority Block */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="relative flex flex-col items-center"
                        >
                            {/* Abstract Data Rings */}
                            <div className="absolute inset-0 -m-16 border border-[#0A1F44]/5 rounded-full animate-[spin_60s_linear_infinite]" />
                            <div className="absolute inset-0 -m-8 border border-dashed border-[#0A1F44]/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
                            
                            {/* Premium Logo Container */}
                            <div className="relative p-2 md:p-3 rounded-full bg-[#050E1F] shadow-[0_20px_50px_rgba(10,31,68,0.3)] backdrop-blur-sm z-10 border border-white/10">
                                <div className="w-64 h-64 md:w-[22rem] md:h-[22rem] lg:w-[28rem] lg:h-[28rem] rounded-full overflow-hidden flex items-center justify-center transition-transform duration-700 hover:scale-105 shadow-inner bg-[#050E1F]">
                                    <img 
                                        src="/images/logo.png" 
                                        alt="I-SPINE PVT LTD Core Identity" 
                                        className="w-full h-full object-cover scale-[0.9] filter drop-shadow-2xl" 
                                    />
                                </div>
                            </div>
                            
                            {/* Institutional Sign-off */}
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 1 }}
                                className="mt-10 text-center z-10"
                            >
                                <div className="text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.5em] text-[#0A1F44]/60 mb-2">
                                    INDIAN
                                </div>
                                <div className="w-8 h-[1px] bg-[#0A1F44]/20 mx-auto mb-2" />
                                <div className="text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.3em] text-[#0A1F44]/40">
                                    Strategic Political Intelligence<br/>& Engagement
                                </div>
                            </motion.div>

                            {/* Data Nodes Decoration */}
                            <div className="absolute top-10 right-0 w-2 h-2 rounded-full bg-crimson-rich animate-pulse shadow-[0_0_10px_rgba(165,28,48,0.8)]" />
                            <div className="absolute bottom-20 left-0 w-3 h-3 rounded-full bg-gold-refined/60 animate-pulse delay-700" />
                        </motion.div>

                    </div>
                </div>
            </div>

            {/* DECORATIVE SCROLL INDICATOR */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#0A1F44]/30 to-transparent" />
                <span className="text-[10px] uppercase tracking-[0.6em] text-[#0A1F44]/40 font-bold">Scroll</span>
            </motion.div>
        </section>
    );
}
