import "../globals.css";

export const metadata = {
  title: 'IntelligenceOS™ — iSpine Political Decision Intelligence Platform',
  description: 'AI-Native Political Decision Intelligence Platform. Geospatial Intelligence, Predictive Analytics, Campaign Intelligence, and Executive Decision Systems.',
};

import BootSequence from './components/BootSequence';

export default function IntelligenceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="intelligence-os">
      {/* <BootSequence /> */}
      {children}
    </div>
  );
}