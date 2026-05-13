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
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-serif font-bold text-[#0A1F44] mt-16 mb-8 border-b-2 border-crimson-rich/10 pb-4"
                    >
                        {trimmedLine.replace('### ', '')}
                    </motion.h2>
                );
            }
            if (trimmedLine.startsWith('•') || trimmedLine.startsWith('- ')) {
                return (
                    <li key={i} className="ml-8 text-xl text-[#0A1F44]/90 mb-4 list-none relative pl-8 group">
                        <span className="absolute left-0 top-3 w-4 h-[2px] bg-crimson-rich group-hover:w-6 transition-all duration-300" />
                        {trimmedLine.replace(/^[•-]\s*/, '')}
                    </li>
                );
            }
            if (/^\d+\./.test(trimmedLine)) {
                return (
                    <div key={i} className="bg-[#0A1F44]/5 p-8 border-l-4 border-crimson-rich my-10 rounded-r-sm">
                        <p className="text-xl text-[#0A1F44] font-bold italic leading-relaxed">
                            {trimmedLine}
                        </p>
                    </div>
                );
            }
            if (trimmedLine === '') {
                return <div key={i} className="h-6" />;
            }

            // Apply drop cap to the very first paragraph
            if (i === 0 || (i === 1 && paragraphs[0].trim() === '')) {
                const firstLetter = trimmedLine.charAt(0);
                const restOfLine = trimmedLine.slice(1);
                return (
                    <p key={i} className="text-xl md:text-2xl text-[#0A1F44]/90 leading-[1.8] mb-8 font-serif">
                        <span className="float-left text-7xl font-bold text-crimson-rich mr-4 mt-2 leading-none font-serif">
                            {firstLetter}
                        </span>
                        {restOfLine}
                    </p>
                );
            }

            return (
                <p key={i} className="text-xl md:text-2xl text-[#0A1F44]/80 leading-[1.8] mb-8 font-serif selection:bg-crimson-rich selection:text-white">
                    {line}
                </p>
            );
        });
    };

    return (
        <main className="min-h-screen bg-[#FAF9F6] selection:bg-crimson-rich selection:text-white">
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-crimson-rich z-[60] origin-left"
                style={{ scaleX }}
            />

            {/* Header / Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-lg border-b border-[#0A1F44]/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 text-[#0A1F44]/60 hover:text-crimson-rich transition-all font-bold uppercase tracking-widest text-[10px] group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Strategy Hub
                    </Link>
                    <div className="flex items-center gap-8">
                        <div className="hidden md:flex items-center gap-2 text-[#0A1F44]/40 text-[10px] font-bold uppercase tracking-[0.2em]">
                            <Clock className="w-3.5 h-3.5" />
                            {readingTime} Min Read
                        </div>
                        <div className="w-[1px] h-4 bg-[#0A1F44]/10 hidden md:block" />
                        <button className="text-[#0A1F44]/40 hover:text-crimson-rich transition-colors">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="pt-40 pb-20 px-6 bg-gradient-to-b from-[#0A1F44]/5 to-transparent">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
                            <span className="bg-navy-premium text-white px-5 py-2 rounded-sm text-[10px] font-bold uppercase tracking-[0.3em] shadow-lg">
                                {article.category}
                            </span>
                            <div className="flex items-center gap-2 text-[#0A1F44]/40 text-[10px] font-bold uppercase tracking-widest">
                                <Calendar className="w-4 h-4" />
                                {article.date}
                            </div>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-[#0A1F44] leading-[1.05] mb-12 tracking-tight">
                            {article.title}
                        </h1>
                        
                        <div className="max-w-3xl mx-auto">
                            <p className="text-2xl md:text-3xl text-[#0A1F44]/70 font-serif italic leading-relaxed">
                                "{article.subtitle}"
                            </p>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Featured Image */}
            <div className="max-w-7xl mx-auto px-6 mb-32">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    className="relative aspect-[21/9] rounded-sm overflow-hidden shadow-[0_50px_100px_-20px_rgba(10,31,68,0.3)]"
                >
                    <div className="absolute inset-0 bg-[#0A1F44]/10 mix-blend-multiply" />
                    <img 
                        src={article.img || "/images/heroim.png"} 
                        alt={article.title}
                        className="w-full h-full object-cover filter contrast-110 brightness-95"
                    />
                </motion.div>
            </div>

            {/* Main Content Layout */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-20 pb-32">
                {/* Article Body */}
                <article className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <div className="article-content">
                            {renderContent(article.content)}
                        </div>
                    </motion.div>

                    {/* Final CTA / Signoff */}
                    <div className="mt-32 p-12 bg-navy-premium text-white rounded-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-crimson-rich/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-110 transition-transform duration-1000" />
                        <div className="relative z-10">
                            <ThemeLabel className="text-white/60 mb-6">Strategic Partnership</ThemeLabel>
                            <h3 className="text-3xl font-serif font-bold mb-6">Winning strategy starts with precise intelligence.</h3>
                            <p className="text-lg text-white/70 mb-10 max-w-xl">
                                At RARE Politics, we transform these insights into electoral reality. Let's discuss your next campaign.
                            </p>
                            <Link href="/#contact" className="inline-flex items-center gap-4 bg-crimson-rich text-white px-10 py-5 rounded-sm font-bold uppercase tracking-widest text-sm shadow-xl hover:bg-white hover:text-navy-premium transition-all">
                                Initiate Consultation
                                <ArrowLeft className="w-5 h-5 rotate-180" />
                            </Link>
                        </div>
                    </div>
                </article>

                {/* Side Rail: Meta Info & Author */}
                <aside className="hidden lg:block space-y-16 sticky top-32 h-fit">
                    <div className="space-y-8">
                        <ThemeLabel>Authority</ThemeLabel>
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-full bg-crimson-rich flex items-center justify-center text-white font-serif text-3xl font-bold shadow-lg">R</div>
                            <div>
                                <p className="text-sm font-bold uppercase tracking-widest text-[#0A1F44]">Editorial Board</p>
                                <p className="text-[10px] text-[#0A1F44]/40 uppercase tracking-widest mt-1">RARE Politics Intelligence</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <ThemeLabel>Article Focus</ThemeLabel>
                        <div className="flex flex-col gap-4">
                            {["Electoral Integrity", "Urban Governance", "Institutional Trust", "Digital Democracy"].map(tag => (
                                <div key={tag} className="flex items-center gap-3 text-[#0A1F44]/60 text-sm font-serif">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gold-refined" />
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 border border-[#0A1F44]/5 bg-white/50 backdrop-blur-sm rounded-sm">
                        <p className="text-xs font-bold uppercase tracking-widest text-navy-premium mb-4 flex items-center gap-2">
                            <Bookmark className="w-4 h-4 text-crimson-rich" />
                            Reference Group
                        </p>
                        <p className="text-sm text-[#0A1F44]/60 leading-relaxed font-serif italic">
                            This analysis forms part of our ongoing research into Urban Political Landscapes (UPL) in India.
                        </p>
                    </div>
                </aside>
            </div>

            {/* Scroll to Top */}
            {showScrollTop && (
                <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-10 right-10 w-14 h-14 bg-navy-premium text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-crimson-rich transition-all duration-300 z-50 animate-in fade-in slide-in-from-bottom-5"
                >
                    <ChevronUp className="w-6 h-6" />
                </button>
            )}
        </main>
    );
}

// Helper components for consistency
const ThemeLabel = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <p className={`text-[10px] font-bold uppercase tracking-[0.4em] text-crimson-rich mb-6 ${className}`}>
        {children}
    </p>
);
