"use client";
import React from 'react';
import { motion } from "framer-motion";
import { Shield, Globe, Monitor } from "lucide-react";

const edgeItems = [
    {
        title: "Pan-India Experience",
        description: "From the hills of Himachal to the coasts of Kerala, we understand the diverse political fabric of India.",
        icon: Globe
    },
    {
        title: "Absolute Confidentiality",
        description: "Your strategy is your weapon. We maintain the highest standards of data security and professional ethics.",
        icon: Shield
    },
    {
        title: "Digital First Approach",
        description: "We leverage cutting-edge technology to reach voters where they spend most of their time—on their screens.",
        icon: Monitor
    },
];

export default function TheEdge() {
    return (
        <section className="bg-blush-white py-48" id="edge">
            <div className="max-w-[1440px] mx-auto px-10">
                <div className="text-center mb-24">
                    <p className="text-crimson-rich font-bold uppercase text-sm tracking-[0.4em] mb-6">The Rare Politics Edge</p>
                    <h2 className="text-navy-premium mb-6">Why India's top candidates trust us<br className="hidden md:block" /> with their political future.</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-14">
                    {edgeItems.map((item, i) => (
                        <motion.div
                            key={item.title}
                            className="premium-card p-16 group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                        >
                            <div className="w-16 h-16 bg-navy-premium/5 flex items-center justify-center mb-10 group-hover:bg-crimson-rich/10 transition-colors">
                                <item.icon className="w-8 h-8 text-navy-premium group-hover:text-crimson-rich transition-colors" />
                            </div>
                            <h3 className="text-2xl font-serif text-navy-premium mb-6">{item.title}</h3>
                            <p className="text-charcoal/70 text-lg leading-relaxed">{item.description}</p>

                            <div className="mt-8 gold-divider w-8 group-hover:w-16 transition-all" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
