"use client";
import { motion } from "framer-motion";
import { Shield, Target, Zap, TrendingUp } from "lucide-react";

const pillars = [
    { title: "Strategy First", description: "Campaign architecture precedes tactics; we design the blueprint before execution.", icon: Target },
    { title: "Field Integration", description: "Seamless offline/online synchronization ensures every voter touchpoint is counted.", icon: Zap },
    { title: "Narrative Precision", description: "Own the message, frame the debate, and steer public perception with surgical clarity.", icon: Shield },
    { title: "Execution Discipline", description: "No drift, only delivery – every action is measured against the strategic mandate.", icon: TrendingUp },
];

export default function ValuePillars() {
    return (
        <section className="bg-paper py-24" id="pillars">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <p className="text-gold-primary font-bold uppercase text-xs tracking-widest mb-4">Core Philosophy</p>
                    <h2 className="text-4xl font-bold text-navy-deep">Our Four Pillars</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pillars.map((p, i) => (
                        <motion.div
                            key={p.title}
                            className="bg-white p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <p.icon className="w-10 h-10 text-gold-primary mb-8 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold text-navy-deep mb-4 uppercase tracking-tighter">{p.title}</h3>
                            <p className="text-graphite/70 text-sm leading-relaxed">{p.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
