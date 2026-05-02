"use client";
import { motion } from 'framer-motion';
import { ThemeHeading, ThemeText, ThemeLabel, useTheme } from './ThemeSystem';

export default function AboutUs() {
    const { tokens, mode } = useTheme();

    return (
        <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <ThemeLabel>About Us</ThemeLabel>
                <ThemeHeading className="mb-10 leading-tight text-5xl md:text-6xl">
                    At <span className="text-gold">I-SPINE PVT LTD</span>, we don’t wait for waves.<br />
                    <span className={mode === 'dark' ? 'text-white/40' : 'text-navy-premium/40'}>We build them.</span>
                </ThemeHeading>

                <div className="space-y-8 mt-10">
                    <ThemeText className="text-xl md:text-2xl font-medium leading-relaxed">
                        <span className="text-gold-light font-bold">I-SPINE PVT LTD</span> is a results-driven political consultancy built on one core belief:
                        <span className={`font-bold italic block my-6 border-l-4 border-crimson-rich pl-8 py-3 text-2xl md:text-3xl ${tokens.heading} bg-white/5 shadow-lg`}>
                            Elections are not won by chance, but by strategy.
                        </span>
                    </ThemeText>
                    
                    <ThemeText>
                        With a sharp focus on data, ground intelligence, and precise execution, we design campaigns that don’t just create noise but build measurable momentum.
                    </ThemeText>
                    <ThemeText>
                        From constituency level insights to large-scale narrative building, our approach combines research, technology, and on-ground coordination to give candidates a decisive edge.
                    </ThemeText>
                    <ThemeText>
                        We work closely with political leaders, independent candidates, and organizations to craft tailored strategies that reflect local realities while aligning with broader electoral goals.
                    </ThemeText>
                    <ThemeText>
                        Every campaign we handle is treated like a high-stakes project, where planning, timing, and execution come together with clarity and discipline.
                    </ThemeText>
                    <ThemeText className={`font-bold text-3xl mt-12 ${tokens.heading}`}>
                        <span className="text-gold-light underline decoration-crimson-rich decoration-2 underline-offset-8">I-SPINE PVT LTD</span> : Where Strategy Wins Elections.
                    </ThemeText>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                    <div className={`${mode === 'dark' ? 'bg-white/5' : 'bg-navy-premium/5'} px-8 py-6 border-l-2 border-crimson-rich`}>
                        <p className={`text-xs uppercase tracking-widest font-bold ${tokens.heading}`}>Strategic Mission</p>
                        <p className={`text-lg font-serif italic ${tokens.muted}`}>Architects of Political Mandate</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative lg:pl-12"
            >
                {/* Premium Strategic Mission Panel */}
                <div className={`relative ${mode === 'dark' ? 'bg-[#0B1F3A]' : 'bg-white'} border ${tokens.border} rounded-sm overflow-hidden shadow-2xl group`}>
                    
                    {/* Background Cover Image */}
                    <div 
                        className="absolute inset-0 z-0 opacity-10 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                        style={{ backgroundImage: "url('/images/about-bg.png')" }}
                    />
                    
                    {/* Gradient Overlay for better text readability */}
                    <div className={`absolute inset-0 z-0 ${mode === 'dark' ? 'bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/80 to-transparent' : 'bg-gradient-to-t from-white via-white/80 to-transparent'}`} />

                    {/* Top Accent Bar */}
                    <div className="h-2 w-full bg-gradient-to-r from-crimson-rich to-gold-refined relative z-10" />
                    
                    <div className="p-10 lg:p-14 relative z-10">
                        <ThemeLabel className="mb-4 text-crimson-rich">Operational Capacity</ThemeLabel>
                        <h3 className={`font-serif text-3xl md:text-4xl font-bold mb-8 ${tokens.heading}`}>
                            Precision-guided execution at scale.
                        </h3>
                        
                        <div className="space-y-8">
                            <div className="flex flex-col gap-2 border-b border-white/5 pb-8 backdrop-blur-sm">
                                <span className="text-5xl font-black text-gold-refined font-serif drop-shadow-md">100%</span>
                                <span className={`text-sm uppercase tracking-widest font-bold ${tokens.text}`}>Data-Driven Strategy</span>
                                <p className={`text-sm mt-2 ${tokens.muted}`}>Eliminating guesswork through advanced analytics and localized intelligence.</p>
                            </div>
                            
                            <div className="flex flex-col gap-2 border-b border-white/5 pb-8 backdrop-blur-sm">
                                <span className="text-5xl font-black text-gold-refined font-serif drop-shadow-md">360°</span>
                                <span className={`text-sm uppercase tracking-widest font-bold ${tokens.text}`}>Campaign Management</span>
                                <p className={`text-sm mt-2 ${tokens.muted}`}>End-to-end operational control from narrative building to ground execution.</p>
                            </div>
                            
                            <div className="flex flex-col gap-2 pt-2 backdrop-blur-sm">
                                <span className="text-5xl font-black text-gold-refined font-serif drop-shadow-md">24/7</span>
                                <span className={`text-sm uppercase tracking-widest font-bold ${tokens.text}`}>War Room Operations</span>
                                <p className={`text-sm mt-2 ${tokens.muted}`}>Real-time monitoring, crisis management, and dynamic tactical adjustments.</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Subtle overlay grid pattern */}
                    <div className="absolute inset-0 z-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>
                
                {/* Decorative Elements */}
                <div className={`absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-crimson-rich/30 rounded-tr-3xl`} />
                <div className={`absolute -bottom-6 -left-6 w-24 h-24 border-b-2 border-l-2 border-gold-refined/30 rounded-bl-3xl`} />
            </motion.div>
        </div>
    );
}
