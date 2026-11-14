import React from 'react';
import { Layout, Briefcase, BrainCircuit, Code, Sparkles } from 'lucide-react';

interface InterestItemDef {
  number: string;
  title: string;
  quote: string;
  description: string;
  icon: React.ElementType;
  tags: string[];
}

const INTERESTS: InterestItemDef[] = [
  {
    number: '01',
    title: 'Website Creation',
    quote: 'Crafting modern, creative, and responsive web experiences.',
    description:
      'Transforming concepts into intuitive digital interfaces with clean responsive architecture, interactive visual hierarchy, and 3D polish.',
    icon: Layout,
    tags: ['Web Design', 'UI/UX Craft', 'Responsive Layouts'],
  },
  {
    number: '02',
    title: 'Freelancing',
    quote: 'Transforming client ideas into practical digital solutions.',
    description:
      'Delivering purposeful client web applications by pairing strict engineering standards with contemporary aesthetic sensibilities.',
    icon: Briefcase,
    tags: ['Client Delivery', 'Practical Solutions', 'Full Execution'],
  },
  {
    number: '03',
    title: 'Logical Problem Solving',
    quote: 'Breaking down complex problems with structured code.',
    description:
      'Mastering algorithmic reasoning, computational efficiency, and data structure proficiency across Java, C, and C++.',
    icon: BrainCircuit,
    tags: ['Data Structures', 'Algorithmic Logic', 'Optimization'],
  },
  {
    number: '04',
    title: 'Software Development',
    quote: 'Building dependable, scalable, and modern software systems.',
    description:
      'Exploring modern frameworks, cloud backends, clean API architectures, and continuous developer workflows.',
    icon: Code,
    tags: ['Systems Architecture', 'Full-Stack', 'Continuous Growth'],
  },
];

interface InterestsProps {
  isActive?: boolean;
}

export const Interests: React.FC<InterestsProps> = ({ isActive = true }) => {
  return (
    <section
      id="interests"
      className="presentation-slide bg-[#050505] select-none"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#7025B8]/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-center py-1.5 sm:py-4 relative z-10 min-h-0">
        
        {/* Section Heading with Mask Reveal */}
        <div className="text-center sm:text-left mb-2 sm:mb-4 shrink-0">
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 rounded-full bg-[#100B15] border border-white/10 text-[9px] sm:text-xs font-space tracking-widest text-[#C084FC] uppercase mb-1 transition-all duration-700 ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
            }`}
          >
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#A855F7]" />
            <span>SCREEN 06 // PASSION & PERSPECTIVE</span>
          </div>

          <div className="overflow-hidden">
            <h2
              className={`text-xl sm:text-3xl lg:text-4xl font-space font-extrabold text-white tracking-tight leading-none transition-all duration-700 ease-out ${
                isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
              }`}
            >
              CORE <span className="text-[#A855F7]">INTERESTS</span>
            </h2>
          </div>

          <p
            className={`text-[10px] sm:text-sm text-[#A39AAE] font-inter mt-0.5 max-w-xl mx-auto sm:mx-0 transition-all duration-700 ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            What drives my daily dedication, creative curiosity, and software craftsmanship.
          </p>
        </div>

        {/* 4 Interests in 2x2 Grid across all screen sizes */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          {INTERESTS.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.number}
                className={`relative rounded-xl sm:rounded-2xl bg-[#100B15] p-2.5 sm:p-4 lg:p-5 border border-white/10 hover:border-[#A855F7]/40 transition-all duration-800 flex flex-col justify-between shadow-[0_10px_25px_rgba(0,0,0,0.6)] ${
                  isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                }`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${200 + idx * 120}ms`,
                }}
              >
                {/* Corner Watermark Number */}
                <div className="absolute top-2 right-2.5 sm:top-3 sm:right-4 font-space font-extrabold text-sm sm:text-2xl text-white/10 select-none">
                  {item.number}
                </div>

                <div>
                  {/* Top Bar with Icon & Title */}
                  <div className="flex items-start sm:items-center gap-1.5 sm:gap-3 mb-1 sm:mb-2 pr-5">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#050505] border border-white/10 flex items-center justify-center shrink-0">
                      <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 text-[#A855F7]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-space font-bold text-[11px] sm:text-base text-white leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-[9px] sm:text-xs font-space text-[#C084FC] italic leading-tight mt-0.5 hidden sm:block">
                        "{item.quote}"
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[9px] sm:text-xs text-[#C4BDCC] font-inter leading-snug sm:leading-relaxed mb-1.5 sm:mb-2.5">
                    {item.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="pt-1.5 sm:pt-2 border-t border-white/10 flex flex-wrap gap-1 sm:gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 sm:px-2 py-0.5 rounded bg-[#050505] border border-white/5 text-[8px] sm:text-[10px] font-space text-[#A39AAE]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
