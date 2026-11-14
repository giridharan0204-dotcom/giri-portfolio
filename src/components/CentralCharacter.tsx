import React, { useState, useEffect } from 'react';
import {
  Coffee,
  Cpu,
  Binary,
  Terminal,
  Code2,
  Palette,
  Flame,
  Database,
  Sparkles,
  Shield,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { CHARACTER_IMAGE, SKILLS_DATA, SkillItem } from '../utils/portfolioData';
import { CharacterTransform, SectionId } from '../hooks/useScrollStage';

interface CentralCharacterProps {
  transform: CharacterTransform;
  activeSection: SectionId;
  isMobile: boolean;
  mousePos: { x: number; y: number };
  onSelectSkill?: (skill: SkillItem) => void;
  selectedSkill?: SkillItem | null;
}

// 8 Orbiting Technology Icons Configuration
const ORBIT_ICONS = [
  { id: 'Java', name: 'Java', icon: Coffee, color: '#FF7043', baseAngle: 0 },
  { id: 'C', name: 'C', icon: Cpu, color: '#008CFF', baseAngle: 45 },
  { id: 'C++', name: 'C++', icon: Binary, color: '#00E5FF', baseAngle: 90 },
  { id: 'Python', name: 'Python', icon: Terminal, color: '#38BDF8', baseAngle: 135 },
  { id: 'HTML5', name: 'HTML5', icon: Code2, color: '#FF5722', baseAngle: 180 },
  { id: 'CSS3', name: 'CSS3', icon: Palette, color: '#29B6F6', baseAngle: 225 },
  { id: 'JavaScript', name: 'JavaScript', icon: Flame, color: '#FFCA28', baseAngle: 270 },
  { id: 'SQL', name: 'SQL', icon: Database, color: '#A78BFA', baseAngle: 315 },
];

export const CentralCharacter: React.FC<CentralCharacterProps> = ({
  transform,
  activeSection,
  isMobile,
  mousePos,
  onSelectSkill,
  selectedSkill,
}) => {
  const [floatOffset, setFloatOffset] = useState<number>(0);
  const [orbitRotation, setOrbitRotation] = useState<number>(0);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  // Gentle vertical floating animation (continuous, smooth, peaceful)
  useEffect(() => {
    let animId: number;
    let startTime = performance.now();

    const loop = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      // Gentle sine wave ~3.5s cycle, ±8px amplitude
      setFloatOffset(Math.sin(elapsed * 1.8) * 8);
      // Subtle continuous slow orbit drift
      setOrbitRotation(elapsed * 12);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const isSkillsActive = activeSection === 'skills';

  // Desktop smooth position calculations
  const translateX = isMobile ? 0 : transform.xPercent;
  const translateY = transform.yOffset + floatOffset;
  const currentScale = isMobile ? 0.85 : transform.scale;
  const rotateY = isMobile ? 0 : transform.rotateY;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 hidden lg:flex items-center justify-center overflow-hidden transition-opacity duration-700"
      style={{
        opacity: transform.opacity,
        perspective: '1200px',
      }}
    >
      {/* Central Character Anchor Container */}
      <div
        className="relative flex items-center justify-center transition-all duration-700 ease-out"
        style={{
          transform: `translate3d(${translateX}vw, ${translateY}px, 0) scale(${currentScale}) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
          width: isMobile ? '280px' : '480px',
          height: isMobile ? '460px' : '720px',
        }}
      >
        {/* ========================================================
            1. SOFT BLUE GLOWING CIRCULAR HALO RING BEHIND CHARACTER
            ======================================================== */}
        <div
          className="absolute -z-10 rounded-full transition-all duration-700 pointer-events-none"
          style={{
            width: isMobile ? '300px' : '520px',
            height: isMobile ? '300px' : '520px',
            top: isMobile ? '12%' : '14%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${transform.haloScale})`,
            opacity: transform.haloIntensity,
          }}
        >
          {/* Radial outer glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#008CFF]/20 via-[#00E5FF]/25 to-transparent blur-[60px]" />

          {/* Glowing Neon Cyber Ring */}
          <div
            className="absolute inset-4 rounded-full border border-[#00E5FF]/40 shadow-[0_0_50px_rgba(0,229,255,0.35),inset_0_0_30px_rgba(0,140,255,0.2)] animate-spin"
            style={{ animationDuration: '35s' }}
          />

          {/* Dotted Accent Orbit Ring */}
          <div
            className="absolute inset-10 rounded-full border border-dashed border-[#008CFF]/30 animate-spin"
            style={{ animationDuration: '50s', animationDirection: 'reverse' }}
          />

          {/* Center Energy Pulse */}
          <div className="absolute inset-20 rounded-full bg-radial from-[#00E5FF]/15 via-transparent to-transparent blur-md" />
        </div>

        {/* ========================================================
            2. THE UNIFIED CONNECTED FULL-BODY PORTRAIT IMAGE
            Preserving real facial identity, body, clothing & hands
            ======================================================== */}
        <div className="relative w-full h-full flex items-end justify-center select-none">
          <img
            src={CHARACTER_IMAGE}
            alt="Giridharan D - Aspiring Software Developer"
            className="h-full w-auto max-h-[82vh] object-contain drop-shadow-[0_20px_45px_rgba(0,140,255,0.45)] transition-all duration-300"
            style={{
              filter: isSkillsActive
                ? 'drop-shadow(0 0 35px rgba(0, 229, 255, 0.45)) drop-shadow(0 20px 30px rgba(0, 0, 0, 0.7))'
                : 'drop-shadow(0 0 25px rgba(0, 140, 255, 0.35)) drop-shadow(0 20px 25px rgba(0, 0, 0, 0.6))',
            }}
          />

          {/* Ground Contact Shadow */}
          <div className="absolute -bottom-4 w-3/4 h-8 bg-black/60 rounded-full blur-xl pointer-events-none" />

          {/* Subtle Ambient Scanline / Light Flare on character */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* ========================================================
            3. CINEMATIC 3D TECHNOLOGY ORBITS (SKILLS ANIMATION)
            8 Genuine tech logos orbiting around Giridharan
            ======================================================== */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
            isSkillsActive
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none scale-90'
          }`}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {ORBIT_ICONS.map((tech, index) => {
            const IconComponent = tech.icon;
            // Radial angle distributed around 360 degrees
            const currentAngle =
              (tech.baseAngle + orbitRotation) * (Math.PI / 180);

            // Orbit Radii: Elliptical orbit comfortably around torso/waist height
            // Horizontal radius: 360px desktop
            // Vertical radius: 175px desktop
            // This ensures icons NEVER overlap face, neck, or chest
            const radiusX = 360;
            const radiusY = 175;

            // Compute 3D Cartesian coordinates
            const posX = Math.cos(currentAngle) * radiusX;
            // Center the orbit vertically around the waist (115px below center)
            const posY = Math.sin(currentAngle) * radiusY + 115;
            // 3D Depth z-axis for perspective layering
            const posZ = Math.sin(currentAngle * 2) * 45;

            const isHovered = hoveredIcon === tech.id;
            const isSelected = selectedSkill?.name.toLowerCase() === tech.id.toLowerCase();

            return (
              <div
                key={tech.id}
                onMouseEnter={() => setHoveredIcon(tech.id)}
                onMouseLeave={() => setHoveredIcon(null)}
                onClick={() => {
                  const matched = SKILLS_DATA.find(
                    (s) => s.name.toLowerCase() === tech.id.toLowerCase()
                  );
                  if (matched && onSelectSkill) {
                    onSelectSkill(matched);
                  }
                }}
                className="absolute transition-transform duration-300 ease-out cursor-pointer group"
                style={{
                  transform: `translate3d(${posX}px, ${posY}px, ${posZ}px) scale(${
                    isHovered || isSelected ? 1.25 : 1
                  })`,
                  zIndex: posZ > 0 ? 30 : 5,
                }}
              >
                {/* 3D Glowing Tech Badge */}
                <div
                  className={`relative flex items-center gap-2 p-2.5 sm:p-3 rounded-2xl bg-[#07152B]/90 backdrop-blur-md border shadow-xl transition-all duration-300 ${
                    isSelected
                      ? 'border-[#00E5FF] shadow-[0_0_30px_rgba(0,229,255,0.7)] scale-110'
                      : isHovered
                      ? 'border-[#00E5FF] shadow-[0_0_25px_rgba(0,229,255,0.5)]'
                      : 'border-white/20 hover:border-white/50'
                  }`}
                  style={{
                    backgroundColor: 'rgba(7, 21, 43, 0.88)',
                    boxShadow: `0 8px 30px 0 ${tech.color}40`,
                  }}
                >
                  {/* Glowing Icon */}
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${tech.color}20`,
                      borderColor: `${tech.color}50`,
                      color: tech.color,
                    }}
                  >
                    <IconComponent className="w-5 h-5 sm:w-5 sm:h-5" />
                  </div>

                  {/* Label (Desktop / Hover) */}
                  <div className="pr-1 text-left">
                    <div className="font-orbitron font-bold text-xs text-white tracking-wide flex items-center gap-1">
                      {tech.name}
                    </div>
                    <div className="text-[9px] font-mono text-[#00E5FF]">
                      TECH CORE
                    </div>
                  </div>

                  {/* Subtle 3D Depth Highlight */}
                  <div
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: tech.color, boxShadow: `0 0 10px ${tech.color}` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Current Active Section Badge Anchor (subtle indicator) */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-[#020817]/85 border border-[#00E5FF]/30 backdrop-blur-md text-[10px] font-mono text-[#00E5FF] tracking-wider uppercase pointer-events-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
          <span>GIRIDHARAN D // {activeSection}</span>
        </div>
      </div>
    </div>
  );
};
