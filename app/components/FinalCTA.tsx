"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "./ThemeSystem";
import { Linkedin, Instagram, Youtube, Facebook, X, MessageCircle } from "lucide-react";

export default function FinalCTA() {
    const { tokens, mode } = useTheme();

    return (
        <section className={`relative py-20 md:py-24 ${mode === 'dark' ? 'bg-[#0B1F3A]' : 'bg-[#FAF9F6]'} overflow-hidden border-t border-[#0A1F44]/10 dark:border-white/5`}>
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-crimson-rich/5 to-transparent pointer-events-none" />
            
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-16 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl"
                    >
                        <h2 className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold ${tokens.heading} tracking-tight mb-8 leading-[1.1]`}>
                            Ready to Architect Your Victory?
                        </h2>
                        <p className={`text-lg md:text-xl ${tokens.text} opacity-80 max-w-2xl leading-relaxed`}>
                            Engagement is strictly limited to ensure total strategic immersion and operational excellence.
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex shrink-0 w-full lg:w-auto"
                    >
                        <Link 
                            href="#contact" 
                            className="w-full lg:w-auto bg-crimson-rich text-white px-12 py-6 font-bold uppercase tracking-[0.3em] text-sm hover:scale-105 transition-all shadow-[0_20px_40px_rgba(165,28,48,0.3)] hover:shadow-[0_25px_50px_rgba(165,28,48,0.5)] active:scale-95 text-center flex items-center justify-center"
                        >
                            Initiate Consultation
                        </Link>
                    </motion.div>
                </div>

                {/* Connect Section Integration */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="pt-16 border-t border-crimson-rich/10 flex flex-col md:flex-row items-center justify-between gap-10"
                >
                    <div className="flex flex-col items-center md:items-start">
                        <span className="text-crimson-rich font-bold uppercase tracking-[0.4em] text-xs mb-4">Strategic Network</span>
                        <h3 className={`text-2xl font-serif font-bold ${tokens.heading}`}>Connect With Us</h3>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                        {[
                            { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/share/p/14dkYoRdrXQ/' },
                            { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/i__spine?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
                            { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/@rarepolitics?si=2KnlocOxExrn5nj-' },
                            { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/company/i-spine/' },
                            { name: 'X', icon: X, url: 'https://x.com/rarepolitics' },
                            { name: 'WhatsApp', icon: MessageCircle, url: 'https://wa.me/message/RARE' }
                        ].map((platform) => (
                            <a 
                                key={platform.name}
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative"
                            >
                                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-[#0A1F44]/5 dark:bg-white/5 border ${tokens.border} group-hover:border-crimson-rich group-hover:bg-crimson-rich transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(165,28,48,0.4)]`}>
                                    <platform.icon className={`w-6 h-6 ${tokens.heading} group-hover:text-white transition-colors`} />
                                </div>
                                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-crimson-rich opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                    {platform.name}
                                </span>
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
