/**
 * Giridharan D - Full-Screen Presentation Portfolio
 * Obsidian & Purple Cinematic Aesthetic
 * 7 Viewport Presentation Slides: Home, About, Skills, Projects, Journey, Interests, Contact & Resume
 * @license Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { SocialRail } from './components/SocialRail';

interface SlideItem {
  id: string;
  label: string;
  number: string;
  title: string;
}
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Interests } from './components/Interests';
import { Contact } from './components/Contact';
import { CustomCursor } from './components/CustomCursor';

const SLIDES: SlideItem[] = [
  { id: 'home', label: 'HOME', number: '01', title: 'Introduction' },
  { id: 'about', label: 'ABOUT', number: '02', title: 'About Me' },
  { id: 'skills', label: 'SKILLS', number: '03', title: 'Technical Stack' },
  { id: 'projects', label: 'PROJECTS', number: '04', title: 'Selected Works' },
  { id: 'journey', label: 'JOURNEY', number: '05', title: 'Education & Journey' },
  { id: 'interests', label: 'INTERESTS', number: '06', title: 'Core Interests' },
  { id: 'contact', label: 'CONTACT', number: '07', title: 'Contact & Resume' },
];

export default function App() {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isNavigatingRef = useRef<boolean>(false);

  // Smoothly scroll to a target slide index
  const scrollToSlide = useCallback((index: number) => {
    if (index < 0 || index >= SLIDES.length) return;
    const targetSlide = SLIDES[index];
    const targetElement = document.getElementById(targetSlide.id);

    if (targetElement) {
      isNavigatingRef.current = true;
      setActiveSlideIndex(index);
      targetElement.scrollIntoView({ behavior: 'smooth' });

      // Reset lock after smooth scroll settles
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 700);
    }
  }, []);

  const handleNavigateById = useCallback((id: string) => {
    const idx = SLIDES.findIndex((s) => s.id === id);
    if (idx !== -1) {
      scrollToSlide(idx);
    }
  }, [scrollToSlide]);

  // Set up IntersectionObserver to update activeSlideIndex automatically on scroll/swipe
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (isNavigatingRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          const slideId = entry.target.id;
          const idx = SLIDES.findIndex((s) => s.id === slideId);
          if (idx !== -1) {
            setActiveSlideIndex(idx);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: container,
      threshold: [0.5, 0.7],
    });

    SLIDES.forEach((slide) => {
      const el = document.getElementById(slide.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Keyboard navigation support: ArrowDown, ArrowUp, PageDown, PageUp, Home, End
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        scrollToSlide(activeSlideIndex + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToSlide(activeSlideIndex - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSlide(SLIDES.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlideIndex, scrollToSlide]);

  const activeSlideId = SLIDES[activeSlideIndex]?.id || 'home';

  return (
    <div className="h-screen h-[100dvh] w-full bg-[#050505] text-white selection:bg-[#A855F7]/30 selection:text-[#C084FC] relative overflow-hidden">
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Fixed Left Social Rail (GitHub and Email only) */}
      <SocialRail />

      {/* Minimal Top Navigation */}
      <Navbar
        activeSection={activeSlideId}
        onNavigate={handleNavigateById}
      />

      {/* Full-Screen Snap Presentation Container */}
      <div
        id="presentation-viewport"
        ref={containerRef}
        className="presentation-container"
      >
        {/* SCREEN 01: HOME / HERO */}
        <Hero isActive={activeSlideIndex === 0} />

        {/* SCREEN 02: ABOUT ME */}
        <About isActive={activeSlideIndex === 1} />

        {/* SCREEN 03: SKILLS */}
        <Skills isActive={activeSlideIndex === 2} />

        {/* SCREEN 04: PROJECTS */}
        <Projects isActive={activeSlideIndex === 3} />

        {/* SCREEN 05: EDUCATION & JOURNEY */}
        <Education isActive={activeSlideIndex === 4} />

        {/* SCREEN 06: INTERESTS */}
        <Interests isActive={activeSlideIndex === 5} />

        {/* SCREEN 07: CONTACT & RESUME */}
        <Contact
          isActive={activeSlideIndex === 6}
          onScrollToTop={() => scrollToSlide(0)}
        />
      </div>
    </div>
  );
}
