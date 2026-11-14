import React from 'react';
import { ArrowUp, Github, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../utils/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-[#080609] border-t border-white/5 py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="flex items-center gap-1 font-space font-extrabold text-2xl tracking-tighter text-white mb-1"
            >
              <span>GD</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7] shadow-[0_0_10px_#A855F7]" />
            </a>
            <p className="text-xs font-inter text-[#81798A]">
              Designed with creativity. Built with code.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-space font-medium text-[#B7AFBF] hover:text-[#A855F7] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* External Links & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-[#17111F] border border-white/10 text-[#B7AFBF] hover:text-white hover:border-[#A855F7]/50 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.socialLinks.email}`}
              className="p-2 rounded-xl bg-[#17111F] border border-white/10 text-[#B7AFBF] hover:text-white hover:border-[#A855F7]/50 transition-colors"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-[#17111F] border border-white/10 text-[#C4A1FF] hover:bg-[#A855F7] hover:text-white transition-all cursor-pointer"
              aria-label="Scroll to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-inter text-[#81798A]">
          <div>
            © {new Date().getFullYear()} Giridharan D. All rights reserved.
          </div>
          <div>
            B.Tech Information Technology · SKCET
          </div>
        </div>

      </div>
    </footer>
  );
};
