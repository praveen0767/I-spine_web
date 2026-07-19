import "../globals.css";




export const metadata = {
  title: 'Intelligence Terminal - iSpine',
  description: 'Demo intelligence terminal showcasing iSpine capabilities.',
};

export default function IntelligenceLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-[#0A1F44] text-white overflow-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
