"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Bookmark } from 'lucide-react';
import { articles } from '../data/articles';

export default function InsightsIndexPage() {
    return (
        <main className="min-h-screen bg-slate-50 selection:bg-emerald-500 selection:text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                        <Link href="/" className="flex items-center gap-4 bg-slate-900 text-white px-6 py-3 rounded-full hover:bg-emerald-500 transition-colors duration-300 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.2)] text-[10px] font-bold uppercase tracking-[0.2em] group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Return Home
                        </Link>
                    </motion.div>
                </div>
            </nav>

            <header className="pt-40 pb-20 px-6 bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-transparent pointer-events-none" />
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-500 mb-6">Publications</p>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight">
                            Strategic Insights
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 font-serif italic max-w-2xl mx-auto leading-[1.7]">
                            Deep dives into the mechanics of modern Indian politics, strategic frameworks, and data-driven electoral execution.
                        </p>
                    </motion.div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 pb-32 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {articles.map((article, index) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                        >
                            <Link href={`/insights/${article.slug}`} className="block group h-full">
                                <div className="h-full bg-white rounded-3xl p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col group-hover:-translate-y-2">
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="bg-slate-50 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-500/10">
                                            {article.category}
                                        </span>
                                        <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                            <Calendar className="w-3 h-3" />
                                            {article.date}
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 leading-[1.3] group-hover:text-emerald-500 transition-colors">
                                        {article.title}
                                    </h3>
                                    
                                    <p className="text-slate-600 leading-[1.6] mb-8 flex-grow">
                                        {article.subtitle}
                                    </p>
                                    
                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 group-hover:text-emerald-500 transition-colors">
                                            Read Analysis
                                        </span>
                                        <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-300">
                                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
