import React from 'react';
import { PhoneCall, HeartPulse, Languages, Globe } from 'lucide-react';
import { Language, translations } from '../translations';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  onHomeClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ language, onToggleLanguage, onHomeClick }) => {
  const t = translations[language];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      {/* Top Tricolor Strip - Subtle National Identity */}
      <div className="h-1 w-full flex">
        <div className="w-1/3 bg-[#FF9933]"></div>
        <div className="w-1/3 bg-white border-y border-slate-100"></div>
        <div className="w-1/3 bg-[#138808]"></div>
      </div>

      {/* Main Bar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
        {/* Left Side: Language Switcher Box + Brand */}
        <div className="flex items-center gap-3">
          {/* Language Selector Box */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-900 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold transition-all shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
            title="भाषा बदलें / Change Language"
          >
            <Languages className="w-3.5 h-3.5 text-blue-900" />
            <span className="font-bold">{language === 'en' ? 'हिन्दी' : 'English'}</span>
            <span className="text-[10px] text-slate-400 font-normal">({language === 'en' ? 'HI' : 'EN'})</span>
          </button>

          {/* Logo & Portal Branding */}
          <div 
            onClick={onHomeClick}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-900 to-sky-700 flex items-center justify-center text-white shadow-sm ring-1 ring-blue-950/10 group-hover:scale-105 transition-transform shrink-0">
              <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-sky-800 bg-sky-50 px-1.5 py-0.2 rounded border border-sky-200/60">
                  {t.portalBadge}
                </span>
              </div>
              <h1 className="text-sm sm:text-base md:text-lg font-extrabold text-slate-900 leading-tight tracking-tight">
                {t.portalTitle} <span className="text-blue-900 font-semibold">{t.portalSubtitle}</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Right Side: Official Helpline Pill */}
        <div className="flex items-center gap-2">
          <a
            href="tel:14555"
            className="flex items-center gap-1.5 sm:gap-2 bg-slate-50 hover:bg-blue-50/70 text-slate-700 hover:text-blue-900 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-200 text-xs sm:text-sm font-medium transition-colors"
            title="Call 24x7 Toll-Free National Health Authority Helpline"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-600 animate-pulse shrink-0" />
            <span className="hidden md:inline text-slate-500">{t.tollFree}</span>
            <span className="font-bold text-slate-900">14555</span>
          </a>
        </div>
      </div>
    </header>
  );
};
