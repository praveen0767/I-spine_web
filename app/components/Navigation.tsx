"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const { scrollY } = useScroll();

    // Smooth transitions for header state
    const bgOpacity = useTransform(scrollY, [0, 50], [0, 0.9]);
    const borderOpacity = useTransform(scrollY, [0, 50], [0, 0.1]);

    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
    }, [isOpen]);

    const navLinks = [
        { href: "#about", label: "About Us" },
        { href: "#objectives", label: "Objectives" },
        { href: "#services", label: "Services" },
        { href: "#insights", label: "Insights" },
        { href: "#contact", label: "Contact" },
    ];

    return (
            <motion.header
            className="fixed inset-x-0 top-0 z-[60] py-3 md:py-4 transition-all duration-500"
            style={{
                backgroundColor: useTransform(bgOpacity, (v) => `rgba(250, 249, 246, ${v})`),
                borderBottom: useTransform(borderOpacity, (v) => `1px solid rgba(10, 31, 68, ${v})`),
                backdropFilter: useTransform(scrollY, (v) => v > 50 ? "blur(12px)" : "none"),
            }}
        >
            <nav className="max-w-[1600px] mx-auto flex items-center justify-between px-6 lg:px-12 xl:px-16">
                <Link href="/" className="flex items-center shrink-0">
                    <img 
                        src="/images/knight-logo.png" 
                        alt="I-SPINE PVT LTD Logo" 
                        className="h-12 w-12 md:h-14 md:w-14 rounded-full object-contain shadow-lg transition-transform duration-300 hover:scale-110" 
                    />
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center gap-8 lg:gap-12">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#0A1F44]/80 hover:text-[#0A1F44] transition-colors duration-300 relative group py-2"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-crimson-rich transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Trigger */}
                <button
                    className="md:hidden text-[#0A1F44] p-2 hover:bg-[#0A1F44]/5 rounded-md transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation"
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed inset-0 top-[76px] bg-blush-white z-50 flex flex-col p-8 space-y-6 md:hidden"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-serif text-navy-premium border-b border-navy-premium/5 pb-4 uppercase tracking-widest"
                        >
                            {link.label}
                        </Link>
                    ))}
                </motion.div>
            )}
        </motion.header>
    );
}

