"use client";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-navy-deep flex items-center justify-center text-center px-6">
            <div>
                <h2 className="text-2xl text-white mb-8 uppercase tracking-widest">Protocol Breach (System Error)</h2>
                <p className="text-ivory/60 mb-12 max-w-md mx-auto">
                    An unexpected operational error has occurred. Please attempt to reset the session.
                </p>
                <button
                    onClick={() => reset()}
                    className="bg-gold-primary text-navy-deep px-8 py-3 font-bold uppercase tracking-tighter hover:scale-105 transition-transform"
                >
                    Reset Session
                </button>
            </div>
        </div>
    );
}
