import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../utils/portfolioData';

export const SocialRail: React.FC = () => {
  return (
    <aside
      aria-label="Social connections"
      className="hidden lg:flex fixed left-5 bottom-8 z-40 flex-col items-center gap-3 text-[#B7AFBF]"
    >
      <a
        href={PERSONAL_INFO.socialLinks.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub Profile"
        className="p-1 hover:text-[#A855F7] hover:scale-110 transition-all duration-200"
        title="GitHub Profile"
      >
        <Github className="w-4 h-4" />
      </a>

      <div className="w-px h-3 bg-white/20" />

      <a
        href={`mailto:${PERSONAL_INFO.socialLinks.email}`}
        aria-label="Send Email"
        className="p-1 hover:text-[#A855F7] hover:scale-110 transition-all duration-200"
        title="Email Giridharan"
      >
        <Mail className="w-4 h-4" />
      </a>
    </aside>
  );
};

