import React from 'react';
import { 
  Users, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  HeartHandshake,
  Search,
  Stethoscope,
  Activity
} from 'lucide-react';
import { Language, translations } from '../translations';

interface Page0Props {
  language: Language;
  onSelectUserLogin: () => void;
  onSelectAdminLogin: () => void;
}

export const Page0: React.FC<Page0Props> = ({ 
  language, 
  onSelectUserLogin, 
  onSelectAdminLogin 
}) => {
  const t = translations[language];

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col justify-center">
      
      {/* Directory Headline */}
      <div className="text-center space-y-3 mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-blue-200/80 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>{t.p0Badge}</span>
        </div>
        
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          {t.p0MainTitle} <span className="text-blue-900 underline decoration-sky-400 decoration-4 underline-offset-6">{t.p0MainTitleHighlight}</span>
        </h2>
        
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t.p0Desc}
        </p>
      </div>

      {/* Dual Entry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        
        {/* CARD 1: PATIENTS & CITIZENS */}
        <button
          onClick={onSelectUserLogin}
          className="group relative text-left bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-900/20 hover:border-blue-900 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/70 to-sky-100/30 rounded-bl-full -z-0 group-hover:scale-110 transition-transform"></div>
          
          <div className="relative z-10 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-900 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Search className="w-7 h-7" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-600"></span>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">{t.p0UserCardBadge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 group-hover:text-blue-900 transition-colors">
                {t.p0UserCardTitle}
              </h3>
              <p className="text-xs text-slate-500 font-medium">{t.p0UserCardSub}</p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.p0UserCardDesc}
            </p>

            <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.p0UserPoint1}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.p0UserPoint2}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.p0UserPoint3}</span>
              </li>
            </ul>
          </div>

          <div className="relative z-10 mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-blue-900 group-hover:text-blue-950">
            <span>{t.p0UserCta}</span>
            <div className="w-9 h-9 rounded-full bg-blue-50 group-hover:bg-blue-900 group-hover:text-white flex items-center justify-center transition-colors">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </button>

        {/* CARD 2: HOSPITAL FACILITY DESK */}
        <button
          onClick={onSelectAdminLogin}
          className="group relative text-left bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-300 hover:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer focus:outline-none focus:ring-4 focus:ring-slate-200"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-200/60 to-indigo-100/30 rounded-bl-full -z-0 group-hover:scale-110 transition-transform"></div>

          <div className="relative z-10 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Building2 className="w-7 h-7" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
                <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">{t.p0AdminCardBadge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 group-hover:text-slate-950 transition-colors">
                {t.p0AdminCardTitle}
              </h3>
              <p className="text-xs text-slate-500 font-medium">{t.p0AdminCardSub}</p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.p0AdminCardDesc}
            </p>

            <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                <span>{t.p0AdminPoint1}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                <span>{t.p0AdminPoint2}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                <span>{t.p0AdminPoint3}</span>
              </li>
            </ul>
          </div>

          <div className="relative z-10 mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-slate-800 group-hover:text-slate-950">
            <span>{t.p0AdminCta}</span>
            <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-slate-900 group-hover:text-white flex items-center justify-center transition-colors">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </button>

      </div>

      {/* Metrics Bar */}
      <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-2xs">
          <div className="text-xl sm:text-2xl font-black text-blue-900">{t.metric1Val}</div>
          <div className="text-xs text-slate-600 font-medium mt-0.5">{t.metric1Label}</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-2xs">
          <div className="text-xl sm:text-2xl font-black text-emerald-700">{t.metric2Val}</div>
          <div className="text-xs text-slate-600 font-medium mt-0.5">{t.metric2Label}</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-2xs">
          <div className="text-xl sm:text-2xl font-black text-sky-800">{t.metric3Val}</div>
          <div className="text-xs text-slate-600 font-medium mt-0.5">{t.metric3Label}</div>
        </div>
      </div>

    </main>
  );
};
