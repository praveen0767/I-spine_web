"use client";
import { motion } from "framer-motion";

const courses = [
    { id: "01", title: "Strategic Architecture", focus: "Campaign Design & Blueprinting", duration: "12 Weeks" },
    { id: "02", title: "Narrative Craft", focus: "Political Rhetoric & Framing", duration: "8 Weeks" },
    { id: "03", title: "Field Generalship", focus: "Ground Operations Management", duration: "10 Weeks" },
    { id: "04", title: "Intelligence Operations", focus: "Data Analytics & OSINT", duration: "14 Weeks" },
];

export default function AcademyCourses() {
    return (
        <section className="bg-ivory py-32" id="academy">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-3xl">
                        <p className="text-gold-primary font-bold uppercase text-xs tracking-widest mb-4">RarePolitics Academy</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-navy-deep mb-4">Sharpening the Sword of Public Office</h2>
                    </div>
                    <button className="text-gold-primary font-bold border-b-2 border-gold-primary pb-1 hover:translate-x-2 transition-transform uppercase text-xs tracking-widest">Enrollment Protocol →</button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 border border-navy-deep/5 divide-x divide-y md:divide-y-0">
                    {courses.map((c, i) => (
                        <motion.div
                            key={c.id}
                            className="p-12 bg-white hover:bg-navy-deep group transition-colors duration-700"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <span className="text-5xl font-serif text-gold-soft group-hover:text-gold-primary transition-colors mb-10 block">0{i + 1}</span>
                            <h4 className="text-xl font-bold text-navy-deep group-hover:text-white transition-colors mb-2 uppercase tracking-tighter">{c.title}</h4>
                            <p className="text-graphite group-hover:text-ivory transition-colors text-sm mb-8 leading-relaxed">{c.focus}</p>
                            <p className="text-[10px] font-mono text-gold-primary opacity-20 group-hover:opacity-100 transition-opacity">Module Length: {c.duration}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
