'use client';

import React, { useEffect, useState } from 'react';
import { Home, User, Monitor, Sparkles, Mail } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home, href: '#home' },
  { id: 'about', label: 'About', icon: User, href: '#about' },
  { id: 'work', label: 'Work', icon: Monitor, href: '#work' },
  { id: 'experiments', label: 'Experiments', icon: Sparkles, href: '#experiments' },
  { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      let currentSection = 'home';
      
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            currentSection = section.id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check after rendering
    const timer = setTimeout(handleScroll, 150);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Desktop Sidebar - Left Rail */}
      <nav className="hidden md:flex fixed top-0 left-6 bottom-0 w-12 flex-col items-center justify-center gap-6 z-40 select-none">
        <div className="flex flex-col gap-6 w-full items-center">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className="relative group p-2.5 rounded-lg transition-all duration-300"
                aria-label={item.label}
              >
                {/* Accent glow on active */}
                {isActive && (
                  <span className="absolute inset-0 bg-[#42A5F5]/10 rounded-lg border border-[#42A5F5]/20 shadow-[0_0_12px_rgba(66,165,245,0.15)] animate-pulse" />
                )}
                <Icon
                  className={`w-4.5 h-4.5 transition-all duration-300 ${
                    isActive 
                      ? 'text-[#42A5F5] scale-110' 
                      : 'text-[#8A8A8A] group-hover:text-[#F5F5F5] group-hover:scale-105'
                  }`}
                />
                
                {/* Tooltip */}
                <div className="absolute left-14 top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest text-[#F5F5F5] bg-[#141414]/90 backdrop-blur-sm border border-white/10 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap z-50">
                  {item.label}
                </div>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Mobile Floating Bottom Nav Bar */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-full border border-window-border bg-[#0F0F0F]/80 backdrop-blur-lg flex items-center gap-6 z-40 shadow-2xl shadow-black/80 select-none">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              className="relative p-2.5 rounded-full transition-all duration-300"
              aria-label={item.label}
            >
              {isActive && (
                <span className="absolute inset-0 bg-[#42A5F5]/15 rounded-full border border-[#42A5F5]/25" />
              )}
              <Icon
                className={`w-5 h-5 transition-colors duration-300 ${
                  isActive ? 'text-[#42A5F5]' : 'text-[#8A8A8A]'
                }`}
              />
            </a>
          );
        })}
      </nav>
    </>
  );
}
