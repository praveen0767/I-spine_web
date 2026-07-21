"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useIntelligence, REGIONS } from '../context/IntelligenceContext';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ScatterChart, Scatter, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Treemap, ZAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

/* ───────────────── Color Palette ───────────────── */
const SKY = '#4A90E2';
const SKY_LIGHT = '#A8D0F5';
const NAVY = '#16324F';
const EMERALD = '#10b981';
const AMBER = '#f59e0b';
const ROSE = '#f43f5e';
const VIOLET = '#8b5cf6';
const TEAL = '#14b8a6';
const PALETTE = [SKY, EMERALD, AMBER, VIOLET, TEAL, ROSE, SKY_LIGHT, NAVY];

/* ───────────────── Mock Data Generators ───────────────── */
function seed(regionId: string): number {
  let h = 0;
  for (let i = 0; i < regionId.length; i++) { h = regionId.charCodeAt(i) + ((h << 5) - h); }
  return Math.abs(h % 100);
}

function getCampaignReachData(regionId: string) {
  const s = seed(regionId);
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map((m, i) => ({
    month: m, reach: Math.round(30 + s * 0.3 + i * 6 + Math.sin(i + s) * 8)
  }));
}

function getVolunteerGrowthData(regionId: string) {
  const s = seed(regionId);
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map((m, i) => ({
    month: m, volunteers: Math.round(1200 + s * 20 + i * 320 + Math.sin(i + s) * 150)
  }));
}

function getDistrictComparisonData(regionId: string) {
  const s = seed(regionId);
  return [
    { name: 'Urban Core', development: 82 + (s % 10), engagement: 78 + (s % 8) },
    { name: 'Suburban Belt', development: 71 + (s % 6), engagement: 65 + (s % 12) },
    { name: 'Industrial Zone', development: 68 + (s % 8), engagement: 72 + (s % 5) },
    { name: 'Rural Periphery', development: 54 + (s % 12), engagement: 48 + (s % 10) },
    { name: 'Peri-Urban', development: 64 + (s % 7), engagement: 60 + (s % 9) },
  ];
}

function getAgeDistributionData(regionId: string) {
  const s = seed(regionId);
  return [
    { age: '18-25', male: 18 + (s % 5), female: 16 + (s % 4) },
    { age: '26-35', male: 22 + (s % 4), female: 20 + (s % 5) },
    { age: '36-45', male: 19 + (s % 3), female: 18 + (s % 4) },
    { age: '46-60', male: 15 + (s % 4), female: 14 + (s % 3) },
    { age: '60+', male: 10 + (s % 3), female: 12 + (s % 3) },
  ];
}

function getGenderSplitData(regionId: string) {
  const s = seed(regionId);
  const m = 48 + (s % 6);
  return [
    { name: 'Male', value: m },
    { name: 'Female', value: 100 - m },
  ];
}

function getEducationData(regionId: string) {
  const s = seed(regionId);
  return [
    { name: 'Graduate+', value: 28 + (s % 8) },
    { name: 'Higher Secondary', value: 24 + (s % 5) },
    { name: 'Secondary', value: 22 + (s % 6) },
    { name: 'Primary', value: 15 + (s % 4) },
    { name: 'Below Primary', value: 11 + (s % 5) },
  ];
}

function getScatterData(regionId: string) {
  const s = seed(regionId);
  return Array.from({ length: 15 }, (_, i) => ({
    development: 40 + (s + i * 7) % 50,
    engagement: 35 + (s + i * 11) % 55,
    name: `Ward ${i + 1}`,
  }));
}

function getRadarData(regionId: string) {
  const s = seed(regionId);
  return [
    { metric: 'Ground Team', value: 70 + (s % 20) },
    { metric: 'Digital', value: 60 + (s % 25) },
    { metric: 'Media', value: 55 + (s % 30) },
    { metric: 'Survey', value: 65 + (s % 20) },
    { metric: 'Messaging', value: 72 + (s % 18) },
    { metric: 'Outreach', value: 68 + (s % 22) },
  ];
}

