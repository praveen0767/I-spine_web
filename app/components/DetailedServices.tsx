"use client";
import React from 'react';
import { Target, Users, BarChart3, Fingerprint, Share2, MessageCircle, BookOpen } from 'lucide-react';
import { ThemeHeading, ThemeText, ThemeLabel, ThemeCard, useTheme } from './ThemeSystem';

const SERVICES = [
  {
    id: "01",
    layer: "Strategy",
    title: "Political Strategy & Advisory",
    summary: "Winning begins with clarity. We design sharp, data-backed strategies that define your path to victory.",
    details: [
      "Election Roadmap & Timeline Planning",
      "Opponent Analysis & Counter-Strategy",
      "Alliance & Coalition Strategy",
      "Issue Mapping & Narrative Positioning"
    ],
    icon: Target,
    img: "/images/services/service-1.png"
  },
  {
    id: "02",
    layer: "Campaign",
    title: "360° Campaign Management",
    summary: "End-to-end Election strategy from booth level to constituency-wide mobilization.",
    details: [
      "Constituency Profiling & SWOT",
      "War Room Setup & Operations",
      "Booth Management Systems",
      "Voter Outreach Programs"
    ],
    icon: Users,
    img: "/images/services/service-2.png"
  },
  {
    id: "03",
    layer: "Data",
    title: "Political Data Analytics",
    summary: "Scientific voter sentiment analysis and predictive modeling to drive decisions.",
    details: [
      "Opinion & Exit Polls",
      "Micro-targeting Segments",
      "Ground Surveys & Feedback",
      "Local Influencer Mapping"
    ],
    icon: BarChart3,
    img: "/images/services/service-3.png"
  },
  {
    id: "04",
    layer: "Image",
    title: "Candidate Image Building",
    summary: "Elections are about perception as much as performance. We shape how leaders are trusted.",
    details: [
      "Leader Profiling & Makeover",
      "Personal Brand Strategy",
      "Communication Coaching",
      "Constituency Connect Plans"
    ],
    icon: Fingerprint,
    img: "/images/services/service-4.png"
  },
  {
    id: "05",
    layer: "Digital",
    title: "Digital & Social Media",
    summary: "Building a powerful digital narrative that resonates with the modern voter.",
    details: [
      "Social Media Optimization",
      "WhatsApp Campaigns at Scale",
      "Digital War Room Tracking",
      "Online Reputation Shield"
    ],
    icon: Share2,
    img: "/images/services/service-5.png"
  },
  {
    id: "06",
    layer: "Media",
    title: "PR & Media Relations",
    summary: "The right message, delivered at the right time, through the right channels.",
    details: [
      "Press Releases & Media Kits",
      "Journalist & Media Networks",
      "Rapid Crisis Management",
      "Impactful Speech Writing"
    ],
    icon: MessageCircle,
    img: "/images/services/service-6.png"
  },
  {
    id: "07",
    layer: "Governance",
    title: "Policy Research & Governance",
    summary: "Our role doesn't end with elections. We help translate victory into effective governance.",
    details: [
      "Manifesto & Policy Drafting",
      "Policy Implementation Audits",
      "Governance Milestones Mapping",
      "Voter Baseline Analytics"
    ],
    icon: BookOpen,
    img: "/images/services/service-7.png"
  }
];

export default function DetailedServices() {
  const { mode, tokens } = useTheme();

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="mb-24 text-center max-w-4xl mx-auto">
        <ThemeLabel>Consultancy Suite</ThemeLabel>
        <ThemeHeading className="mb-8">
          Comprehensive Solutions
        </ThemeHeading>
        <ThemeText>
          Engineered for every critical stage of the political lifecycle. We provide end-to-end strategic, operational, and narrative support.
        </ThemeText>
      </div>

      {/* Spacious 2-Column Desktop Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-stretch">
        {SERVICES.map((s, index) => {
          const Icon = s.icon;
          // The 7th item spans full width
          const isFullWidth = index === SERVICES.length - 1;

          return (
            <ThemeCard
              key={s.id}
              className={`group relative overflow-hidden flex flex-col hover:border-crimson-rich/40 transition-colors duration-500 p-10 md:p-12 ${isFullWidth ? 'lg:col-span-2 lg:flex-row lg:items-center gap-12' : 'gap-8'}`}
            >
              {/* Background Cover Image */}
              <div 
                  className="absolute inset-0 z-0 opacity-10 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url('${s.img}')` }}
              />
              
              {/* Gradient Overlay for better text readability */}
              <div className={`absolute inset-0 z-0 ${mode === 'dark' ? 'bg-gradient-to-t from-[#10285A] via-[#10285A]/80 to-transparent' : 'bg-gradient-to-t from-white via-white/80 to-transparent'}`} />

              {/* Background Watermark */}
              <span className="absolute -bottom-4 -right-4 font-serif text-[180px] font-black text-[#0A1F44]/[0.03] group-hover:text-[#0A1F44]/[0.05] pointer-events-none transition-colors duration-500 z-0">
                {s.id}
              </span>

              {/* Header & Summary Area */}
              <div className={`relative z-10 flex flex-col ${isFullWidth ? 'lg:w-1/2' : ''}`}>
                <div className="flex items-center justify-between mb-8">
                  <div className="p-4 bg-[#0A1F44]/5 rounded-xl text-crimson-rich group-hover:bg-crimson-rich group-hover:text-white transition-all duration-500 shadow-sm backdrop-blur-sm">
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className="text-xs tracking-[0.3em] font-sans font-bold text-white uppercase bg-navy-premium px-5 py-2 rounded-full shadow-md border border-white/10 backdrop-blur-sm">
                    {s.layer}
                  </span>
                </div>

                <h3 className={`font-serif font-bold text-3xl md:text-4xl leading-tight mb-6 ${tokens.heading}`}>
                  {s.title}
                </h3>
                
                <p className={`${tokens.text} text-lg leading-relaxed drop-shadow-sm`}>
                  {s.summary}
                </p>
              </div>

              {/* Always Visible Deliverables List */}
              <div className={`relative z-10 ${isFullWidth ? 'lg:w-1/2 lg:border-l lg:border-white/10 lg:pl-12' : 'pt-8 border-t border-[#0A1F44]/5'}`}>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-crimson-rich block mb-6 drop-shadow-sm">
                  Core Deliverables
                </span>
                <ul className={`space-y-4 text-base md:text-lg font-sans ${tokens.heading}`}>
                  {s.details.map((item, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <div className="mt-2 w-2 h-2 bg-gold-refined rounded-full shrink-0 group-hover:bg-crimson-rich transition-colors duration-300 shadow-sm" />
                      <span className="leading-snug drop-shadow-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </ThemeCard>
          );
        })}
      </div>
    </div>
  );
}
