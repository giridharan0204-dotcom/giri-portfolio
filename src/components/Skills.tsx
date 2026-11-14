import React, { useState, useEffect, useRef } from 'react';
import {
  Cpu,
  Binary,
  Coffee,
  Code2,
  Palette,
  Flame,
  Database,
  Shield,
  GitBranch,
  Github,
  RotateCw,
  Play,
  Pause,
  Sparkles,
} from 'lucide-react';
import { SKILLS_IMAGE } from '../utils/portfolioData';

interface TechOrbiter {
  id: string;
  name: string;
  category: 'Programming' | 'Web Development' | 'Database' | 'Tools';
  icon: React.ElementType;
  color: string;
  desc: string;
}

const TECH_ORBITERS: TechOrbiter[] = [
  { id: 'Java', name: 'Java', category: 'Programming', icon: Coffee, color: '#A855F7', desc: 'OOP, DSA & Systems' },
  { id: 'C', name: 'C', category: 'Programming', icon: Cpu, color: '#C084FC', desc: 'Memory & Procedural' },
  { id: 'C++', name: 'C++', category: 'Programming', icon: Binary, color: '#9333EA', desc: 'Algorithms & STL' },
  { id: 'HTML', name: 'HTML', category: 'Web Development', icon: Code2, color: '#A855F7', desc: 'Semantic Structure' },
  { id: 'CSS', name: 'CSS', category: 'Web Development', icon: Palette, color: '#C084FC', desc: 'Responsive Systems' },
  { id: 'JavaScript', name: 'JavaScript', category: 'Web Development', icon: Flame, color: '#7025B8', desc: 'Dynamic Async Engine' },
  { id: 'SQL', name: 'SQL', category: 'Database', icon: Database, color: '#A855F7', desc: 'Relational Schemas' },
  { id: 'Firebase', name: 'Firebase', category: 'Database', icon: Shield, color: '#C084FC', desc: 'Cloud & Auth Backend' },
  { id: 'Git', name: 'Git', category: 'Tools', icon: GitBranch, color: '#A855F7', desc: 'Version Control' },
  { id: 'GitHub', name: 'GitHub', category: 'Tools', icon: Github, color: '#C084FC', desc: 'Collaborative Delivery' },
];

interface SkillsProps {
  isActive?: boolean;
}

