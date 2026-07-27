"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram } from 'lucide-react';
import { ThemeHeading, ThemeText, ThemeLabel, ThemeCard, useTheme } from './ThemeSystem';

const team = [
    { 
        name: "Rohit Rathee", 
        role: "FOUNDING TEAM", 
        bio: "Political professional with a strong foundation in public policy, governance, and electoral dynamics. Brings real legislative insight into political consulting with strong exposure to campaign strategy and grassroots political communication.", 
        img: "/images/team/Rohit.jpeg",
        linkedin: "https://www.linkedin.com/in/rohit-rathee-8837b1399",
        instagram: "https://www.instagram.com/rathee.01/"
    },
    { 
        name: "Samiksha Shewale", 
        role: "FOUNDING TEAM", 
        bio: "Data analytics and policy professional with a background in political science and international electoral management. Skilled in data-driven analysis, research, and documentation & system optimization.", 
        img: "/images/team/Shamiksha.jpeg",
        linkedin: "https://www.linkedin.com/in/samiksha-shewale-255438263/",
        instagram: "https://www.instagram.com/samu22700?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
    },
    { 
        name: "Praveen Srinivasan", 
        role: "FOUNDING TEAM", 
        bio: "Technology strategist leading AI-driven systems and secure digital infrastructure for modern political consulting. Focused on building scalable technology ecosystems that transform complex data into precision insights.", 
        img: "/images/team/Praveen_final.png",
        linkedin: "https://www.linkedin.com/in/praveen-kumar-srinivasan-9b6737280",
        instagram: "https://www.instagram.com/praveen.p2t"
    },
];

export default function TeamSection() {
    const { tokens, mode } = useTheme();

    return (
        <div className="w-full">
            <div className="max-w-[1600px] mx-auto relative z-10">
                {/* Section Header */}
                <div className="mb-24 text-center max-w-4xl mx-auto">
                    <ThemeLabel>Leadership Team</ThemeLabel>
                    <ThemeHeading className="mb-8">
                        Building strategy. Driving momentum. Delivering outcomes.
                    </ThemeHeading>
                    <ThemeText>
                        <span className="text-crimson-rich lowercase font-bold">i</span>SPINE is powered by professionals who combine political understanding, field execution, policy insight, and technology leadership.
                    </ThemeText>
                </div>

                {/* Premium 3-Column Grid — centered with max-width for 3 cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 max-w-[1100px] mx-auto">
                    {team.map((m, i) => (
                        <motion.div
                            key={m.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.8 }}
                            className="h-full"
                        >
                            <ThemeCard className="h-full flex flex-col p-0 overflow-hidden group hover:border-crimson-rich/30">
                                
                                {/* Portrait Image Area — taller for 3-col layout */}
                                <div className="relative aspect-[3/4] overflow-hidden bg-[#0A1F44]">
                                    {m.img ? (
                                        <img 
                                            src={m.img} 
                                            alt={m.name} 
                                            className="w-full h-full object-cover object-top filter grayscale-[20%] contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" 
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0A1F44] to-[#1A365D]">
                                            <span className="font-serif text-8xl font-black text-white/20 group-hover:text-white/40 transition-colors duration-500">
                                                {m.name.split(' ').map(n => n[0]).join('')}
                                            </span>
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A1F44_100%)] opacity-80" />
                                        </div>
                                    )}
                                    
                                    {/* Overlay Gradient */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0A1F44] via-[#0A1F44]/50 to-transparent opacity-80" />
                                    
                                    {/* Social Links */}
                                    <div className="absolute bottom-6 right-6 flex gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                        {m.linkedin && (
                                            <a 
                                                href={m.linkedin} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-crimson-rich hover:border-crimson-rich transition-colors duration-300"
                                            >
                                                <Linkedin className="w-4 h-4" />
                                            </a>
                                        )}
                                        {m.instagram && (
                                            <a 
                                                href={m.instagram} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-crimson-rich hover:border-crimson-rich transition-colors duration-300"
                                            >
                                                <Instagram className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-8 lg:p-10 flex flex-col flex-grow relative">
                                    <div className="absolute top-0 left-10 w-12 h-1 bg-crimson-rich transform -translate-y-1/2" />
                                    
                                    <h3 className={`text-2xl font-serif font-bold mb-2 ${tokens.heading}`}>
                                        {m.name}
                                    </h3>
                                    <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-crimson-rich mb-6">
                                        {m.role}
                                    </p>
                                    
                                    <p className={`text-base leading-relaxed ${tokens.text} opacity-80`}>
                                        {m.bio}
                                    </p>
                                </div>

                            </ThemeCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
