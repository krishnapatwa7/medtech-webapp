import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Building2, 
  ShieldCheck, 
  UserCheck, 
  Activity, 
  BedDouble, 
  LogOut,
  Sparkles,
  ArrowRight,
  Stethoscope,
  FileCheck2,
  Lock
} from 'lucide-react';
import { Language, translations } from '../translations';

interface AdminLoginProps {
  language: Language;
  onBack: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ language, onBack }) => {
  const t = translations[language];

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string>('mitra');
  const [hospitalName, setHospitalName] = useState<string>('District Civil Hospital Durg (HOSP-CG-042)');

  const roles = [
    {
      id: 'mitra',
      title: 'Ayushman Mitra Helpdesk',
      titleHi: 'आयुष्मान मित्र हेल्पडेस्क',
      desc: 'Patient admission verification, card scan & instant pre-authorization support',
      descHi: 'मरीज प्रवेश सत्यापन, कार्ड स्कैन एवं त्वरित पूर्व-अनुमोदन सहायता',
      icon: UserCheck,
      color: 'blue'
    },
    {
      id: 'preauth',
      title: 'Pre-Authorization & Claims Desk',
      titleHi: 'प्री-ऑथराइजेशन एवं क्लेम डेस्क',
      desc: 'Surgical package booking, medical documentation & cashless clearance',
      descHi: 'सर्जरी पैकेज बुकिंग, मेडिकल दस्तावेज एवं कैशलेस क्लीयरेंस',
      icon: FileCheck2,
      color: 'emerald'
    },
    {
      id: 'bed',
      title: 'Hospital Bed & Specialty Manager',
      titleHi: 'बेड उपलब्धता एवं विशेषज्ञता प्रबंधन',
      desc: 'Live ICU/General bed tracker & doctor on-duty availability roster',
      descHi: 'लाइव आईसीयू / जनरल बेड ट्रैकर एवं ऑन-ड्यूटी डॉक्टर सूची',
      icon: BedDouble,
      color: 'purple'
    }
  ];

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-900 bg-white hover:bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.adminBackToHome}</span>
        </button>

        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-900" />
          <span>Hospital Administration & Mitra Portal</span>
        </div>
      </div>

      {!isLoggedIn ? (
        /* Role & Hospital Selection Gateway (No raw password inputs to ensure 100% clean browser trust) */
        <div className="max-w-xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-900 text-white flex items-center justify-center mx-auto shadow-md">
              <Building2 className="w-7 h-7" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {t.adminTitle}
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Select your staff role and hospital empanelment unit to access the administration dashboard.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold text-slate-700">
              Select Operating Desk / Role:
            </label>

            <div className="space-y-2.5">
              {roles.map((r) => {
                const IconComponent = r.icon;
                const isSelected = selectedRole === r.id;

                return (
                  <button
                    type="button"
                    key={r.id}
                    onClick={() => setSelectedRole(r.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3.5 cursor-pointer ${
                      isSelected
                        ? 'border-blue-900 bg-blue-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl text-white shrink-0 ${isSelected ? 'bg-blue-900' : 'bg-slate-700'}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                          {language === 'hi' ? r.titleHi : r.title}
                        </h4>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-blue-900"></span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        {language === 'hi' ? r.descHi : r.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold text-slate-700">
              Hospital Unit:
            </label>
            <select
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="District Civil Hospital Durg (HOSP-CG-042)">District Civil Hospital Durg (HOSP-CG-042)</option>
              <option value="Chandulal Chandrakar Memorial Hospital (HOSP-CG-108)">Chandulal Chandrakar Memorial Hospital (HOSP-CG-108)</option>
              <option value="AIIMS Raipur Referral Desk (AIIMS-RPR-01)">AIIMS Raipur Referral Desk (AIIMS-RPR-01)</option>
            </select>
          </div>

          <div className="pt-3">
            <button
              onClick={() => setIsLoggedIn(true)}
              className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-3 rounded-xl shadow-xs transition-colors cursor-pointer text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <span>Launch Hospital Admin Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        /* Hospital Admin Dashboard Preview Screen */
        <div className="space-y-6">
          
          {/* Header Dashboard Banner */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active Empaneled Facility Desk</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black">
                {hospitalName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Active Module: <strong>{roles.find(r => r.id === selectedRole)?.title}</strong>
              </p>
            </div>

            <button
              onClick={() => setIsLoggedIn(false)}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Switch Desk</span>
            </button>
          </div>

          {/* Under Construction Notice Card */}
          <div className="bg-amber-50 border border-amber-300/80 rounded-2xl p-5 flex items-start gap-3 shadow-xs">
            <div className="p-2 rounded-xl bg-amber-600 text-white shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-amber-950">
                Hospital Admin Dashboard Ready for Upcoming Modules
              </h4>
              <p className="text-xs text-amber-900 mt-0.5 leading-relaxed">
                {t.adminNotice} All Citizen features remain fully active inside the <strong>User Login</strong> portal.
              </p>
            </div>
          </div>

          {/* 4 Preview Metric Cards */}
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
