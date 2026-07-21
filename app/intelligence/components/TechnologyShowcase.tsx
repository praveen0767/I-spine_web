"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    Brain, Globe2, BarChart3, Cpu, Shield, Cloud, Layers, Radio,
    Workflow, Lock, Server, Zap, Eye, Network, Database, FileText
} from 'lucide-react';

const CAPABILITIES = [
    {
        category: "Intelligence & Analytics",
        items: [
            { name: 'Artificial Intelligence', icon: Brain, description: 'Enterprise-grade ML pipelines for pattern recognition, prediction, and autonomous decision recommendation across political intelligence datasets.' },
            { name: 'Geospatial Intelligence', icon: Globe2, description: 'Multi-layer GIS engine supporting constituency mapping, demographic overlays, infrastructure scoring, and real-time field operations visualization.' },
            { name: 'Predictive Analytics', icon: BarChart3, description: 'Time-series forecasting, Monte Carlo simulation, and ensemble modeling to project campaign trajectories, sentiment shifts, and resource requirements.' },
            { name: 'Decision Intelligence', icon: Cpu, description: 'Automated decision-support systems that synthesize multi-source intelligence into prioritized, actionable strategic recommendations.' },
            { name: 'Knowledge Graph', icon: Network, description: 'Dynamic entity-relationship graph connecting political actors, constituencies, events, and influence networks for contextual intelligence discovery.' },
            { name: 'Natural Language Processing', icon: FileText, description: 'Advanced NLP for media analysis, social sentiment extraction, executive brief generation, and natural language querying of intelligence data.' },
        ]
    },
    {
        category: "Platform Architecture",
        items: [
            { name: 'Cloud Native', icon: Cloud, description: 'Kubernetes-orchestrated microservices architecture deployed across multi-region cloud infrastructure for global availability and elastic scaling.' },
            { name: 'Real-time Streaming', icon: Radio, description: 'Event-driven architecture processing thousands of intelligence signals per second with sub-100ms latency for live situational awareness.' },
            { name: 'Workflow Orchestration', icon: Workflow, description: 'Automated end-to-end intelligence pipelines from data ingestion through AI processing to executive reporting with full audit trails.' },
            { name: 'Enterprise Security', icon: Shield, description: 'Zero-trust architecture with AES-256 encryption at rest and in transit, RBAC, multi-factor authentication, and SOC 2 Type II compliance.' },
            { name: 'High Availability', icon: Server, description: '99.99% SLA with active-active redundancy, automated failover, disaster recovery, and continuous health monitoring across all platform services.' },
            { name: 'Computer Vision', icon: Eye, description: 'Satellite and aerial imagery analysis for infrastructure assessment, crowd estimation, event monitoring, and geographic change detection.' },
        ]
    }
];

export default function TechnologyShowcase() {
    return (
        <section className="space-y-6 mt-12">
            <div className="px-2">
                <h2 className="text-xl font-sans font-bold text-[var(--navy-premium)]">
                    Platform Capabilities
                </h2>
                <p className="text-[10px] uppercase tracking-widest text-[var(--slate-medium)] font-bold mt-1">Enterprise Intelligence Architecture</p>
            </div>

            {CAPABILITIES.map((group) => (
                <div key={group.category} className="space-y-4">
                    <h3 className="text-[10px] uppercase tracking-widest font-bold text-[var(--sky-primary)] px-2">{group.category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {group.items.map((cap, idx) => {
                            const Icon = cap.icon;
                            return (
                                <motion.div
                                    key={cap.name}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.06 }}
                                    className="bg-white rounded-2xl p-6 border border-[var(--slate-soft)] shadow-sm hover:border-[var(--sky-primary)]/40 hover:shadow-md transition-all duration-300 group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-2.5 rounded-xl bg-[var(--sky-surface)] text-[var(--sky-primary)] group-hover:bg-[var(--sky-primary)] group-hover:text-white transition-colors duration-300 shrink-0">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-[var(--navy-premium)] uppercase tracking-wider mb-2">{cap.name}</h4>
                                            <p className="text-[12px] text-[var(--slate-medium)] leading-relaxed font-medium">{cap.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </section>
    );
}
