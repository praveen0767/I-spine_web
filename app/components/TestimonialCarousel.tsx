"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
    { text: "RarePolitics doesn't just manage campaigns; they architect movements. Their intelligence-first approach changed everything for our regional strategy.", author: "Minister David K.", title: "Former Secretary of State" },
    { text: "Discretion and precision. They delivered a winning coalition in a landscape everyone said was impossible to navigate.", author: "Sarah Jenkins", title: "Party Chairperson" },
    { text: "The Academy training transformed our field team from volunteers into a disciplined electoral machine.", author: "Robert Vane", title: "Campaign Lead" },
];

export default function TestimonialCarousel() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="bg-navy-deep py-32 text-white overflow-hidden" id="testimonials">
            <div className="container mx-auto px-6">
                <div className="relative max-w-4xl mx-auto text-center">
                    <Quote className="w-16 h-16 text-gold-primary/20 absolute -top-8 -left-8" />
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.8 }}
                            className="py-12"
                        >
                            <p className="text-2xl md:text-3xl font-serif italic mb-10 leading-relaxed text-ivory">
                                "{testimonials[index].text}"
                            </p>
                            <h4 className="text-gold-primary font-bold uppercase tracking-[0.3em] text-xs mb-2">
                                {testimonials[index].author}
                            </h4>
                            <p className="text-ivory/40 text-[10px] uppercase tracking-widest">{testimonials[index].title}</p>
                        </motion.div>
                    </AnimatePresence>
                    <div className="flex justify-center gap-3 mt-12">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`h-1 transition-all duration-500 ${i === index ? 'bg-gold-primary w-12' : 'bg-white/10 w-4'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
