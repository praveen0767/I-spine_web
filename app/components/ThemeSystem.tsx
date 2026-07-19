"use client";
import React, { createContext, useContext } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeTokens {
    bg: string;
    text: string;
    heading: string;
    label: string;
    border: string;
    card: string;
    muted: string;
    accent: string;
}

const lightTokens: ThemeTokens = {
    bg: 'bg-[#FAF9F6]', // Soft Ivory
    text: 'text-[#2D3436]', // Dark Gray
    heading: 'text-[#0A1F44]', // Deep Navy
    label: 'text-crimson-rich',
    border: 'border-[#0A1F44]/10',
    card: 'bg-white shadow-xl shadow-black/5',
    muted: 'text-[#2D3436]/60',
    accent: 'text-gold-primary',
};

const darkTokens: ThemeTokens = {
    bg: 'bg-[#0B1F45]', // Rich Royal Navy
    text: 'text-[#F5F7FF]/80', // Brighter Showcase Text
    heading: 'text-white',
    label: 'text-crimson-rich',
    border: 'border-white/10',
    card: 'bg-[#10285A] shadow-[0_20px_50px_rgba(0,0,0,0.3)]', // Elevated Showcase Cards
    muted: 'text-[#F5F7FF]/60',
    accent: 'text-crimson-rich',
};

const ThemeContext = createContext<{ mode: ThemeMode; tokens: ThemeTokens }>({
    mode: 'light',
    tokens: lightTokens,
});

export const useTheme = () => useContext(ThemeContext);

export function Section({ 
    index, 
    children, 
    id,
    className = "" 
}: { 
    index: number; 
    children: React.ReactNode; 
    id?: string;
    className?: string;
}) {
    const mode: ThemeMode = index % 2 === 1 ? 'light' : 'dark';
    const tokens = mode === 'light' ? lightTokens : darkTokens;

    return (
        <ThemeContext.Provider value={{ mode, tokens }}>
            <section 
                id={id} 
                style={{ scrollMarginTop: '80px' }}
                className={`min-h-screen flex flex-col justify-center py-24 md:py-32 transition-colors duration-700 ${tokens.bg} ${className} relative overflow-hidden`}
            >

                {/* Isolated background layer to prevent bleed */}
                <div className={`absolute inset-0 ${tokens.bg} z-0`} />
                
                <div className="max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-16 relative z-10 w-full">
                    {children}
                </div>
            </section>
        </ThemeContext.Provider>
    );

}

export function ThemeHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const { tokens } = useTheme();
    return <h2 className={`${tokens.heading} font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] ${className}`}>{children}</h2>;
}

export function ThemeText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const { tokens } = useTheme();
    return <p className={`${tokens.text} font-sans text-xl md:text-2xl leading-relaxed ${className}`}>{children}</p>;
}

export function ThemeLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const { tokens } = useTheme();
    return <span className={`${tokens.label} font-bold uppercase tracking-[0.4em] text-sm md:text-base block mb-6 ${className}`}>{children}</span>;
}


export function ThemeCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const { tokens } = useTheme();
    return (
        <div className={`${tokens.card} ${tokens.border} border p-10 md:p-12 transition-all duration-500 rounded-lg ${className}`}>
            {children}
        </div>
    );
}
