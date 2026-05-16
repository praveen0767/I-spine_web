import React from 'react';

export default function Loading() {
    return (
        <main className="min-h-screen bg-slate-50">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 h-24" />

            <header className="pt-40 pb-20 px-6 bg-slate-50 relative overflow-hidden">
                <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
                    <div className="h-4 w-32 bg-slate-200 rounded-full animate-pulse mb-6" />
                    <div className="h-16 w-3/4 max-w-2xl bg-slate-200 rounded-2xl animate-pulse mb-6" />
                    <div className="h-6 w-1/2 max-w-lg bg-slate-200 rounded-full animate-pulse" />
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 pb-32 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-[400px] bg-white rounded-3xl p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <div className="h-6 w-24 bg-slate-100 rounded-full animate-pulse" />
                                <div className="h-4 w-20 bg-slate-100 rounded-full animate-pulse" />
                            </div>
                            
                            <div className="h-8 w-full bg-slate-100 rounded-lg animate-pulse mb-3" />
                            <div className="h-8 w-4/5 bg-slate-100 rounded-lg animate-pulse mb-8" />
                            
                            <div className="h-4 w-full bg-slate-100 rounded-full animate-pulse mb-2" />
                            <div className="h-4 w-full bg-slate-100 rounded-full animate-pulse mb-2" />
                            <div className="h-4 w-3/4 bg-slate-100 rounded-full animate-pulse mb-8" />
                            
                            <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                                <div className="h-4 w-24 bg-slate-100 rounded-full animate-pulse" />
                                <div className="w-8 h-8 rounded-full bg-slate-100 animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
