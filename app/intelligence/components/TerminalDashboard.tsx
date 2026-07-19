'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  GEO_NODES, SEARCH_INDEX, SENTIMENT_TREND, VOTER_DEMOGRAPHICS,
  PARTY_VOTE_SHARE, ISSUE_HEATMAP, LIVE_FEED, FIELD_KPIs,
  RISK_MATRIX, TURNOUT_FORECAST, GeoNode, FeedEvent
} from '../data/demo-datasets';
import {
  LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import { useGeo, GeoSelection } from '../context/GeoContext';

// ── COLOUR TOKENS ─────────────────────────────────────────────
const C = {
  bg: '#050E1F',
  panel: 'rgba(10, 24, 54, 0.82)',
  border: 'rgba(0, 212, 255, 0.18)',
  teal: '#00D4FF',
  gold: '#D4AF37',
  green: '#00FF88',
  red: '#FF4444',
  orange: '#FF8C00',
  purple: '#A78BFA',
  text: '#CBD5E1',
  textDim: '#475569',
};

const PARTY_COLORS = ['#00D4FF', '#D4AF37', '#A78BFA', '#475569'];

// ── CLOCK ─────────────────────────────────────────────────────
function LiveClock() {
  const [t, setT] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setT(new Date()), 1000); return () => clearInterval(id); }, []);
  return (
    <span className="font-mono text-xs tracking-widest" style={{ color: C.teal }}>
      {t.toUTCString().replace(' GMT', ' UTC')}
    </span>
  );
}

