"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from 'next/link';
import { Target, Search, Users } from "lucide-react";

const services = [
    {
        title: "Election Strategy",
        description: "Bespoke campaign architecture developed for the highest levels of political engagement. We define the path to victory through data-driven planning and tactical discipline.",
        icon: Target
    },
    {
        title: "Political Intelligence",
        description: "Advanced diagnostic sentiment tracking, opponent research, and narrative analysis to ensure you are never blindsided by the shifting political landscape.",
        icon: Search
    },
    {
        title: "Influence & Campaign Advisory",
        description: "Building institutional trust and shaping public discourse. We provide the strategic guidance needed to navigate complex influence networks and policy environments.",
        icon: Users
    },
];

export default function ServicesGrid() {
    return (
        <section className="bg-blush-white py-48 border-y border-navy-premium/5" id="strategy">
            <div className="max-w-[1440px] mx-auto px-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-12">
                    <div className="max-w-2xl">
                        <p className="text-crimson-rich font-bold uppercase text-sm tracking-[0.4em] mb-6">Core Capabilities</p>
                        <h2 className="text-navy-premium">Disciplined Strategy. <br />Decisive Results.</h2>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {services.map((s, i) => (
                        <motion.div
                            key={s.title}
                            className="premium-card p-14 flex flex-col items-start group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.8 }}
                        >
                            <div className="w-16 h-16 mb-8 text-crimson-rich flex items-center justify-center border border-crimson-rich/20 rounded-full group-hover:bg-crimson-rich group-hover:text-white transition-all duration-500">
                                <s.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-serif text-navy-premium mb-6 uppercase tracking-wider">{s.title}</h3>
                            <p className="text-charcoal/80 text-lg leading-relaxed mb-8">{s.description}</p>
                            <div className="mt-auto">
                                <Link href="#contact" className="text-xs uppercase tracking-[0.2em] font-bold text-navy-premium/40 group-hover:text-crimson-rich transition-colors">
                                    Learn More +
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
