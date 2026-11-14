import React from 'react';
import { Github, Globe, ArrowUpRight, Sparkles } from 'lucide-react';
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

      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-center py-2 sm:py-4 relative z-10 min-h-0">
        
        {/* Section Heading with Mask Reveal */}
        <div className="text-center sm:text-left mb-3 sm:mb-5 shrink-0">
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 rounded-full bg-[#100B15] border border-white/10 text-[9px] sm:text-xs font-space tracking-widest text-[#C084FC] uppercase mb-1 transition-all duration-700 ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
            }`}
          >
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#A855F7]" />
            <span>SCREEN 04 // SELECTED WORKS</span>
          </div>

          <div className="overflow-hidden">
            <h2
              className={`text-xl sm:text-3xl lg:text-4xl font-space font-extrabold text-white tracking-tight leading-none transition-all duration-700 ease-out ${
                isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
              }`}
            >
              SELECTED <span className="text-[#A855F7]">WORKS.</span>
            </h2>
          </div>

          <p
            className={`text-[11px] sm:text-sm text-[#A39AAE] font-inter mt-0.5 transition-all duration-700 ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            A minimalist portfolio index of freelance work and hackathon builds.
          </p>
        </div>

        {/* Minimalist Projects List: Sequential Row Appearance + Animating Dividers */}
        <div className="rounded-2xl bg-[#100B15]/60 backdrop-blur-sm border border-white/10 overflow-hidden divide-y divide-white/10">
          {PROJECTS_DATA.map((project, index) => {
            const primaryUrl = project.liveUrl || project.githubUrl || 'https://github.com/giridharan0204-dotcom';

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
                <div className="group py-3 sm:py-4 lg:py-5 px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 transition-colors duration-200 hover:bg-white/[0.04]">
                  {/* Left: Project Number, Name & Role/Award Subtitle Below */}
                  <a
                    href={primaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start sm:items-center gap-2.5 sm:gap-6 min-w-0 flex-1 cursor-pointer"
                  >
                    <span className="font-space font-semibold text-[11px] sm:text-sm text-[#A39AAE] group-hover:text-[#A855F7] transition-colors tabular-nums shrink-0 pt-0.5 sm:pt-0">
                      {project.number}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-space font-bold text-sm sm:text-2xl lg:text-3xl text-white group-hover:text-[#A855F7] transition-colors tracking-tight truncate">
                        {project.title}
                      </h3>
                      {project.badge && (
                        <p className="font-space text-[9px] sm:text-xs tracking-wider uppercase text-[#C084FC]/85 mt-0.5 truncate">
                          {project.badge}
                        </p>
                      )}
                    </div>
                  </a>

                  {/* Right: Minimal Live / GitHub Links */}
                  <div
                    className={`flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-space text-[#C4BDCC] transition-all duration-700 shrink-0 ${
                      isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                    style={{ transitionDelay: `${350 + index * 120}ms` }}
                  >
                    {project.liveUrl && project.id === 'meeting-registration' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 hover:text-[#A855F7] transition-colors cursor-pointer"
                      >
                        <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A855F7]" />
                        <span className="font-medium tracking-wide">LIVE SITE</span>
                        <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C084FC]" />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 hover:text-[#A855F7] transition-colors cursor-pointer"
                      >
                        <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A855F7]" />
                        <span className="font-medium tracking-wide">VIEW SOURCE</span>
                        <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C084FC]" />
                      </a>
                    )}
                  </div>
                </div>
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
            Live freelance deployments & GitHub source repositories
          </span>
        </div>

      </div>
    </section>
  );
};
