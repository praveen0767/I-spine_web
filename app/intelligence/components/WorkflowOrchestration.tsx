"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, CheckCircle2, Cpu, Brain, BarChart3, FileText, Target, Activity, Workflow, ChevronRight, X } from 'lucide-react';

const WORKFLOW_NODES = [
    {
        id: 'collect',
        name: 'Data Collection',
        icon: Database,
        purpose: 'Aggregation of multi-source intelligence data from field teams, surveys, CRM, social feeds, and government repositories.',
        inputs: 'Raw survey responses, social media feeds, CRM records, government datasets, satellite imagery.',
        algorithms: 'ETL pipelines, data normalization, deduplication, format standardization.',
        outputs: 'Unified raw data lake with source tagging and timestamp metadata.',
        value: 'Eliminates data silos and ensures every decision is informed by the complete intelligence picture.',
    },
    {
        id: 'validate',
        name: 'Validation',
        icon: CheckCircle2,
        purpose: 'Automated quality assurance and integrity verification of all incoming data streams.',
        inputs: 'Raw data lake, historical benchmarks, validation rules.',
        algorithms: 'Statistical anomaly detection, cross-source verification, schema validation, outlier flagging.',
        outputs: 'Quality-assured dataset with confidence scores and provenance chains.',
        value: 'Prevents corrupted or unreliable data from influencing strategic decisions.',
    },
    {
        id: 'fusion',
        name: 'Data Fusion',
        icon: Workflow,
        purpose: 'Intelligent merging and correlation of validated data from heterogeneous sources into a unified intelligence layer.',
        inputs: 'Validated datasets, entity resolution models, correlation matrices.',
        algorithms: 'Entity resolution, probabilistic matching, Bayesian fusion, conflict resolution.',
        outputs: 'Fused intelligence records with multi-source confidence weighting.',
        value: 'Creates a single source of truth that is more reliable than any individual data source.',
    },
    {
        id: 'graph',
        name: 'Knowledge Graph',
        icon: Activity,
        purpose: 'Construction and maintenance of a dynamic political knowledge graph connecting entities, events, and relationships.',
        inputs: 'Fused intelligence records, historical entity data, relationship schemas.',
        algorithms: 'Graph construction, link prediction, community detection, temporal graph analysis.',
        outputs: 'Interactive knowledge graph with entity profiles, relationship strengths, and temporal evolution.',
        value: 'Enables discovery of hidden relationships and influence networks critical to political strategy.',
    },
    {
        id: 'ai',
        name: 'AI Processing',
        icon: Brain,
        purpose: 'Application of machine learning models for pattern recognition, prediction, and intelligent recommendation.',
        inputs: 'Knowledge graph, historical outcomes, model training data.',
        algorithms: 'Gradient boosting, neural networks, NLP transformers, ensemble methods, reinforcement learning.',
        outputs: 'Predictive scores, risk assessments, opportunity rankings, strategic recommendations.',
        value: 'Transforms raw intelligence into actionable strategic insight at a speed and scale impossible for human analysts.',
    },
    {
        id: 'analytics',
        name: 'Predictive Analytics',
        icon: BarChart3,
        purpose: 'Generation of forward-looking projections, trend forecasts, and scenario simulations.',
        inputs: 'AI model outputs, historical trend data, external variable feeds.',
        algorithms: 'Time-series forecasting, Monte Carlo simulation, regression analysis, scenario modeling.',
        outputs: 'Forecasts with confidence intervals, scenario comparisons, trend alerts.',
        value: 'Enables proactive rather than reactive strategic planning with quantified uncertainty.',
    },
    {
        id: 'dashboard',
        name: 'Executive Dashboard',
        icon: Target,
        purpose: 'Real-time visualization and interactive exploration of all intelligence outputs for executive decision-makers.',
        inputs: 'All processed analytics, KPIs, alerts, recommendations.',
        algorithms: 'Real-time aggregation, dynamic filtering, responsive visualization rendering.',
        outputs: 'Interactive dashboards, KPI monitors, drill-down reports, executive alerts.',
        value: 'Empowers leadership with instant situational awareness and the ability to explore intelligence at any depth.',
    },
    {
        id: 'report',
        name: 'Executive Report',
        icon: FileText,
        purpose: 'Automated generation of comprehensive, publication-ready intelligence briefings.',
        inputs: 'Dashboard state, AI insights, predictive analytics, knowledge graph summaries.',
        algorithms: 'Template generation, NLG (Natural Language Generation), automated chart embedding, executive summarization.',
        outputs: 'PDF/HTML executive briefings, constituency profiles, campaign strategy documents.',
        value: 'Reduces report preparation from days to minutes while maintaining consulting-grade quality.',
    },
];

