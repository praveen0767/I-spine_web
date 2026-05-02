"use client";
import React from "react";
import { motion } from "framer-motion";

const projects = [
    { 
        title: "Coalition Architecture", 
        client: "Consensus Group", 
        outcome: "Unified 14 Factions", 
        summary: "Architecting a strategic alliance for a national coalition, resolving deep-seated ideological divides through discrete mediation."
    },
    { 
        title: "National Narrative Shift", 
        client: "Strategic Alliance", 
        outcome: "22% Influence Swing", 
        summary: "Execution of a high-impact diagnostic strategy to redefine the public perception of a major policy initiative over 180 days."
    },
    { 
        title: "Crisis Intelligence", 
        client: "Reform Foundation", 
        outcome: "Reputation Neutralized", 
        summary: "Strategic deployment of political intelligence to identify and neutralize emerging threats during an intense legislative cycle."
    },
];

export default function CaseStudies() {
    return (
        <section className="bg-blush-white py-32" id="clients">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-20 text-center md:text-left">
                    <p className="text-crimson-rich font-bold uppercase text-[10px] tracking-[0.4em] mb-6">Strategic Engagements</p>
                    <h2 className="text-navy-premium">Case Studies in Victory.</h2>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {projects.map((p, i) => (
                        <motion.div
                            key={p.title}
                            className="premium-card p-12 flex flex-col items-start border-t-2 border-t-crimson-rich/20"
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.8 }}
                        >
                            <p className="text-navy-premium/40 text-[9px] uppercase tracking-[0.3em] font-bold mb-8">{p.client}</p>
                            <h3 className="text-xl font-serif text-navy-premium mb-6 group-hover:text-crimson-rich transition-colors">{p.title}</h3>
                            <p className="text-charcoal/70 text-sm leading-relaxed mb-10">{p.summary}</p>
                            
                            <div className="mt-auto pt-8 border-t border-navy-premium/5 w-full flex justify-between items-center">
                                <span className="text-crimson-rich text-[10px] font-bold uppercase tracking-widest">{p.outcome}</span>
                                <div className="gold-divider w-8 my-0" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
