"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or wait for window.onload
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#0A1F44] flex items-center justify-center"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 1.5, 
                ease: "easeOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="relative z-10"
            >
              <img 
                src="/images/logo.png" 
                alt="I-SPINE PVT LTD Logo" 
                className="w-56 h-56 md:w-80 md:h-80 rounded-full object-cover shadow-[0_0_50px_rgba(255,255,255,0.1)] bg-gradient-to-b from-[#1A365D] to-[#0B1F3A] border border-white/10" 
              />
            </motion.div>
            
            {/* Pulsing ring */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ 
                duration: 2, 
                ease: "easeOut",
                repeat: Infinity
              }}
              className="absolute inset-0 border-2 border-crimson-rich rounded-full"
            />
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-12"
          >
            <p className="text-white/40 text-[10px] uppercase tracking-[0.5em] font-bold">Strategic Intelligence</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