export default function WorkflowOrchestration() {
    const [selectedNode, setSelectedNode] = useState<string | null>(null);
    const activeNode = WORKFLOW_NODES.find(n => n.id === selectedNode);

    return (
        <section className="space-y-6 mt-12">
            <div className="px-2">
                <h2 className="text-xl font-sans font-bold text-[var(--navy-premium)]">
                    Intelligence Workflow Orchestration
                </h2>
                <p className="text-[10px] uppercase tracking-widest text-[var(--slate-medium)] font-bold mt-1">End-to-End Decision Intelligence Pipeline</p>
            </div>

            <div className="bg-white rounded-2xl p-8 lg:p-12 border border-[var(--slate-soft)] shadow-sm">
                {/* Horizontal Workflow */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                    {WORKFLOW_NODES.map((node, idx) => {
                        const Icon = node.icon;
                        const isActive = selectedNode === node.id;
                        return (
                            <React.Fragment key={node.id}>
                                <motion.button
                                    onClick={() => setSelectedNode(isActive ? null : node.id)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex flex-col items-center gap-2 px-4 py-4 rounded-xl border transition-all duration-300 cursor-pointer min-w-[100px] ${
                                        isActive
                                            ? 'bg-[var(--sky-primary)] text-white border-[var(--sky-primary)] shadow-lg'
                                            : 'bg-white text-[var(--navy-premium)] border-[var(--slate-soft)] hover:border-[var(--sky-primary)]/50 hover:bg-[var(--sky-surface)]'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="text-[8px] uppercase tracking-widest font-bold text-center leading-tight">{node.name}</span>
                                </motion.button>
                                {idx < WORKFLOW_NODES.length - 1 && (
                                    <ChevronRight className="w-4 h-4 text-[var(--slate-medium)] shrink-0 hidden md:block" />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* Expanded Detail Panel */}
                <AnimatePresence mode="wait">
                    {activeNode && (
                        <motion.div
                            key={activeNode.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="bg-[var(--sky-surface)] rounded-xl p-8 border border-[var(--sky-primary)]/10 relative">
                                <button
                                    onClick={() => setSelectedNode(null)}
                                    className="absolute top-4 right-4 p-1 rounded-md hover:bg-white/50 transition-colors"
                                >
                                    <X className="w-4 h-4 text-[var(--slate-medium)]" />
                                </button>

                                <h3 className="text-lg font-bold text-[var(--navy-premium)] mb-6">{activeNode.name}</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div>
                                        <h4 className="text-[9px] uppercase tracking-widest font-bold text-[var(--sky-primary)] mb-2">Purpose</h4>
                                        <p className="text-sm text-[var(--navy-premium)] leading-relaxed">{activeNode.purpose}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[9px] uppercase tracking-widest font-bold text-[var(--sky-primary)] mb-2">Inputs</h4>
                                        <p className="text-sm text-[var(--navy-premium)] leading-relaxed">{activeNode.inputs}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[9px] uppercase tracking-widest font-bold text-[var(--sky-primary)] mb-2">Algorithms</h4>
                                        <p className="text-sm text-[var(--navy-premium)] leading-relaxed">{activeNode.algorithms}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[9px] uppercase tracking-widest font-bold text-[var(--sky-primary)] mb-2">Outputs</h4>
                                        <p className="text-sm text-[var(--navy-premium)] leading-relaxed">{activeNode.outputs}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <h4 className="text-[9px] uppercase tracking-widest font-bold text-emerald-600 mb-2">Business Value</h4>
                                        <p className="text-sm font-medium text-[var(--navy-premium)] leading-relaxed bg-white/60 p-4 rounded-lg border border-emerald-500/10">
                                            {activeNode.value}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
