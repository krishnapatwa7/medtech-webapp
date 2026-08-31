import React from 'react';
import { ShieldCheck, Info, HeartHandshake } from 'lucide-react';
import { Language, translations } from '../translations';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language];

  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto text-xs py-8 border-t border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2 text-slate-200 font-bold">
            <HeartHandshake className="w-4 h-4 text-sky-400 shrink-0" />
            <span>{t.footerTitle}</span>
          </div>
          <div className="text-slate-400 flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>{t.footerSubtitle}</span>
          </div>
        </div>

        {/* Independent Public Platform Disclaimer */}
        <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-center sm:text-left">
          {t.footerDisclaimer}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-400 text-center sm:text-left pt-1">
          <p>{t.footerCopyright}</p>
          <p>{t.footerHelpline} <strong className="text-white">14555</strong> / <strong className="text-white">1800-111-565</strong></p>
        </div>
      </div>
    </footer>
  );
};
