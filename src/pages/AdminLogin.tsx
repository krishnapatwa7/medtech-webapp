import React, { useState, useEffect } from 'react';
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
  BadgeCheck,
  Database,
  MapPin,
  Phone
} from 'lucide-react';
import { Language, translations } from '../translations';
import { 
  verifyHospitalCode, 
  loadHospitalRegistry, 
  REAL_DEMO_PRESETS, 
  VerifiedHospitalRecord 
} from '../utils/hospitalVerification';

interface AdminLoginProps {
  language: Language;
  onBack: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ language, onBack }) => {
  const t = translations[language];

  // Workflow State: 'verify' (Admin Credentials) -> 'selectRole' (Choose Desk) -> 'dashboard' (Active Desk)
  const [currentStep, setCurrentStep] = useState<'verify' | 'selectRole' | 'dashboard'>('verify');
  
  // Hospital Verification Form States
  const [hospitalCode, setHospitalCode] = useState<string>('HS22010102');
  const [adminUsername, setAdminUsername] = useState<string>('admin.desk@durgcivil.gov.in');
  const [password, setPassword] = useState<string>('Ayushman@2026');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  // Authenticated Hospital State from real database
  const [verifiedHospital, setVerifiedHospital] = useState<VerifiedHospitalRecord>({
    facilityId: 'HS22010102',
    hospitalId: '22010102',
    name: 'Shri Pandurang Ramarao Dongaonkar Govt District Hospital Durg',
    nameHi: 'जिला अस्पताल दुर्ग (सरकारी)',
    type: 'GOV',
    typeCode: 'G',
    address: 'District Hospital Durg, Near Gandhi Chowk G E Road Durg',
    contact: '8319399266',
    districtCode: '378',
    stateCode: '22',
    stateName: 'Chhattisgarh',
    empanelledDate: '2020-03-19',
    specialties: ['General Surgery', 'Orthopedics', 'Gynecology'],
    schemeCode: 'PM-JAY',
    sourceFile: '/data/PM_JAY_GOV_Hospitals_Data.csv'
  });

  // Desk / Role Selection State
  const [selectedRole, setSelectedRole] = useState<string>('mitra');

  // Preload real CSV database from public/data on component mount
  useEffect(() => {
    loadHospitalRegistry();
  }, []);

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

  // Quick fill real hospital credentials from public/data
  const handleSelectPreset = (preset: typeof REAL_DEMO_PRESETS[0]) => {
    setHospitalCode(preset.code);
    setAdminUsername(`staff.${preset.district.toLowerCase().replace(/[^a-z]/g, '')}@hospital.gov.in`);
    setPassword('Ayushman@2026');
    setVerificationError(null);
  };

  // Process Admin Verification directly against public/data database
  const handleVerifyCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationError(null);

    const cleanCode = hospitalCode.trim();
    if (!cleanCode) {
      setVerificationError(
        language === 'hi' 
          ? 'कृपया अस्पताल कोड / Empanelment ID दर्ज करें।' 
          : 'Please enter Hospital Code / PM-JAY Empanelment ID.'
      );
      return;
    }

    setIsVerifying(true);

    try {
      // Query actual CSV registry in public/data
      const result = await verifyHospitalCode(cleanCode);

      if (result.success && result.hospital) {
        setVerifiedHospital(result.hospital);
        setCurrentStep('selectRole');
      } else {
        setVerificationError(
          result.error ||
          (language === 'hi'
            ? `अस्पताल कोड "${cleanCode}" PM-JAY डेटाबेस में नहीं मिला। कृपया सही कोड दर्ज करें।`
            : `Hospital Code "${cleanCode}" was not found in the PM-JAY registry.`)
        );
      }
    } catch (err: any) {
      setVerificationError(err?.message || 'Verification error. Please try again.');
    } finally {
      setIsVerifying(false);
    }
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
                ? (language === 'hi' ? 'सत्यापन पर वापस' : 'Back to Hospital Verification')
                : t.adminBackToHome}
          </span>
        </button>

        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
          <Database className="w-3.5 h-3.5 text-emerald-600" />
          <span>PM-JAY Registry Live Sync</span>
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
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] font-bold">
              <Database className="w-3 h-3 text-emerald-700" />
              <span>{language === 'hi' ? 'पब्लिक डेटाबेस सिंक सक्रिय' : 'Synced with PM-JAY Public Registry'}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {language === 'hi' ? 'अस्पताल क्रेडेंशियल सत्यापन' : 'Hospital Facility Verification'}
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              {language === 'hi'
                ? 'अपने अस्पताल का PM-JAY Empaneled Code या Hospital ID दर्ज करें। डेटाबेस से तुरंत सत्यापन किया जाएगा।'
                : 'Enter your PM-JAY Empaneled Facility ID or Hospital ID. Verified directly against the 40,000+ public database.'}
            </p>
          </div>

          {/* Real Demo Hospital ID Preset Chips */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-[11px] font-bold text-slate-600 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{language === 'hi' ? 'डेटाबेस से वास्तविक अस्पताल चुनें:' : 'Real Hospitals from Database:'}</span>
              </span>
              <span className="text-[10px] text-slate-400 font-normal">{language === 'hi' ? '1-क्लिक टेस्ट' : '1-Click Autofill'}</span>
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              {REAL_DEMO_PRESETS.map((preset) => {
                const isSelected = hospitalCode.toUpperCase() === preset.code.toUpperCase();
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
            
            {/* Hospital Empanelment Code (Validated against CSV) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700">
                  {language === 'hi' ? 'अस्पताल कोड / Facility ID' : 'Empaneled Facility ID / Hospital Code'}
                  <span className="text-rose-500 ml-1">*</span>
                </label>
                <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {language === 'hi' ? 'डेटाबेस से जाँचा जाएगा' : 'Verified in DB'}
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <HospitalIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={hospitalCode}
                  onChange={(e) => setHospitalCode(e.target.value.toUpperCase())}
                  placeholder="e.g. HS22010102 or 22010102"
                  className="w-full pl-9 pr-3 py-2.5 text-xs font-mono font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all uppercase"
                />
              </div>
              <p className="text-[10px] text-slate-400">
                {language === 'hi' 
                  ? 'उदाहरण: HS22010102 (दुर्ग जिला अस्पताल), HOSP22G84446 (एम्स रायपुर), HOSP22P25103646' 
                  : 'Try: HS22010102 (Durg Civil Hospital), HOSP22G84446 (AIIMS Raipur), HOSP22P25103646'}
              </p>
            </div>

            {/* Admin User / Email (Enterable in demo) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700">
                  {language === 'hi' ? 'स्टाफ ईमेल / यूजरनेम' : 'Facility Staff Email / Username'}
                </label>
                <span className="text-[10px] text-slate-400">Demo (any text allowed)</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="admin.desk@hospital.gov.in"
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password / Access PIN (Enterable in demo) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700">
                  {language === 'hi' ? 'सुरक्षा पिन / पासवर्ड' : 'Security PIN / Password'}
                </label>
                <span className="text-[10px] text-slate-400">Demo (any PIN allowed)</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter demo PIN"
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
                    <span>{language === 'hi' ? 'डेटाबेस में सत्यापन हो रहा है...' : 'Verifying with PM-JAY Database...'}</span>
                  </>
                ) : (
                  <>
                    <span>{language === 'hi' ? 'डेटाबेस से सत्यापित करें एवं आगे बढ़ें' : 'Verify in Database & Proceed'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Security Assurance */}
            <div className="pt-2 text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>PM-JAY National Empaneled Registry • Live Local Sync</span>
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
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-5 border border-blue-900/40 shadow-xs space-y-3">
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
                <span>{language === 'hi' ? 'अस्पताल बदलें' : 'Switch Hospital'}</span>
              </button>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>{language === 'hi' ? (verifiedHospital.nameHi || verifiedHospital.name) : verifiedHospital.name}</span>
              </h3>
              
              <div className="space-y-1 mt-2 text-xs text-blue-200">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-medium">
                  <span className="font-mono text-sky-300 font-bold bg-white/10 px-2 py-0.5 rounded text-[11px]">
                    ID: {verifiedHospital.facilityId}
                  </span>
                  <span className="bg-emerald-950/60 text-emerald-300 border border-emerald-700/50 px-2 py-0.5 rounded text-[11px] font-semibold">
                    {verifiedHospital.type}
                  </span>
                  {verifiedHospital.stateName && (
                    <span>• {verifiedHospital.stateName}</span>
                  )}
                </div>

                {verifiedHospital.address && (
                  <div className="flex items-start gap-1.5 text-[11px] text-slate-300 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <span>{verifiedHospital.address}</span>
                  </div>
                )}

                {verifiedHospital.contact && verifiedHospital.contact !== 'N/A' && (
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                    <Phone className="w-3 h-3 text-sky-400 shrink-0" />
                    <span>Contact: {verifiedHospital.contact}</span>
                  </div>
                )}
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
                {language === 'hi' ? (verifiedHospital.nameHi || verifiedHospital.name) : verifiedHospital.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-300">
                <span className="font-mono text-sky-300 font-bold">{verifiedHospital.facilityId}</span>
                <span>•</span>
                <span className="text-emerald-300">{verifiedHospital.type}</span>
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
