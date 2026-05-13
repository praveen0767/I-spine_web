"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Linkedin, Instagram, Youtube, X, MessageCircle } from 'lucide-react';
import { ThemeHeading, ThemeText, ThemeLabel, ThemeCard, useTheme } from './ThemeSystem';

import Link from 'next/link';
import { articles } from '../data/articles';

export default function Articles() {
    const { tokens, mode } = useTheme();

    const featuredArticle = articles.find(a => a.featured);
    const secondaryArticles = articles.filter(a => !a.featured);

    return (
        <div className="w-full">
            <div className="max-w-[1600px] mx-auto relative z-10">
                <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#0A1F44]/10 dark:border-white/10 pb-8">
                    <div className="max-w-3xl">
                        <ThemeLabel>Editorial</ThemeLabel>
                        <ThemeHeading className="mb-4">Political Insights</ThemeHeading>
                        <ThemeText>Deep dives into the mechanics of modern Indian politics, strategic frameworks, and data-driven electoral execution.</ThemeText>
                    </div>
                    <button className="flex items-center gap-3 text-crimson-rich font-bold tracking-[0.2em] uppercase text-sm group shrink-0">
                        View All Publications 
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
                    
                    {/* Left Side: Featured Article */}
                    {featuredArticle && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-[62%] flex"
                        >
                            <ThemeCard className="group relative flex flex-col md:flex-row overflow-hidden p-0 border-transparent hover:border-crimson-rich/30 transition-all duration-700 shadow-2xl hover:shadow-[0_25px_50px_rgba(10,31,68,0.2)] w-full hover:-translate-y-2 items-stretch">
                                
                                {/* Image Section */}
                                <div className="relative md:w-[45%] xl:w-[50%] min-h-[350px] overflow-hidden bg-[#0A1F44]">
                                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 md:from-[#0B1F3A]/90 via-black/20 md:via-transparent to-transparent z-10 opacity-90" />
                                    <img 
                                        src={featuredArticle.img} 
                                        alt={featuredArticle.title} 
                                        className="absolute inset-0 w-full h-full object-cover filter contrast-125 transition-transform duration-1000 group-hover:scale-105" 
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="flex flex-col justify-between flex-grow p-10 md:p-12 xl:p-16 md:w-[55%] xl:w-[50%] relative z-20 bg-gradient-to-br from-transparent to-[#0A1F44]/5">
                                    <div>
                                        <div className="flex justify-between items-center mb-8">
                                            <span className={`text-[11px] uppercase tracking-widest text-white font-bold bg-crimson-rich px-4 py-1.5 rounded-sm shadow-md`}>
                                                {featuredArticle.category}
                                            </span>
                                            <span className={`text-[11px] uppercase tracking-widest ${tokens.muted} font-bold`}>
                                                {featuredArticle.date}
                                            </span>
                                        </div>
                                        <h3 className={`text-4xl md:text-5xl lg:text-[2.75rem] font-serif ${tokens.heading} mb-6 group-hover:text-crimson-rich transition-colors duration-500 font-bold leading-[1.15]`}>
                                            {featuredArticle.title}
                                        </h3>
                                        <ThemeText className="text-lg leading-relaxed mb-10 opacity-80">
                                            {featuredArticle.subtitle}
                                        </ThemeText>
                                    </div>
                                    
                                    <div className={`mt-auto pt-10 border-t ${tokens.border} flex items-center justify-between`}>
                                        <Link href={`/insights/${featuredArticle.slug}`} className="flex items-center gap-5 group/btn cursor-pointer bg-navy-premium text-white px-10 py-5 rounded-sm hover:bg-crimson-rich transition-all duration-500 shadow-xl hover:shadow-[0_10px_30px_rgba(165,28,48,0.3)]">
                                            <span className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold">Read Full Analysis</span>
                                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </ThemeCard>
                        </motion.div>
                    )}

                    {/* Right Side: Stacked Articles */}
                    <div className="w-full lg:w-[38%] flex flex-col gap-8 lg:gap-12">
                        {secondaryArticles.map((article, i) => (
                            <motion.div
                                key={article.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (i + 1) * 0.2, duration: 0.8 }}
                                className="flex-1 flex"
                            >
                                <ThemeCard className="w-full h-full group flex flex-col justify-between overflow-hidden p-8 md:p-10 lg:p-12 border border-[#0A1F44]/10 dark:border-white/5 hover:border-crimson-rich/30 transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-[0_15px_40px_rgba(10,31,68,0.15)] bg-gradient-to-br from-transparent hover:to-[#0A1F44]/5 relative">
                                    
                                    {/* Subtle hover accent line */}
                                    <div className="absolute top-0 left-0 w-0 h-[3px] bg-gradient-to-r from-crimson-rich to-gold-refined group-hover:w-full transition-all duration-700 ease-out" />

                                    <div>
                                        <div className="flex justify-between items-center mb-6">
                                            <span className={`text-[10px] uppercase tracking-widest text-crimson-rich font-bold bg-[#0A1F44]/5 dark:bg-white/5 px-3 py-1 rounded-sm`}>
                                                {article.category}
                                            </span>
                                            <span className={`text-[10px] uppercase tracking-widest ${tokens.muted} font-bold`}>
                                                {article.date}
                                            </span>
                                        </div>
                                        <h3 className={`text-2xl md:text-3xl font-serif ${tokens.heading} mb-5 group-hover:text-crimson-rich transition-colors duration-300 font-bold leading-tight`}>
                                            {article.title}
                                        </h3>
                                        <ThemeText className="text-base md:text-lg leading-relaxed opacity-80">
                                            {article.subtitle}
                                        </ThemeText>
                                    </div>

                                    <Link href={`/insights/${article.slug}`} className={`mt-8 pt-6 border-t ${tokens.border} flex items-center justify-between group/link`}>
                                        <span className={`text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold ${tokens.heading} group-hover/link:text-crimson-rich transition-colors`}>Read Brief</span>
                                        <div className="w-8 h-8 rounded-full border border-crimson-rich/20 flex items-center justify-center group-hover/link:bg-crimson-rich group-hover/link:border-crimson-rich transition-colors duration-300">
                                            <ArrowRight className="w-3.5 h-3.5 text-crimson-rich group-hover/link:text-white transition-colors duration-300" />
                                        </div>
                                    </Link>
                                </ThemeCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
