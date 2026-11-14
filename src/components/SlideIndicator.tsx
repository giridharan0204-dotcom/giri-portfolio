import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export interface SlideItem {
  id: string;
  label: string;
  number: string;
  title: string;
}

interface SlideIndicatorProps {
  slides: SlideItem[];
  activeIndex: number;
  onSelectSlide: (index: number) => void;
}

export const SlideIndicator: React.FC<SlideIndicatorProps> = ({
  slides,
  activeIndex,
  onSelectSlide,
}) => {
  const handlePrev = () => {
    if (activeIndex > 0) {
      onSelectSlide(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      onSelectSlide(activeIndex + 1);
    }
  };

  return (
    <aside
      aria-label="Presentation slide navigation"
      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 select-none"
    >
      {/* Prev Slide Chevron */}
      <button
        type="button"
        onClick={handlePrev}
        disabled={activeIndex === 0}
        aria-label="Previous slide"
        className="p-1.5 rounded-lg bg-[#100B15]/80 border border-white/10 text-[#C084FC] hover:text-white hover:border-[#A855F7] disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer backdrop-blur-md"
        title="Previous slide (Up Arrow / PageUp)"
      >
        <ChevronUp className="w-3.5 h-3.5" />
      </button>

      {/* Slide Indicators */}
      <div className="flex flex-col items-center gap-2 py-2 px-1.5 rounded-full bg-[#100B15]/85 border border-white/10 backdrop-blur-md shadow-2xl">
        {slides.map((slide, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => onSelectSlide(index)}
              className="group relative flex items-center justify-center p-1 cursor-pointer"
              aria-label={`Go to ${slide.number} ${slide.label}`}
              title={`${slide.number} ${slide.label} - ${slide.title}`}
            >
              {/* Dot / Pill indicator */}
              <span
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-2 h-6 bg-[#A855F7] shadow-[0_0_12px_#A855F7]'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/70 group-hover:scale-125'
                }`}
              />

              {/* Hover Tooltip Label to the left */}
              <span className="pointer-events-none absolute right-7 px-2.5 py-1 rounded-md bg-[#100B15] border border-white/15 text-[10px] font-space font-semibold tracking-wider text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <span className="text-[#A855F7] mr-1">{slide.number}</span>
                {slide.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Slide Counter Badge */}
      <div className="text-[10px] font-space font-bold text-[#A39AAE] tabular-nums tracking-widest px-1.5 py-0.5 rounded bg-[#100B15]/90 border border-white/10">
        <span className="text-white">0{activeIndex + 1}</span>
        <span className="mx-0.5 text-white/30">/</span>
        <span>0{slides.length}</span>
      </div>

      {/* Next Slide Chevron */}
      <button
        type="button"
        onClick={handleNext}
        disabled={activeIndex === slides.length - 1}
        aria-label="Next slide"
        className="p-1.5 rounded-lg bg-[#100B15]/80 border border-white/10 text-[#C084FC] hover:text-white hover:border-[#A855F7] disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer backdrop-blur-md"
        title="Next slide (Down Arrow / PageDown)"
      >
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};
