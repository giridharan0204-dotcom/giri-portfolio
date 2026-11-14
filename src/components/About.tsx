import React, { useRef, useEffect } from 'react';
import { Award, Calendar, BookOpen, Sparkles, Code, Globe, Compass, Lightbulb, Target } from 'lucide-react';
import { ABOUT_VIDEO } from '../utils/portfolioData';

interface AboutProps {
  isActive?: boolean;
}

export const About: React.FC<AboutProps> = ({ isActive = true }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);
  return (
    <section
      id="about"
      className="presentation-slide bg-[#050505] select-none"
    >
      {/* Background purple ambience */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#7025B8]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-center pt-14 pb-4 sm:pt-16 sm:pb-6 relative z-10">
        
        {/* Section Heading with Mask Reveal */}
        <div className="text-center sm:text-left mb-3 sm:mb-5">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#100B15] border border-white/10 text-[10px] sm:text-xs font-space tracking-widest text-[#C084FC] uppercase mb-1.5 transition-all duration-700 ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#A855F7]" />
            <span>SCREEN 02 // PERSONAL PROFILE</span>
          </div>

          <div className="overflow-hidden">
            <h2
              className={`text-2xl sm:text-4xl font-space font-extrabold text-white tracking-tight transition-all duration-700 ease-out ${
                isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
              }`}
            >
              ABOUT <span className="text-[#A855F7]">ME</span>
            </h2>
          </div>
        </div>

        {/* Responsive Content Grid: Two-column desktop, compact vertical mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
          
          {/* LEFT: Portrait Image with Smooth Slide Entrance */}
          <div
            className={`lg:col-span-4 flex flex-col items-center justify-center transition-all duration-900 ${
              isActive ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-12 scale-90'
            }`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: isActive ? '150ms' : '0ms',
            }}
          >
            <div className="relative w-36 h-36 sm:w-52 sm:h-52 lg:w-64 lg:h-64 flex items-center justify-center">
              {/* Outer Purple Aura */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#7025B8]/30 via-[#A855F7]/35 to-transparent blur-[35px]" />
              
              {/* Glowing Purple Border Ring */}
              <div className="absolute inset-1 rounded-full border border-[#A855F7]/50 shadow-[0_0_25px_rgba(168,85,247,0.35)]" />
              
              {/* Profile Video */}
              <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-2 border-white/10 bg-[#100B15] flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={ABOUT_VIDEO}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-[40%_center] filter brightness-105"
                />
              </div>
            </div>

            {/* Credential Tag */}
            <div className="mt-2.5 px-3 py-1 rounded-full bg-[#100B15] border border-white/10 text-[10px] sm:text-xs font-space text-[#C084FC] tracking-wider text-center">
              SKCET · B.Tech IT '29 · Coimbatore, TN
            </div>
          </div>

          {/* RIGHT: Complete Introduction, Hobbies, Metrics & Personal Goal (Sequential Fade) */}
          <div className="lg:col-span-8 flex flex-col space-y-2.5 sm:space-y-3.5 text-left">
            
            {/* Complete Verbatim Personal Introduction */}
            <div
              className={`p-3.5 sm:p-5 rounded-2xl bg-[#100B15] border border-white/10 shadow-lg transition-all duration-800 ${
                isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: isActive ? '300ms' : '0ms',
              }}
            >
              <p className="font-inter text-xs sm:text-sm text-[#E2D9EC] leading-relaxed mb-2">
                I'm <strong className="text-white font-semibold">Giridharan D</strong>, a second-year B.Tech Information Technology student at Sri Krishna College of Engineering and Technology, Coimbatore.
              </p>
              <p className="font-inter text-xs sm:text-sm text-[#A39AAE] leading-relaxed mb-2">
                I enjoy creating websites, exploring software development, freelancing, and solving logical problems.
              </p>
              <p className="font-inter text-xs sm:text-sm text-[#C084FC] font-medium leading-relaxed italic">
                "I believe in learning through building and continuously improving my technical abilities."
              </p>
            </div>

            {/* Hobbies & Core Focus Areas (Staggered fade) */}
            <div
              className={`grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 transition-all duration-800 ${
                isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: isActive ? '450ms' : '0ms',
              }}
            >
              {[
                { title: 'Website Creation', icon: Globe, desc: 'Creative UI/UX' },
                { title: 'Software Dev', icon: Code, desc: 'Systems & Logic' },
                { title: 'Freelancing', icon: Compass, desc: 'Client Delivery' },
                { title: 'Problem Solving', icon: Lightbulb, desc: 'DSA & Algorithms' },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-2 sm:p-2.5 rounded-xl bg-[#100B15]/90 border border-white/10 flex items-center gap-2 hover:border-[#A855F7]/50 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-lg bg-[#A855F7]/15 flex items-center justify-center shrink-0">
                      <IconComponent className="w-3.5 h-3.5 text-[#A855F7]" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-space font-bold text-[11px] text-white truncate">
                        {item.title}
                      </div>
                      <div className="text-[9px] font-inter text-[#A39AAE] truncate">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Academic Metrics Strip & Personal Goal */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 transition-all duration-800 ${
                isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: isActive ? '600ms' : '0ms',
              }}
            >
              {/* CGPA */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-[#100B15] border border-[#A855F7]/30 flex items-center gap-3">
                <Award className="w-6 h-6 text-[#A855F7] shrink-0" />
                <div>
                  <div className="text-[9px] font-space text-[#A39AAE] uppercase">ACADEMIC CGPA</div>
                  <div className="text-lg sm:text-xl font-space font-extrabold text-[#A855F7]">9.2 / 10.0</div>
                </div>
              </div>

              {/* Standing */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-[#100B15] border border-white/10 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-[#C084FC] shrink-0" />
                <div>
                  <div className="text-[9px] font-space text-[#A39AAE] uppercase">CURRENT STANDING</div>
                  <div className="text-lg sm:text-xl font-space font-extrabold text-white">Year 02 of 04</div>
                </div>
              </div>

              {/* Graduation */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-[#100B15] border border-white/10 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-white shrink-0" />
                <div>
                  <div className="text-[9px] font-space text-[#A39AAE] uppercase">GRADUATION</div>
                  <div className="text-lg sm:text-xl font-space font-extrabold text-[#C084FC]">Class of 2029</div>
                </div>
              </div>
            </div>

            {/* Personal Goal */}
            <div
              className={`p-2.5 sm:p-3 rounded-xl bg-[#100B15] border border-white/10 flex items-center gap-2.5 transition-all duration-800 ${
                isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: isActive ? '750ms' : '0ms',
              }}
            >
              <Target className="w-4 h-4 text-[#A855F7] shrink-0" />
              <p className="text-[11px] sm:text-xs font-inter text-[#C4BDCC]">
                <strong className="text-white font-medium">Personal Goal:</strong> To master modern software engineering, deliver robust systems, and build scalable web architectures.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
