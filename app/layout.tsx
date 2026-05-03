import './globals.css';
import { Sora, Cormorant_Garamond } from 'next/font/google';
import type { Metadata } from 'next';

const sans = Sora({ subsets: ['latin'], variable: '--font-sans' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-serif', weight: ['400', '700'] });

export const metadata: Metadata = {
    title: "I-SPINE PVT LTD | Strategic Political Intelligence & Engagement",
    description: "Where strategy wins elections. Advanced political strategy, ground intelligence, and campaign operations platform.",
    icons: {
        icon: '/images/logo.png',
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

import dynamic from 'next/dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'I-SPINE PVT LTD',
        url: 'https://ispinepolitics.com',
        logo: '/images/logo.png',
        description: 'Strategic Political Intelligence & Engagement.',
    };

    return (
        <html lang="en" className={`${sans.variable} ${cormorant.variable}`}>
            <head>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            </head>
            <body className="bg-blush-white text-navy-premium antialiased selection:bg-crimson-rich selection:text-white">
                {children}
            </body>
        </html>
    );
}
