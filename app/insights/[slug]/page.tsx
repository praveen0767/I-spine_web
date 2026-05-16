"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, Share2, Clock, Bookmark, ChevronUp } from 'lucide-react';
import { articles as articlesData } from '../../data/articles';
import { useParams, notFound } from 'next/navigation';

export default function ArticlePage() {
    const params = useParams();
    const slug = params?.slug as string;
    const [showScrollTop, setShowScrollTop] = useState(false);
    
    const article = articlesData.find(a => a.slug === slug);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 1000);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleShare = async () => {
        const shareData = {
            title: article?.title,
            text: article?.subtitle,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert("Article link copied to clipboard");
            }
        } catch (err) {
            console.error("Error sharing:", err);
        }
    };

    if (!article) {
        notFound();
    }

    const calculateReadingTime = (text: string) => {
        const wordsPerMinute = 200;
        const words = text.split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    };

    const readingTime = calculateReadingTime(article.content);

    const renderContent = (content: string) => {
        const paragraphs = content.split('\n');
        return paragraphs.map((line, i) => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('### ')) {
                return (
                    <motion.h2 
                        key={i} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-16 mb-8 border-b border-slate-200 pb-4"
                    >
                        {trimmedLine.replace('### ', '')}
                    </motion.h2>
                );
            }
            if (trimmedLine.startsWith('•') || trimmedLine.startsWith('- ')) {
                return (
                    <motion.li 
                        whileHover={{ x: 5 }}
                        key={i} 
                        className="ml-8 text-xl text-slate-800 mb-4 list-none relative pl-8 group leading-[1.7]"
                    >
                        <span className="absolute left-0 top-3 w-4 h-[2px] bg-emerald-500 group-hover:w-6 transition-all duration-300" />
                        {trimmedLine.replace(/^[•-]\s*/, '')}
                    </motion.li>
                );
            }
            if (/^\d+\./.test(trimmedLine)) {
                return (
                    <motion.div 
                        whileHover={{ y: -2 }}
                        key={i} 
                        className="bg-white/60 backdrop-blur-sm p-8 border-l-4 border-emerald-500 my-10 rounded-r-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
                    >
                        <p className="text-xl text-slate-900 font-bold italic leading-[1.7]">
                            {trimmedLine}
                        </p>
                    </motion.div>
                );
            }
            if (trimmedLine === '') {
                return <div key={i} className="h-6" />;
            }

            if (i === 0 || (i === 1 && paragraphs[0].trim() === '')) {
                const firstLetter = trimmedLine.charAt(0);
                const restOfLine = trimmedLine.slice(1);
                return (
                    <p key={i} className="text-xl md:text-[22px] text-slate-800 leading-[1.7] mb-8 font-serif">
                        <span className="float-left text-7xl font-bold text-emerald-500 mr-4 mt-2 leading-none font-serif drop-shadow-sm">
                            {firstLetter}
                        </span>
                        {restOfLine}
                    </p>
                );
            }

            return (
                <p key={i} className="text-xl md:text-[22px] text-slate-800 leading-[1.7] mb-8 font-serif">
                    {line}
                </p>
            );
        });
    };

    return (
        <main className="min-h-screen bg-slate-50 selection:bg-emerald-500 selection:text-white">
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-emerald-500 z-[60] origin-left shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                style={{ scaleX }}
            />

            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                        <Link href="/insights" className="flex items-center gap-4 bg-slate-900 text-white px-6 py-3 rounded-full hover:bg-emerald-500 transition-colors duration-300 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.2)] text-[10px] font-bold uppercase tracking-[0.2em] group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Return to Insights
                        </Link>
                    </motion.div>
                    <div className="flex items-center gap-8">
                        <div className="hidden md:flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                            <Clock className="w-3.5 h-3.5" />
                            {readingTime} Min Read
                        </div>
                        <div className="w-[1px] h-4 bg-slate-200 hidden md:block" />
                        <motion.button 
                            whileHover={{ scale: 1.1, color: '#10b981' }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleShare}
                            className="text-slate-400 transition-colors"
                        >
                            <Share2 className="w-5 h-5" />
                        </motion.button>
                    </div>
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
                        <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
                            <motion.span whileHover={{ y: -2 }} className="bg-emerald-500 text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] shadow-[0_10px_20px_-10px_rgba(16,185,129,0.4)]">
                                {article.category}
                            </motion.span>
                            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                                <Calendar className="w-4 h-4" />
                                {article.date}
                            </div>
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-serif font-bold text-slate-900 leading-[1.1] mb-12 tracking-tight">
                            {article.title}
                        </h1>
                        
                        <div className="max-w-3xl mx-auto">
                            <p className="text-2xl md:text-[28px] text-slate-600 font-serif italic leading-[1.6]">
                                "{article.subtitle}"
                            </p>
                        </div>
                    </motion.div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 mb-24 -mt-10 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    whileHover={{ y: -10 }}
                    className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] ring-1 ring-slate-200/50 bg-white"
                >
                    <img 
                        src={article.img || "/images/heroim.png"} 
                        alt={article.title}
                        className="w-full h-full object-cover filter contrast-[1.05]"
                    />
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-20 pb-32">
                <article className="w-full mx-auto max-w-prose">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <div className="article-content">
                            {renderContent(article.content)}
                        </div>
                    </motion.div>

                    <motion.div 
                        whileHover={{ y: -5 }}
                        className="mt-32 p-12 bg-white rounded-3xl relative overflow-hidden group shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-110 transition-transform duration-1000" />
                        <div className="relative z-10">
                            <ThemeLabel className="text-emerald-500 mb-6">Strategic Partnership</ThemeLabel>
                            <h3 className="text-3xl font-serif font-bold mb-6 text-slate-900">Winning strategy starts with precise intelligence.</h3>
                            <p className="text-lg text-slate-600 mb-10 max-w-xl leading-[1.7]">
                                At RARE Politics, we transform these insights into electoral reality. Let's discuss your next campaign.
                            </p>
                            <Link href="/#contact" className="inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm shadow-[0_10px_20px_-10px_rgba(0,0,0,0.3)] hover:bg-emerald-500 transition-colors duration-300">
                                Initiate Consultation
                                <ArrowLeft className="w-5 h-5 rotate-180" />
                            </Link>
                        </div>
                    </motion.div>
                </article>

                <aside className="hidden lg:block space-y-12 sticky top-32 h-fit">
                    <motion.div 
                        whileHover={{ y: -5 }} 
                        className="p-8 bg-white/60 backdrop-blur-xl rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100"
                    >
                        <ThemeLabel>Authority</ThemeLabel>
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white font-serif text-3xl font-bold shadow-[0_10px_20px_-10px_rgba(16,185,129,0.5)]">R</div>
                            <div>
                                <p className="text-sm font-bold uppercase tracking-widest text-slate-900">Editorial Board</p>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">RARE Politics Intelligence</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        whileHover={{ y: -5 }} 
                        className="p-8 bg-white/60 backdrop-blur-xl rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100"
                    >
                        <ThemeLabel>Article Focus</ThemeLabel>
                        <div className="flex flex-col gap-4">
                            {["Electoral Integrity", "Urban Governance", "Institutional Trust", "Digital Democracy"].map(tag => (
                                <div key={tag} className="flex items-center gap-3 text-slate-600 text-sm font-serif group cursor-default">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-150 transition-transform" />
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div 
                        whileHover={{ y: -5 }} 
                        className="p-8 border border-slate-100 bg-white/60 backdrop-blur-xl rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
                    >
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
                            <Bookmark className="w-4 h-4 text-emerald-500" />
                            Reference Group
                        </p>
                        <p className="text-sm text-slate-600 leading-[1.7] font-serif italic">
                            This analysis forms part of our ongoing research into Urban Political Landscapes (UPL) in India.
                        </p>
                    </motion.div>
                </aside>
            </div>

            {showScrollTop && (
                <motion.button 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-10 right-10 w-14 h-14 bg-emerald-500 text-white rounded-full shadow-[0_10px_20px_-5px_rgba(16,185,129,0.5)] flex items-center justify-center transition-colors z-50"
                >
                    <ChevronUp className="w-6 h-6" />
                </motion.button>
            )}
        </main>
    );
}

const ThemeLabel = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <p className={`text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-500 mb-6 ${className}`}>
        {children}
    </p>
);
