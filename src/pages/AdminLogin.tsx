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
  FileCheck2, 
  Lock, 
  Eye, 
  EyeOff, 
  KeyRound, 
  AlertCircle,
  Check,
  Hospital as HospitalIcon,
  BadgeCheck
} from 'lucide-react';
import { Language, translations } from '../translations';

interface AdminLoginProps {
  language: Language;
  onBack: () => void;
}

interface VerifiedHospitalInfo {
  id: string;
  name: string;
  nameHi: string;
  code: string;
  type: 'GOV' | 'PRIVATE' | 'APEX_GOV';
  district: string;
  state: string;
  adminEmail: string;
  empanelledSince: string;
}

const PRESET_HOSPITALS: VerifiedHospitalInfo[] = [
  {
    id: 'hosp-1',
    name: 'District Civil Hospital Durg',
    nameHi: 'जिला नागरिक चिकित्सालय दुर्ग',
    code: 'HOSP-CG-042',
    type: 'GOV',
    district: 'Durg',
    state: 'Chhattisgarh',
    adminEmail: 'admin.desk@durgcivil.gov.in',
    empanelledSince: '2018'
  },
  {
    id: 'hosp-2',
    name: 'Chandulal Chandrakar Memorial Hospital',
    nameHi: 'चंदूलाल चंद्राकर मेमोरियल अस्पताल',
    code: 'HOSP-CG-108',
    type: 'PRIVATE',
    district: 'Durg',
    state: 'Chhattisgarh',
    adminEmail: 'ayushman@ccmhospitals.com',
    empanelledSince: '2019'
  },
  {
    id: 'hosp-3',
    name: 'AIIMS Raipur Referral Desk',
    nameHi: 'अखिल भारतीय आयुर्विज्ञान संस्थान (एम्स रायपुर)',
    code: 'AIIMS-RPR-01',
    type: 'APEX_GOV',
    district: 'Raipur',
    state: 'Chhattisgarh',
    adminEmail: 'pmjay.nodal@aiimsraipur.edu.in',
    empanelledSince: '2018'
  }
];

