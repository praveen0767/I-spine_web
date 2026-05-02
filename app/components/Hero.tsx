"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.8 },
    }),
};

export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center text-center bg-navy-deep bg-gradient-to-b from-navy to-midnight overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=1200')] bg-cover opacity-20 grayscale" />
            <div className="relative z-10 container mx-auto px-6">
                <motion.div
                    className="mb-8 flex justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <img src="/Photos/heroim.png" alt="iSPINE Logo" className="h-24 md:h-32 w-auto object-contain" />
                </motion.div>
                <motion.h1
                    className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    variants={heroVariants}
                >
                    Where Political Vision Meets <span className="text-gold-primary">Strategic Execution</span>
                </motion.h1>
                <motion.p
                    className="text-lg md:text-2xl text-ivory/80 mb-10 max-w-3xl mx-auto"
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={heroVariants}
                >
                    RarePolitics advises leaders and institutions with intelligence, field precision, and narrative power.
                </motion.p>
                <motion.div
                    className="flex flex-col sm:flex-row justify-center gap-6"
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    variants={heroVariants}
                >
                    <Link href="#contact" className="bg-gold-primary text-navy-deep font-bold px-10 py-4 rounded hover:scale-105 transition-transform">
                        Initiate Strategy Protocol
                    </Link>
                    <Link href="#services" className="border border-white/30 text-white font-bold px-10 py-4 rounded hover:bg-white hover:text-navy-deep transition-all">
                        Capabilities
                    </Link>
                </motion.div>
                <motion.div
                    className="mt-16 text-xs font-mono text-gold-soft/50 uppercase tracking-[0.3em]"
                    custom={3}
                    initial="hidden"
                    animate="visible"
                    variants={heroVariants}
                >
                    Strictly Confidential · Data-Secure · Field-Tested
                </motion.div>
            </div>
        </section>
    );
}
