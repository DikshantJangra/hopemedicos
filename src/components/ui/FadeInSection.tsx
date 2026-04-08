'use client';

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInSectionProps {
    children: ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    className?: string;
    duration?: number;
    distance?: number;
    once?: boolean;
}

export default function FadeInSection({
    children,
    delay = 0,
    direction = 'up',
    className = "",
    duration = 0.6,
    distance = 30,
    once = true
}: FadeInSectionProps) {
    const getInitialProps = () => {
        switch (direction) {
            case 'up': return { y: distance, opacity: 0 };
            case 'down': return { y: -distance, opacity: 0 };
            case 'left': return { x: distance, opacity: 0 };
            case 'right': return { x: -distance, opacity: 0 };
            case 'none': return { opacity: 0 };
            default: return { y: distance, opacity: 0 };
        }
    };

    return (
        <motion.div
            initial={getInitialProps()}
            whileInView={{
                y: 0,
                x: 0,
                opacity: 1
            }}
            viewport={{ once: once, margin: "-50px" }}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.22, 1, 0.36, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
