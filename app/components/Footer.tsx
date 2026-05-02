import React from 'react';
import Link from 'next/link';
import { Youtube, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import FooterContact from './FooterContact';

export default function Footer() {
    return (
        <footer className="relative bg-[#050E1F] text-[#D8E1F2] pt-32 pb-16 overflow-hidden border-t border-white/[0.05]">
            {/* Top Glow Accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-crimson-rich/50 to-transparent opacity-50" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-crimson-rich/10 blur-[120px] pointer-events-none rounded-full" />
            
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start mb-24">
                    
                    {/* 1) Branding (Left Column) */}
                    <div className="lg:col-span-4 space-y-10 pr-0 lg:pr-10 border-b lg:border-b-0 lg:border-r border-white/10 pb-12 lg:pb-0">
                        <Link href="/" className="inline-block hover:scale-105 transition-all duration-500">
                            <div className="relative p-2 rounded-full bg-gradient-to-br from-white/5 to-transparent border border-white/10 shadow-2xl inline-block">
                                <img 
                                    src="/images/logo.png" 
                                    alt="I-SPINE PVT LTD Logo" 
                                    className="h-32 w-32 rounded-full object-contain p-2 bg-gradient-to-b from-[#1A365D] to-[#0B1F3A]" 
                                />
                            </div>
                        </Link>
                        <div>
                            <h2 className="text-gold-refined text-3xl font-serif font-black tracking-tight mb-4">I-SPINE PVT LTD</h2>
                            <p className="text-[#8A98B2] text-base leading-relaxed font-sans max-w-sm">
                                Empowering political leaders with precision-guided strategy, data intelligence, and flawless campaign execution.
                            </p>
                        </div>
                    </div>

                    {/* 2) Links & Connect (Middle Column) */}
                    <div className="lg:col-span-3 space-y-16 pl-0 lg:pl-10 border-b lg:border-b-0 lg:border-r border-white/10 pb-12 lg:pb-0">
                        <div className="space-y-6">
                            <h4 className="text-white text-[10px] uppercase tracking-[0.4em] font-bold opacity-50 mb-8">Navigation Map</h4>
                            <ul className="space-y-5 text-[#D8E1F2] text-sm uppercase tracking-[0.2em] font-bold">
                                <li><Link href="#about" className="hover:text-crimson-rich hover:pl-2 transition-all duration-300 flex items-center gap-2"><span className="w-1 h-1 bg-crimson-rich rounded-full opacity-0 hover:opacity-100" /> About Us</Link></li>
                                <li><Link href="#objectives" className="hover:text-crimson-rich hover:pl-2 transition-all duration-300 flex items-center gap-2"><span className="w-1 h-1 bg-crimson-rich rounded-full opacity-0 hover:opacity-100" /> Strategic Mission</Link></li>
                                <li><Link href="#services" className="hover:text-crimson-rich hover:pl-2 transition-all duration-300 flex items-center gap-2"><span className="w-1 h-1 bg-crimson-rich rounded-full opacity-0 hover:opacity-100" /> Consultancy Suite</Link></li>
                                <li><Link href="#contact" className="hover:text-crimson-rich hover:pl-2 transition-all duration-300 flex items-center gap-2"><span className="w-1 h-1 bg-crimson-rich rounded-full opacity-0 hover:opacity-100" /> Initiate Contact</Link></li>
                            </ul>
                        </div>
                        
                        <div className="space-y-6">
                            <h4 className="text-white text-[10px] uppercase tracking-[0.4em] font-bold opacity-50 mb-8">Connect</h4>
                            <div className="flex flex-wrap gap-4">
                                <a href="https://www.facebook.com/share/p/14dkYoRdrXQ/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full flex items-center justify-center text-white bg-[#1877F2] hover:bg-[#1877F2]/80 hover:scale-110 transition-all duration-300 shadow-md">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="https://www.instagram.com/i__spine?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full flex items-center justify-center text-white bg-[#E1306C] hover:bg-[#E1306C]/80 hover:scale-110 transition-all duration-300 shadow-md">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="https://youtube.com/@rarepolitics?si=2KnlocOxExrn5nj-" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full flex items-center justify-center text-white bg-[#FF0000] hover:bg-[#FF0000]/80 hover:scale-110 transition-all duration-300 shadow-md">
                                    <Youtube className="w-5 h-5" />
                                </a>
                                <a href="https://www.linkedin.com/company/i-spine/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full flex items-center justify-center text-white bg-[#0A66C2] hover:bg-[#0A66C2]/80 hover:scale-110 transition-all duration-300 shadow-md">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* 3) Contact Form (Right Column) */}
                    <div className="lg:col-span-5 pl-0 lg:pl-10">
                        <FooterContact />
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <span className="text-[10px] text-[#8A98B2] uppercase tracking-[0.4em] font-bold">
                        © {new Date().getFullYear()} I-SPINE PVT LTD. All rights reserved.
                    </span>
                    <div className="flex flex-wrap justify-center gap-8">
                        <Link href="#" className="text-[10px] text-[#8A98B2] hover:text-white uppercase tracking-[0.3em] transition-colors font-bold">Privacy Policy</Link>
                        <Link href="#" className="text-[10px] text-[#8A98B2] hover:text-white uppercase tracking-[0.3em] transition-colors font-bold">Terms of Service</Link>
                        <Link href="#" className="text-[10px] text-[#8A98B2] hover:text-white uppercase tracking-[0.3em] transition-colors font-bold">Legal Disclaimer</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
