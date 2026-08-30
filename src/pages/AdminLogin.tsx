import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Building2, 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  UserCheck, 
  CheckCircle2, 
  Clock, 
  Activity, 
  BedDouble, 
  FileText, 
  LogOut,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Language, translations } from '../translations';

interface AdminLoginProps {
  language: Language;
  onBack: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ language, onBack }) => {
  const t = translations[language];

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [hospitalCode, setHospitalCode] = useState<string>('HOSP-CG-042');
  const [username, setUsername] = useState<string>('admin_durg_civil');
  const [password, setPassword] = useState<string>('••••••••');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      
      {/* Back Button */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-900 bg-white hover:bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.adminBackToHome}</span>
        </button>

        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
          <Lock className="w-3.5 h-3.5 text-slate-600" />
          <span>Secure Hospital Administration Desk</span>
        </div>
      </div>

      {!isLoggedIn ? (
        /* Hospital Staff Login Form */
        <div className="max-w-md mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-md">
              <Building2 className="w-7 h-7" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {t.adminTitle}
            </h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              {t.adminLoginPrompt}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {t.adminHospitalId}
              </label>
              <input
                type="text"
                required
                value={hospitalCode}
                onChange={(e) => setHospitalCode(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {t.adminUsername}
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {t.adminPassword}
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-950 text-white font-bold py-3 rounded-xl shadow-xs transition-colors cursor-pointer text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>{t.adminLoginBtn}</span>
              </button>
            </div>
          </form>

          <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-[11px] text-slate-400">
              Need technical help? Contact National Health Authority Desk: <strong>14555</strong>
            </p>
          </div>

        </div>
      ) : (
        /* Hospital Admin Dashboard Placeholder (To be expanded in future steps) */
        <div className="space-y-6">
          
          {/* Header Dashboard Banner */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Hospital Desk Active: {hospitalCode}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black">
                {t.adminDashboardTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                District Civil Hospital & PM-JAY Empaneled Referral Center ({username})
              </p>
            </div>

            <button
              onClick={() => setIsLoggedIn(false)}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

          {/* Under Construction Notice Card */}
          <div className="bg-amber-50 border border-amber-300/80 rounded-2xl p-5 flex items-start gap-3 shadow-xs">
            <div className="p-2 rounded-xl bg-amber-600 text-white shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-amber-950">
                Hospital Admin Dashboard Ready for Upcoming Expansion
              </h4>
              <p className="text-xs text-amber-900 mt-0.5 leading-relaxed">
                {t.adminNotice} All Citizen features remain fully active inside the <strong>User Login</strong> portal.
              </p>
            </div>
          </div>

          {/* 4 Preview Module Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-slate-900">42</div>
              <div className="text-xs font-bold text-slate-600">Active PM-JAY Inpatients</div>
              <p className="text-[11px] text-slate-400">12 admitted today</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-slate-900">98.4%</div>
              <div className="text-xs font-bold text-slate-600">Pre-Auth Approval Rate</div>
              <p className="text-[11px] text-slate-400">Avg time: 14 mins</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center">
                <BedDouble className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-slate-900">128 / 400</div>
              <div className="text-xs font-bold text-slate-600">Beds Available</div>
              <p className="text-[11px] text-slate-400">18 ICU beds free</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-slate-900">4 Desks</div>
              <div className="text-xs font-bold text-slate-600">Ayushman Mitra On-Duty</div>
              <p className="text-[11px] text-slate-400">Reception Counter 1-4</p>
            </div>

          </div>

        </div>
      )}

    </main>
  );
};
