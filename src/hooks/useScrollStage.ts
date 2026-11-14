import { useState, useEffect } from 'react';

export type SectionId =
  | 'home'
  | 'about'
  | 'skills'
  | 'projects'
  | 'journey'
  | 'interests'
  | 'contact';

export interface CharacterTransform {
  // Horizontal offset percentage (-50% to +50% of container)
  xPercent: number;
  // Vertical offset in px
  yOffset: number;
  // Scale factor (0.85 to 1.1)
  scale: number;
  // Halo glow intensity (0 to 1)
  haloIntensity: number;
  // Halo scale multiplier
  haloScale: number;
  // Tech orbit convergence (0 = dispersed, 1 = fully converged around character)
  techOrbitProgress: number;
  // Opacity of character (fades out at footer)
  opacity: number;
  // Rotation degrees for subtle 3D stance
  rotateY: number;
}

export function useScrollStage() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [sectionProgresses, setSectionProgresses] = useState<Record<SectionId, number>>({
    home: 1,
    about: 0,
    skills: 0,
    projects: 0,
    journey: 0,
    interests: 0,
    contact: 0,
  });

  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const sections: SectionId[] = [
      'home',
      'about',
      'skills',
      'projects',
      'journey',
      'interests',
      'contact',
    ];

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const globalP = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
          setScrollProgress(globalP);

          const newProgresses: Record<SectionId, number> = {
            home: 0,
            about: 0,
            skills: 0,
            projects: 0,
            journey: 0,
            interests: 0,
            contact: 0,
          };

          let currentActive: SectionId = 'home';
          const viewportMid = scrollY + window.innerHeight * 0.45;

          sections.forEach((secId) => {
            const el = document.getElementById(secId);
            if (!el) return;
            const top = el.offsetTop;
            const height = el.offsetHeight;
            const bottom = top + height;

            if (viewportMid >= top && viewportMid < bottom) {
              currentActive = secId;
            }

            // Calculate progress through this section (0 = start entering, 1 = leaving)
            const enterPoint = top - window.innerHeight * 0.8;
            const exitPoint = bottom;
            const span = exitPoint - enterPoint;
            if (span > 0) {
              const p = (scrollY - enterPoint) / span;
              newProgresses[secId] = Math.min(1, Math.max(0, p));
            }
          });

          setActiveSection(currentActive);
          setSectionProgresses(newProgresses);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Compute smooth character cinematic transform based on active section and progress
  const getCharacterTransform = (): CharacterTransform => {
    if (isMobile) {
      // Simplified mobile layout
      return {
        xPercent: 0,
        yOffset: 0,
        scale: 0.9,
        haloIntensity: 0.8,
        haloScale: 1.0,
        techOrbitProgress: activeSection === 'skills' ? 1 : 0.2,
        opacity: 1,
        rotateY: 0,
      };
    }

    // Footer Fade Out: If near the very bottom (footer), fade character out
    const footerFade = scrollProgress > 0.94 ? Math.max(0, 1 - (scrollProgress - 0.94) / 0.04) : 1;

    // Desktop cinematic character choreography
    switch (activeSection) {
      case 'home':
        return {
          xPercent: 24, // Sits on the right side
          yOffset: 10,
          scale: 1.05,
          haloIntensity: 0.85,
          haloScale: 1.05,
          techOrbitProgress: 0.1,
          opacity: 1 * footerFade,
          rotateY: -4 + mousePos.x * 3,
        };

      case 'about':
        return {
          xPercent: -20, // Slides to left-center
          yOffset: 25,
          scale: 1.0,
          haloIntensity: 0.75,
          haloScale: 0.95,
          techOrbitProgress: 0.3,
          opacity: 1 * footerFade,
          rotateY: 4 + mousePos.x * 3,
        };

      case 'skills':
        return {
          xPercent: 0, // Anchors centrally for 3D orbital convergence
          yOffset: 195, // Positioned so section heading and category tabs are 100% clear and unobstructed
          scale: 0.98,
          haloIntensity: 1.0,
          haloScale: 1.25,
          techOrbitProgress: 1.0, // Fully active 3D tech orbit
          opacity: 1 * footerFade,
          rotateY: mousePos.x * 5,
        };

      case 'projects':
        return {
          xPercent: -28, // Shifts to left side to make room for project cards
          yOffset: -5,
          scale: 0.94,
          haloIntensity: 0.8,
          haloScale: 0.95,
          techOrbitProgress: 0.35,
          opacity: 1 * footerFade,
          rotateY: 6 + mousePos.x * 3,
        };

      case 'journey':
        return {
          xPercent: 26, // Shifts to right side to complement left timeline
          yOffset: 15,
          scale: 0.95,
          haloIntensity: 0.8,
          haloScale: 1.0,
          techOrbitProgress: 0.2,
          opacity: 1 * footerFade,
          rotateY: -5 + mousePos.x * 3,
        };

      case 'interests':
        return {
          xPercent: 0, // Centered or balanced
          yOffset: 20,
          scale: 0.98,
          haloIntensity: 0.85,
          haloScale: 1.1,
          techOrbitProgress: 0.4,
          opacity: 1 * footerFade,
          rotateY: mousePos.x * 4,
        };

      case 'contact':
      default:
        return {
          xPercent: -24, // Settles on the left side of contact form
          yOffset: 10,
          scale: 0.96,
          haloIntensity: 0.95,
          haloScale: 1.15,
          techOrbitProgress: 0.25,
          opacity: 1 * footerFade,
          rotateY: 5 + mousePos.x * 3,
        };
    }
  };

  return {
    activeSection,
    scrollProgress,
    sectionProgresses,
    mousePos,
    isMobile,
    characterTransform: getCharacterTransform(),
  };
}
