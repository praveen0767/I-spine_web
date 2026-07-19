"use client";
import React from 'react';
import { motion } from 'framer-motion';

const METRICS = [
    "120+ Successful Campaigns",
    "Strategic Confidentiality",
    "Institutional Influence",
    "Data-Driven Victory",
    "Bespoke Campaign Architecture"
];

export default function CredibilityBar() {
    return (
        <div className="relative w-full overflow-hidden bg-white py-10 border-y border-navy-premium/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center">
                    {METRICS.map((metric, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 text-[10px] text-navy-premium/60 uppercase tracking-[0.4em] font-sans font-bold"
                        >
                            <div className="w-1 h-1 bg-crimson-rich" />
                            {metric}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

