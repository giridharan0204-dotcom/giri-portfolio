import React from 'react';
import { GraduationCap, MapPin, Calendar, CheckCircle2, Sparkles } from 'lucide-react';
import { calculateAcademicMetrics } from '../utils/portfolioData';

interface EducationProps {
  isActive?: boolean;
}

export const Education: React.FC<EducationProps> = ({ isActive = true }) => {
  const metrics = calculateAcademicMetrics(2025, 2029, 2, 4);

  const TIMELINE_STEPS = [
    {
      year: 'YEAR 01',
      period: '2025',
      title: 'Foundational Systems',
      desc: 'Procedural C programming, mathematical logic & discrete structures.',
      active: false,
    },
    {
      year: 'YEAR 02 (CURRENT)',
      period: '2025 – Present',
      title: 'Core Computing & DSA',
      desc: 'Object-Oriented Java, Data Structures, Modern Web & 9.2 CGPA distinction.',
      active: true,
      cgpa: '9.2 CGPA',
    },
    {
      year: 'YEAR 03',
      period: '2027 – 2028',
      title: 'Advanced Architecture',
      desc: 'Enterprise architectures, cloud pipelines & competitive algorithms.',
      active: false,
    },
    {
      year: 'GRADUATION',
      period: '2029',
      title: 'Degree Conferral',
      desc: 'B.Tech IT graduate, prepared for impactful software engineering.',
      active: false,
    },
  ];

  return (
    <section
      id="journey"
      className="presentation-slide bg-[#050505] select-none"
    >
      {/* Background purple ambience */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#7025B8]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-center pt-14 pb-4 sm:pt-16 sm:pb-6 relative z-10">
        
        {/* Section Heading with Mask Reveal */}
        <div className="text-center sm:text-left mb-3 sm:mb-4">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#100B15] border border-white/10 text-[10px] sm:text-xs font-space tracking-widest text-[#C084FC] uppercase mb-1.5 transition-all duration-700 ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#A855F7]" />
            <span>SCREEN 05 // ACADEMIC FOUNDATIONS</span>
          </div>

          <div className="overflow-hidden">
            <h2
              className={`text-2xl sm:text-4xl font-space font-extrabold text-white tracking-tight transition-all duration-700 ease-out ${
                isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
              }`}
            >
              EDUCATION & <span className="text-[#A855F7]">JOURNEY</span>
            </h2>
          </div>
        </div>

        {/* Top: Academic Program Primary Card */}
        <div
          className={`p-3.5 sm:p-5 rounded-2xl bg-[#100B15] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] mb-3 sm:mb-4 transition-all duration-800 ${
            isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: isActive ? '150ms' : '0ms',
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-md bg-[#A855F7]/15 text-[#C084FC] text-[10px] font-space font-bold uppercase">
                  UNDERGRADUATE PROGRAM
                </span>
                <span className="text-xs text-[#A39AAE] font-space">
                  Second Year
                </span>
              </div>
              <h3 className="font-space font-extrabold text-lg sm:text-2xl text-white">
                Bachelor of Technology in Information Technology
              </h3>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#C4BDCC] font-inter mt-1">
                <span className="flex items-center gap-1 text-white font-medium">
                  <GraduationCap className="w-3.5 h-3.5 text-[#A855F7]" />
                  Sri Krishna College of Engineering and Technology (SKCET)
                </span>
                <span className="text-white/20">•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C084FC]" />
                  Coimbatore, Tamil Nadu
                </span>
              </div>
            </div>

            {/* CGPA Badge */}
            <div className="px-4 py-2 sm:py-3 rounded-xl bg-[#050505] border border-[#A855F7]/40 text-center shrink-0 flex sm:flex-col items-center justify-between sm:justify-center gap-2">
              <div className="text-[10px] font-space text-[#A39AAE] uppercase">
                ACADEMIC CGPA
              </div>
              <div className="text-xl sm:text-3xl font-space font-black text-[#A855F7]">
                9.2
              </div>
              <div className="text-[9px] font-space text-emerald-400 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-2.5 h-2.5" />
                DISTINCTION
              </div>
            </div>
          </div>

          {/* Academic Progress Bar - Draws progressively on reveal */}
          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between text-[11px] font-space text-[#C4BDCC] mb-1.5">
              <span>DEGREE TIMELINE: 2025 – 2029</span>
              <span className="text-[#A855F7] font-bold">
                {metrics.formattedYear} ({metrics.progressPercent}%) · Graduation 2029
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#050505] rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full bg-[#A855F7] rounded-full shadow-[0_0_8px_rgba(168,85,247,0.6)] transition-all duration-1200 ease-out"
                style={{
                  width: isActive ? `${metrics.progressPercent}%` : '0%',
                  transitionDelay: '400ms',
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom: 4 Milestones Grid - Reveals in Sequence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {TIMELINE_STEPS.map((step, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border transition-all duration-700 ${
                step.active
                  ? 'bg-[#100B15] border-[#A855F7]/60 shadow-[0_4px_20px_rgba(168,85,247,0.2)]'
                  : 'bg-[#100B15]/60 border-white/10'
              } ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: `${300 + idx * 110}ms`,
              }}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-space text-[10px] font-bold text-[#A855F7]">
                  {step.year}
                </span>
                <span className="font-space text-[10px] text-[#A39AAE] flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#C084FC]" />
                  {step.period}
                </span>
              </div>
              <h4 className="font-space font-bold text-xs sm:text-sm text-white mb-1">
                {step.title}
              </h4>
              <p className="text-[10px] sm:text-xs text-[#C4BDCC] font-inter leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
