import React from 'react';
import { 
  CreditCard, 
  PlayCircle, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  FileCheck2,
  ArrowLeft
} from 'lucide-react';
import { Language, translations } from '../translations';

interface Page1Props {
  language: Language;
  onHaveCard: () => void;
  onBackToPortals?: () => void;
}

export const Page1: React.FC<Page1Props> = ({ language, onHaveCard, onBackToPortals }) => {
  const t = translations[language];
  const YOUTUBE_VIDEO_URL = 'https://youtu.be/VZyj6j-Ja-4';
  const OFFICIAL_APPLY_URL = 'https://beneficiary.nha.gov.in';

  const handleDontHaveCard = () => {
    window.open(YOUTUBE_VIDEO_URL, '_blank', 'noopener,noreferrer');
  };

  const handleApplyOfficial = () => {
    window.open(OFFICIAL_APPLY_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col justify-center space-y-6">
      
      {/* Back to Portals Button */}
      {onBackToPortals && (
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToPortals}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-900 bg-white hover:bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'hi' ? 'पोर्टल चयन पर वापस जाएं' : 'Back to Portal Selection'}</span>
          </button>

          <span className="text-[11px] font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
            Citizen / User Mode
          </span>
        </div>
      )}

      {/* Official Badge & Welcome Headline */}
      <div className="text-center space-y-3 mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-blue-200/80 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>{t.badgeText}</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t.mainTitle} <span className="text-blue-900 underline decoration-sky-400 decoration-3 underline-offset-4">{t.mainTitleHighlight}</span>
        </h2>
        
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          {t.mainDesc}
        </p>
      </div>

      {/* Three Minimalist Psychological Decision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        
        {/* OPTION 1: I HAVE AYUSHMAN CARD */}
        <button
          onClick={onHaveCard}
          className="group relative text-left bg-white rounded-2xl p-6 border-2 border-blue-900/25 hover:border-blue-900 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100/70 to-sky-50 rounded-bl-full -z-0 group-hover:scale-110 transition-transform"></div>
          
          <div className="relative z-10 space-y-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-600"></span>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">{t.card1Badge}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-blue-900 transition-colors">
                {t.card1Title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">{t.card1Sub}</p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.card1Desc}
            </p>

            <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{t.card1Point1}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{t.card1Point2}</span>
              </li>
            </ul>
          </div>

          <div className="relative z-10 mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-blue-900 group-hover:text-blue-950">
            <span>{t.card1Cta}</span>
            <div className="w-7 h-7 rounded-full bg-blue-50 group-hover:bg-blue-900 group-hover:text-white flex items-center justify-center transition-colors">
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </button>

        {/* OPTION 2: APPLY FOR AYUSHMAN CARD (OFFICIAL GOVT PORTAL) */}
        <div
          onClick={handleApplyOfficial}
          className="group relative text-left bg-white rounded-2xl p-6 border-2 border-emerald-600/30 hover:border-emerald-600 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-100"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-100/70 to-teal-50 rounded-bl-full -z-0 group-hover:scale-110 transition-transform"></div>

          <div className="relative z-10 space-y-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <FileCheck2 className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-600"></span>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">{t.card2Badge}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-emerald-900 transition-colors">
                {t.card2Title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">{t.card2Sub}</p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.card2Desc}
            </p>

            <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{t.card2Point1}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{t.card2Point2}</span>
              </li>
            </ul>
          </div>

          <div className="relative z-10 mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-emerald-800 group-hover:text-emerald-950">
            <span className="flex items-center gap-1">
              {t.card2Cta}
              <ExternalLink className="w-3 h-3" />
            </span>
            <div className="w-7 h-7 rounded-full bg-emerald-50 group-hover:bg-emerald-700 group-hover:text-white flex items-center justify-center transition-colors">
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* OPTION 3: I DON'T HAVE AYUSHMAN CARD (YOUTUBE TUTORIAL) */}
        <div
          onClick={handleDontHaveCard}
          className="group relative text-left bg-white rounded-2xl p-6 border-2 border-amber-500/30 hover:border-amber-600 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer focus:outline-none focus:ring-4 focus:ring-amber-100"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-100/70 to-orange-50 rounded-bl-full -z-0 group-hover:scale-110 transition-transform"></div>

          <div className="relative z-10 space-y-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <PlayCircle className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-600"></span>
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">{t.card3Badge}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-amber-900 transition-colors">
                {t.card3Title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">{t.card3Sub}</p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.card3Desc}
            </p>

            <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{t.card3Point1}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{t.card3Point2}</span>
              </li>
            </ul>
          </div>

          <div className="relative z-10 mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-amber-800 group-hover:text-amber-950">
            <span className="flex items-center gap-1">
              {t.card3Cta}
              <ExternalLink className="w-3 h-3" />
            </span>
            <div className="w-7 h-7 rounded-full bg-amber-50 group-hover:bg-amber-600 group-hover:text-white flex items-center justify-center transition-colors">
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>

      </div>

      {/* Trust & Key Metrics Bar */}
      <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="p-3.5 rounded-xl bg-white border border-slate-200/70 shadow-2xs">
          <div className="text-lg sm:text-xl font-black text-blue-900">{t.metric1Val}</div>
          <div className="text-xs text-slate-600 font-medium">{t.metric1Label}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-slate-200/70 shadow-2xs">
          <div className="text-lg sm:text-xl font-black text-emerald-700">{t.metric2Val}</div>
          <div className="text-xs text-slate-600 font-medium">{t.metric2Label}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-slate-200/70 shadow-2xs">
          <div className="text-lg sm:text-xl font-black text-sky-800">{t.metric3Val}</div>
          <div className="text-xs text-slate-600 font-medium">{t.metric3Label}</div>
        </div>
      </div>
    </main>
  );
};
