"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_STEPS = [
    "Initializing IntelligenceOS...",
    "Loading AI Models...",
    "Connecting Geospatial Intelligence Engine...",
    "Synchronizing Multi-source Data Fusion...",
    "Building Knowledge Graph...",
    "Loading Decision Intelligence...",
    "Initializing Predictive Analytics...",
    "Launching Executive Command Center...",
    "System Ready."
];

export default function BootSequence() {
    const [isVisible, setIsVisible] = useState(true);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    useEffect(() => {
        // Check session storage so it only runs once per tab session
        const hasBooted = sessionStorage.getItem('intelligence_os_booted');
        if (hasBooted) {
            setIsVisible(false);
            return;
        }

        let step = 0;
        const interval = setInterval(() => {
            step++;
            if (step < BOOT_STEPS.length) {
                setCurrentStepIndex(step);
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    setIsVisible(false);
                    sessionStorage.setItem('intelligence_os_booted', 'true');
                }, 800);
            }
        }, 350); // Fast, snappy boot sequence

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    initial={{ opacity: 1, backdropFilter: "blur(16px)" }}
                    exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A1F44]/90 text-white"
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    
                    <motion.div 
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        {/* Core Logo / Icon */}
                        <div className="w-16 h-16 border-2 border-[#4A90E2] border-t-transparent rounded-full animate-spin mb-8"></div>
                        
                        <h1 className="text-3xl font-sans font-bold tracking-[0.2em] uppercase mb-4 text-[#F7FBFF]">
                            Intelligence<span className="text-[#4A90E2]">OS</span>
                        </h1>

                        <div className="h-6 overflow-hidden flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={currentStepIndex}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="text-xs uppercase tracking-widest text-[#A8D0F5] font-semibold font-mono"
                                >
                                    {BOOT_STEPS[currentStepIndex]}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-64 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
                            <motion.div 
                                className="h-full bg-[#4A90E2]"
                                initial={{ width: "0%" }}
                                animate={{ width: `${((currentStepIndex + 1) / BOOT_STEPS.length) * 100}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