function getResourceAllocationData(regionId: string) {
  const s = seed(regionId);
  return [
    { name: 'Ground Mobilization', size: 400 + s * 10 },
    { name: 'Digital Media', size: 300 + s * 8 },
    { name: 'Events & Rallies', size: 250 + s * 5 },
    { name: 'Data & Analytics', size: 150 + s * 4 },
    { name: 'Public Relations', size: 100 + s * 3 },
  ];
}

function getUrbanRuralBubbleData(regionId: string) {
  const s = seed(regionId);
  return Array.from({ length: 12 }, (_, i) => ({
    penetration: 30 + (s + i * 5) % 60,
    impact: 40 + (s + i * 9) % 50,
    population: 10000 + (s + i * 13) % 90000,
    type: i % 2 === 0 ? 'Urban' : 'Rural',
    name: `Cluster ${i + 1}`
  }));
}

function getResearchConfidenceData(regionId: string) {
  const s = seed(regionId);
  const confidence = 85 + (s % 10);
  return [
    { name: 'Confidence', value: confidence },
    { name: 'Gap', value: 100 - confidence }
  ];
}

/* ───────────────── Custom Tooltip Removed for Stability ───────────────── */

/* ───────────────── Chart Container ───────────────── */
function ChartCard({ title, insight, children, className = "" }: {
  title: string; insight: string; children: React.ReactNode; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-white rounded-2xl border border-[var(--slate-soft)] shadow-sm overflow-hidden ${className}`}
    >
      <div className="p-6 pb-2">
        <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--navy-premium)] mb-1">{title}</h3>
      </div>
      <div className="px-4 pb-2" style={{ minHeight: 260 }}>
        {children}
      </div>
      <div className="px-6 py-4 border-t border-[var(--slate-soft)] bg-[var(--sky-surface)]/40">
        <p className="text-[11px] font-medium text-[var(--slate-medium)] leading-relaxed">
          <span className="text-[var(--sky-primary)] font-bold">Insight: </span>{insight}
        </p>
      </div>
    </motion.div>
  );
}

/* ───────────────── District Rankings Table ───────────────── */
function DistrictRankingsTable({ regionId }: { regionId: string }) {
  const s = seed(regionId);
  const rows = [
    { rank: 1, district: 'Urban Core', devScore: 88 + (s % 5), sentiment: 'Favorable', readiness: 94, risk: 'Low' },
    { rank: 2, district: 'Suburban Belt', devScore: 76 + (s % 6), sentiment: 'Neutral', readiness: 81, risk: 'Medium' },
    { rank: 3, district: 'Peri-Urban', devScore: 70 + (s % 4), sentiment: 'Favorable', readiness: 77, risk: 'Low' },
    { rank: 4, district: 'Industrial Zone', devScore: 64 + (s % 7), sentiment: 'Mixed', readiness: 68, risk: 'Medium' },
    { rank: 5, district: 'Rural Periphery', devScore: 52 + (s % 8), sentiment: 'Unfavorable', readiness: 54, risk: 'High' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl border border-[var(--slate-soft)] shadow-sm overflow-hidden"
    >
      <div className="p-6 pb-4">
        <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--navy-premium)]">District Performance Rankings</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-t border-b border-[var(--slate-soft)] bg-[var(--sky-surface)]/50">
              <th className="px-6 py-3 text-left text-[10px] uppercase tracking-widest font-bold text-[var(--slate-medium)]">Rank</th>
              <th className="px-6 py-3 text-left text-[10px] uppercase tracking-widest font-bold text-[var(--slate-medium)]">District</th>
              <th className="px-6 py-3 text-left text-[10px] uppercase tracking-widest font-bold text-[var(--slate-medium)]">Dev. Score</th>
              <th className="px-6 py-3 text-left text-[10px] uppercase tracking-widest font-bold text-[var(--slate-medium)]">Sentiment</th>
              <th className="px-6 py-3 text-left text-[10px] uppercase tracking-widest font-bold text-[var(--slate-medium)]">Readiness</th>
              <th className="px-6 py-3 text-left text-[10px] uppercase tracking-widest font-bold text-[var(--slate-medium)]">Risk</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.rank} className="border-b border-[var(--slate-soft)]/50 hover:bg-[var(--sky-surface)]/30 transition-colors">
                <td className="px-6 py-3 font-bold text-[var(--navy-premium)]">{r.rank}</td>
                <td className="px-6 py-3 font-semibold text-[var(--navy-premium)]">{r.district}</td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-[var(--slate-soft)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--sky-primary)] rounded-full" style={{ width: `${r.devScore}%` }} />
                    </div>
                    <span className="text-xs font-bold text-[var(--navy-premium)]">{r.devScore}</span>
                  </div>
                </td>
                <td className="px-6 py-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                    r.sentiment === 'Favorable' ? 'bg-emerald-50 text-emerald-600' :
                    r.sentiment === 'Unfavorable' ? 'bg-red-50 text-red-600' :
                    'bg-amber-50 text-amber-600'
                  }`}>{r.sentiment}</span>
                </td>
                <td className="px-6 py-3 font-bold text-[var(--navy-premium)]">{r.readiness}%</td>
                <td className="px-6 py-3">
                  <span className={`text-xs font-bold ${
                    r.risk === 'Low' ? 'text-emerald-500' :
                    r.risk === 'High' ? 'text-red-500' :
                    'text-amber-500'
                  }`}>{r.risk}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-[var(--slate-soft)] bg-[var(--sky-surface)]/40">
        <p className="text-[11px] font-medium text-[var(--slate-medium)] leading-relaxed">
          <span className="text-[var(--sky-primary)] font-bold">Insight: </span>
          Rural Periphery consistently underperforms — strategic resource reallocation and targeted field visits are urgently recommended to prevent further sentiment erosion.
        </p>
      </div>
    </motion.div>
  );
}

