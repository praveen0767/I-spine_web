/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    premium: '#0A1F44', // Authority
                    deep: '#050E1F',
                    card: 'rgba(10, 31, 68, 0.03)',
                },
                crimson: {
                    rich: '#A51C30', // Dominant accent
                    muted: '#8B1829',
                },
                gold: {
                    refined: '#D4AF37', // Secondary accent
                    light: '#F4DF4E',
                },
                blush: {
                    white: '#F9F7F5', // Background
                },
                charcoal: '#333333',
                slate: {
                    soft: '#F0F2F5',
                    medium: '#666666',
                }
            },
            fontFamily: {
                serif: ['var(--font-serif)', 'serif'],
                sans: ['var(--font-sans)', 'sans-serif'],
            },
            backgroundImage: {
                'gold-gradient': 'linear-gradient(135deg, #C6A43F 0%, #E4C873 100%)',
                'glass-gradient': 'linear-gradient(135deg, rgba(198, 164, 63, 0.1) 0%, rgba(228, 200, 115, 0.05) 100%)',
            },
            animation: {
                'pulse-gold': 'pulse-gold 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'liquid-border': 'liquid-border 6s linear infinite',
                'data-ripple': 'data-ripple 2s ease-out infinite',
                'synergy-flow': 'synergy-flow 3s linear infinite',
            },
            keyframes: {
                'pulse-gold': {
                    '0%, 100%': { opacity: 0.8, transform: 'scale(1)' },
                    '50%': { opacity: 1, transform: 'scale(1.02)' },
                },
                'synergy-flow': {
                    '0%': { 'stroke-dashoffset': '1000' },
                    '100%': { 'stroke-dashoffset': '0' },
                }
            },
            backdropBlur: {
                '2xl': '40px',
            },
        },
    },
    plugins: [],
}