// ── SEARCH BAR ────────────────────────────────────────────────
function SearchBar() {
  const { setSelection } = useGeo();
  const [q, setQ] = useState('');
  const [results, setResults] = useState<typeof SEARCH_INDEX>([]);

  useEffect(() => {
    if (q.length < 2) { setResults([]); return; }
    setResults(SEARCH_INDEX.filter(n => n.name.toLowerCase().includes(q.toLowerCase())).slice(0, 8));
  }, [q]);

  const pick = (id: string) => {
    const node = GEO_NODES[id];
    if (node) setSelection({ level: node.level, name: node.name, id: node.id });
    setQ(''); setResults([]);
  };

  return (
    <div className="relative w-full max-w-lg">
      <div className="flex items-center gap-2 px-3 py-2 rounded" style={{ background: 'rgba(0,212,255,0.06)', border: `1px solid ${C.border}` }}>
        <svg className="w-4 h-4 shrink-0" fill="none" stroke={C.teal} strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search region — India, Delhi, North West Delhi, Rohini…"
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-600"
          style={{ color: '#E2E8F0', fontFamily: 'monospace' }}
        />
        {q && <button onClick={() => setQ('')} className="text-slate-500 hover:text-white text-xs">✕</button>}
      </div>
      {results.length > 0 && (
        <div className="absolute top-full mt-1 left-0 right-0 z-50 rounded overflow-hidden" style={{ background: 'rgba(5,14,31,0.97)', border: `1px solid ${C.border}` }}>
          {results.map(r => (
            <button
              key={r.id}
              onClick={() => pick(r.id)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-white/5 transition-colors text-left"
            >
              <span style={{ color: '#E2E8F0' }}>{r.name}</span>
              <span className="text-xs uppercase tracking-widest" style={{ color: C.teal }}>{r.level}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── STAT CARD ─────────────────────────────────────────────────
function StatCard({ label, value, sub, color = C.teal }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="flex flex-col gap-1 p-3 rounded" style={{ background: C.panel, border: `1px solid ${C.border}` }}>
      <span className="text-xs uppercase tracking-widest" style={{ color: C.textDim }}>{label}</span>
      <span className="text-2xl font-bold font-mono" style={{ color }}>{value}</span>
      {sub && <span className="text-xs" style={{ color: C.textDim }}>{sub}</span>}
    </div>
  );
}

// ── SECTION HEADER ────────────────────────────────────────────
function SectionHeader({ title, badge }: { title: string; badge?: string }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="w-1 h-4 rounded-full" style={{ background: C.teal }} />
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.teal }}>{title}</span>
      {badge && <span className="ml-auto text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,212,255,0.12)', color: C.teal }}>{badge}</span>}
    </div>
  );
}

// ── GEO MAP SVG (Dynamic India) ────────────────────────────────
function GeoMapPanel({ node }: { node: GeoNode | null }) {
  // We draw a simplified SVG map using coordinate-based dot visualisation
  const actualNode = node || GEO_NODES['india'];

  // Generate surrounding "signal" nodes based on children
  const childNodes = actualNode.children
    ?.map(id => GEO_NODES[id])
    .filter(Boolean) as GeoNode[] | undefined;

  return (
    <div className="relative w-full h-full min-h-[320px] flex flex-col">
      <SectionHeader title="Geographic Intelligence Engine" badge={`LEVEL: ${actualNode.level.toUpperCase()}`} />
      <div className="flex-1 relative rounded overflow-hidden" style={{ background: 'rgba(0,10,30,0.9)', border: `1px solid ${C.border}` }}>
        {/* Grid overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00D4FF" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Scan line animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-full h-0.5 opacity-30 animate-pulse" style={{ background: `linear-gradient(90deg, transparent, ${C.teal}, transparent)`, top: '40%' }} />
        </div>

        {/* Central target */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Outer rings */}
            {[120, 80, 50].map((size, i) => (
              <div key={i} className="absolute rounded-full border opacity-20 animate-ping"
                style={{ width: size, height: size, borderColor: C.teal, animationDuration: `${2 + i}s`, animationDelay: `${i * 0.5}s` }} />
            ))}
            {/* Center dot */}
            <div className="w-4 h-4 rounded-full z-10 shadow-lg" style={{ background: C.teal, boxShadow: `0 0 20px ${C.teal}` }} />

            {/* Child node dots */}
            {childNodes && childNodes.slice(0, 6).map((child, i) => {
              const angle = (i / Math.min(childNodes.length, 6)) * 2 * Math.PI - Math.PI / 2;
              const r = 90;
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r;
              return (
                <div key={child.id} className="absolute flex flex-col items-center" style={{ transform: `translate(${x}px, ${y}px)` }}>
                  <div className="w-2 h-2 rounded-full mb-1" style={{ background: C.gold, boxShadow: `0 0 8px ${C.gold}` }} />
                  <span className="text-[9px] whitespace-nowrap opacity-70 font-mono" style={{ color: C.gold }}>{child.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Region label */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="text-center">
            <div className="text-xl font-bold font-mono" style={{ color: C.teal }}>{actualNode.name}</div>
            <div className="text-xs opacity-60 font-mono">{actualNode.level.toUpperCase()} · {actualNode.lat.toFixed(4)}°N {actualNode.lng.toFixed(4)}°E</div>
          </div>
        </div>

        {/* Corner brackets */}
        {['tl', 'tr', 'bl', 'br'].map(pos => (
          <div key={pos} className="absolute w-4 h-4" style={{
            top: pos.startsWith('t') ? 8 : undefined,
            bottom: pos.startsWith('b') ? 8 : undefined,
            left: pos.endsWith('l') ? 8 : undefined,
            right: pos.endsWith('r') ? 8 : undefined,
            borderTop: pos.startsWith('t') ? `2px solid ${C.teal}` : undefined,
            borderBottom: pos.startsWith('b') ? `2px solid ${C.teal}` : undefined,
            borderLeft: pos.endsWith('l') ? `2px solid ${C.teal}` : undefined,
            borderRight: pos.endsWith('r') ? `2px solid ${C.teal}` : undefined,
          }} />
        ))}
      </div>
    </div>
  );
}

// ── STATS OVERVIEW ────────────────────────────────────────────
function StatsPanel({ node }: { node: GeoNode }) {
  const s = node.stats;
  const fmtNum = (n: number) => n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `${(n / 1000).toFixed(0)}K` : String(n);
  return (
    <div>
      <SectionHeader title="Key Intelligence Indicators" />
      <div className="grid grid-cols-2 gap-2">
        <StatCard label="Registered Voters" value={fmtNum(s.voters)} />
        <StatCard label="Est. Turnout" value={`${s.turnout}%`} color={C.green} />
        <StatCard label="Lead Party" value={s.leadParty} sub={`+${s.leadMargin}% margin`} color={C.gold} />
        <StatCard label="Sentiment" value={`${s.sentiment}/100`} color={s.sentiment > 60 ? C.green : s.sentiment > 40 ? C.gold : C.red} />
        <StatCard label="Risk Score" value={`${s.riskScore}/100`} color={s.riskScore > 60 ? C.red : s.riskScore > 40 ? C.orange : C.green} />
        <StatCard label="Field Agents" value={fmtNum(s.fieldAgents)} color={C.purple} />
      </div>
    </div>
  );
}

// ── SENTIMENT CHART ───────────────────────────────────────────
function SentimentChart() {
  return (
    <div>
      <SectionHeader title="Sentiment Trend (6 months)" badge="DEMO" />
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={SENTIMENT_TREND} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="proGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={C.green} stopOpacity={0.3} />
              <stop offset="95%" stopColor={C.green} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="antiGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={C.red} stopOpacity={0.3} />
              <stop offset="95%" stopColor={C.red} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" tick={{ fill: C.textDim, fontSize: 10 }} />
          <YAxis tick={{ fill: C.textDim, fontSize: 10 }} />
          <Tooltip contentStyle={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 4 }} labelStyle={{ color: C.teal }} />
          <Area type="monotone" dataKey="pro" stroke={C.green} fill="url(#proGrad)" strokeWidth={2} name="Pro" />
          <Area type="monotone" dataKey="anti" stroke={C.red} fill="url(#antiGrad)" strokeWidth={2} name="Anti" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── TURNOUT FORECAST ──────────────────────────────────────────
function TurnoutChart() {
  const data = TURNOUT_FORECAST.filter(d => d.actual !== null || d.forecast !== null);
  return (
    <div>
      <SectionHeader title="Turnout Forecast" badge="LIVE MODEL" />
      <ResponsiveContainer width="100%" height={150}>
        <LineChart data={TURNOUT_FORECAST} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="time" tick={{ fill: C.textDim, fontSize: 10 }} />
          <YAxis tick={{ fill: C.textDim, fontSize: 10 }} />
          <Tooltip contentStyle={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 4 }} labelStyle={{ color: C.teal }} />
          <Line type="monotone" dataKey="actual" stroke={C.teal} strokeWidth={2} dot={false} name="Actual %" />
          <Line type="monotone" dataKey="forecast" stroke={C.gold} strokeWidth={2} strokeDasharray="5 5" dot={false} name="Forecast %" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── VOTE SHARE PIE ────────────────────────────────────────────
function VoteShareChart() {
  return (
    <div>
      <SectionHeader title="Projected Vote Share" badge="DEMO" />
      <div className="flex items-center gap-3">
        <ResponsiveContainer width={130} height={130}>
          <PieChart>
            <Pie data={PARTY_VOTE_SHARE} dataKey="share" cx="50%" cy="50%" outerRadius={55} innerRadius={30} strokeWidth={0}>
              {PARTY_VOTE_SHARE.map((_, i) => <Cell key={i} fill={PARTY_COLORS[i % PARTY_COLORS.length]} />)}
            </Pie>
            <Tooltip contentStyle={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 4, fontSize: 12 }} formatter={(v) => [`${v}%`]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-1.5 flex-1">
          {PARTY_VOTE_SHARE.map((p, i) => (
            <div key={p.party} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: PARTY_COLORS[i] }} />
              <span className="text-xs flex-1 truncate" style={{ color: C.text }}>{p.party}</span>
              <span className="text-xs font-mono font-bold" style={{ color: PARTY_COLORS[i] }}>{p.share}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── ISSUE HEATMAP ─────────────────────────────────────────────
function IssueHeatmap() {
  return (
    <div>
      <SectionHeader title="Issue Priority Matrix" badge="AI RANKED" />
      <div className="flex flex-col gap-1.5">
        {ISSUE_HEATMAP.map(item => (
          <div key={item.issue} className="flex items-center gap-2">
            <span className="text-xs w-24 truncate" style={{ color: C.text }}>{item.issue}</span>
            <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${item.score}%`, background: item.score > 75 ? C.red : item.score > 60 ? C.orange : C.teal }} />
            </div>
            <span className="text-xs font-mono w-6 text-right" style={{ color: C.textDim }}>{item.score}</span>
            <span className="text-xs font-mono w-8 text-right" style={{ color: item.trend.startsWith('+') ? C.green : C.red }}>{item.trend}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── RISK MATRIX ───────────────────────────────────────────────
function RiskPanel() {
  return (
    <div>
      <SectionHeader title="Risk Zone Distribution" />
      <div className="grid grid-cols-2 gap-2">
        {RISK_MATRIX.map(r => (
          <div key={r.zone} className="flex items-center gap-2 p-2 rounded" style={{ background: `${r.color}10`, border: `1px solid ${r.color}30` }}>
            <div className="w-3 h-3 rounded-full" style={{ background: r.color, boxShadow: `0 0 8px ${r.color}` }} />
            <div>
              <div className="text-xs font-bold" style={{ color: r.color }}>{r.zone}</div>
              <div className="text-lg font-mono font-bold" style={{ color: r.color }}>{r.count}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── LIVE FEED ─────────────────────────────────────────────────
function LiveFeedPanel() {
  const [feed, setFeed] = useState<FeedEvent[]>(LIVE_FEED);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2,'0');
      const mm = String(now.getMinutes()).padStart(2,'0');
      const templates = [
        { type: 'intel' as const, priority: 'MED' as const, messages: ['AI narrative analysis updated — positive framing +4%.', 'Social listening detected emerging hashtag campaign.', 'Opposition digital spend increased 12% this hour.'] },
        { type: 'field' as const, priority: 'LOW' as const, messages: ['Booth coverage report filed by sector supervisor.', 'GOTV call campaign completed in 3 more wards.', 'Volunteer deployment confirmed in border zones.'] },
        { type: 'alert' as const, priority: 'HIGH' as const, messages: ['Anomalous crowd movement detected near polling station.', 'Unverified rumour spreading on WhatsApp — monitoring.'] },
      ];
      const tpl = templates[Math.floor(Math.random() * templates.length)];
      const msg = tpl.messages[Math.floor(Math.random() * tpl.messages.length)];
      const loc = ['North West Delhi','Chennai Central','Bangalore South','Hyderabad','Mumbai North'][Math.floor(Math.random()*5)];
      const newEvent: FeedEvent = { id: `auto-${Date.now()}`, time: `${hh}:${mm}`, type: tpl.type, location: loc, message: msg, priority: tpl.priority };
      setFeed(prev => [newEvent, ...prev].slice(0, 15));
    }, 8000);
    return () => clearInterval(id);
  }, []);

  const priorityColor = (p: string) => p === 'HIGH' ? C.red : p === 'MED' ? C.orange : C.green;
  const typeIcon = (t: string) => ({ alert: '⚠', intel: '◆', field: '●', analysis: '▲' }[t] || '•');

  return (
    <div className="flex flex-col h-full">
      <SectionHeader title="Live Intelligence Feed" badge={`${feed.length} SIGNALS`} />
      <div ref={ref} className="flex-1 flex flex-col gap-1.5 overflow-y-auto" style={{ maxHeight: '340px' }}>
        {feed.map((evt, i) => (
          <div
            key={evt.id}
            className="flex gap-2 p-2 rounded text-xs"
            style={{
              background: i === 0 ? `${priorityColor(evt.priority)}08` : 'rgba(255,255,255,0.02)',
              border: `1px solid ${i === 0 ? priorityColor(evt.priority) + '30' : 'rgba(255,255,255,0.04)'}`,
              animation: i === 0 ? 'fadeIn 0.5s ease' : 'none',
            }}
          >
            <span style={{ color: priorityColor(evt.priority) }} className="shrink-0 mt-0.5">{typeIcon(evt.type)}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="font-mono opacity-60">{evt.time}</span>
                <span className="px-1 py-0 rounded text-[9px] uppercase tracking-widest" style={{ background: `${priorityColor(evt.priority)}20`, color: priorityColor(evt.priority) }}>{evt.priority}</span>
                <span className="truncate opacity-70">{evt.location}</span>
              </div>
              <p className="leading-relaxed" style={{ color: C.text }}>{evt.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── FIELD KPIs ROW ────────────────────────────────────────────
function FieldKPIRow() {
  return (
    <div className="grid grid-cols-4 gap-2">
      {FIELD_KPIs.map(kpi => (
        <div key={kpi.label} className="flex flex-col items-center gap-1 p-3 rounded" style={{ background: C.panel, border: `1px solid ${C.border}` }}>
          <span className="text-xl">{kpi.icon}</span>
          <span className="text-lg font-mono font-bold" style={{ color: kpi.color }}>{kpi.value}</span>
          <span className="text-[10px] text-center uppercase tracking-widest" style={{ color: C.textDim }}>{kpi.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── BOOT SEQUENCE ─────────────────────────────────────────────
function BootSequence({ onComplete }: { onComplete: () => void }) {
  const lines = [
    '> INITIALISING iSPINE INTELLIGENCE TERMINAL v4.2.1...',
    '> LOADING SECURE CHANNEL... ENCRYPTED',
    '> CONNECTING TO GEO-INTELLIGENCE ENGINE...',
    '> LOADING DEMOGRAPHIC DATASETS: 970M VOTERS',
    '> AI SENTIMENT MODEL: ONLINE',
    '> FIELD NETWORK SYNC: 14,700 AGENTS CONNECTED',
    '> RISK ASSESSMENT MODULE: ACTIVE',
    '> ALL SYSTEMS NOMINAL — AUTHENTICATION VERIFIED',
    '> ENTERING INTELLIGENCE TERMINAL...',
  ];
  const [shown, setShown] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i < lines.length) { setShown(prev => [...prev, lines[i]]); i++; }
      else { clearInterval(id); setTimeout(() => setDone(true), 400); setTimeout(onComplete, 900); }
    }, 280);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${done ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{ background: '#000913' }}>
      <div className="w-full max-w-2xl px-8">
        <div className="text-center mb-8">
          <div className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: C.teal }}>iSPINE INTELLIGENCE TERMINAL</div>
          <div className="text-3xl font-bold font-mono" style={{ color: '#E2E8F0' }}>SECURE BOOT</div>
        </div>
        <div className="font-mono text-sm space-y-1.5" style={{ color: '#4ade80' }}>
          {shown.map((line, i) => (
            <div key={i} className="flex items-start gap-2 animate-pulse-once">
              <span>{line}</span>
              {i === shown.length - 1 && <span className="inline-block w-2 h-4 bg-green-400 animate-pulse" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── BREADCRUMB ────────────────────────────────────────────────
function Breadcrumb({ node }: { node: GeoNode | null }) {
  if (!node) return <span className="text-xs font-mono opacity-40">Select a region to begin analysis</span>;
  const levels: string[] = ['india'];
  // build simple chain
  const chain = [GEO_NODES['india']];
  Object.values(GEO_NODES).forEach(n => {
    if (n.children?.includes(node.id) && n.id !== 'india') chain.push(n);
  });
  chain.push(node);
  const unique = chain.filter((n, i, arr) => arr.findIndex(x => x.id === n.id) === i);

  return (
    <div className="flex items-center gap-1 font-mono text-xs">
      {unique.map((n, i) => (
        <React.Fragment key={n.id}>
          {i > 0 && <span style={{ color: C.textDim }}>›</span>}
          <span style={{ color: i === unique.length - 1 ? C.teal : C.textDim }}>{n.name}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────
export default function IntelligencePage() {
  const [booted, setBooted] = useState(false);
  const { selection, setSelection } = useGeo();

  const currentNode: GeoNode | null = selection?.id ? (GEO_NODES[selection.id] || null) : null;

  // Default to India on load
  useEffect(() => {
    if (!selection) setSelection({ level: 'country', name: 'India', id: 'india' });
  }, []);

  return (
    <>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      <div className="flex flex-col h-screen overflow-hidden" style={{ background: C.bg, opacity: booted ? 1 : 0, transition: 'opacity 0.5s ease' }}>

        {/* ── TOP BAR ── */}
        <header className="flex items-center gap-4 px-4 py-2 shrink-0" style={{ background: 'rgba(5,14,31,0.95)', borderBottom: `1px solid ${C.border}` }}>
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.green, boxShadow: `0 0 8px ${C.green}` }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.teal }}>iSPINE · IT</span>
            <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(255,68,68,0.15)', color: C.red, border: `1px solid ${C.red}30` }}>DEMO MODE</span>
          </div>
          <div className="flex-1">
            <SearchBar />
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <LiveClock />
            <div className="flex items-center gap-1 text-xs font-mono" style={{ color: C.textDim }}>
              <span style={{ color: C.green }}>●</span> 14,700 AGENTS ONLINE
            </div>
          </div>
        </header>

        {/* ── BREADCRUMB BAR ── */}
        <div className="px-4 py-1.5 shrink-0 flex items-center gap-3" style={{ background: 'rgba(0,0,0,0.3)', borderBottom: `1px solid rgba(255,255,255,0.04)` }}>
          <Breadcrumb node={currentNode} />
          {currentNode && (
            <span className="ml-auto text-xs font-mono uppercase tracking-widest" style={{ color: C.textDim }}>
              RISK: <span style={{ color: currentNode.stats.riskScore > 60 ? C.red : currentNode.stats.riskScore > 40 ? C.orange : C.green }}>{currentNode.stats.riskScore}/100</span>
            </span>
          )}
        </div>

        {/* ── MAIN GRID ── */}
        <main className="flex-1 overflow-hidden grid gap-2 p-2" style={{
          gridTemplateColumns: '300px 1fr 300px',
          gridTemplateRows: '1fr auto',
        }}>

          {/* LEFT COLUMN */}
          <aside className="flex flex-col gap-2 overflow-y-auto">
            <div className="p-3 rounded" style={{ background: C.panel, border: `1px solid ${C.border}` }}>
              <StatsPanel node={currentNode || GEO_NODES['india']} />
            </div>
            <div className="p-3 rounded" style={{ background: C.panel, border: `1px solid ${C.border}` }}>
              <VoteShareChart />
            </div>
            <div className="p-3 rounded" style={{ background: C.panel, border: `1px solid ${C.border}` }}>
              <RiskPanel />
            </div>
          </aside>

          {/* CENTER COLUMN */}
          <section className="flex flex-col gap-2 overflow-hidden">
            <div className="flex-1 p-3 rounded" style={{ background: C.panel, border: `1px solid ${C.border}` }}>
              <GeoMapPanel node={currentNode} />
            </div>
            <div className="p-3 rounded" style={{ background: C.panel, border: `1px solid ${C.border}` }}>
              <TurnoutChart />
            </div>
          </section>

          {/* RIGHT COLUMN */}
          <aside className="flex flex-col gap-2 overflow-y-auto">
            <div className="p-3 rounded" style={{ background: C.panel, border: `1px solid ${C.border}` }}>
              <SentimentChart />
            </div>
            <div className="p-3 rounded" style={{ background: C.panel, border: `1px solid ${C.border}` }}>
              <IssueHeatmap />
            </div>
            <div className="flex-1 p-3 rounded" style={{ background: C.panel, border: `1px solid ${C.border}` }}>
              <LiveFeedPanel />
            </div>
          </aside>

        </main>

        {/* ── FIELD KPIs ── */}
        <div className="px-2 pb-2 shrink-0">
          <FieldKPIRow />
        </div>

        {/* ── DEMO WATERMARK ── */}
        <footer className="shrink-0 py-1 text-center" style={{ background: 'rgba(0,0,0,0.5)', borderTop: `1px solid rgba(255,68,68,0.2)` }}>
          <p className="text-[10px] tracking-widest uppercase font-mono" style={{ color: 'rgba(255,68,68,0.6)' }}>
            ⚠ DEMONSTRATION MODE — All analytics, maps, charts and intelligence shown are entirely fictional and generated from demo datasets. No real political data is used. ⚠
          </p>
        </footer>

      </div>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
        * { scrollbar-width: thin; scrollbar-color: rgba(0,212,255,0.2) transparent; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.2); border-radius: 2px; }
      `}</style>
    </>
  );
}
