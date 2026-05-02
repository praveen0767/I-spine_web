"use client";
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
    const mouseY = useSpring(0, { stiffness: 500, damping: 28 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleHover = () => setIsHovered(true);
        const handleUnhover = () => setIsHovered(false);

        window.addEventListener('mousemove', moveMouse);

        const clickable = document.querySelectorAll('button, a, .cursor-pointer');
        clickable.forEach(el => {
            el.addEventListener('mouseenter', handleHover);
            el.addEventListener('mouseleave', handleUnhover);
        });

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            clickable.forEach(el => {
                el.removeEventListener('mouseenter', handleHover);
                el.removeEventListener('mouseleave', handleUnhover);
            });
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-2 h-2 bg-crimson-rich rounded-full pointer-events-none z-[10000] hidden md:block"
            style={{
                x: mouseX,
                y: mouseY,
                translateX: '-50%',
                translateY: '-50%',
                scale: isHovered ? 2.5 : 1,
            }}
            transition={{ type: 'spring', stiffness: 250, damping: 20 }}
        />
    );
}
