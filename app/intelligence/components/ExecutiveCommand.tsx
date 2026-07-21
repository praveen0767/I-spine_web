"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, BrainCircuit, Globe, Radar } from 'lucide-react';

const KpiCard = ({ title, value, subtext, icon: Icon, delay }: { title: string, value: string, subtext: string, icon: any, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className="relative overflow-hidden bg-black/40 border border-white/10 rounded-xl p-5 backdrop-blur-md group hover:border-blue-500/50 transition-colors h-full flex flex-col justify-between"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-all duration-500" />
    <div className="flex justify-between items-start mb-4">
      <div className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-medium">{title}</div>
      <Icon className="w-4 h-4 text-blue-400 opacity-70" />
    </div>
    <div>
      <div className="text-3xl font-light text-white tracking-tight mb-1">{value}</div>
      <div className="text-blue-400/60 text-[10px] uppercase tracking-wider">{subtext}</div>
    </div>
    
    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
  </motion.div>
);

export function ExecutiveCommand() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-sm uppercase tracking-[0.25em] font-medium opacity-80 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-500" />
            Executive Command Center
          </h2>
          <div className="h-[1px] w-32 bg-gradient-to-r from-blue-500 to-transparent mt-2" />
        </div>
        <div className="flex gap-4 hidden sm:flex">
          <div className="flex items-center gap-2 text-[10px] text-white/50 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            System Nominal
          </div>
          <div className="flex items-center gap-2 text-[10px] text-white/50 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            AI Core Active
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-grow">
        <KpiCard title="AI Confidence Core" value="94.2%" subtext="Predictive Model V4" icon={BrainCircuit} delay={0.1} />
        <KpiCard title="Strategic Risks" value="12" subtext="4 Critical Interventions" icon={Radar} delay={0.2} />
        <KpiCard title="Field Operations" value="482" subtext="Active Ground Teams" icon={Target} delay={0.3} />
        <KpiCard title="Global Sentiment" value="Positive" subtext="Trending +4.2% 7d" icon={Globe} delay={0.4} />
      </div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.6 }}
        className="mt-4 p-4 border border-white/5 bg-black/20 rounded-xl"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] text-white/50 uppercase tracking-widest">Operational Coverage</span>
          <span className="text-[10px] text-white uppercase tracking-widest">87%</span>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: "87%" }} 
            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            className="h-full bg-blue-500" 
          />
        </div>
      </motion.div>
    </div>
  );
}
