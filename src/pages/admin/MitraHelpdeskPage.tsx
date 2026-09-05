import React, { useState } from 'react';
import { 
  UserCheck, 
  Search, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  Users, 
  ShieldCheck, 
  Phone, 
  QrCode, 
  Printer, 
  ArrowRight,
  Sparkles,
  Edit3
} from 'lucide-react';
import { HospitalAdminData, MitraPatientToken, MitraCounter } from '../../types/admin';
import { Language } from '../../translations';
import { AdminDeskHeader } from '../../components/admin/AdminDeskHeader';

interface MitraHelpdeskPageProps {
  hospital: HospitalAdminData;
  adminUsername: string;
  language: Language;
  onSwitchDesk: () => void;
  onLogout: () => void;
  onOpenEditModal: () => void;
}

export const MitraHelpdeskPage: React.FC<MitraHelpdeskPageProps> = ({
  hospital,
  adminUsername,
  language,
  onSwitchDesk,
  onLogout,
  onOpenEditModal
}) => {
  const isHindi = language === 'hi';

  // Search State for ABHA / PM-JAY Lookup
  const [searchQuery, setSearchQuery] = useState<string>('PMJAY-CG-99214');
  const [searchResult, setSearchResult] = useState<any | null>({
    patientName: 'Rameshwar Lal Sahu',
    age: 54,
    gender: 'Male',
    pmjayId: 'PMJAY-CG-99214',
    abhaAddress: 'rameshwar.sahu@abdm',
    aadhaarLinked: true,
    familyHead: 'Rameshwar Lal Sahu',
    eligibleFamilyMembers: 5,
    walletBalance: 465000,
    annualLimit: 500000,
    status: 'Active / Verified'
  });
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Live Patient Queue Tokens
  const [tokens, setTokens] = useState<MitraPatientToken[]>([
    {
      id: 'tok-1',
      tokenNumber: 'M-104',
      patientName: 'Kunti Bai Verma',
      age: 48,
      gender: 'F',
      abhaId: 'kunti.v@abdm',
      pmjayCardNumber: 'PMJAY-CG-88120',
      category: 'OPD Verification',
      status: 'In-Verification',
      time: '10:42 AM',
      counter: 'Counter 1',
      notes: 'General Medicine consultation referral'
    },
    {
      id: 'tok-2',
      tokenNumber: 'M-105',
      patientName: 'Dharam Pal Yadav',
      age: 62,
      gender: 'M',
      abhaId: 'dharampal.y@abdm',
      pmjayCardNumber: 'PMJAY-CG-77341',
      category: 'Emergency Priority',
      status: 'Waiting',
      time: '10:48 AM',
      counter: 'Counter 2 (Emergency)',
      notes: 'Chest pain evaluation, expedited golden card'
    },
    {
      id: 'tok-3',
      tokenNumber: 'M-106',
      patientName: 'Poonam Sharma',
      age: 29,
      gender: 'F',
      abhaId: 'poonam.s@abdm',
      pmjayCardNumber: 'PMJAY-CG-66019',
      category: 'Pre-Auth Assist',
      status: 'Waiting',
      time: '10:55 AM',
      counter: 'Counter 3',
      notes: 'Obstetrics package booking clearance'
    }
  ]);

  // Mitra Counters
  const [counters] = useState<MitraCounter[]>([
    {
      id: 'c-1',
      counterNumber: '01',
      name: 'OPD Verification Counter',
      staffName: 'Sunita Verma',
      staffDesignation: 'Senior Ayushman Mitra',
      status: 'Active',
      patientsHandled: 24
    },
    {
      id: 'c-2',
      counterNumber: '02',
      name: 'Emergency & Triage Kiosk',
      staffName: 'Manoj Dewangan',
      staffDesignation: 'Ayushman Mitra (Triage)',
      status: 'Active',
      patientsHandled: 16
    },
    {
      id: 'c-3',
      counterNumber: '03',
      name: 'Card Issuance & ABHA Desk',
      staffName: 'Priya Chandrakar',
      staffDesignation: 'Ayushman Mitra',
      status: 'Active',
      patientsHandled: 19
    },
    {
      id: 'c-4',
      counterNumber: '04',
      name: 'Pre-Auth & Inpatient Liaison',
      staffName: 'Anil Kumar Soni',
      staffDesignation: 'Ayushman Mitra (Inpatient)',
      status: 'On Break',
      patientsHandled: 12
    }
  ]);

  // Walk-in Quick Register State
  const [showWalkinForm, setShowWalkinForm] = useState<boolean>(false);
  const [walkinName, setWalkinName] = useState<string>('');
  const [walkinAge, setWalkinAge] = useState<string>('');
  const [walkinGender, setWalkinGender] = useState<'M' | 'F' | 'Other'>('M');
  const [walkinCategory, setWalkinCategory] = useState<MitraPatientToken['category']>('OPD Verification');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchResult({
        patientName: searchQuery.toUpperCase().includes('CG') ? 'Rameshwar Lal Sahu' : 'Sunita Devi Patel',
        age: 52,
        gender: 'Female',
        pmjayId: searchQuery.trim().toUpperCase(),
        abhaAddress: `${searchQuery.toLowerCase().replace(/[^a-z0-9]/g, '')}@abdm`,
        aadhaarLinked: true,
        familyHead: 'Dinesh Patel',
        eligibleFamilyMembers: 4,
        walletBalance: 480000,
        annualLimit: 500000,
        status: 'Active / Verified'
      });
    }, 400);
  };

  const handleUpdateTokenStatus = (tokenId: string, newStatus: MitraPatientToken['status']) => {
    setTokens(prev => prev.map(tok => tok.id === tokenId ? { ...tok, status: newStatus } : tok));
  };

  const handleAddWalkin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkinName.trim()) return;

    const nextNumber = `M-${104 + tokens.length}`;
    const newToken: MitraPatientToken = {
      id: `tok-${Date.now()}`,
      tokenNumber: nextNumber,
      patientName: walkinName.trim(),
      age: parseInt(walkinAge) || 40,
      gender: walkinGender,
      abhaId: `${walkinName.toLowerCase().split(' ')[0]}@abdm`,
      pmjayCardNumber: `PMJAY-${hospital.stateCode || 'CG'}-${Math.floor(10000 + Math.random() * 90000)}`,
      category: walkinCategory,
      status: 'Waiting',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      counter: 'Counter 1'
    };

    setTokens(prev => [newToken, ...prev]);
    setWalkinName('');
    setWalkinAge('');
    setShowWalkinForm(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Shared Header */}
      <AdminDeskHeader
        hospital={hospital}
        adminUsername={adminUsername}
        activeRole="mitra"
        language={language}
        onSwitchDesk={onSwitchDesk}
        onLogout={onLogout}
        onOpenEditModal={onOpenEditModal}
      />

      {/* Desk Key Stats Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-blue-900">
            <span className="text-xs font-bold text-slate-500 uppercase">
              {isHindi ? 'सक्रिय आयुष्मान मित्र' : 'Active Mitras'}
            </span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">4 Staff</div>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Counters 1 - 4 Operational</span>
          </p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-emerald-900">
            <span className="text-xs font-bold text-slate-500 uppercase">
              {isHindi ? 'आज सत्यापित मरीज' : 'Verified Today'}
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">71</div>
          <p className="text-[11px] text-slate-500">100% Cashless Intake</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-amber-900">
            <span className="text-xs font-bold text-slate-500 uppercase">
              {isHindi ? 'कतार में मरीज' : 'Pending Tokens'}
            </span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-900">{tokens.filter(t => t.status === 'Waiting').length} Waiting</div>
          <p className="text-[11px] text-slate-500">Avg. wait: 4 mins</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-purple-900">
            <span className="text-xs font-bold text-slate-500 uppercase">
              {isHindi ? 'बायोमेट्रिक e-KYC' : 'e-KYC Success'}
            </span>
            <ShieldCheck className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">99.4%</div>
          <p className="text-[11px] text-purple-600 font-medium">ABDM Instant Auth</p>
        </div>

      </div>

      {/* Hospital Desk Specific Info Card with Edit Option */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-3xl p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-blue-900 text-xs font-extrabold uppercase tracking-wide">
            <UserCheck className="w-4 h-4 text-blue-700" />
            <span>{isHindi ? 'अस्पताल हेल्पडेस्क परिचालन विवरण' : 'Hospital Helpdesk Facility Context'}</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            {isHindi && hospital.nameHi ? hospital.nameHi : hospital.name} • {hospital.type}
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
            <span>Mitra Incharge: <strong className="text-slate-800">{hospital.mitraLead || 'Sunita Verma (Desk Lead)'}</strong></span>
            <span>•</span>
            <span>Desk Helpline: <strong className="text-slate-800">{hospital.contact || '108 / N/A'}</strong></span>
            <span>•</span>
            <span>Location: <strong>Ground Floor Main Reception, Gate 1</strong></span>
          </div>
        </div>

        <button
          onClick={onOpenEditModal}
          className="inline-flex items-center gap-1.5 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs shrink-0 self-start md:self-auto"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{isHindi ? 'हेल्पडेस्क विवरण संपादित करें' : 'Edit Desk Info'}</span>
        </button>
      </div>

      {/* Section 1: Beneficiary Search & ABHA / PM-JAY Lookup */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-900" />
              <span>{isHindi ? 'लाभार्थी सत्यापन एवं ABHA कार्ड जांच' : 'Beneficiary Verification & ABHA Lookup'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isHindi 
                ? 'पीएम-जय आईडी, आभा पता अथवा आधार नंबर से मरीज का आयुष्मान खाता जांचें।' 
                : 'Search PM-JAY ID, ABHA Address, or Aadhaar for instant eligibility verification.'}
            </p>
          </div>

          {/* Quick preset buttons */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium">{isHindi ? 'त्वरित टेस्ट:' : 'Quick Presets:'}</span>
            <button
              type="button"
              onClick={() => setSearchQuery('PMJAY-CG-99214')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[11px] rounded-lg transition-colors cursor-pointer"
            >
              PMJAY-CG-99214
            </button>
            <button
              type="button"
              onClick={() => setSearchQuery('rahul.patel@abdm')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[11px] rounded-lg transition-colors cursor-pointer"
            >
              rahul@abdm
            </button>
          </div>
        </div>

        {/* Search Bar Form */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHindi ? 'PM-JAY ID / ABHA Address / आधार दर्ज करें...' : 'Enter PM-JAY ID, ABHA Address (e.g. name@abdm), or Aadhaar...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-900 text-xs sm:text-sm font-medium"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="bg-blue-900 hover:bg-blue-950 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shrink-0"
          >
            {isSearching ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span>{isHindi ? 'सत्यापन करें' : 'Verify Beneficiary'}</span>
          </button>
        </form>

        {/* Verification Result Card */}
        {searchResult && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <span>{searchResult.patientName}</span>
                    <span className="text-xs font-normal text-slate-500">
                      ({searchResult.age} Yrs / {searchResult.gender})
                    </span>
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                    <span>{searchResult.pmjayId}</span>
                    <span>•</span>
                    <span className="text-blue-700">{searchResult.abhaAddress}</span>
                  </div>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full self-start sm:self-auto">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{searchResult.status}</span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[11px]">{isHindi ? 'परिवार मुखिया' : 'Family Head'}</span>
                <span className="font-bold text-slate-800">{searchResult.familyHead}</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[11px]">{isHindi ? 'पात्र सदस्य' : 'Covered Members'}</span>
                <span className="font-bold text-slate-800">{searchResult.eligibleFamilyMembers} Members</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[11px]">{isHindi ? 'उपलब्ध वॉलेट बैलेंस' : 'Wallet Balance'}</span>
                <span className="font-extrabold text-emerald-700">₹{searchResult.walletBalance.toLocaleString('en-IN')}</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[11px]">{isHindi ? 'वार्षिक सीमा' : 'Annual Cover'}</span>
                <span className="font-bold text-slate-800">₹{searchResult.annualLimit.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => alert(`Generated Admission Token for ${searchResult.patientName}`)}
                className="bg-blue-900 hover:bg-blue-950 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isHindi ? 'ओपीडी टोकन जारी करें' : 'Generate OPD Token'}</span>
              </button>

              <button
                type="button"
                onClick={() => alert(`Printing PM-JAY Golden Slip for ${searchResult.patientName}...`)}
                className="bg-white hover:bg-slate-100 text-slate-800 font-bold px-4 py-2 rounded-xl text-xs border border-slate-300 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>{isHindi ? 'गोल्डन स्लिप प्रिंट करें' : 'Print Golden Slip'}</span>
              </button>

              <button
                type="button"
                onClick={() => alert(`Routing ${searchResult.patientName} directly to Pre-Auth Desk...`)}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold px-4 py-2 rounded-xl text-xs border border-emerald-300 transition-colors cursor-pointer flex items-center gap-1.5 ml-auto"
              >
                <span>{isHindi ? 'प्री-ऑथ डेस्क भेजें' : 'Route to Pre-Auth Desk'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Section 2: Live Patient Queue & Walk-In Registration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Live Patient Queue */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
          
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-900" />
                <span>{isHindi ? 'लाइव हेल्पडेस्क टोकन कतार' : 'Live Patient Queue & Tokens'}</span>
              </h3>
              <p className="text-xs text-slate-500">
                {isHindi ? 'काउंटर पर उपस्थित लाभार्थियों की वास्तविक समय स्थिति' : 'Real-time intake queue at hospital reception counters'}
              </p>
            </div>

            <button
              onClick={() => setShowWalkinForm(!showWalkinForm)}
              className="inline-flex items-center gap-1.5 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showWalkinForm ? (isHindi ? 'फॉर्म बंद करें' : 'Close') : (isHindi ? 'नया वॉक-इन मरीज' : 'New Walk-In')}</span>
            </button>
          </div>

          {/* New Walk-in inline form */}
          {showWalkinForm && (
            <form onSubmit={handleAddWalkin} className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 space-y-3 animate-in fade-in duration-150">
              <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                {isHindi ? 'त्वरित वॉक-इन टोकन जारी करें' : 'Issue Quick Walk-in Token'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder={isHindi ? 'मरीज का नाम' : 'Patient Name'}
                  value={walkinName}
                  onChange={(e) => setWalkinName(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  required
                />
                <input
                  type="number"
                  placeholder={isHindi ? 'उम्र (वर्ष)' : 'Age (Years)'}
                  value={walkinAge}
                  onChange={(e) => setWalkinAge(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                />
                <select
                  value={walkinGender}
                  onChange={(e) => setWalkinGender(e.target.value as any)}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                >
                  <option value="M">Male (पुरुष)</option>
                  <option value="F">Female (महिला)</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                <select
                  value={walkinCategory}
                  onChange={(e) => setWalkinCategory(e.target.value as any)}
                  className="w-full sm:w-auto px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                >
                  <option value="OPD Verification">OPD Verification</option>
                  <option value="Emergency Priority">Emergency Priority</option>
                  <option value="Pre-Auth Assist">Pre-Auth Assist</option>
                  <option value="Golden Card Issue">Golden Card Issue</option>
                </select>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs px-5 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  {isHindi ? 'टोकन जोड़ें' : 'Add Token to Queue'}
                </button>
              </div>
            </form>
          )}

          {/* Tokens List */}
          <div className="space-y-2.5">
            {tokens.map((token) => (
              <div 
                key={token.id}
                className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs font-black bg-blue-900 text-white px-2.5 py-1.5 rounded-xl shrink-0">
                    {token.tokenNumber}
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-black text-slate-900">
                        {token.patientName}
                      </h4>
                      <span className="text-[11px] text-slate-500 font-medium">
                        ({token.age}y / {token.gender})
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-500">
                      <span className="font-mono text-slate-600">{token.pmjayCardNumber}</span>
                      <span>•</span>
                      <span className="text-blue-700 font-medium">{token.category}</span>
                      <span>•</span>
                      <span className="text-slate-400">{token.time} ({token.counter})</span>
                    </div>
                  </div>
                </div>

                {/* Actions & Status */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                    token.status === 'In-Verification'
                      ? 'bg-blue-100 text-blue-800 border-blue-300'
                      : token.status === 'Approved'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : token.status === 'Admitted'
                      ? 'bg-purple-100 text-purple-800 border-purple-300'
                      : 'bg-amber-100 text-amber-800 border-amber-300'
                  }`}>
                    {token.status}
                  </span>

                  {token.status === 'Waiting' && (
                    <button
                      onClick={() => handleUpdateTokenStatus(token.id, 'In-Verification')}
                      className="bg-blue-900 hover:bg-blue-950 text-white text-[11px] font-bold px-3 py-1 rounded-lg transition-colors cursor-pointer"
                    >
                      {isHindi ? 'सत्यापन शुरू करें' : 'Verify'}
                    </button>
                  )}

                  {token.status === 'In-Verification' && (
                    <button
                      onClick={() => handleUpdateTokenStatus(token.id, 'Approved')}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold px-3 py-1 rounded-lg transition-colors cursor-pointer"
                    >
                      {isHindi ? 'पास करें' : 'Approve'}
                    </button>
                  )}

                  {token.status === 'Approved' && (
                    <button
                      onClick={() => handleUpdateTokenStatus(token.id, 'Admitted')}
                      className="bg-purple-700 hover:bg-purple-800 text-white text-[11px] font-bold px-3 py-1 rounded-lg transition-colors cursor-pointer"
                    >
                      {isHindi ? 'भर्ती करें' : 'Admit'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right 1 Col: Mitra Counters on Duty */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
          
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-900" />
              <span>{isHindi ? 'काउंटर एवं स्टाफ स्थिति' : 'Counters & On-Duty Staff'}</span>
            </h3>
            <p className="text-xs text-slate-500">
              {isHindi ? 'अस्पताल के सभी सक्रिय काउंटर' : 'Active helpdesk terminals at reception'}
            </p>
          </div>

          <div className="space-y-3">
            {counters.map((ctr) => (
              <div key={ctr.id} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">
                    Counter {ctr.counterNumber}: {ctr.name}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    ctr.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {ctr.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-800 block">{ctr.staffName}</span>
                    <span className="text-[11px] text-slate-400">{ctr.staffDesignation}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-blue-900">{ctr.patientsHandled}</span>
                    <span className="text-[10px] text-slate-400 block">Served today</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ayushman Mitra Hotline Help info */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-sky-300 font-bold">
              <Phone className="w-4 h-4" />
              <span>Internal Escalation Desk</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              For biometric mismatch or offline e-KYC approval, contact Nodal Officer at extension <strong>#104</strong> or email <strong>{hospital.email || 'admin.desk@durgcivil.gov.in'}</strong>.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
