import React, { useState } from 'react';
import {
  Send,
  Mail,
  MapPin,
  Github,
  CheckCircle2,
  AlertCircle,
  Copy,
  ArrowDownToLine,
  Eye,
  FileText,
  X,
  ArrowUp,
  Sparkles,
} from 'lucide-react';
import { PERSONAL_INFO, ContactFormData, validateContactForm } from '../utils/portfolioData';

interface ContactProps {
  isActive?: boolean;
  onScrollToTop?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ isActive = true, onScrollToTop }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    subject: 'Portfolio Inquiry',
    message: '',
  });

  const [errors, setErrors] = useState<Record<keyof ContactFormData, string>>({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [showResumeModal, setShowResumeModal] = useState<boolean>(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
        stored.push({
          ...formData,
          timestamp: new Date().toISOString(),
        });
        localStorage.setItem('portfolio_messages', JSON.stringify(stored));
      } catch (err) {
        // Fallback
      }

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 400);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.socialLinks.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = PERSONAL_INFO.resumeUrl;
    link.download = 'Giridharan_D_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadNotice('Download initiated for Giridharan_D_Resume.pdf');
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  return (
    <section
      id="contact"
      className="presentation-slide bg-[#050505] select-none"
    >
      {/* Background purple ambience */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#7025B8]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-between pt-14 pb-2 sm:pt-16 sm:pb-3 relative z-10">
        
        {/* Section Heading with Dramatic Mask Reveal */}
        <div className="text-center sm:text-left mb-2 sm:mb-4">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#100B15] border border-white/10 text-[10px] sm:text-xs font-space tracking-widest text-[#C084FC] uppercase mb-1 transition-all duration-700 ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#A855F7]" />
            <span>SCREEN 07 // CONTACT & RESUME</span>
          </div>

          <div className="overflow-hidden">
            <h2
              className={`text-2xl sm:text-4xl font-space font-extrabold text-white tracking-tight transition-all duration-700 ease-out ${
                isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
              }`}
            >
              CONTACT & <span className="text-[#A855F7]">RESUME</span>
            </h2>
          </div>
        </div>

        {/* Two-Column Layout: Left (Resume & Channels) + Right (Contact Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 items-stretch my-auto">
          
          {/* LEFT: Resume Card + Direct Channels */}
          <div
            className={`lg:col-span-5 flex flex-col justify-between space-y-2.5 sm:space-y-3 transition-all duration-800 ${
              isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: isActive ? '150ms' : '0ms',
            }}
          >
            {/* Resume Card */}
            <div className="p-3.5 sm:p-5 rounded-2xl bg-[#100B15] border border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-[#A855F7]" />
                <h3 className="font-space font-bold text-sm text-white">
                  CURRICULUM VITAE
                </h3>
              </div>
              <p className="text-[11px] sm:text-xs text-[#A39AAE] font-inter mb-3">
                Explore academic qualifications, verified coursework, and software portfolio in PDF format.
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadResume}
                  className="flex-1 py-2 sm:py-2.5 px-3 rounded-xl bg-[#A855F7] hover:bg-[#9333EA] text-white font-space font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.35)]"
                >
                  <ArrowDownToLine className="w-3.5 h-3.5" />
                  <span>DOWNLOAD RESUME</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowResumeModal(true)}
                  className="py-2 sm:py-2.5 px-3 rounded-xl bg-[#050505] border border-white/15 text-[#C084FC] hover:text-white font-space text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                  title="Preview Summary"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">PREVIEW</span>
                </button>
              </div>

              {downloadNotice && (
                <div className="mt-2 p-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-space flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{downloadNotice}</span>
                </div>
              )}
            </div>

            {/* Direct Channels */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#100B15] border border-white/10 space-y-2">
              
              {/* Email Copier */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#050505] border border-white/10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="w-7 h-7 rounded-lg bg-[#A855F7]/15 flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5 text-[#A855F7]" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[9px] font-space text-[#A39AAE] uppercase">EMAIL</div>
                    <div className="text-xs font-space text-white truncate font-medium">
                      {PERSONAL_INFO.socialLinks.email}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={copyEmailToClipboard}
                  className="px-2.5 py-1 rounded-lg bg-[#100B15] hover:bg-[#A855F7] hover:text-white text-[#C084FC] text-[10px] font-space border border-white/15 transition-all shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              {/* GitHub Link */}
              <a
                href={PERSONAL_INFO.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 rounded-xl bg-[#050505] border border-white/10 hover:border-[#A855F7]/50 flex items-center gap-2 transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#A855F7]/15 flex items-center justify-center shrink-0">
                  <Github className="w-3.5 h-3.5 text-[#A855F7] group-hover:scale-110 transition-transform" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[9px] font-space text-[#A39AAE] uppercase">GITHUB PROFILE</div>
                  <div className="text-xs font-space text-white truncate group-hover:text-[#A855F7] transition-colors">
                    github.com/giridharan0204-dotcom
                  </div>
                </div>
              </a>

              {/* Location */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#050505] border border-white/10 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#A855F7]/15 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-[#A855F7]" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[9px] font-space text-[#A39AAE] uppercase">LOCATION</div>
                  <div className="text-xs font-space text-white truncate">
                    SKCET, Coimbatore, Tamil Nadu
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT: Compact Contact Form */}
          <div
            className={`lg:col-span-7 flex flex-col justify-center transition-all duration-800 ${
              isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: isActive ? '300ms' : '0ms',
            }}
          >
            <div className="p-3.5 sm:p-5 rounded-2xl bg-[#100B15] border border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.6)]">
              {isSuccess ? (
                <div className="text-center py-6 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-2 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-space font-bold text-lg text-white mb-1">
                    MESSAGE RECORDED
                  </h3>
                  <p className="text-xs font-inter text-[#A39AAE] max-w-sm mx-auto mb-4">
                    Thank you, <strong className="text-white">{formData.fullName}</strong>! Your inquiry has been saved.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({ fullName: '', email: '', subject: 'Portfolio Inquiry', message: '' });
                    }}
                    className="px-4 py-2 rounded-xl bg-[#050505] border border-white/20 text-white font-space text-xs font-semibold cursor-pointer"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                    <h3 className="font-space font-bold text-xs sm:text-sm text-white uppercase tracking-wider">
                      SEND A MESSAGE
                    </h3>
                    <span className="font-space text-[10px] text-[#A855F7] flex items-center gap-1 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
                      AVAILABLE
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                    {/* Name */}
                    <div>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Your Name *"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 rounded-xl bg-[#050505] border text-white font-inter text-xs focus:outline-none transition-colors ${
                          errors.fullName ? 'border-red-400' : 'border-white/10 focus:border-[#A855F7]'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-0.5 text-[10px] text-red-400 font-inter flex items-center gap-1">
                          <AlertCircle className="w-2.5 h-2.5" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your Email *"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 rounded-xl bg-[#050505] border text-white font-inter text-xs focus:outline-none transition-colors ${
                          errors.email ? 'border-red-400' : 'border-white/10 focus:border-[#A855F7]'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-0.5 text-[10px] text-red-400 font-inter flex items-center gap-1">
                          <AlertCircle className="w-2.5 h-2.5" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Your message or project collaboration details... *"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 rounded-xl bg-[#050505] border text-white font-inter text-xs focus:outline-none transition-colors resize-none ${
                        errors.message ? 'border-red-400' : 'border-white/10 focus:border-[#A855F7]'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-0.5 text-[10px] text-red-400 font-inter flex items-center gap-1">
                        <AlertCircle className="w-2.5 h-2.5" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-xl bg-[#A855F7] hover:bg-[#9333EA] text-white font-space font-bold text-xs tracking-wider transition-all shadow-[0_0_20px_rgba(168,85,247,0.35)] flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>SENDING...</span>
                    ) : (
                      <>
                        <span>TRANSMIT MESSAGE</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Quiet Bottom Strip */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-xs font-inter text-[#A39AAE]">
          <div>
            © {new Date().getFullYear()} Giridharan D · B.Tech Information Technology · SKCET
          </div>
          <button
            type="button"
            onClick={onScrollToTop}
            className="flex items-center gap-1 text-[#C084FC] hover:text-white transition-colors cursor-pointer"
            title="Return to Slide 01"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* Resume Preview Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#100B15] border border-white/20 rounded-2xl p-5 sm:p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowResumeModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-[#050505] border border-white/15 text-[#A39AAE] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-space font-extrabold text-lg text-white mb-1">
              Resume Credentials Summary
            </h3>
            <p className="text-xs font-inter text-[#A39AAE] mb-4">
              Giridharan D · B.Tech IT · SKCET Coimbatore
            </p>

            <div className="space-y-2.5 text-left font-inter text-xs text-[#C4BDCC]">
              <div className="p-3 rounded-xl bg-[#050505] border border-white/10">
                <div className="font-space font-bold text-white text-xs mb-0.5">Academic Standing</div>
                <div>CGPA: 9.2 / 10.0 · Second Year · Expected Graduation 2029</div>
                <div className="text-[#A39AAE] text-[11px]">Sri Krishna College of Engineering and Technology</div>
              </div>

              <div className="p-3 rounded-xl bg-[#050505] border border-white/10">
                <div className="font-space font-bold text-white text-xs mb-0.5">Core Technical Stack</div>
                <div>Java, C, C++, HTML, CSS, JavaScript, SQL, Firebase, Git, GitHub</div>
              </div>

              <div className="p-3 rounded-xl bg-[#050505] border border-white/10">
                <div className="font-space font-bold text-white text-xs mb-0.5">Notable Projects</div>
                <div>Kerala HealthMap (Award Winner), Campus Connect, Udaan, CyberInbox</div>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-4 mt-4 border-t border-white/10">
              <button
                type="button"
                onClick={handleDownloadResume}
                className="px-4 py-2 rounded-xl bg-[#A855F7] text-white font-space font-bold text-xs"
              >
                DOWNLOAD FULL PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
