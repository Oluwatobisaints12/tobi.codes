'use client';

import React from 'react';
import { PORTFOLIO_CONTENT } from '@/config/content';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-white/[0.04] bg-[#0F0F0F]/40 backdrop-blur-md flex items-center justify-between px-6 select-none">
      {/* Left: # Logo */}
      <a
        href="#home"
        className="text-[#42A5F5] font-mono font-bold text-lg hover:text-white transition-colors duration-200"
      >
        #
      </a>

      {/* Center: Wordmark */}
      <div className="text-sm font-semibold tracking-wide text-[#F5F5F5] font-sans">
        {PORTFOLIO_CONTENT.titleName.first}{' '}
        <span className="text-[#1E88E5]">{PORTFOLIO_CONTENT.titleName.tag}</span>
      </div>

      {/* Right: Window Controls (Decorative) */}
      <div className="flex items-center gap-3 text-xs font-mono text-[#555] font-semibold">
        <span>—</span>
        <span>▢</span>
        <span className="hover:text-[#42A5F5] cursor-pointer transition-colors duration-200">✕</span>
      </div>
    </header>
  );
}
