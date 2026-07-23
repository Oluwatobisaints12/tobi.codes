'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  animateHover?: boolean;
  draggable?: boolean;
}

export default function Window({
  title,
  children,
  className = '',
  animateHover = false,
  draggable = true,
}: WindowProps) {
  return (
    <motion.div
      drag={draggable}
      dragMomentum={false}
      dragElastic={0.05}
      whileDrag={{ scale: 1.02, zIndex: 50 }}
      whileHover={animateHover ? { y: -4, scale: 1.005 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`h-full ${draggable ? 'touch-none' : ''}`}
    >
      <div
        className={`rounded-lg border border-window-border bg-[#0F0F0F] overflow-hidden flex flex-col h-full shadow-2xl shadow-black/40 ${className}`}
      >
        {/* Title bar */}
        <div 
          className={`flex items-center justify-between px-4 py-2.5 bg-[#141414] border-b border-window-border select-none ${
            draggable ? 'cursor-grab active:cursor-grabbing' : ''
          }`}
        >
          {/* Muted decorative dots */}
          <div className="flex items-center gap-1.5 w-1/4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80 hover:bg-[#FF5F56] transition-colors" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80 hover:bg-[#FFBD2E] transition-colors" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80 hover:bg-[#27C93F] transition-colors" />
          </div>

          {/* Title */}
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#8A8A8A] text-center flex-grow truncate px-2">
            {title}
          </div>

          {/* Decorative Controls */}
          <div className="flex items-center justify-end gap-2.5 w-1/4 text-[10px] font-mono text-[#555] font-semibold">
            <span className="hover:text-white transition-colors cursor-pointer">—</span>
            <span className="hover:text-white transition-colors cursor-pointer">▢</span>
            <span className="hover:text-[#FF5F56] transition-colors cursor-pointer">✕</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 md:p-6 text-sm text-[#A0A0A0] leading-relaxed">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
