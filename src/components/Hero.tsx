import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO, CHARACTER_IMAGE } from '../utils/portfolioData';
import { ThreeSigma } from './ThreeSigma';

interface HeroProps {
  isActive?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isActive = true }) => {
  // Reveal state: initially false (nearly pure black screen with "ENTER MY WORLD" hint)
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [mouseTilt, setMouseTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef<boolean>(false);

  // Auto-reveal on mobile/touch screens or when active without hover capability
  useEffect(() => {
    const isTouch =
      typeof window !== 'undefined' &&
      (window.matchMedia('(hover: none)').matches || 'ontouchstart' in window);

    if (isTouch && isActive) {
      const timer = setTimeout(() => {
        setIsRevealed(true);
        hasTriggeredRef.current = true;
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  // Subtle mouse tracking for photograph head & body tilt with smooth inertia
  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2;
      const normY = (e.clientY / innerHeight - 0.5) * 2;
      targetX = normX * 5.5;
      targetY = -normY * 4;
    };

    const updateTilt = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      setMouseTilt({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(updateTilt);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateTilt);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleHeroMouseEnter = () => {
    setIsHovered(true);
    if (!isRevealed) {
      setIsRevealed(true);
      hasTriggeredRef.current = true;
    }
  };

  const handleHeroMouseLeave = () => {
    setIsHovered(false);
  };

  const handleManualEnter = () => {
    setIsRevealed(true);
    hasTriggeredRef.current = true;
  };

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseEnter={handleHeroMouseEnter}
      onMouseMove={() => {
        if (!isRevealed) {
          setIsRevealed(true);
          hasTriggeredRef.current = true;
        }
      }}
      onMouseLeave={handleHeroMouseLeave}
      onClick={handleManualEnter}
      className="presentation-slide bg-[#050505] select-none group cursor-default relative overflow-hidden"
    >
      {/* ────────────────────────────────────────────────────────
          STEP 1: CINEMATIC BLACK BACKGROUND & AMBIENT PURPLE GLOW
          ──────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {/* Ambient Purple Light: Starts subtle, blooms on reveal */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] lg:w-[900px] h-[550px] sm:h-[750px] lg:h-[900px] rounded-full blur-[160px] transition-all duration-1000 ease-out ${
            isRevealed ? 'opacity-90 scale-100' : 'opacity-15 scale-90'
          }`}
          style={{
            background:
              'radial-gradient(circle, rgba(168, 85, 247, 0.42) 0%, rgba(112, 37, 184, 0.22) 45%, transparent 75%)',
          }}
        />
        <div className="absolute inset-0 bg-radial from-transparent via-[#050505]/70 to-[#050505]" />
      </div>

      {/* ────────────────────────────────────────────────────────
          3D ANIMATED GREEK SIGMA (Σ) SYMBOL (Three.js)
          Metallic dark purple surface, violet neon edges, floating
          and slow continuous Y rotation with mouse-follow parallax
          ──────────────────────────────────────────────────────── */}
      <ThreeSigma isActive={isActive} isRevealed={isRevealed} />

      {/* ────────────────────────────────────────────────────────
          INITIAL STATE: "ENTER MY WORLD" MINIMAL INTERACTION HINT
          Visible when pure black screen is unrevealed
          ──────────────────────────────────────────────────────── */}
      <div
        className={`absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none transition-all duration-700 ease-out ${
          isRevealed ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          {/* Glowing purple pulse indicator */}
          <div className="relative flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-[#A855F7]/30 blur-md animate-ping" />
            <div className="absolute w-3.5 h-3.5 rounded-full bg-[#A855F7] shadow-[0_0_18px_#A855F7]" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-white" />
          </div>

          <div className="text-center mt-2">
            <div className="font-space font-bold text-xs sm:text-sm tracking-[0.35em] text-white uppercase flex items-center justify-center gap-2">
              <span>ENTER MY WORLD</span>
            </div>
            <p className="text-[10px] font-space text-[#A39AAE] tracking-widest mt-1 uppercase">
              Move cursor or tap to explore
            </p>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          CHOREOGRAPHED HERO CONTENT COMPOSITION
          Left: Name Mask | Center: Moving Photo | Right: Role Mask
          ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-between pt-14 pb-3 sm:pt-16 sm:pb-4">
        
        {/* Main 3-Column Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-2 items-center my-auto w-full">
          
          {/* ========================================================
              STEP 3: LEFT SIDE — NAME REVEAL (HORIZONTAL MASK)
              GIRIDHARAN D + Subtitle
              ======================================================== */}
          <div
            className={`lg:col-span-3 xl:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left z-20 order-1 transition-all duration-1000 ${
              isRevealed
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: isRevealed ? '450ms' : '0ms',
            }}
          >
            {/* Header Kicker */}
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2.5 overflow-hidden">
              <span className="font-space text-xs sm:text-sm font-bold tracking-[0.25em] text-[#A39AAE] uppercase whitespace-nowrap">
                {PERSONAL_INFO.shortIntro}
              </span>
              <div className="w-8 sm:w-12 h-px bg-white/20" />
            </div>

            {/* Name Heading with Horizontal Mask Reveal */}
            <div className="overflow-hidden py-1">
              <h1 className="font-space font-extrabold tracking-tight text-white whitespace-nowrap text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl leading-none">
                <span>GIRIDHARAN</span>{' '}
                <span className="text-[#A855F7] glow-text-purple">D</span>
              </h1>
            </div>

            {/* Subtitle description */}
            <div className="mt-1 sm:mt-2 text-xs sm:text-sm font-inter text-[#C4BDCC] tracking-wide">
              <span>Creative Developer</span>
              <span className="mx-1.5 text-white/30">/</span>
              <span className="text-[#A855F7]">Software Developer</span>
            </div>
          </div>

          {/* ========================================================
              STEP 2: CENTER — PHOTOGRAPH ENTERS FROM LEFT TO RIGHT
              Smooth scale-up, 3D depth, rim lighting, floating
              ======================================================== */}
          <div
            className={`lg:col-span-6 xl:col-span-6 relative flex items-center justify-center order-2 transition-all duration-1100 ${
              isRevealed
                ? 'opacity-100 translate-x-0 scale-100'
                : 'opacity-0 -translate-x-20 sm:-translate-x-32 scale-90'
            }`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: isRevealed ? '150ms' : '0ms',
            }}
          >
            {/* Purple Rim Glow behind the photo */}
            <div
              className={`absolute w-72 h-72 sm:w-[460px] sm:h-[460px] lg:w-[540px] lg:h-[540px] rounded-full pointer-events-none transition-all duration-700 ease-out ${
                isHovered
                  ? 'scale-110 opacity-95 blur-[55px]'
                  : 'scale-100 opacity-75 blur-[65px] animate-glow-pulse'
              }`}
              style={{
                background:
                  'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, rgba(112, 37, 184, 0.28) 50%, transparent 75%)',
              }}
            />

            {/* Lavender soft outer halo */}
            <div
              className="absolute w-56 h-56 sm:w-80 sm:h-80 rounded-full pointer-events-none blur-[40px]"
              style={{
                background:
                  'radial-gradient(circle, rgba(192, 132, 252, 0.3) 0%, rgba(168, 85, 247, 0.15) 50%, transparent 70%)',
              }}
            />

            {/* Living 3D Avatar Image Container: 20-30% enlarged */}
            <div
              className="relative z-10 w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[540px] xl:max-w-[580px] flex items-center justify-center select-none"
              style={{ perspective: '1100px' }}
            >
              <div
                className="relative w-full flex items-center justify-center transition-transform duration-100 ease-out animate-avatar-float"
                style={{
                  transform: `rotateY(${mouseTilt.x}deg) rotateX(${mouseTilt.y}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <img
                  src={CHARACTER_IMAGE}
                  alt="Giridharan D - 3D Cinematic Portfolio"
                  className={`w-full h-auto max-h-[44vh] sm:max-h-[60vh] lg:max-h-[72vh] xl:max-h-[78vh] object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] filter transition-all duration-500 ${
                    isHovered
                      ? 'drop-shadow-[0_25px_60px_rgba(168,85,247,0.4)] brightness-105'
                      : ''
                  }`}
                />
              </div>
            </div>
          </div>

          {/* ========================================================
              STEP 4: RIGHT SIDE — ROLE REVEAL
              ASPIRING SOFTWARE DEVELOPER with neon curved stroke
              ======================================================== */}
          <div
            className={`lg:col-span-3 xl:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left z-20 order-3 transition-all duration-1000 ${
              isRevealed
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-12'
            }`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: isRevealed ? '600ms' : '0ms',
            }}
          >
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2 overflow-hidden">
              <span className="font-space text-xs sm:text-sm font-bold tracking-[0.25em] text-[#A39AAE] uppercase whitespace-nowrap">
                ASPIRING
              </span>
              <div className="hidden lg:block w-8 h-px bg-white/20" />
            </div>

            <div className="relative overflow-hidden py-1">
              <h2 className="font-space text-3xl sm:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-black italic tracking-tight text-white uppercase leading-none whitespace-nowrap">
                SOFTWARE
              </h2>
              <h2 className="font-space text-3xl sm:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-black italic tracking-tight text-[#C084FC] glow-text-purple uppercase leading-none mt-1 whitespace-nowrap">
                DEVELOPER
              </h2>

              {/* Purple curved neon stroke accent */}
              <svg
                className="w-40 sm:w-48 lg:w-44 xl:w-52 h-5 mt-2 text-[#A855F7] overflow-visible mx-auto lg:mx-0"
                viewBox="0 0 200 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 18C45 4 140 2 198 12"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_8px_#A855F7]"
                />
              </svg>
            </div>
          </div>

        </div>

        {/* ========================================================
            STEP 5: BOTTOM TAGLINE — "BUILDING IDEAS INTO REALITY."
            Reveals softly at the conclusion of the entrance
            ======================================================== */}
        <div
          className={`flex items-center justify-between text-[11px] sm:text-xs font-space tracking-[0.3em] uppercase text-[#A39AAE] pt-2 border-t border-white/5 transition-all duration-1000 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: isRevealed ? '850ms' : '0ms',
          }}
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] shadow-[0_0_6px_#A855F7]" />
            <span className="text-white font-semibold">BUILDING IDEAS INTO REALITY.</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[10px] text-[#A39AAE]">
            <span>B.Tech IT · SKCET '29</span>
            <span className="text-white/20">•</span>
            <span className="text-[#C084FC]">CGPA: 9.2</span>
          </div>
        </div>

      </div>
    </section>
  );
};