export const Skills: React.FC<SkillsProps> = ({ isActive = true }) => {
  const [selectedSkill, setSelectedSkill] = useState<TechOrbiter>(TECH_ORBITERS[0]);
  const [orbitProgress, setOrbitProgress] = useState<number>(0);
  const [isOrbiting, setIsOrbiting] = useState<boolean>(true);
  const [orbitDirection, setOrbitDirection] = useState<number>(1);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const isOrbitingRef = useRef<boolean>(true);
  const hoveredTechRef = useRef<string | null>(null);
  const dirRef = useRef<number>(1);

  useEffect(() => {
    isOrbitingRef.current = isOrbiting;
  }, [isOrbiting]);

  useEffect(() => {
    hoveredTechRef.current = hoveredTech;
  }, [hoveredTech]);

  useEffect(() => {
    dirRef.current = orbitDirection;
  }, [orbitDirection]);

  // Continuous 3D round orbital revolution (sweeps from hand to hand, loops behind head, re-emerges)
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (isOrbitingRef.current && !hoveredTechRef.current) {
        // Complete 360 degree orbit in 14 seconds
        const step = (delta / 14) * dirRef.current;
        setOrbitProgress((prev) => {
          let next = prev + step;
          if (next >= 1) next -= 1;
          if (next < 0) next += 1;
          return next;
        });
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const triggerReset = () => {
    setOrbitProgress(0);
    setIsOrbiting(true);
  };

  return (
    <section
      id="skills"
      className="presentation-slide bg-[#050505] select-none"
    >
      {/* Background purple ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#7025B8]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-between py-1.5 sm:py-3 relative z-10 min-h-0">
        
        {/* Section Heading & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-2 mb-1 sm:mb-2 shrink-0">
          <div
            className={`transition-all duration-700 ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 rounded-full bg-[#100B15] border border-white/10 text-[9px] sm:text-xs font-space tracking-widest text-[#C084FC] uppercase mb-0.5 sm:mb-1">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#A855F7]" />
              <span>SCREEN 03 // 3D ORBITAL MATRIX</span>
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-space font-extrabold text-white tracking-tight leading-none">
              MY CREATIVE <span className="text-[#A855F7]">TOOLKIT</span>
            </h2>
          </div>

          {/* Interactive Orbit Controls Bar */}
          <div
            className={`flex items-center gap-1.5 sm:gap-2 transition-all duration-700 ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            <button
              type="button"
              onClick={() => setIsOrbiting(!isOrbiting)}
              className={`px-2.5 py-1 rounded-lg border text-[10px] font-space flex items-center gap-1.5 cursor-pointer transition-colors ${
                isOrbiting
                  ? 'bg-[#A855F7]/15 border-[#A855F7]/40 text-[#C084FC]'
                  : 'bg-amber-500/20 border-amber-500/40 text-amber-300'
              }`}
              title={isOrbiting ? 'Pause 3D Orbit' : 'Resume 3D Orbit'}
            >
              {isOrbiting ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isOrbiting ? 'ORBITING' : 'PAUSED'}</span>
            </button>

            <button
              type="button"
              onClick={() => setOrbitDirection((d) => d * -1)}
              className="px-2.5 py-1 rounded-lg bg-[#100B15] hover:bg-white/5 border border-white/15 text-[#C084FC] text-[10px] font-space flex items-center gap-1 cursor-pointer transition-colors"
              title="Reverse Orbit Direction"
            >
              <RotateCw className={`w-3 h-3 transition-transform ${orbitDirection < 0 ? '-scale-x-100' : ''}`} />
              <span className="hidden sm:inline">REVERSE</span>
            </button>

            <button
              type="button"
              onClick={triggerReset}
              className="px-2.5 py-1 rounded-lg bg-[#100B15] hover:bg-white/5 border border-white/10 text-[#A39AAE] text-[10px] font-space cursor-pointer transition-colors"
              title="Reset Orbit Position"
            >
              RESET
            </button>
          </div>
        </div>

        {/* ========================================================
            MAIN VISUAL STAGE: EXTENDED HORIZONTAL ARMS PHOTOGRAPH
            Interactive Hand-to-Hand Technology Arc Transmission
            ======================================================== */}
        <div
          className={`relative w-full max-w-4xl mx-auto my-auto aspect-[16/9] max-h-[30dvh] sm:max-h-[42dvh] lg:max-h-[48dvh] rounded-2xl sm:rounded-3xl bg-[#100B15]/85 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.8)] p-1.5 sm:p-4 flex items-center justify-center overflow-hidden select-none transition-all duration-1000 ${
            isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: isActive ? '200ms' : '0ms',
          }}
        >
          {/* BACK LAYER SVG (z-4, BEHIND HEAD & BODY): Sweeps behind head */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-[4]"
            viewBox="0 0 1000 562"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="orbitGradBackPurple" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7025B8" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#A855F7" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#C084FC" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path
              d="M 80 258 A 420 169 0 0 1 920 258"
              fill="none"
              stroke="url(#orbitGradBackPurple)"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="opacity-60"
            />
          </svg>

          {/* Energy burst at left hand */}
          <div
            className="absolute z-25 pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{ left: '12%', top: '64%' }}
          >
            <div className="relative flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#A855F7]/30 blur-xl animate-pulse" />
              <div className="absolute w-5 h-5 rounded-full border-2 border-[#A855F7] shadow-[0_0_12px_#A855F7] animate-ping" />
              <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#A855F7]" />
            </div>
          </div>

          {/* Energy burst at right hand */}
          <div
            className="absolute z-25 pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{ left: '88%', top: '64%' }}
          >
            <div className="relative flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#7025B8]/30 blur-xl animate-pulse" />
              <div className="absolute w-5 h-5 rounded-full border-2 border-[#C084FC] shadow-[0_0_12px_#C084FC] animate-ping" />
              <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#C084FC]" />
            </div>
          </div>

          {/* ========================================================
              PHOTOGRAPH LAYER (z-10):
              Extended arms authentic photograph of Giridharan
              ======================================================== */}
          <div className="relative z-10 w-full h-full flex items-center justify-center select-none pointer-events-none">
            <img
              src={SKILLS_IMAGE}
              alt="Giridharan D - Technical Arsenal Extended Arms"
              className="w-full h-full object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.85)] select-none pointer-events-none"
            />
            <div className="absolute -bottom-2 w-3/4 h-5 bg-black/70 rounded-full blur-xl pointer-events-none" />
          </div>

          {/* FRONT LAYER SVG (z-20): Sweeps in front of chest */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-[20]"
            viewBox="0 0 1000 562"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="orbitGradFrontPurple" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#A855F7" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#C084FC" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#7025B8" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <path
              d="M 920 258 A 420 169 0 0 1 80 258"
              fill="none"
              stroke="url(#orbitGradFrontPurple)"
              strokeWidth="2.5"
              strokeDasharray="8 6"
              className="opacity-80"
            />
          </svg>

          {/* 10 3D ROUND ORBITING TECHNOLOGY CAPSULES */}
          {TECH_ORBITERS.map((orb, index) => {
            const IconComponent = orb.icon;
            const isSelected = selectedSkill.id === orb.id;
            const isHovered = hoveredTech === orb.id;

            const angle =
              orbitProgress * Math.PI * 2 +
              index * ((Math.PI * 2) / TECH_ORBITERS.length);
            const cosVal = Math.cos(angle);
            const sinVal = Math.sin(angle);

            const posX = 50 + 40 * cosVal;
            const posY = 48 + 26 * sinVal;

            const isBehind = sinVal < 0;

            let scale = 1.0;
            if (isHovered || isSelected) {
              scale = isBehind ? 1.15 : 1.3;
            } else if (isBehind) {
              scale = 0.72 + (sinVal + 1) * 0.16;
            } else {
              scale = 0.92 + sinVal * 0.2;
            }

            const opacity = isHovered || isSelected ? 1 : isBehind ? 0.65 + (sinVal + 1) * 0.25 : 1;
            const zIndex = isHovered ? 45 : isSelected ? 35 : isBehind ? 5 : 30;

            return (
              <div
                key={orb.id}
                onMouseEnter={() => setHoveredTech(orb.id)}
                onMouseLeave={() => setHoveredTech(null)}
                onClick={() => setSelectedSkill(orb)}
                className="absolute transition-transform duration-100 ease-linear cursor-pointer select-none"
                style={{
                  left: `${posX}%`,
                  top: `${posY}%`,
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
              >
                <div
                  className={`relative flex items-center gap-1.5 p-1 sm:p-1.5 rounded-xl backdrop-blur-md border shadow-lg transition-all duration-200 ${
                    isSelected
                      ? 'border-[#A855F7] shadow-[0_0_22px_rgba(168,85,247,0.8)] ring-2 ring-[#A855F7]/50 scale-105'
                      : isHovered
                      ? 'border-[#A855F7] shadow-[0_0_18px_rgba(168,85,247,0.6)]'
                      : isBehind
                      ? 'border-white/10 bg-[#100B15]/85 shadow-[0_4px_12px_rgba(0,0,0,0.6)]'
                      : 'border-white/25 bg-[#100B15]/95 shadow-[0_6px_20px_rgba(112,37,184,0.35)] hover:border-[#A855F7]'
                  }`}
                >
                  <div
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center border shrink-0"
                    style={{
                      backgroundColor: `${orb.color}25`,
                      borderColor: `${orb.color}60`,
                      color: orb.color,
                    }}
                  >
                    <IconComponent className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>

                  <div className="pr-1 text-left hidden sm:block">
                    <div className="font-space font-bold text-[10px] sm:text-xs text-white leading-tight">
                      {orb.name}
                    </div>
                    <div className="text-[8px] font-space text-[#C084FC] leading-tight">
                      {orb.category}
                    </div>
                  </div>

                  <div
                    className={`absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full ${
                      isBehind ? 'opacity-40' : 'opacity-100'
                    }`}
                    style={{
                      backgroundColor: orb.color,
                      boxShadow: isBehind ? 'none' : `0 0 6px ${orb.color}`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM: Compact Interactive Technology Selector (Staggered fade) */}
        <div
          className={`mt-1 sm:mt-2 shrink-0 transition-all duration-800 ${
            isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: isActive ? '400ms' : '0ms',
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 text-[9px] sm:text-[10px] font-space text-[#A39AAE] uppercase mb-1 px-1">
            <span className="truncate">ALL TECHNOLOGIES · TAP TO HIGHLIGHT:</span>
            <span className="text-[#C084FC] font-semibold truncate">{selectedSkill.name}: {selectedSkill.desc}</span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1 sm:gap-1.5">
            {TECH_ORBITERS.map((orb, index) => {
              const IconComp = orb.icon;
              const isSelected = selectedSkill.id === orb.id;
              return (
                <button
                  key={orb.id}
                  type="button"
                  onClick={() => setSelectedSkill(orb)}
                  className={`p-1 sm:p-1.5 rounded-xl border text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                    isSelected
                      ? 'bg-[#A855F7]/20 border-[#A855F7] shadow-[0_0_12px_rgba(168,85,247,0.4)] scale-105'
                      : 'bg-[#100B15] border-white/10 hover:border-[#A855F7]/40'
                  }`}
                  style={{
                    transitionDelay: `${index * 30}ms`,
                  }}
                >
                  <IconComp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C084FC]" />
                  <span className="text-[9px] sm:text-[10px] font-space font-bold text-white truncate w-full">
                    {orb.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
