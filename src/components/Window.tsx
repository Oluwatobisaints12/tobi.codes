'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  animateHover?: boolean;
}

export default function Window({
  title,
  children,
  className = '',
  animateHover = false,
}: WindowProps) {
  const windowContent = (
    <div
      className={`rounded-lg border border-window-border bg-[#0F0F0F] overflow-hidden flex flex-col h-full shadow-2xl shadow-black/40 ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#141414] border-b border-window-border select-none">
        {/* Muted decorative dots */}
        <div className="flex items-center gap-1.5 w-1/4">
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>

        {/* Title */}
        <div className="text-[10px] font-mono uppercase tracking-widest text-[#8A8A8A] text-center flex-grow truncate px-2">
          {title}
        </div>

        {/* Decorative Controls */}
        <div className="flex items-center justify-end gap-2.5 w-1/4 text-[10px] font-mono text-[#555] font-semibold">
          <span>—</span>
          <span>▢</span>
          <span>✕</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 md:p-6 text-sm text-[#A0A0A0] leading-relaxed">
        {children}
      </div>
    </div>
  );

  if (animateHover) {
    return (
      <motion.div
        whileHover={{ y: -4, scale: 1.005 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="h-full"
      >
        {windowContent}
      </motion.div>
    );
  }

  return windowContent;
}
