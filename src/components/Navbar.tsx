import React, { useState } from 'react';
import { Menu, X, ArrowDownToLine } from 'lucide-react';
import { downloadResumePdf } from '../utils/generateResumePdf';

export interface NavItem {
  name: string;
  href: string;
  id: string;
}

export const NAV_ITEMS: NavItem[] = [
  { name: 'HOME', href: '#home', id: 'home' },
  { name: 'ABOUT', href: '#about', id: 'about' },
  { name: 'SKILLS', href: '#skills', id: 'skills' },
  { name: 'PROJECTS', href: '#projects', id: 'projects' },
  { name: 'JOURNEY', href: '#journey', id: 'journey' },
  { name: 'INTERESTS', href: '#interests', id: 'interests' },
  { name: 'CONTACT', href: '#contact', id: 'contact' },
];

interface NavbarProps {
  activeSection?: string;
  onNavigate?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection = 'home',
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const targetElement = document.getElementById(id);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleDownloadResume = () => {
    downloadResumePdf('Giridharan_D_Resume.pdf');
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/85 backdrop-blur-md border-b border-white/10 py-2 sm:py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
      style={{ paddingTop: 'max(0.5rem, env(safe-area-inset-top, 0px))' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - Exactly matching GD. with purple dot from reference image */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="flex items-center gap-1 font-space font-extrabold text-xl sm:text-2xl tracking-tighter text-white group cursor-pointer"
          >
            <span>GD</span>
            <span
              aria-hidden="true"
              className="text-[#A855F7] text-xl sm:text-2xl leading-none drop-shadow-[0_0_10px_rgba(168,85,247,0.85)] group-hover:scale-110 transition-transform"
            >
              Σ
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-space tracking-wider">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`relative py-1 font-semibold transition-colors duration-200 uppercase cursor-pointer ${
                    isActive ? 'text-white' : 'text-[#A39AAE] hover:text-white'
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A855F7] shadow-[0_0_10px_#A855F7]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions: RESUME pill button matching reference image */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadResume}
              className="px-4 py-1.5 rounded-full bg-[#100B15] border border-[#A855F7]/40 text-white font-space font-semibold text-xs tracking-wider hover:border-[#A855F7] hover:bg-[#A855F7]/15 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>RESUME</span>
              <ArrowDownToLine className="w-3.5 h-3.5 text-[#C084FC]" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg bg-[#100B15] border border-white/10 text-[#C084FC] hover:text-white"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-3 p-4 rounded-2xl bg-[#100B15] border border-white/15 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-space font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'text-white bg-[#050505] border border-[#A855F7]/40'
                      : 'text-[#A39AAE] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />}
                </a>
              );
            })}

            <div className="pt-2 mt-1 border-t border-white/10 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleDownloadResume}
                className="w-full py-2.5 rounded-xl bg-[#A855F7] text-white font-space font-bold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.35)]"
              >
                <span>DOWNLOAD RESUME</span>
                <ArrowDownToLine className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
