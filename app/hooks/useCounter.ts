"use client";
import { useEffect, useState } from "react";

export function useCounter(target: number, index: number) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const duration = 1800; // ms
        const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const value = Math.min(Math.floor((progress / duration) * target), target);
            setCount(value);
            if (progress < duration) {
                requestAnimationFrame(step);
            } else {
                setCount(target);
            }
        };
        const raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [target]);
    return count;
}
