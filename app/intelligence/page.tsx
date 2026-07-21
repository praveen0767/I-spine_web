"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { IntelligenceProvider } from "./context/IntelligenceContext";

// Section imports
import ExecutiveSummary from "./components/ExecutiveSummary";
import GeospatialIntelligence from "./components/GeospatialIntelligence";
import ExecutiveKPIDashboard from "./components/ExecutiveKPIDashboard";
import StrategicAnalytics from "./components/StrategicAnalytics";
import StrategicRecommendations from "./components/StrategicRecommendations";
import DataFusionEngine from "./components/DataFusionEngine";
import WorkflowOrchestration from "./components/WorkflowOrchestration";
import LiveIntelligenceFeed from "./components/LiveIntelligenceFeed";
import TechnologyShowcase from "./components/TechnologyShowcase";

/* ─────────────────────────────────────────────────────────
   DEMO BANNER
   ───────────────────────────────────────────────────────── */
function DemoBanner() {
  return (
    <div className="w-full bg-amber-50 border-b border-amber-200 py-2 px-4 text-center sticky top-0 z-[1000]">
      <span className="text-[10px] uppercase tracking-widest text-amber-700 font-semibold">
        ⚠ Demonstration Platform — All analytics shown are fictional and generated solely for demonstration purposes
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   TOP NAVIGATION
   ───────────────────────────────────────────────────────── */
function BriefingHeader() {
  return (
    <header className="w-full bg-white border-b border-[var(--slate-soft)] px-6 lg:px-12 py-4 flex items-center justify-between z-50">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded bg-[var(--sky-primary)] flex items-center justify-center text-white font-bold text-xs">
                iS
            </div>
            <div className="flex flex-col">
                <span className="text-xs font-bold text-[var(--navy-premium)] tracking-widest uppercase">iSpine</span>
                <span className="text-[8px] font-semibold text-[var(--slate-medium)] tracking-widest uppercase">Consulting</span>
            </div>
        </Link>
        <div className="h-6 w-[1px] bg-[var(--slate-soft)] hidden md:block" />
        <div className="hidden md:flex items-center gap-2 text-[var(--slate-medium)]">
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-widest font-bold">Executive Briefing Book</span>
        </div>
      </div>
      
      <Link href="/" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[var(--slate-medium)] hover:text-[var(--sky-primary)] font-semibold transition-colors">
          <ArrowLeft className="w-3 h-3" /> Exit Briefing
      </Link>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────
   FOOTER
   ───────────────────────────────────────────────────────── */
function BriefingFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--slate-soft)] bg-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--navy-premium)] mb-1">End of Executive Briefing</p>
          <p className="text-[11px] text-[var(--slate-medium)] leading-relaxed max-w-lg">
            This briefing was generated using iSpine&apos;s AI-powered Political Intelligence Engine. All data, analysis, and recommendations represent fictional demonstration scenarios. For live deployment, please contact iSpine Consulting.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[var(--sky-primary)] flex items-center justify-center text-white font-bold text-xs">iS</div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[var(--navy-premium)] tracking-widest uppercase">iSpine</span>
            <span className="text-[8px] font-semibold text-[var(--slate-medium)] tracking-widest uppercase">IntelligenceOS™</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────
   STICKY NAVIGATION TABS
   ───────────────────────────────────────────────────────── */
const NAV_TABS = [
  { id: "strategic-intelligence", label: "Strategic Intelligence ⭐⭐⭐⭐⭐" },
  { id: "election-intelligence", label: "Election Intelligence" },
  { id: "decision-intelligence", label: "Decision Intelligence" },
  { id: "insights-center", label: "Insights Center" },
  { id: "executive-briefing", label: "Executive Briefing" },
  { id: "political-intelligence", label: "Political Intelligence" },
  { id: "research-intelligence", label: "Research & Intelligence" },
  { id: "campaign-intelligence", label: "Campaign Intelligence" }
];

function StickyNav() {
  const [activeTab, setActiveTab] = React.useState(NAV_TABS[0].id);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 140; // Offset for sticky headers
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white/80 backdrop-blur-md border-b border-[var(--slate-soft)] sticky top-[64px] z-40 overflow-x-auto shadow-sm">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex items-center gap-2 py-2">
        {NAV_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => scrollToSection(tab.id)}
            className={`whitespace-nowrap px-4 py-2 text-[11px] font-bold uppercase tracking-wider rounded transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-[var(--sky-primary)] text-white shadow-md"
                : "text-[var(--slate-medium)] hover:bg-[var(--sky-bg)] hover:text-[var(--navy-premium)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN PAGE LAYOUT
   ───────────────────────────────────────────────────────── */
export default function ExecutiveBriefingPlatform() {
  return (
    <IntelligenceProvider>
      <div className="min-h-screen bg-[var(--sky-bg)] font-sans text-[var(--navy-premium)]">
        <DemoBanner />
        <BriefingHeader />
        <StickyNav />
        
        <main className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-12 space-y-24">

  <section id="executive-briefing" className="scroll-mt-40">
    <ExecutiveSummary />
  </section>

  <section id="strategic-intelligence" className="scroll-mt-40">
    {/* <GeospatialIntelligence /> */}
    {/* <ExecutiveKPIDashboard /> */}
  </section>

  <section id="election-intelligence" className="scroll-mt-40">
    <StrategicAnalytics />
  </section>

  <section id="decision-intelligence" className="scroll-mt-40">
    {/* <StrategicRecommendations /> */}
    {/* <WorkflowOrchestration /> */}
  </section>

  <section id="research-intelligence" className="scroll-mt-40">
    {/* <DataFusionEngine /> */}
  </section>

  <section id="campaign-intelligence" className="scroll-mt-40">
    {/* <LiveIntelligenceFeed /> */}
  </section>

  <section id="insights-center" className="scroll-mt-40">
  </section>

  <section id="political-intelligence" className="scroll-mt-40">
    {/* <TechnologyShowcase /> */}
  </section>

</main>

        <BriefingFooter />
      </div>
    </IntelligenceProvider>
  );
}
