import React from 'react';
import { Github, ArrowUpRight, Sparkles } from 'lucide-react';
import { PROJECTS_DATA } from '../utils/portfolioData';

interface ProjectsProps {
  isActive?: boolean;
}

export const Projects: React.FC<ProjectsProps> = ({ isActive = true }) => {
  return (
    <section
      id="projects"
      className="presentation-slide bg-[#050505] select-none"
    >
      {/* Subtle purple atmospheric lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#7025B8]/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-center pt-14 pb-4 sm:pt-16 sm:pb-6 relative z-10">
        
        {/* Section Heading with Mask Reveal */}
        <div className="text-center sm:text-left mb-4 sm:mb-6">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#100B15] border border-white/10 text-[10px] sm:text-xs font-space tracking-widest text-[#C084FC] uppercase mb-1.5 transition-all duration-700 ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#A855F7]" />
            <span>SCREEN 04 // SELECTED WORKS</span>
          </div>

          <div className="overflow-hidden">
            <h2
              className={`text-2xl sm:text-4xl font-space font-extrabold text-white tracking-tight transition-all duration-700 ease-out ${
                isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
              }`}
            >
              SELECTED <span className="text-[#A855F7]">WORKS.</span>
            </h2>
          </div>

          <p
            className={`text-xs sm:text-sm text-[#A39AAE] font-inter mt-0.5 transition-all duration-700 ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            A minimalist portfolio index of notable software development projects.
          </p>
        </div>

        {/* Minimalist Projects List: Sequential Row Appearance + Animating Dividers */}
        <div className="rounded-2xl bg-[#100B15]/60 backdrop-blur-sm border border-white/10 overflow-hidden divide-y divide-white/10">
          {PROJECTS_DATA.map((project, index) => {
            const githubUrl = project.githubUrl || 'https://github.com/giridharan0204-dotcom';

            return (
              <div
                key={project.id}
                className={`relative transition-all duration-800 ${
                  isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${200 + index * 120}ms`,
                }}
              >
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group py-4 sm:py-5 lg:py-6 px-3 sm:px-6 flex items-center justify-between gap-4 transition-colors duration-200 hover:bg-white/[0.04] cursor-pointer"
                >
                  {/* Left: Project Number & Large Project Name */}
                  <div className="flex items-center gap-3 sm:gap-6 min-w-0">
                    <span className="font-space font-semibold text-xs sm:text-sm text-[#A39AAE] group-hover:text-[#A855F7] transition-colors tabular-nums shrink-0">
                      {project.number}
                    </span>
                    <h3 className="font-space font-bold text-base sm:text-2xl lg:text-3xl text-white group-hover:text-[#A855F7] transition-colors tracking-tight truncate">
                      {project.title}
                    </h3>
                  </div>

                  {/* Right: Minimal GitHub Icon & View Source (Fades In) */}
                  <div
                    className={`flex items-center gap-2 text-xs font-space text-[#C4BDCC] group-hover:text-white transition-all duration-700 shrink-0 ${
                      isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                    style={{ transitionDelay: `${350 + index * 120}ms` }}
                  >
                    <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A855F7] group-hover:scale-110 transition-transform" />
                    <span className="font-medium tracking-wide">VIEW SOURCE</span>
                    <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C084FC] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              </div>
            );
          })}
        </div>

        {/* Bottom indicator */}
        <div
          className={`mt-3 sm:mt-5 text-right transition-opacity duration-700 ${
            isActive ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          <span className="text-[10px] sm:text-xs font-space text-[#A39AAE]">
            Direct repositories hosted on GitHub · Source code verified
          </span>
        </div>

      </div>
    </section>
  );
};
