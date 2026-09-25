import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  UserCheck, 
  FileCheck2, 
  BedDouble, 
  Edit3, 
  LogOut, 
  ArrowLeftRight, 
  ShieldCheck, 
  Mail, 
  Clock, 
  User
} from 'lucide-react';
import { HospitalAdminData, DeskRole } from '../../types/admin';
import { Language } from '../../translations';

interface AdminDeskHeaderProps {
  hospital: HospitalAdminData;
  adminUsername: string;
  activeRole: DeskRole;
  language: Language;
  onSwitchDesk: () => void;
  onLogout: () => void;
  onOpenEditModal: () => void;
}

export const AdminDeskHeader: React.FC<AdminDeskHeaderProps> = ({
  hospital,
  adminUsername,
  activeRole,
  language,
  onSwitchDesk,
  onLogout,
  onOpenEditModal
}) => {
  const isHindi = language === 'hi';

  const roleConfig = {
    mitra: {
      title: 'Ayushman Mitra Helpdesk',
      titleHi: 'आयुष्मान मित्र हेल्पडेस्क',
      badge: 'Front Desk & Beneficiary Registration',
      badgeHi: 'हेल्पडेस्क एवं लाभार्थी पंजीकरण',
      icon: UserCheck,
      color: 'bg-blue-600',
      tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    },
    preauth: {
      title: 'Pre-Authorization & Claims Desk',
      titleHi: 'प्री-ऑथराइजेशन एवं क्लेम डेस्क',
      badge: 'TMS Surgical Claims & Cashless Approvals',
      badgeHi: 'टीएमएस सर्जरी क्लेम एवं कैशलेस अनुमोदन',
      icon: FileCheck2,
      color: 'bg-emerald-600',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    },
    bed: {
      title: 'Hospital Bed & Specialty Manager',
      titleHi: 'बेड उपलब्धता एवं विशेषज्ञता प्रबंधन',
      badge: 'Live Bed Matrix & On-Duty Doctor Roster',
      badgeHi: 'लाइव बेड मैट्रिक्स एवं ऑन-ड्यूटी डॉक्टर रोस्टर',
      icon: BedDouble,
      color: 'bg-purple-600',
      tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    }
  }[activeRole];

  const CurrentRoleIcon = roleConfig.icon;
  const hospitalDisplayName = isHindi && hospital.nameHi ? hospital.nameHi : hospital.name;

  return (
    <header className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
      
      {/* Top Session Bar: User Logged In & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800 text-xs">
        <div className="flex flex-wrap items-center gap-2 text-slate-300">
          <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{isHindi ? 'सत्यापित अस्पताल सत्र सक्रिय' : 'Authenticated Session Active'}</span>
          </span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <div className="flex items-center gap-1.5 text-slate-300 font-mono">
            <User className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-slate-400">{isHindi ? 'व्यवस्थापक:' : 'Admin:'}</span>
            <strong className="text-sky-300 font-semibold">{adminUsername}</strong>
          </div>
        </div>

        {/* Action Buttons: Edit Info, Switch Desk, Logout */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenEditModal}
            className="inline-flex items-center gap-1.5 bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/30 text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
            title={isHindi ? 'अस्पताल एवं डेस्क जानकारी संपादित करें' : 'Edit Hospital & Desk Information'}
          >
            <Edit3 className="w-3.5 h-3.5 text-sky-300" />
            <span>{isHindi ? 'जानकारी संपादित करें' : 'Edit Hospital Info'}</span>
          </button>

          <button
            onClick={onSwitchDesk}
            className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
            title={isHindi ? 'दूसरा डेस्क चुनें' : 'Switch Operational Desk'}
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-slate-300" />
            <span>{isHindi ? 'डेस्क बदलें' : 'Switch Desk'}</span>
          </button>

          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
            title={isHindi ? 'लॉगआउट' : 'Log Out'}
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isHindi ? 'लॉगआउट' : 'Log Out'}</span>
          </button>
        </div>
      </div>

      {/* Main Hospital Identification Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left: Hospital Name and Core Registry Badges */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-mono text-sky-300 font-black bg-sky-950/90 border border-sky-600/40 px-2.5 py-1 rounded-lg">
              ID: {hospital.facilityId || hospital.hospitalId}
            </span>
            <span className="bg-emerald-950/70 text-emerald-300 border border-emerald-600/40 px-2.5 py-1 rounded-lg font-bold">
              {hospital.type} ({hospital.typeCode === 'G' ? (isHindi ? 'सरकारी' : 'Government') : (isHindi ? 'निजी' : 'Private')})
            </span>
            <span className="bg-blue-950/70 text-blue-300 border border-blue-600/40 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>{hospital.schemeCode || 'PM-JAY'} Empaneled</span>
            </span>
            {hospital.empanelledDate && (
              <span className="text-slate-400 text-[11px] flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Since {hospital.empanelledDate}</span>
              </span>
            )}
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <Building2 className="w-7 h-7 text-sky-400 shrink-0" />
              <span>{hospitalDisplayName}</span>
            </h1>

            {/* Address & Contact Row */}
            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 mt-2 text-xs text-slate-300">
              {hospital.address && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{hospital.address}</span>
                  {hospital.stateName && <span className="text-slate-400 font-medium">({hospital.stateName})</span>}
                </div>
              )}

              {hospital.contact && hospital.contact !== 'N/A' && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="font-medium">{hospital.contact}</span>
                </div>
              )}

              {hospital.email && (
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="text-slate-300 font-mono text-[11px]">{hospital.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Active Role Card */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 lg:min-w-72 flex items-center gap-3.5 shadow-inner">
          <div className={`p-3 rounded-xl text-white shrink-0 ${roleConfig.color} shadow-md`}>
            <CurrentRoleIcon className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${roleConfig.tagColor}`}>
              {isHindi ? 'सक्रिय परिचालन डेस्क' : 'Active Operational Desk'}
            </span>
            <h2 className="text-sm font-black text-white mt-1 leading-snug truncate">
              {isHindi ? roleConfig.titleHi : roleConfig.title}
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5 truncate">
              {isHindi ? roleConfig.badgeHi : roleConfig.badge}
            </p>
          </div>
        </div>

      </div>

    </header>
  );
};
