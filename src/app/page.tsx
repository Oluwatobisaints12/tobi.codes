'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '@/config/content';
import Window from '@/components/Window';
import LocalTime from '@/components/LocalTime';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import portraitImg from '@/app/assets/images/portrait.jpg';
import tagBrace from '@/app/assets/images/3d-tags/dev.svg';
import tagHash from '@/app/assets/images/3d-tags/hashtag.svg';
import tagGt from '@/app/assets/images/3d-tags/element.svg';
import tagSlash from '@/app/assets/images/3d-tags/tag.svg';

// Framer motion variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Fallback/Placeholder helper for project images
const ProjectImage = ({ src, alt, title }: { src: string; alt: string; title: string }) => {
  const [error, setError] = useState(false);
  
  if (error || !src) {
    return (
      <div className="w-full h-full bg-[#141414] border border-window-border rounded-md flex flex-col items-center justify-center p-4 text-center select-none relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#42A5F5]/5 to-transparent pointer-events-none" />
        <span className="font-mono text-[9px] text-[#555] uppercase tracking-widest mb-1.5">PREVIEW</span>
        <span className="font-sans font-bold text-white text-lg group-hover:text-[#42A5F5] transition-colors">{title}</span>
        <span className="font-mono text-[9px] text-[#8A8A8A] mt-2 border border-window-border px-2 py-0.5 rounded-full bg-black/30">MOCKUP</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img 
      src={src} 
      alt={alt} 
      onError={() => setError(true)} 
      className="w-full h-full object-cover rounded-md border border-window-border/50" 
    />
  );
};

// Fallback/Placeholder helper for portraits
const PortraitImage = () => {
  const [error, setError] = useState(false);
  const src = portraitImg.src;

  if (error) {
    return (
      <div className="w-full h-full bg-[#42A5F5] flex flex-col items-center justify-center text-center p-4 select-none relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_60%)]" />
        <span className="font-mono text-[10px] text-white/70 uppercase tracking-widest font-bold">ONIFADE</span>
        <span className="font-script text-white text-5xl mt-1 select-none">Tobi</span>
        <span className="font-mono text-[9px] text-white/80 border border-white/20 px-2 py-0.5 rounded-full bg-white/10 mt-3">PORTRAIT</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#42A5F5] overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={src} 
        alt="Tobi Portrait" 
        onError={() => setError(true)} 
        className="w-full h-full object-cover" 
      />
    </div>
  );
};

// Interactive Terminal Experiment Component
const TerminalWidget = () => {
  const [history, setHistory] = useState<string[]>([
    'Tobi OS [Version 1.0.0]',
    'Type "help" for a list of available commands.',
    ''
  ]);
  const [input, setInput] = useState('');
  
  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;
    
    let response: string[] = [];
    switch (cmd) {
      case 'help':
        response = [
          `> ${input}`,
          'Available commands:',
          '  help      - Show this help message',
          '  about     - Brief bio information',
          '  skills    - Core developer stack',
          '  socials   - Social profile handles',
          '  clear     - Clear terminal'
        ];
        break;
      case 'about':
        response = [
          `> ${input}`,
          'T.Code is a full-stack & mobile developer based in Lagos, Nigeria.',
          'Focuses on interactive designs, clean interfaces, and React/Next.js & React Native stack.'
        ];
        break;
      case 'skills':
        response = [
          `> ${input}`,
          'Stack: Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Node.js'
        ];
        break;
      case 'socials':
        response = [
          `> ${input}`,
          'GitHub:    github.com/tobi-onifade',
          'LinkedIn:  linkedin.com/in/oluwatobi-onifade',
          'X/Twitter: x.com/tobi_onifade'
        ];
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        response = [
          `> ${input}`,
          `Command not found: "${cmd}". Type "help" for a list of commands.`
        ];
    }
    
    setHistory(prev => [...prev, ...response, '']);
    setInput('');
  };
  
  return (
    <div className="font-mono text-xs text-[#42A5F5] bg-black/40 p-4 rounded border border-window-border h-[220px] flex flex-col justify-between">
      <div className="overflow-y-auto flex-1 mb-2 pr-1 custom-scrollbar text-[11px] leading-relaxed">
        {history.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap">{line}</div>
        ))}
      </div>
      <form onSubmit={handleCommand} className="flex items-center border-t border-window-border/30 pt-2 shrink-0">
        <span className="text-[#8A8A8A] mr-2">tobi-os:~$</span>
        <input 
          type="text" 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          className="flex-1 bg-transparent border-none outline-none text-[#F5F5F5] font-mono text-[11px] focus:ring-0 p-0"
          placeholder="type help..."
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
};