export const AdminLogin: React.FC<AdminLoginProps> = ({ language, onBack }) => {
  const t = translations[language];

  // Workflow State: 'verify' (Admin Credentials) -> 'selectRole' (Choose Desk) -> 'dashboard' (Active Desk)
  const [currentStep, setCurrentStep] = useState<'verify' | 'selectRole' | 'dashboard'>('verify');
  
  // Hospital Verification Form States
  const [hospitalCode, setHospitalCode] = useState<string>('HOSP-CG-042');
  const [adminUsername, setAdminUsername] = useState<string>('admin.desk@durgcivil.gov.in');
  const [password, setPassword] = useState<string>('Ayushman@2026');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  // Authenticated Hospital State (Populated upon verification)
  const [verifiedHospital, setVerifiedHospital] = useState<VerifiedHospitalInfo>(PRESET_HOSPITALS[0]);

  // Desk / Role Selection State
  const [selectedRole, setSelectedRole] = useState<string>('mitra');

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

  // Quick fill preset hospital credentials
  const handleSelectPreset = (preset: VerifiedHospitalInfo) => {
    setHospitalCode(preset.code);
    setAdminUsername(preset.adminEmail);
    setPassword('Ayushman@2026');
    setVerificationError(null);
  };

  // Process Admin Verification
  const handleVerifyCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationError(null);

    const cleanCode = hospitalCode.trim().toUpperCase();
    const cleanUser = adminUsername.trim();
    const cleanPass = password.trim();

    if (!cleanCode || !cleanUser || !cleanPass) {
      setVerificationError(
        language === 'hi' 
          ? 'कृपया अस्पताल कोड, यूजरनेम और पासवर्ड सभी दर्ज करें।' 
          : 'Please enter Hospital Code, Admin Username, and Security PIN.'
      );
      return;
    }

    setIsVerifying(true);

    // Simulate authentic verification against National Health Authority (NHA) gateway
    setTimeout(() => {
      setIsVerifying(false);
      const matched = PRESET_HOSPITALS.find(h => h.code === cleanCode);

      if (matched) {
        setVerifiedHospital(matched);
      } else {
        // Allow custom hospital codes as well
        setVerifiedHospital({
          id: `custom-${cleanCode}`,
          name: `Hospital Facility Unit (${cleanCode})`,
          nameHi: `अस्पताल सुविधा केंद्र (${cleanCode})`,
          code: cleanCode,
          type: 'GOV',
          district: 'District Headquarters',
          state: 'State Health Authority',
          adminEmail: cleanUser,
          empanelledSince: 'Verified 2026'
        });
      }

      // Transition to Role Selection step
      setCurrentStep('selectRole');
    }, 450);
  };

  const handleLogout = () => {
    setCurrentStep('verify');
    setVerificationError(null);
  };

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => {
            if (currentStep === 'dashboard') {
              setCurrentStep('selectRole');
            } else if (currentStep === 'selectRole') {
              setCurrentStep('verify');
            } else {
              onBack();
            }
          }}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-900 bg-white hover:bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>
            {currentStep === 'dashboard' 
              ? (language === 'hi' ? 'रोल चयन पर वापस' : 'Back to Desk Selection')
              : currentStep === 'selectRole'
                ? (language === 'hi' ? 'लॉगिन पर वापस' : 'Back to Hospital Login')
                : t.adminBackToHome}
          </span>
        </button>

        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-900" />
          <span>Hospital Administration & Mitra Portal</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP 1: HOSPITAL ADMIN CREDENTIALS VERIFICATION / LOGIN                   */}
      {/* ========================================================================= */}
      {currentStep === 'verify' && (
        <div className="max-w-xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in-50 duration-200">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white flex items-center justify-center mx-auto shadow-md">
              <Building2 className="w-7 h-7 text-sky-300" />
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-[11px] font-bold">
              <Lock className="w-3 h-3 text-blue-700" />
              <span>{language === 'hi' ? 'प्रशासनिक सुरक्षा सत्यापन' : 'Official Hospital Admin Login'}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {language === 'hi' ? 'अस्पताल क्रेडेंशियल सत्यापन' : 'Hospital Facility Verification'}
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              {language === 'hi'
                ? 'आयुष्मान भारत (PM-JAY) के तहत पंजीकृत अस्पताल कोड एवं व्यवस्थापक आईडी दर्ज करके लॉगिन करें।'
                : 'Enter your PM-JAY Empaneled Hospital ID and Authorized Staff credentials to verify your facility.'}
            </p>
          </div>

          {/* Quick Demo Credential Preset Chips */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-[11px] font-bold text-slate-600 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{language === 'hi' ? 'त्वरित डेमो अस्पताल चुनें:' : 'Quick Demo Hospital Fill:'}</span>
              </span>
              <span className="text-[10px] text-slate-400 font-normal">{language === 'hi' ? '1-क्लिक टेस्ट' : '1-Click Autofill'}</span>
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              {PRESET_HOSPITALS.map((preset) => {
                const isSelected = hospitalCode === preset.code;
                return (
                  <button
                    key={preset.code}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`text-[11px] font-medium px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-blue-900 text-white border-blue-900 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <span className="font-mono text-[10px] font-bold opacity-80">{preset.code}</span>
                    <span className="truncate max-w-[140px] sm:max-w-none">
                      {language === 'hi' ? preset.nameHi : preset.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Verification Form */}
          <form onSubmit={handleVerifyCredentials} className="space-y-4">
            
            {/* Hospital Empanelment Code */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                {language === 'hi' ? 'अस्पताल कोड / PM-JAY Empanelment ID' : 'Hospital Code / PM-JAY Empanelment ID'}
                <span className="text-rose-500 ml-1">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <HospitalIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={hospitalCode}
                  onChange={(e) => setHospitalCode(e.target.value.toUpperCase())}
                  placeholder="e.g. HOSP-CG-042"
                  className="w-full pl-9 pr-3 py-2.5 text-xs font-mono font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all uppercase"
                />
              </div>
            </div>

            {/* Admin User / Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                {language === 'hi' ? 'व्यवस्थापक ईमेल / स्टाफ यूजरनेम' : 'Facility Admin Email / Staff Username'}
                <span className="text-rose-500 ml-1">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="admin.desk@hospital.gov.in"
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password / Access PIN */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                {language === 'hi' ? 'सुरक्षा पिन / पासवर्ड' : 'Security PIN / Password'}
                <span className="text-rose-500 ml-1">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter access PIN"
                  className="w-full pl-9 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Banner */}
            {verificationError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{verificationError}</span>
              </div>
            )}

            {/* Submit Verification Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-blue-900 hover:bg-blue-950 disabled:bg-blue-800 text-white font-bold py-3 px-4 rounded-xl shadow-xs transition-colors cursor-pointer text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>{language === 'hi' ? 'NHA सत्यापन जारी है...' : 'Verifying with NHA Gateway...'}</span>
                  </>
                ) : (
                  <>
                    <span>{language === 'hi' ? 'अस्पताल सत्यापित करें एवं आगे बढ़ें' : 'Verify Hospital & Proceed'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Security Assurance */}
            <div className="pt-2 text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>National Health Authority (NHA) Secure Empanelment Portal • 256-Bit TLS</span>
            </div>

          </form>

        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: ROLE SELECTION FOR VERIFIED HOSPITAL (NO HOSPITAL SELECTION DROPDOWN) */}
      {/* ========================================================================= */}
      {currentStep === 'selectRole' && (
        <div className="max-w-xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in-50 duration-200">
          
          {/* VERIFIED HOSPITAL IDENTITY HEADER (Server knows which hospital is authenticated) */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-4.5 border border-blue-900/40 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold tracking-wide">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>NHA VERIFIED FACILITY DESK</span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="text-[11px] text-slate-300 hover:text-white underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                title="Switch hospital / Log out"
              >
                <LogOut className="w-3 h-3" />
                <span>{language === 'hi' ? 'बदलें' : 'Switch Hospital'}</span>
              </button>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>{language === 'hi' ? verifiedHospital.nameHi : verifiedHospital.name}</span>
              </h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-blue-200 mt-1 font-medium">
                <span className="font-mono text-sky-300 font-bold">{verifiedHospital.code}</span>
                <span>•</span>
                <span>{verifiedHospital.district}, {verifiedHospital.state}</span>
                <span>•</span>
                <span className="text-[11px] text-slate-300">{verifiedHospital.adminEmail}</span>
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="text-left space-y-1">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              {language === 'hi' ? 'कार्यकारी डेस्क (रोल) चुनें' : 'Select Operational Desk / Role'}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'hi'
                ? 'इस अस्पताल के लिए अपना कार्यभार चुनें और सुविधा डैशबोर्ड लॉन्च करें।'
                : 'Select the operational module you are managing for this verified hospital.'}
            </p>
          </div>

          {/* Role Cards List */}
          <div className="space-y-2.5">
            {roles.map((r) => {
              const IconComponent = r.icon;
              const isSelected = selectedRole === r.id;

              return (
                <button
                  type="button"
                  key={r.id}
                  onClick={() => setSelectedRole(r.id)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 cursor-pointer ${
                    isSelected
                      ? 'border-blue-900 bg-blue-50/60 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/40 hover:bg-slate-50'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl text-white shrink-0 shadow-2xs ${isSelected ? 'bg-blue-900' : 'bg-slate-700'}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {language === 'hi' ? r.titleHi : r.title}
                      </h4>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-blue-900 text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      {language === 'hi' ? r.descHi : r.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Launch Dashboard Button */}
          <div className="pt-2">
            <button
              onClick={() => setCurrentStep('dashboard')}
              className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-3.5 px-4 rounded-xl shadow-xs transition-colors cursor-pointer text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <span>
                {language === 'hi'
                  ? `${roles.find(r => r.id === selectedRole)?.titleHi} डैशबोर्ड खोलें`
                  : `Launch ${roles.find(r => r.id === selectedRole)?.title}`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: ACTIVE HOSPITAL FACILITY DASHBOARD                                 */}
      {/* ========================================================================= */}
      {currentStep === 'dashboard' && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          
          {/* Header Dashboard Banner with Hospital & Role context */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active Empaneled Facility Desk</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black">
                {language === 'hi' ? verifiedHospital.nameHi : verifiedHospital.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-300">
                <span className="font-mono text-sky-300 font-bold">{verifiedHospital.code}</span>
                <span>•</span>
                <span>Active Desk: <strong className="text-white">{roles.find(r => r.id === selectedRole)?.title}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentStep('selectRole')}
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'रोल बदलें' : 'Switch Desk'}</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'लॉगआउट' : 'Log Out'}</span>
              </button>
            </div>
          </div>

          {/* Under Construction Notice Card */}
          <div className="bg-amber-50 border border-amber-300/80 rounded-2xl p-5 flex items-start gap-3 shadow-xs">
            <div className="p-2 rounded-xl bg-amber-600 text-white shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-amber-950">
                Hospital Admin Desk ({roles.find(r => r.id === selectedRole)?.title}) Active
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
