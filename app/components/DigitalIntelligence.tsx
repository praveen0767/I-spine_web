"use client";
import { motion } from "framer-motion";
import { BarChart3, Fingerprint, Globe, ShieldCheck } from "lucide-react";

const features = [
    { title: "Sentiment Analysis", desc: "Real-time tracking of public discourse and evolving narratives.", icon: BarChart3 },
    { title: "Voter Profiling", desc: "Advanced psychometric modeling and micro-segmentation.", icon: Fingerprint },
    { title: "Digital Advocacy", desc: "Strategic deployment of influential voices and community builders.", icon: Globe },
    { title: "Crisis Mitigation", desc: "Proactive counter-measures for negative PR and misinformation.", icon: ShieldCheck },
];

export default function DigitalIntelligence() {
    return (
        <section className="bg-paper py-32" id="intelligence">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-gold-primary font-bold uppercase text-xs tracking-widest mb-4">Modern Information Warfare</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-navy-deep mb-10 leading-tight">Superior Intelligence for Decisive Action</h2>
                        <p className="text-graphite/80 text-lg mb-12 leading-relaxed">
                            In the age of digital noise, the advantage goes to those who can filter signal from static. Our Digital Intelligence suite provides the forensic insights needed to dominate the information space.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-10">
                            {features.map((f, i) => (
                                <div key={f.title} className="flex flex-col gap-4">
                                    <f.icon className="text-gold-primary w-10 h-10" />
                                    <h4 className="font-bold text-navy-deep uppercase text-xs tracking-widest">{f.title}</h4>
                                    <p className="text-graphite/60 text-sm leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div
                        className="relative h-[600px] bg-navy-deep rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center border border-gold-soft/10"
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800')] bg-cover opacity-20 mix-blend-overlay" />
                        <div className="z-10 text-center p-12">
                            <div className="inline-block w-24 h-24 mb-8 border border-gold-primary/30 rounded-full animate-pulse flex items-center justify-center">
                                <div className="w-16 h-16 bg-gold-primary/5 rounded-full flex items-center justify-center">
                                    <div className="w-4 h-4 bg-gold-primary rounded-full shadow-[0_0_15px_#D4AF37]" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-3">Predictive OS</h3>
                            <p className="text-gold-primary font-mono text-xs tracking-[0.4em] uppercase">Status: Operating</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
