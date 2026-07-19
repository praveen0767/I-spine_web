"use client";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-navy-deep flex items-center justify-center text-center px-6">
            <div>
                <h1 className="text-6xl font-bold text-gold-primary mb-4">404</h1>
                <h2 className="text-2xl text-white mb-8 uppercase tracking-widest">Mandate Not Found</h2>
                <p className="text-ivory/60 mb-12 max-w-md mx-auto">
                    The tactical asset you are looking for does not exist or has been moved to a secured location.
                </p>
                <Link href="/" className="bg-gold-primary text-navy-deep px-8 py-3 font-bold uppercase tracking-tighter hover:scale-105 transition-transform inline-block">
                    Return to HQ
                </Link>
            </div>
        </div>
    );
}