/* ───────────────── MAIN COMPONENT ───────────────── */
export default function StrategicAnalytics() {
  const { selectedRegion, isLoading } = useIntelligence();
  const rid = selectedRegion.id;

  const campaignReach = getCampaignReachData(rid);
  const volunteerGrowth = getVolunteerGrowthData(rid);
  const districtComparison = getDistrictComparisonData(rid);
  const ageDistribution = getAgeDistributionData(rid);
  const genderSplit = getGenderSplitData(rid);
  const educationData = getEducationData(rid);
  const scatterData = getScatterData(rid);
  const radarData = getRadarData(rid);
  const resourceAllocation = getResourceAllocationData(rid);
  const urbanRural = getUrbanRuralBubbleData(rid);
  const researchConfidence = getResearchConfidenceData(rid);

  return (
    <section className={`space-y-6 transition-opacity duration-500 ${isLoading ? 'opacity-40' : 'opacity-100'}`}>
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-sans font-bold text-[var(--navy-premium)]">
          Strategic Analytics
        </h2>
        <span className="text-[10px] uppercase tracking-widest text-[var(--slate-medium)] font-bold">
          Region: {selectedRegion.name}
        </span>
      </div>

      {/* Row 1: Line + Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Campaign Reach Over Time"
          insight="Youth voter participation has increased steadily across urban constituencies, with a notable acceleration after the April policy announcement."
        >
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={campaignReach}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF1" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#5B7083' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#5B7083' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="reach" stroke={SKY} strokeWidth={2.5} dot={{ fill: SKY, r: 3 }} activeDot={{ r: 5, fill: NAVY }} name="Reach %" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Volunteer Growth Trajectory"
          insight="Volunteer mobilization shows a strong upward trend. Recent recruitment drives have contributed to a 12% month-over-month increase in active field operatives."
        >
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={volunteerGrowth}>
              <defs>
                <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={SKY} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={SKY} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF1" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#5B7083' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#5B7083' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="volunteers" stroke={SKY} strokeWidth={2} fillOpacity={1} fill="url(#volGrad)" name="Volunteers" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 2: Clustered Bar + Stacked Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="District Comparison: Development vs Engagement"
          insight="Development indicators show strong correlation with campaign engagement. Industrial Zone outperforms on engagement despite lower development scores."
        >
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={districtComparison} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF1" />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#5B7083' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#5B7083' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="development" fill={SKY} name="Development" radius={[4, 4, 0, 0]} />
              <Bar dataKey="engagement" fill={EMERALD} name="Engagement" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Voter Age Distribution"
          insight="The 26-35 demographic dominates across all regions. First-time voter registration among the 18-25 cohort has increased by 8.4% year-over-year."
        >
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={ageDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF1" />
              <XAxis dataKey="age" tick={{ fontSize: 10, fill: '#5B7083' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#5B7083' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="male" stackId="a" fill={SKY} name="Male" radius={[0, 0, 0, 0]} />
              <Bar dataKey="female" stackId="a" fill={ROSE} name="Female" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 3: Donut + Donut */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard
          title="Gender Split"
          insight="Female voter turnout projections suggest a 3.2% uplift from previous cycles, making women-centric policy messaging a high-impact strategic lever."
        >
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={genderSplit} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value" nameKey="name">
                {genderSplit.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? SKY : ROSE} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Education Levels"
          insight="Graduate and above voters now represent the single largest educated bloc. This segment shows heightened responsiveness to policy-driven communication."
        >
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={educationData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value" nameKey="name">
                {educationData.map((_, i) => (
                  <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 4: Scatter + Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Development vs Engagement (Ward Level)"
          insight="Wards with development scores below 55 show a sharp drop in campaign engagement. Targeted infrastructure messaging could recover 4-6% engagement in these pockets."
        >
          <ResponsiveContainer width="100%" height={240}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF1" />
              <XAxis type="number" dataKey="development" name="Development" tick={{ fontSize: 10, fill: '#5B7083' }} axisLine={false} tickLine={false} label={{ value: 'Development', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#5B7083' }} />
              <YAxis type="number" dataKey="engagement" name="Engagement" tick={{ fontSize: 10, fill: '#5B7083' }} axisLine={false} tickLine={false} label={{ value: 'Engagement', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#5B7083' }} />
              <Tooltip />
              <Scatter data={scatterData} fill={SKY} fillOpacity={0.6} stroke={NAVY} strokeWidth={1} />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Campaign Readiness Radar"
          insight="Digital readiness and messaging score highest. Survey operations and ground team deployment require immediate acceleration to achieve target thresholds."
        >
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData} outerRadius="70%">
              <PolarGrid stroke="#E8ECF1" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: '#5B7083' }} />
              <PolarRadiusAxis tick={{ fontSize: 8, fill: '#5B7083' }} domain={[0, 100]} />
              <Radar dataKey="value" stroke={SKY} fill={SKY} fillOpacity={0.2} strokeWidth={2} name="Readiness" />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 5: Treemap + Bubble Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Resource Allocation (Treemap)"
          insight="Ground Mobilization and Digital Media consume the bulk of the operational budget. Reallocating 5% to Data & Analytics could improve targeting efficiency."
        >
          <ResponsiveContainer width="100%" height={240}>
            <Treemap
              data={resourceAllocation}
              dataKey="size"
              aspectRatio={4 / 3}
              stroke="#fff"
              fill={SKY}
            />
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Urban vs Rural Penetration (Bubble)"
          insight="Rural clusters show lower penetration but high impact potential, whereas urban clusters are highly saturated but yield diminishing returns on new engagement."
        >
          <ResponsiveContainer width="100%" height={240}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF1" />
              <XAxis type="number" dataKey="penetration" name="Penetration" tick={{ fontSize: 10, fill: '#5B7083' }} axisLine={false} tickLine={false} />
              <YAxis type="number" dataKey="impact" name="Impact" tick={{ fontSize: 10, fill: '#5B7083' }} axisLine={false} tickLine={false} />
              <ZAxis type="number" dataKey="population" range={[50, 400]} name="Population Size" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Urban" data={urbanRural.filter(d => d.type === 'Urban')} fill={SKY} fillOpacity={0.6} />
              <Scatter name="Rural" data={urbanRural.filter(d => d.type === 'Rural')} fill={EMERALD} fillOpacity={0.6} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 10 }} />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 6: Gauge (Pie) + District Rankings Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1">
          <ChartCard
            title="Research Confidence Index"
            insight="Our models project a high confidence score for current survey data. Margins of error remain below 3.5% across all sampled constituencies."
            className="h-full"
          >
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={researchConfidence}
                  cx="50%"
                  cy="70%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill={SKY} />
                  <Cell fill="#E8ECF1" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <span className="text-3xl font-bold text-[var(--navy-premium)]">{researchConfidence[0].value}%</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--slate-medium)]">Confidence</span>
            </div>
          </ChartCard>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <DistrictRankingsTable regionId={rid} />
        </div>
      </div>
    </section>
  );
}
