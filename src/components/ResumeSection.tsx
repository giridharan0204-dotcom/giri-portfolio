import React, { useState } from 'react';
import { ArrowDownToLine, Eye, FileText, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { PERSONAL_INFO } from '../utils/portfolioData';

export const ResumeSection: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleDownload = () => {
    // Triggers download of the specified resume path
    const link = document.createElement('a');
    link.href = PERSONAL_INFO.resumeUrl;
    link.download = 'Giridharan_D_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadNotice('Download initiated for Giridharan_D_Resume.pdf');
    setTimeout(() => setDownloadNotice(null), 4000);
  };

  return (
    <section id="resume" className="relative py-24 bg-[#080609] overflow-hidden border-t border-white/5">
      {/* Background purple ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#A855F7]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Heading */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#17111F] border border-white/10 text-xs font-space tracking-widest text-[#C4A1FF] uppercase mb-3">
          <FileText className="w-3.5 h-3.5 text-[#A855F7]" />
          <span>CURRICULUM VITAE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-space font-extrabold text-white tracking-tight mb-4">
          LET'S MAKE <span className="text-[#A855F7]">SOMETHING GREAT</span>
        </h2>

        <p className="text-[#B7AFBF] font-inter text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed">
          Explore my academic background, technical skills, and development projects.
        </p>

        {/* Action Card */}
        <div className="rounded-3xl bg-[#17111F] border border-white/10 p-8 sm:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.8)] relative">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <div className="font-space font-bold text-lg text-white mb-1">
                Giridharan D — Resume (PDF)
              </div>
              <div className="text-xs font-inter text-[#81798A]">
                Configured path: <code className="text-[#C4A1FF] bg-[#100B16] px-2 py-0.5 rounded font-mono">{PERSONAL_INFO.resumeUrl}</code>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleDownload}
                className="flex-1 sm:flex-initial px-6 py-3 rounded-full bg-[#A855F7] hover:bg-[#9333EA] text-white font-space font-bold text-xs sm:text-sm tracking-wider shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>DOWNLOAD RESUME</span>
                <ArrowDownToLine className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="px-4 py-3 rounded-full bg-[#100B16] hover:bg-[#080609] border border-white/15 text-[#B7AFBF] hover:text-white font-space text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                title="Preview Credentials Summary"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">PREVIEW</span>
              </button>
            </div>
          </div>

          {downloadNotice && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-space flex items-center justify-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>{downloadNotice}</span>
            </div>
          )}
        </div>

      </div>

      {/* Preview Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#17111F] border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-[#100B16] border border-white/15 text-[#B7AFBF] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-space font-extrabold text-xl text-white mb-2">
              Credentials & Profile Summary
            </h3>
            <p className="text-xs font-inter text-[#81798A] mb-6">
              Giridharan D · B.Tech Information Technology · SKCET
            </p>

            <div className="space-y-4 text-left font-inter text-xs text-[#B7AFBF]">
              <div className="p-4 rounded-xl bg-[#100B16] border border-white/10">
                <div className="font-space font-bold text-white text-sm mb-1">Academic Standing</div>
                <div>CGPA: 9.2 / 10.0 · Second Year · Expected Graduation 2029</div>
                <div className="text-[#81798A] mt-1">Sri Krishna College of Engineering and Technology, Coimbatore</div>
              </div>

              <div className="p-4 rounded-xl bg-[#100B16] border border-white/10">
                <div className="font-space font-bold text-white text-sm mb-1">Technical Stack</div>
                <div>Java, C, C++, HTML, CSS, JavaScript, SQL, Firebase, Git, GitHub</div>
              </div>

              <div className="p-4 rounded-xl bg-[#100B16] border border-white/10">
                <div className="font-space font-bold text-white text-sm mb-1">Notable Projects</div>
                <div>Kerala HealthMap (Award Winner), Campus Connect, Udaan, CyberInbox</div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-white/10">
              <button
                type="button"
                onClick={handleDownload}
                className="px-5 py-2.5 rounded-xl bg-[#A855F7] text-white font-space font-bold text-xs"
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
