"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';
import { articles as articlesData } from '../../data/articles';
import { useParams, notFound } from 'next/navigation';

export default function ArticlePage() {
    const params = useParams();
    const slug = params?.slug as string;
    
    const article = articlesData.find(a => a.slug === slug);

    if (!article) {
        notFound();
    }

    const renderContent = (content: string) => {
        return content.split('\n').map((line, i) => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('### ')) {
                return <h2 key={i} className="text-2xl md:text-3xl font-serif font-bold text-[#0A1F44] mt-12 mb-6">{trimmedLine.replace('### ', '')}</h2>;
            }
            if (trimmedLine.startsWith('•') || trimmedLine.startsWith('- ')) {
                return <li key={i} className="ml-6 text-lg text-[#0A1F44]/80 mb-3 list-disc leading-relaxed pl-2">{trimmedLine.replace(/^[•-]\s*/, '')}</li>;
            }
            if (/^\d+\./.test(trimmedLine)) {
                return <p key={i} className="ml-6 text-lg text-[#0A1F44]/80 mb-4 font-bold">{trimmedLine}</p>;
            }
            if (trimmedLine === '') {
                return <div key={i} className="h-4" />;
            }
            return <p key={i} className="text-lg md:text-xl text-[#0A1F44]/80 leading-relaxed mb-6 font-sans">{line}</p>;
        });
    };

    return (
        <main className="min-h-screen bg-[#FAF9F6]">
            {/* Header / Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF9F6]/80 backdrop-blur-md border-b border-[#0A1F44]/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-[#0A1F44]/60 hover:text-crimson-rich transition-colors font-bold uppercase tracking-widest text-xs">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Insights
                    </Link>
                    <div className="flex items-center gap-6">
                        <button className="text-[#0A1F44]/40 hover:text-[#0A1F44] transition-colors">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="pt-32 pb-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <span className="bg-crimson-rich/10 text-crimson-rich px-4 py-1.5 rounded-sm text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
                                <Tag className="w-3 h-3" />
                                {article.category}
                            </span>
                            <span className="text-[#0A1F44]/40 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
                                <Calendar className="w-3 h-3" />
                                {article.date}
                            </span>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-[#0A1F44] leading-[1.1] mb-8 tracking-tight">
                            {article.title}
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-[#0A1F44]/60 font-sans leading-relaxed border-l-4 border-gold-refined pl-8 py-2 mb-12">
                            {article.subtitle}
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* Featured Image */}
            <div className="max-w-7xl mx-auto px-6 mb-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="aspect-[21/9] rounded-sm overflow-hidden bg-[#0A1F44] shadow-2xl"
                >
                    <img 
                        src={article.img || "/images/heroim.png"} 
                        alt={article.title}
                        className="w-full h-full object-cover opacity-90 contrast-110"
                    />
                </motion.div>
            </div>

            {/* Content Body */}
            <article className="max-w-4xl mx-auto px-6 pb-32">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <div className="prose prose-lg max-w-none">
                        {renderContent(article.content)}
                    </div>
                </motion.div>

                {/* Footer Section */}
                <footer className="mt-24 pt-12 border-t border-[#0A1F44]/10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-crimson-rich flex items-center justify-center text-white font-serif text-xl font-bold">I</div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-[#0A1F44]">I-SPINE Editorial</p>
                            <p className="text-xs text-[#0A1F44]/40 uppercase tracking-widest mt-0.5">Strategic Intelligence Group</p>
                        </div>
                    </div>
                    
                    <Link href="/" className="bg-[#0A1F44] text-white px-8 py-4 rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-crimson-rich transition-colors shadow-xl">
                        Return to Dashboard
                    </Link>
                </footer>
            </article>
        </main>
    );
}
