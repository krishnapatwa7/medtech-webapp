import React, { useState } from 'react';
import { 
  BedDouble, 
  Activity, 
  ShieldCheck, 
  UserCheck, 
  Clock, 
  AlertCircle, 
  Plus, 
  CheckCircle2, 
  Search, 
  Edit3, 
  Building2, 
  Stethoscope, 
  Phone, 
  Filter, 
  Flame, 
  Sparkles,
  HeartPulse
} from 'lucide-react';
import { HospitalAdminData, WardBed, DoctorRosterItem } from '../../types/admin';
import { Language } from '../../translations';
import { AdminDeskHeader } from '../../components/admin/AdminDeskHeader';

interface BedSpecialtyManagerPageProps {
  hospital: HospitalAdminData;
  adminUsername: string;
  language: Language;
  onSwitchDesk: () => void;
  onLogout: () => void;
  onOpenEditModal: () => void;
}

export const BedSpecialtyManagerPage: React.FC<BedSpecialtyManagerPageProps> = ({
  hospital,
  adminUsername,
  language,
  onSwitchDesk,
  onLogout,
  onOpenEditModal
}) => {
  const isHindi = language === 'hi';

  const [selectedWardFilter, setSelectedWardFilter] = useState<string>('All');
  const [showAddDoctorModal, setShowAddDoctorModal] = useState<boolean>(false);

  // Live Ward Bed Tracker Matrix
  const [beds, setBeds] = useState<WardBed[]>([
    { id: 'b-1', bedCode: 'ICU-01', wardCategory: 'ICU / CCU', status: 'Occupied', patientName: 'Devaki Bai (Post-Op TKR)', admittedAt: 'Yesterday' },
    { id: 'b-2', bedCode: 'ICU-02', wardCategory: 'ICU / CCU', status: 'Available' },
    { id: 'b-3', bedCode: 'ICU-03', wardCategory: 'ICU / CCU', status: 'Available' },
    { id: 'b-4', bedCode: 'ICU-04', wardCategory: 'ICU / CCU', status: 'Reserved', patientName: 'Incoming Cardiac Triage', admittedAt: 'ETA 15m' },
    { id: 'b-5', bedCode: 'ICU-05', wardCategory: 'ICU / CCU', status: 'Sanitizing' },
    { id: 'b-6', bedCode: 'OXY-101', wardCategory: 'Oxygen Ward', status: 'Occupied', patientName: 'Rameshwar Lal', admittedAt: '2 days ago' },
    { id: 'b-7', bedCode: 'OXY-102', wardCategory: 'Oxygen Ward', status: 'Available' },
    { id: 'b-8', bedCode: 'OXY-103', wardCategory: 'Oxygen Ward', status: 'Available' },
    { id: 'b-9', bedCode: 'OXY-104', wardCategory: 'Oxygen Ward', status: 'Occupied', patientName: 'Bhagwat Prasad', admittedAt: 'Today' },
    { id: 'b-10', bedCode: 'GEN-M-01', wardCategory: 'General Male', status: 'Occupied', patientName: 'Kishore Patel', admittedAt: '3 days ago' },
    { id: 'b-11', bedCode: 'GEN-M-02', wardCategory: 'General Male', status: 'Available' },
    { id: 'b-12', bedCode: 'GEN-M-03', wardCategory: 'General Male', status: 'Available' },
    { id: 'b-13', bedCode: 'GEN-F-01', wardCategory: 'General Female', status: 'Occupied', patientName: 'Sunita Chandrakar', admittedAt: 'Yesterday' },
    { id: 'b-14', bedCode: 'GEN-F-02', wardCategory: 'General Female', status: 'Available' },
    { id: 'b-15', bedCode: 'PED-01', wardCategory: 'Pediatric / NICU', status: 'Available' },
    { id: 'b-16', bedCode: 'PED-02', wardCategory: 'Pediatric / NICU', status: 'Occupied', patientName: 'Baby of Geeta', admittedAt: 'Today' }
  ]);

  // Doctor on-duty roster
  const [doctors, setDoctors] = useState<DoctorRosterItem[]>([
    {
      id: 'doc-1',
      doctorName: 'Dr. Alok Verma',
      specialty: 'General Surgery',
      qualification: 'MS (Gen Surg), FIAGES',
      shift: 'Morning (8 AM - 2 PM)',
      status: 'In Surgery',
      contact: 'Ext. 201'
    },
    {
      id: 'doc-2',
      doctorName: 'Dr. Vivek Mishra',
      specialty: 'Orthopedics',
      qualification: 'MS (Ortho), Joint Replacement',
      shift: 'Morning (8 AM - 2 PM)',
      status: 'On Duty',
      contact: 'Ext. 204'
    },
    {
      id: 'doc-3',
      doctorName: 'Dr. Shweta Thakur',
      specialty: 'Gynecology & Obstetrics',
      qualification: 'MD (OBGYN)',
      shift: 'Evening (2 PM - 8 PM)',
      status: 'On Duty',
      contact: 'Ext. 208'
    },
    {
      id: 'doc-4',
      doctorName: 'Dr. P. K. Singhania',
      specialty: 'Cardiology',
      qualification: 'DM (Cardiology)',
      shift: '24/7 On-Call',
      status: 'On Ward Round',
      contact: 'Ext. 215'
    }
  ]);

  // Add doctor form state
  const [newDocName, setNewDocName] = useState('');
  const [newDocSpec, setNewDocSpec] = useState('General Surgery');
  const [newDocShift, setNewDocShift] = useState<DoctorRosterItem['shift']>('Morning (8 AM - 2 PM)');
  const [newDocContact, setNewDocContact] = useState('');

  // Bed status cycler
  const handleCycleBedStatus = (bedId: string) => {
    const cycleMap: Record<WardBed['status'], WardBed['status']> = {
      'Available': 'Occupied',
      'Occupied': 'Sanitizing',
      'Sanitizing': 'Reserved',
      'Reserved': 'Available'
    };

    setBeds(prev => prev.map(b => {
      if (b.id === bedId) {
        const nextStatus = cycleMap[b.status];
        return {
          ...b,
          status: nextStatus,
          patientName: nextStatus === 'Available' || nextStatus === 'Sanitizing' ? undefined : b.patientName || 'Admitted Patient',
          admittedAt: nextStatus === 'Occupied' ? 'Just Now' : b.admittedAt
        };
      }
      return b;
    }));
  };

  const handleToggleDocStatus = (docId: string) => {
    const statusCycle: Record<DoctorRosterItem['status'], DoctorRosterItem['status']> = {
      'On Duty': 'In Surgery',
      'In Surgery': 'On Ward Round',
      'On Ward Round': 'Off Duty',
      'Off Duty': 'On Duty'
    };

    setDoctors(prev => prev.map(d => d.id === docId ? { ...d, status: statusCycle[d.status] } : d));
  };

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;

    const newDoc: DoctorRosterItem = {
      id: `doc-${Date.now()}`,
      doctorName: newDocName.trim(),
      specialty: newDocSpec,
      qualification: 'MBBS, MD/MS',
      shift: newDocShift,
      status: 'On Duty',
      contact: newDocContact.trim() || 'Ext. 220'
    };

    setDoctors(prev => [...prev, newDoc]);
    setNewDocName('');
    setNewDocContact('');
    setShowAddDoctorModal(false);
  };

  const filteredBeds = beds.filter(b => selectedWardFilter === 'All' || b.wardCategory === selectedWardFilter);

  const availableCount = beds.filter(b => b.status === 'Available').length;
  const occupiedCount = beds.filter(b => b.status === 'Occupied').length;
  const icuAvailable = beds.filter(b => b.wardCategory === 'ICU / CCU' && b.status === 'Available').length;
  const oxygenAvailable = beds.filter(b => b.wardCategory === 'Oxygen Ward' && b.status === 'Available').length;

  return (
    <div className="space-y-6">
      
      {/* Top Shared Header Banner */}
      <AdminDeskHeader
        hospital={hospital}
        adminUsername={adminUsername}
        activeRole="bed"
        language={language}
        onSwitchDesk={onSwitchDesk}
        onLogout={onLogout}
        onOpenEditModal={onOpenEditModal}
      />

      {/* Metrics Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-purple-900">
            <span className="text-xs font-bold text-slate-500 uppercase">
              {isHindi ? 'उपलब्ध कुल बेड' : 'Available Beds'}
            </span>
            <BedDouble className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {128 + availableCount - 7} / {hospital.totalBeds || 400}
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Real-time Occupancy 68%</span>
          </p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-rose-900">
            <span className="text-xs font-bold text-slate-500 uppercase">
              {isHindi ? 'आईसीयू / सीसीयू बेड' : 'ICU / Critical Beds'}
            </span>
            <HeartPulse className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-950">
            {icuAvailable} / {hospital.icuBeds || 45} Free
          </div>
          <p className="text-[11px] text-slate-500">Ventilators equipped</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-blue-900">
            <span className="text-xs font-bold text-slate-500 uppercase">
              {isHindi ? 'ऑक्सीजन सपोर्ट बेड' : 'Oxygen Beds Free'}
            </span>
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {oxygenAvailable} / {hospital.oxygenBeds || 80} Free
          </div>
          <p className="text-[11px] text-sky-600 font-medium">PSA Oxygen: 96% purity</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-amber-900">
            <span className="text-xs font-bold text-slate-500 uppercase">
              {isHindi ? 'ऑन-ड्यूटी विशेषज्ञ' : 'Doctors On Duty'}
            </span>
            <Stethoscope className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {doctors.filter(d => d.status !== 'Off Duty').length} Doctors
          </div>
          <p className="text-[11px] text-emerald-600 font-medium">All specialties covered</p>
        </div>

      </div>

      {/* Hospital Desk Specific Info Card with Edit Option */}
      <div className="bg-purple-50/70 border border-purple-200 rounded-3xl p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-purple-900 text-xs font-extrabold uppercase tracking-wide">
            <BedDouble className="w-4 h-4 text-purple-700" />
            <span>{isHindi ? 'अस्पताल वार्ड एवं बेड क्षमता विवरण' : 'Hospital Bed & Clinical Ward Allocation'}</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            {isHindi && hospital.nameHi ? hospital.nameHi : hospital.name} • {hospital.facilityId}
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
            <span>Total Bed Capacity: <strong className="text-slate-800">{hospital.totalBeds || 400} Beds</strong></span>
            <span>•</span>
            <span>ICU Beds: <strong className="text-slate-800">{hospital.icuBeds || 45}</strong></span>
            <span>•</span>
            <span>Emergency Triage: <strong className="text-slate-800">{hospital.emergencyContact || '108 / 0788-2322300'}</strong></span>
            <span>•</span>
            <span>Empaneled Specialties: <strong>{(hospital.specialties || []).join(', ') || 'Surgery, Ortho, Gyn'}</strong></span>
          </div>
        </div>

        <button
          onClick={onOpenEditModal}
          className="inline-flex items-center gap-1.5 bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs shrink-0 self-start md:self-auto"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{isHindi ? 'बेड व क्षमता संपादित करें' : 'Edit Bed & Facility Info'}</span>
        </button>
      </div>

      {/* Section 1: Live Interactive Ward Bed Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <BedDouble className="w-5 h-5 text-purple-900" />
              <span>{isHindi ? 'लाइव वार्ड बेड ट्रैकर एवं स्थिति' : 'Live Ward Bed Tracker & Matrix'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isHindi 
                ? 'किसी भी बेड पर क्लिक करके उसकी स्थिति (उपलब्ध, अधिग्रहित, आरक्षित, सैनिटाइजेशन) बदलें।' 
                : 'Click any bed tile to cycle status (Available ➔ Occupied ➔ Sanitizing ➔ Reserved ➔ Available).'}
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-slate-600 font-medium">Available</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              <span className="text-slate-600 font-medium">Occupied</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="text-slate-600 font-medium">Reserved</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="text-slate-600 font-medium">Sanitizing</span>
            </span>
          </div>
        </div>

        {/* Ward Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {['All', 'ICU / CCU', 'Oxygen Ward', 'General Male', 'General Female', 'Pediatric / NICU'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedWardFilter(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedWardFilter === cat
                  ? 'bg-purple-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bed Tiles Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {filteredBeds.map((bed) => {
            const statusStyles = {
              'Available': 'bg-emerald-50 border-emerald-300 text-emerald-950 hover:bg-emerald-100',
              'Occupied': 'bg-rose-50 border-rose-300 text-rose-950 hover:bg-rose-100',
              'Reserved': 'bg-amber-50 border-amber-300 text-amber-950 hover:bg-amber-100',
              'Sanitizing': 'bg-blue-50 border-blue-300 text-blue-950 hover:bg-blue-100'
            }[bed.status];

            const dotColor = {
              'Available': 'bg-emerald-500',
              'Occupied': 'bg-rose-500',
              'Reserved': 'bg-amber-500',
              'Sanitizing': 'bg-blue-500'
            }[bed.status];

            return (
              <button
                type="button"
                key={bed.id}
                onClick={() => handleCycleBedStatus(bed.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-1.5 shadow-2xs ${statusStyles}`}
                title="Click to change status"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black">{bed.bedCode}</span>
                  <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
                </div>
                
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-80 truncate">
                  {bed.status}
                </div>

                <div className="text-[10px] text-slate-500 truncate">
                  {bed.patientName || bed.wardCategory}
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-3 bg-purple-50/60 border border-purple-200/80 rounded-2xl text-xs text-purple-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-700" />
            <span>Interactive Bed Status: Click on any tile to toggle admission/sanitization status.</span>
          </div>
          <span className="font-bold text-[11px]">Auto-refreshed with Central PM-JAY Bed Registry</span>
        </div>

      </div>

      {/* Section 2: Empaneled Specialties & Doctor On-Duty Roster */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Doctor Roster */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-purple-900" />
                <span>{isHindi ? 'ऑन-ड्यूटी डॉक्टर एवं विशेषज्ञ रोस्टर' : 'Doctor On-Duty Roster & Shifts'}</span>
              </h3>
              <p className="text-xs text-slate-500">
                {isHindi ? 'वर्तमान में सक्रिय विशेषज्ञ चिकित्सक एवं ऑन-कॉल आपातकालीन स्थिति' : 'Active specialist consultants and on-call surgeons'}
              </p>
            </div>

            <button
              onClick={() => setShowAddDoctorModal(true)}
              className="inline-flex items-center gap-1.5 bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isHindi ? 'डॉक्टर जोड़ें' : 'Add Doctor'}</span>
            </button>
          </div>

          <div className="space-y-3">
            {doctors.map((doc) => (
              <div 
                key={doc.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-purple-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center font-bold text-sm shrink-0">
                    Dr
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900">
                      {doc.doctorName}
                    </h4>
                    <p className="text-[11px] text-purple-900 font-semibold">
                      {doc.specialty} • <span className="text-slate-500 font-normal">{doc.qualification}</span>
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                      <span>Shift: {doc.shift}</span>
                      <span>•</span>
                      <span className="font-medium text-slate-700">{doc.contact}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => handleToggleDocStatus(doc.id)}
                    className={`text-[11px] font-bold px-3 py-1 rounded-full border transition-all cursor-pointer ${
                      doc.status === 'On Duty'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                        : doc.status === 'In Surgery'
                        ? 'bg-rose-100 text-rose-800 border-rose-300 hover:bg-rose-200'
                        : doc.status === 'On Ward Round'
                        ? 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200'
                        : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                    }`}
                    title="Click to cycle status"
                  >
                    ● {doc.status}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right 1 Col: Empaneled Specialties Breakdown */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
          
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <span>{isHindi ? 'पंजीकृत विभाग व सेवाएं' : 'Empaneled Departments'}</span>
            </h3>
            <p className="text-xs text-slate-500">
              {isHindi ? 'अस्पताल में उपलब्ध सभी पंजीकृत चिकित्सा विभाग' : 'Active medical specialties registered under PM-JAY'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(hospital.specialties && hospital.specialties.length > 0 
              ? hospital.specialties 
              : ['General Surgery', 'Orthopedics', 'Gynecology & Obstetrics', 'Pediatrics', 'Cardiology', 'Ophthalmology', 'ENT', 'General Medicine']
            ).map((spec) => (
              <span
                key={spec}
                className="bg-purple-50 text-purple-900 border border-purple-200 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                <span>{spec}</span>
              </span>
            ))}
          </div>

          {/* Quick info card on PSA Oxygen Plant */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-sky-400 font-bold">
              <Activity className="w-4 h-4" />
              <span>Medical Gas & Oxygen Pipeline</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              Pressure: <strong>4.2 Bar</strong> (Optimal). Liquid Medical Oxygen (LMO) tank capacity at <strong>84%</strong>. Dedicated backup cylinders tested and operational.
            </p>
          </div>

        </div>

      </div>

      {/* Add Doctor Modal */}
      {showAddDoctorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-purple-900" />
                <span>{isHindi ? 'नया डॉक्टर रोस्टर में जोड़ें' : 'Add Doctor to Duty Roster'}</span>
              </h3>
              <button 
                onClick={() => setShowAddDoctorModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddDoctor} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Doctor Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Neha Deshmukh"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Department / Specialty
                </label>
                <select
                  value={newDocSpec}
                  onChange={(e) => setNewDocSpec(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                >
                  {(hospital.specialties && hospital.specialties.length > 0 ? hospital.specialties : ['General Surgery', 'Orthopedics', 'Gynecology', 'Cardiology', 'Pediatrics', 'General Medicine']).map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Shift Timing
                </label>
                <select
                  value={newDocShift}
                  onChange={(e) => setNewDocShift(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                >
                  <option value="Morning (8 AM - 2 PM)">Morning (8 AM - 2 PM)</option>
                  <option value="Evening (2 PM - 8 PM)">Evening (2 PM - 8 PM)</option>
                  <option value="Night (8 PM - 8 AM)">Night (8 PM - 8 AM)</option>
                  <option value="24/7 On-Call">24/7 On-Call</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Intercom / Extension Phone
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ext. 219"
                  value={newDocContact}
                  onChange={(e) => setNewDocContact(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddDoctorModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-900 hover:bg-purple-950 text-white font-bold px-5 py-2 rounded-xl"
                >
                  Save to Roster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
