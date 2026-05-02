"use client";
import { motion } from "framer-motion";

const steps = [
    { title: "Discovery", description: "Deep research and stakeholder interviews to define goals.", icon: "🔍" },
    { title: "Strategy", description: "Crafting a data-driven political strategy and messaging framework.", icon: "🧭" },
    { title: "Execution", description: "Coordinated field, digital, and media operations.", icon: "⚙️" },
    { title: "Optimization", description: "Real-time analytics and rapid iteration for maximum impact.", icon: "📈" },
];

export default function MethodTimeline() {
    return (
        <section className="bg-paper py-24" id="method">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="text-gold-primary font-bold uppercase text-xs tracking-widest mb-4">Our Method</p>
                    <h2 className="text-4xl font-bold text-navy-deep">The RarePolitics Protocol</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((s, i) => (
                        <motion.div
                            key={s.title}
                            className="bg-white p-8 border-t-4 border-gold-primary shadow-sm hover:shadow-md transition-shadow relative"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="text-4xl mb-6">{s.icon}</div>
                            <h3 className="font-bold text-lg text-navy-deep mb-3 uppercase tracking-tight">{s.title}</h3>
                            <p className="text-graphite/70 text-sm leading-relaxed">{s.description}</p>
                            <div className="absolute top-4 right-4 text-gray-100 text-6xl font-black -z-10 select-none">0{i + 1}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
