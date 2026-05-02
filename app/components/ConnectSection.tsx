"use client";
import { motion } from 'framer-motion';
import { Youtube, Instagram, Facebook, Twitter } from 'lucide-react';
import { ThemeHeading, ThemeText, ThemeLabel, useTheme } from './ThemeSystem';

export default function ConnectSection() {
    const { tokens, mode } = useTheme();

    return (
        <div className="max-w-4xl mx-auto px-6 text-center">
            <ThemeLabel>Stay Connected</ThemeLabel>
            <ThemeHeading className="mb-6 text-4xl md:text-5xl">Connect With Us</ThemeHeading>
            <ThemeText className="text-lg mb-12">
                Stay updated with our latest insights and ground reports across all platforms.
            </ThemeText>
            
            <div className="flex justify-center gap-6 md:gap-8">
                {[
                    { icon: Youtube, label: "Youtube" },
                    { icon: Instagram, label: "Instagram" },
                    { icon: Facebook, label: "Facebook" },
                    { icon: Twitter, label: "Twitter" }
                ].map((social, idx) => (
                    <motion.a 
                        key={idx}
                        href="#" 
                        aria-label={social.label} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className={`w-16 h-16 ${mode === 'dark' ? 'bg-white/5' : 'bg-white'} border ${tokens.border} flex items-center justify-center rounded-full hover:bg-crimson-rich hover:text-white hover:scale-110 transition-all duration-300 ${mode === 'dark' ? 'text-white' : 'text-navy-premium'} shadow-lg`}
                    >
                        <social.icon className="w-6 h-6" />
                    </motion.a>
                ))}
            </div>
        </div>
    );
}