// Canvas Grid Glow Experiment Component
const GlowCanvasWidget = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full h-[220px] bg-black/30 border border-window-border rounded overflow-hidden flex flex-col justify-between p-4 cursor-crosshair group select-none"
    >
      {hovered && (
        <div 
          className="absolute pointer-events-none rounded-full w-40 h-40 bg-[#42A5F5]/10 blur-2xl transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
          style={{ left: coords.x, top: coords.y }}
        />
      )}
      
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none" />
      
      <div className="z-10 font-mono text-[9px] text-[#555] uppercase tracking-widest">02 // INTERACTIVE_GRID</div>
      
      <div className="z-10 text-center py-6">
        <span className="font-mono text-xs text-[#8A8A8A]">Move cursor over grid</span>
        <div className="font-mono text-[10px] text-[#42A5F5] mt-1.5 font-semibold">X: {coords.x}px | Y: {coords.y}px</div>
      </div>
      
      <div className="z-10 font-mono text-[9px] text-[#8A8A8A] text-right">GRID_GLOW.EXE</div>
    </div>
  );
};

// System Monitor Experiment Component
const SystemMonitorWidget = () => {
  const [cpu, setCpu] = useState(28);
  const [ram, setRam] = useState(54);
  const [history, setHistory] = useState<number[]>(Array(16).fill(25));

  useEffect(() => {
    const interval = setInterval(() => {
      const nextCpu = Math.floor(Math.random() * 45) + 15;
      setCpu(nextCpu);
      setRam(prev => {
        const diff = Math.random() > 0.5 ? 1 : -1;
        const val = prev + diff;
        return val > 70 ? 70 : val < 40 ? 40 : val;
      });
      setHistory(prev => [...prev.slice(1), nextCpu]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[220px] bg-black/30 border border-window-border rounded p-4 flex flex-col justify-between font-mono text-xs select-none">
      <div className="flex justify-between items-center text-[9px] text-[#555] uppercase tracking-widest mb-1.5">
        <span>03 // SYSTEM_MONITOR</span>
        <span className="text-[#42A5F5] animate-pulse font-semibold">● LIVE</span>
      </div>
      
      {/* Mini graph */}
      <div className="flex-1 flex items-end gap-1 bg-black/20 rounded border border-window-border/30 p-2 mb-3 h-20">
        {history.map((val, idx) => (
          <div 
            key={idx} 
            className="flex-1 bg-[#42A5F5]/40 hover:bg-[#42A5F5] transition-all rounded-t"
            style={{ height: `${val}%` }}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-[10px]">
        <div className="border border-window-border/30 rounded p-1.5 bg-black/20 text-center">
          <div className="text-[#8A8A8A] text-[8px] uppercase tracking-wider">CPU</div>
          <div className="text-[#42A5F5] font-bold text-xs mt-0.5">{cpu}%</div>
        </div>
        <div className="border border-window-border/30 rounded p-1.5 bg-black/20 text-center">
          <div className="text-[#8A8A8A] text-[8px] uppercase tracking-wider">RAM</div>
          <div className="text-[#42A5F5] font-bold text-xs mt-0.5">{ram}%</div>
        </div>
      </div>
    </div>
  );
};

// Reusable Figma Ambient Blue Glow Spot (#1F8BDA, sharp vibrant ambient glow)
const BlueGlowSpot = ({ position }: { position: string }) => (
  <div 
    className={`w-[480px] h-[480px] min-w-[432px] min-h-[450px] rounded-full bg-[#1F8BDA] opacity-75 blur-[100px] sm:blur-[120px] pointer-events-none -z-10 absolute ${position}`} 
  />
);

export default function Page() {
  return (
    <>
      <Navbar />
      <Sidebar />

      {/* Main Layout Content Area */}
      <main className="flex-1 pt-14 md:pl-20 pb-20 md:pb-0 select-none relative overflow-x-hidden">
        
        {/* HERO SECTION */}
        <section 
          id="home" 
          className="relative min-h-[calc(100vh-3.5rem)] flex flex-col justify-between scroll-mt-14 overflow-visible"
        >
          {/* Pair of Left and Right Blur Glows for Home */}
          <BlueGlowSpot position="top-[5%] left-[-220px] lg:left-[-150px]" />
          <BlueGlowSpot position="top-[10%] right-[-220px] lg:right-[-150px]" />

          {/* 3D Code Tag Floating Assets from Figma Design */}
          <motion.img
            src={tagBrace.src}
            alt="3D Curly Brace"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute left-[8%] sm:left-[14%] top-[14%] sm:top-[18%] w-16 sm:w-24 md:w-32 opacity-90 select-none pointer-events-none z-0"
          />
          <motion.img
            src={tagHash.src}
            alt="3D Hash Tag"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute right-[8%] sm:right-[16%] top-[10%] sm:top-[14%] w-16 sm:w-24 md:w-32 opacity-90 select-none pointer-events-none z-0"
          />
          <motion.img
            src={tagGt.src}
            alt="3D Greater Than"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            className="absolute right-[12%] sm:right-[18%] bottom-[20%] sm:bottom-[24%] w-14 sm:w-20 md:w-28 opacity-90 select-none pointer-events-none z-0"
          />
          <motion.img
            src={tagSlash.src}
            alt="3D Slash Tag"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
            className="absolute left-[12%] sm:left-[18%] bottom-[22%] sm:bottom-[26%] w-12 sm:w-16 md:w-24 opacity-90 select-none pointer-events-none z-0"
          />

          {/* Centered Hero Heading Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center z-10 max-w-4xl mx-auto">
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 mb-6 border border-white/10 px-3 py-1 rounded-full bg-white/[0.02]">
              HOME
            </span>
            
            <h1 className="leading-tight select-none">
              <span className="font-object-sans font-normal text-[47.44px] md:text-[58px] lg:text-[68px] xl:text-[76px] text-white">
                Hi, I&apos;m T.Code, a{' '}
              </span>
              <span className="font-ampher font-normal text-[47.44px] md:text-[58px] lg:text-[68px] xl:text-[76px] text-[#2196F3] inline-block px-1">
                creative
              </span>{' '}
              <span className="font-object-sans font-normal text-[47.44px] md:text-[58px] lg:text-[68px] xl:text-[76px] text-white">
                developer
              </span>
            </h1>

            <p className="max-w-xl font-neue-machina font-normal text-[16px] md:text-[18px] lg:text-[20px] text-[#9D9D9D] leading-relaxed mt-6 md:mt-8 select-text">
              {PORTFOLIO_CONTENT.subtext}
            </p>
          </div>

          {/* Hero bottom status bar */}
          <div className="w-full border-t border-white/[0.06] bg-[#0F0F0F]/20 backdrop-blur-sm z-10">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center px-6 py-4 font-neue-machina text-[12px] text-white/40 gap-4">
              <div className="flex items-center gap-2">
                <span>Based in {PORTFOLIO_CONTENT.location}</span>
                <span className="text-white/10">•</span>
                <span className="flex items-center gap-1.5">
                  Local time <LocalTime />
                </span>
              </div>
              <a 
                href="#contact" 
                className="px-4 py-1.5 rounded-full border border-white/10 hover:border-[#2196F3] hover:text-white transition-all duration-300 flex items-center gap-1.5 hover:bg-[#2196F3]/5"
              >
                let&apos;s-get-in-touch <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section 
          id="about" 
          className="py-28 px-6 max-w-5xl mx-auto scroll-mt-14 relative overflow-visible"
        >
          {/* Pair of Left and Right Blur Glows for About Me */}
          <BlueGlowSpot position="top-[10%] left-[-240px] lg:left-[-180px]" />
          <BlueGlowSpot position="top-[40%] right-[-240px] lg:right-[-180px]" />

          {/* Heading */}
          <div className="mb-14 text-center md:text-left">
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 block mb-2">
              ABOUT ME
            </span>
            <h2 className="font-object-sans font-normal text-[44px] md:text-[54px] lg:text-[62px] text-white leading-tight">
              Your <span className="font-ampher text-[#2196F3]">creative</span> web developer
            </h2>
          </div>

          {/* 1. Desktop Layout (OS windows cluster) */}
          <div className="hidden lg:block relative w-full h-[600px] mb-12">
            
            {/* About-Me bio card */}
            <div className="absolute top-0 left-0 w-[68%] z-10 hover:z-30 transition-transform duration-300">
              <Window title="About-Me">
                <div className="space-y-4 font-neue-machina font-normal text-[15px] text-[#A0A0A0] leading-relaxed select-text">
                  {PORTFOLIO_CONTENT.bioParagraphs.map((para, i) => (
                    <p key={i}>
                      {para.map((seg, idx) => {
                        let colorClass = 'text-[#A0A0A0]';
                        if (seg.type === 'blue') colorClass = 'text-[#2196F3] font-semibold hover:underline cursor-pointer';
                        else if (seg.type === 'orange') colorClass = 'text-[#FF8A65] font-semibold';
                        else if (seg.type === 'purple') colorClass = 'text-[#B388FF] font-semibold';
                        else if (seg.type === 'green') colorClass = 'text-[#81C784] font-semibold';
                        else if (seg.type === 'pink') colorClass = 'text-[#F06292] font-semibold';
                        
                        if (seg.href) {
                          return (
                            <a key={idx} href={seg.href} className={colorClass}>
                              {seg.text}
                            </a>
                          );
                        }
                        return (
                          <span key={idx} className={colorClass}>
                            {seg.text}
                          </span>
                        );
                      })}
                    </p>
                  ))}
                </div>
              </Window>
            </div>

            {/* Portrait Card (Top right, constrained height) */}
            <div className="absolute top-0 right-0 w-[29%] z-20 hover:z-30 transition-transform duration-300">
              <Window title="Portrait" className="!p-0 overflow-hidden">
                <div className="w-full h-[250px] relative">
                  <PortraitImage />
                </div>
              </Window>
            </div>

            {/* Where-I-Work Card */}
            <div className="absolute top-[310px] left-0 w-[33%] z-20 hover:z-30 transition-transform duration-300">
              <Window title="Where-I-Work" className="h-full">
                <ul className="space-y-3 font-neue-machina font-normal text-[14px] text-white leading-normal">
                  <li className="flex items-start gap-2">
                    <span className="text-[#2196F3] font-bold select-none">›</span>
                    <span>Currently based in Lagos, Nigeria</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2196F3] font-bold select-none">›</span>
                    <span>Available for remote collaborations across African and worldwide 🌍</span>
                  </li>
                </ul>
              </Window>
            </div>

            {/* Hobbies Card */}
            <div className="absolute top-[310px] left-[35%] w-[32%] z-20 hover:z-30 transition-transform duration-300">
              <Window title="Hobbies" className="h-full">
                <ol className="space-y-2.5 font-neue-machina font-normal text-[14px] text-white leading-normal">
                  {PORTFOLIO_CONTENT.hobbies.map((hobby, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-white/20 select-none">0{i+1}.</span>
                      <span className="flex-1">{hobby.name}</span>
                      <span className="text-base select-none">{hobby.emoji}</span>
                    </li>
                  ))}
                </ol>
              </Window>
            </div>

            {/* Me-Online Card */}
            <div className="absolute top-[310px] right-0 w-[31%] z-20 hover:z-30 transition-transform duration-300">
              <Window title="Me-Online" className="h-full">
                <ul className="space-y-3 font-neue-machina font-normal text-[14px] text-white">
                  {PORTFOLIO_CONTENT.socials.map((link, i) => (
                    <li key={i}>
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between group/link text-white hover:text-[#2196F3] transition-colors py-0.5"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-[#2196F3] select-none">#</span>
                          {link.name}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-white/50 group-hover/link:text-[#2196F3] transition-colors" />
                      </a>
                    </li>
                  ))}
                </ul>
              </Window>
            </div>

          </div>

          {/* 2. Mobile/Tablet Layout (Simple vertical stack) */}
          <div className="flex flex-col gap-6 lg:hidden">
            <Window title="About-Me">
              <div className="space-y-4 font-neue-machina font-normal text-[16px] text-[#A0A0A0] leading-relaxed select-text">
                {PORTFOLIO_CONTENT.bioParagraphs.map((para, i) => (
                  <p key={i}>
                    {para.map((seg, idx) => {
                      let colorClass = 'text-[#A0A0A0]';
                      if (seg.type === 'blue') colorClass = 'text-[#2196F3] font-semibold hover:underline cursor-pointer';
                      else if (seg.type === 'orange') colorClass = 'text-[#FF8A65] font-semibold';
                      else if (seg.type === 'purple') colorClass = 'text-[#B388FF] font-semibold';
                      else if (seg.type === 'green') colorClass = 'text-[#81C784] font-semibold';
                      else if (seg.type === 'pink') colorClass = 'text-[#F06292] font-semibold';
                      
                      if (seg.href) {
                        return (
                          <a key={idx} href={seg.href} className={colorClass}>
                            {seg.text}
                          </a>
                        );
                      }
                      return (
                        <span key={idx} className={colorClass}>
                          {seg.text}
                        </span>
                      );
                    })}
                  </p>
                ))}
              </div>
            </Window>

            <Window title="Portrait" className="!p-0">
              <div className="w-full relative max-w-sm mx-auto">
                <PortraitImage />
              </div>
            </Window>

            <Window title="Where-I-Work">
              <ul className="space-y-3 font-neue-machina font-normal text-[14px] text-white">
                <li className="flex items-start gap-2">
                  <span className="text-[#2196F3] font-bold select-none">›</span>
                  <span>Currently based in Lagos, Nigeria</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2196F3] font-bold select-none">›</span>
                  <span>Available for remote collaborations across African and worldwide 🌍</span>
                </li>
              </ul>
            </Window>

            <Window title="Hobbies">
              <ol className="space-y-2.5 font-neue-machina font-normal text-[14px] text-white">
                {PORTFOLIO_CONTENT.hobbies.map((hobby, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-white/20 select-none">0{i+1}.</span>
                    <span className="flex-1">{hobby.name}</span>
                    <span className="text-base select-none">{hobby.emoji}</span>
                  </li>
                ))}
              </ol>
            </Window>

            <Window title="Me-Online">
              <ul className="space-y-3 font-neue-machina font-normal text-[14px] text-white">
                {PORTFOLIO_CONTENT.socials.map((link, i) => (
                  <li key={i}>
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between group/link text-white hover:text-[#2196F3] transition-colors py-0.5"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-[#2196F3] select-none">#</span>
                        {link.name}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-white/50 group-hover/link:text-[#2196F3] transition-colors" />
                    </a>
                  </li>
                ))}
              </ul>
            </Window>
          </div>

        </section>

        {/* WORK SECTION */}
        <section 
          id="work" 
          className="py-28 px-6 max-w-5xl mx-auto scroll-mt-14 relative overflow-visible"
        >
          {/* Pair of Left and Right Blur Glows for Work */}
          <BlueGlowSpot position="top-[15%] left-[-240px] lg:left-[-180px]" />
          <BlueGlowSpot position="top-[60%] right-[-240px] lg:right-[-180px]" />

          {/* Heading */}
          <div className="mb-14 text-center md:text-left">
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 block mb-2">
              WORK
            </span>
            <h2 className="font-object-sans font-normal text-[44px] md:text-[54px] lg:text-[62px] text-white">
              Projects{' '}
              <span className="font-ampher text-[#2196F3] font-normal lowercase inline-block px-1 select-none">
                highlight
              </span>
            </h2>
          </div>

          {/* Stack of Project Cards (Draggable) */}
          <div className="flex flex-col gap-6">
            {PORTFOLIO_CONTENT.projects.map((project, index) => (
              <motion.div
                key={index}
                drag
                dragMomentum={false}
                dragElastic={0.05}
                whileDrag={{ scale: 1.02, zIndex: 50 }}
                whileHover={{ y: -4, scale: 1.005 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="touch-none cursor-grab active:cursor-grabbing"
              >
                <a 
                  href={project.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="relative rounded-lg border border-white/[0.08] bg-[#0F0F0F]/60 backdrop-blur-sm p-6 hover:border-[#2196F3]/30 hover:shadow-2xl hover:shadow-black/60 transition-all duration-300 select-none">
                    <div className="flex flex-col md:flex-row gap-6 items-stretch justify-between">
                      
                      {/* Left: Text detail */}
                      <div className="flex-1 flex flex-col justify-between py-1 select-text">
                        <div>
                          {/* Number Indicator with quotes */}
                          <div className="font-mono text-xs text-white/30 mb-2 select-none">
                            &ldquo;{project.number}&rdquo;
                          </div>
                          {/* Project Title */}
                          <h3 className="font-object-sans font-normal text-[32px] md:text-[38px] lg:text-[44px] text-white group-hover:text-[#2196F3] transition-colors duration-300 mb-4">
                            {project.title}
                          </h3>
                        </div>
                        
                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.tags.map((tag, tIdx) => (
                            <span 
                              key={tIdx} 
                              className="font-neue-machina text-[9px] uppercase tracking-wider px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.01] text-white/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right: Image Preview */}
                      <div className="w-full md:w-[320px] aspect-video md:aspect-[4/3] shrink-0 relative overflow-hidden rounded-md border border-white/[0.08] bg-black/40">
                        <ProjectImage src={project.image} alt={project.title} title={project.title} />
                        {/* Year label bottom right */}
                        <div className="absolute bottom-2.5 right-2.5 font-neue-machina text-[9px] bg-[#0F0F0F]/80 backdrop-blur-md px-2.5 py-1 rounded border border-white/[0.08] text-white select-none font-medium">
                          {project.year}
                        </div>
                      </div>

                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* EXPERIMENTS / SANDBOX SECTION */}
        <section 
          id="experiments" 
          className="py-28 px-6 max-w-5xl mx-auto scroll-mt-14 relative overflow-visible"
        >
          {/* Pair of Left and Right Blur Glows for Experiments */}
          <BlueGlowSpot position="top-[10%] left-[-240px] lg:left-[-180px]" />
          <BlueGlowSpot position="top-[35%] right-[-240px] lg:right-[-180px]" />

          {/* Heading */}
          <div className="mb-14 text-center md:text-left">
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 block mb-2">
              EXPERIMENTS
            </span>
            <h2 className="font-object-sans font-normal text-[32px] md:text-[44px] text-white">
              Code{' '}
              <span className="font-ampher text-[#2196F3] font-normal lowercase inline-block px-1 select-none">
                sandbox
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Window title="exp-terminal">
              <TerminalWidget />
            </Window>
            
            <Window title="exp-glow-grid">
              <GlowCanvasWidget />
            </Window>

            <Window title="exp-performance">
              <SystemMonitorWidget />
            </Window>
          </div>
        </section>

        {/* COLLABORATION / CTA SECTION */}
        <section 
          id="contact" 
          className="py-28 px-6 max-w-[850px] mx-auto scroll-mt-14 relative overflow-visible"
        >
          {/* Pair of Left and Right Blur Glows for Collaboration & Footer */}
          <BlueGlowSpot position="top-[10%] left-[-240px] lg:left-[-180px]" />
          <BlueGlowSpot position="bottom-[-100px] right-[-240px] lg:right-[-180px]" />

          <Window title="collaboration">
            <div className="flex flex-col md:flex-row items-center gap-8 py-4">
              
              {/* Profile Portrait Circle */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-white/[0.08] shrink-0 bg-[#2196F3] relative shadow-lg shadow-black/30">
                <PortraitImage />
              </div>

              {/* Text & Button */}
              <div className="flex-1 text-center md:text-left select-text">
                <h3 className="font-object-sans font-normal text-[44px] sm:text-[52px] md:text-[60px] text-white leading-tight mb-5">
                  Let&apos;s work together on your next project
                </h3>
                <a 
                  href={`mailto:${PORTFOLIO_CONTENT.email}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:border-[#2196F3] hover:text-white text-[10px] font-neue-machina uppercase tracking-widest text-white/50 transition-all duration-300 hover:bg-[#2196F3]/5 select-none"
                >
                  let&apos;s-get-in-touch <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </Window>
        </section>

        {/* FOOTER SECTION */}
        <footer className="border-t border-white/[0.06] bg-[#0F0F0F]/50 pt-16 pb-12 px-6 font-neue-machina text-[16px] text-[#9D9D9D]">
          <div className="max-w-5xl mx-auto">
            {/* Top row */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
              <a href="#home" className="font-neue-machina font-normal text-[16px] text-[#9D9D9D] hover:text-white transition-colors">
                {PORTFOLIO_CONTENT.titleName.first}{' '}
                <span className="text-[#1E88E5]">{PORTFOLIO_CONTENT.titleName.tag}</span>
              </a>
              
              <nav className="flex items-center gap-6 font-neue-machina font-normal text-[16px] text-[#9D9D9D]">
                <a href="#about" className="hover:text-white transition-colors duration-200">about</a>
                <a href="#work" className="hover:text-white transition-colors duration-200">work</a>
                <a href="#experiments" className="hover:text-white transition-colors duration-200">experiments</a>
                <a href="#contact" className="hover:text-white transition-colors duration-200">contact</a>
              </nav>
            </div>

            {/* Bottom row */}
            <div className="flex flex-col md:flex-row justify-between items-center font-neue-machina font-normal text-[16px] text-[#9D9D9D] gap-4 border-t border-white/[0.04] pt-6 select-text">
              <div>
                &copy; 2024&ndash;2025 T.Code | Freelance Web Developer
              </div>
              <a href="#" className="hover:text-[#2196F3] transition-colors">
                privacy policy
              </a>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}
