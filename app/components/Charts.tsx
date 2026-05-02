"use client";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export function ActionPieChart({ data }: { data: Record<string, number> }) {
  const COLORS: Record<string, string> = {
    'Immediate Visit Required': '#A51C30', // Crimson Rich
    'Focus Campaign Needed': '#0A1F44',    // Navy Premium
    'Monitor Closely': '#D4AF37',          // Gold Refined
    'Maintain Presence': '#2D2D2D',        // Charcoal (Neutral High)
    'Review Data': '#F1F3F5'               // Slate Soft
  };

  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            stroke="#FFFFFF"
            strokeWidth={2}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#0A1F44'} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #F1F3F5', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', color: '#0A1F44' }}
            itemStyle={{ color: '#2D2D2D' }}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px', fontWeight: '500' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LocalitiesBarChart({ data }: { data: any[] }) {
  // Sort by strategy score and take top/bottom
  const chartData = data.slice(0, 15);
  
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F3F5" horizontal={true} vertical={false} />
          <XAxis type="number" domain={[0, 100]} stroke="#2D2D2D" tick={{fill: '#2D2D2D', fontSize: 11}} />
          <YAxis dataKey="locality" type="category" width={120} stroke="#2D2D2D" tick={{fill: '#2D2D2D', fontSize: 11, fontWeight: '500'}} />
          <Tooltip
            contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #F1F3F5', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', color: '#0A1F44' }}
            cursor={{fill: '#F1F3F5', opacity: 0.4}}
          />
          <Bar dataKey="strategic_score" name="Strategic Score" fill="#0A1F44" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
