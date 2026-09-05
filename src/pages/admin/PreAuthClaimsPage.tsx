import React, { useState } from 'react';
import { 
  FileCheck2, 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  Plus, 
  CheckCircle2, 
  DollarSign, 
  FileText, 
  Upload, 
  Search, 
  ChevronRight, 
  Edit3, 
  Building2,
  Phone,
  AlertTriangle,
  Send
} from 'lucide-react';
import { HospitalAdminData, PreAuthCase } from '../../types/admin';
import { Language } from '../../translations';
import { AdminDeskHeader } from '../../components/admin/AdminDeskHeader';

interface PreAuthClaimsPageProps {
  hospital: HospitalAdminData;
  adminUsername: string;
  language: Language;
  onSwitchDesk: () => void;
  onLogout: () => void;
  onOpenEditModal: () => void;
}

export const PreAuthClaimsPage: React.FC<PreAuthClaimsPageProps> = ({
  hospital,
  adminUsername,
  language,
  onSwitchDesk,
  onLogout,
  onOpenEditModal
}) => {
  const isHindi = language === 'hi';

  const [activeTab, setActiveTab] = useState<'all' | 'Approved' | 'Query Raised' | 'Under Review' | 'Cashless Cleared'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showNewPreAuthModal, setShowNewPreAuthModal] = useState<boolean>(false);

  // Pre-Auth Cases List State
  const [cases, setCases] = useState<PreAuthCase[]>([
    {
      id: 'pa-101',
      caseNumber: 'TMS-2026-09821',
      patientName: 'Ramakant Dewangan',
      patientAge: 56,
      pmjayId: 'PMJAY-CG-55201',
      packageCode: 'HBP-GS-021',
      packageName: 'Laparoscopic Cholecystectomy (Gallbladder)',
      specialty: 'General Surgery',
      requestedAmount: 26000,
      approvedAmount: 26000,
      status: 'Approved',
      submittedAt: 'Today, 09:15 AM',
      treatingDoctor: 'Dr. Alok Verma (MS Gen Surgery)',
      documentsCount: 4
    },
    {
      id: 'pa-102',
      caseNumber: 'TMS-2026-09822',
      patientName: 'Devaki Bai Nishad',
      patientAge: 64,
      pmjayId: 'PMJAY-CG-33109',
      packageCode: 'HBP-ORT-014',
      packageName: 'Unilateral Total Knee Replacement (TKR)',
      specialty: 'Orthopedics',
      requestedAmount: 95000,
      status: 'Query Raised',
      queryDetails: 'NHA Claim Reviewer requested pre-operative X-Ray digital DICOM & implant sticker invoice.',
      submittedAt: 'Today, 09:40 AM',
      treatingDoctor: 'Dr. Vivek Mishra (MS Ortho)',
      documentsCount: 2
    },
    {
      id: 'pa-103',
      caseNumber: 'TMS-2026-09823',
      patientName: 'Sunita Chandrakar',
      patientAge: 31,
      pmjayId: 'PMJAY-CG-77621',
      packageCode: 'HBP-OBG-003',
      packageName: 'Cesarean Section (LSCS) with Neonatal Care',
      specialty: 'Gynecology',
      requestedAmount: 14500,
      approvedAmount: 14500,
      status: 'Cashless Cleared',
      submittedAt: 'Yesterday, 04:30 PM',
      treatingDoctor: 'Dr. Shweta Thakur (MD OBGYN)',
      documentsCount: 5
    },
    {
      id: 'pa-104',
      caseNumber: 'TMS-2026-09824',
      patientName: 'Gajendra Rao',
      patientAge: 51,
      pmjayId: 'PMJAY-CG-44129',
      packageCode: 'HBP-CAR-009',
      packageName: 'Coronary Angiography with Drug-Eluting Stent',
      specialty: 'Cardiology',
      requestedAmount: 65000,
      status: 'Under Review',
      submittedAt: 'Today, 11:05 AM',
      treatingDoctor: 'Dr. P. K. Singhania (DM Cardiology)',
      documentsCount: 3
    }
  ]);

  // New Pre-Auth Form state
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientAge, setNewPatientAge] = useState('');
  const [newPmjayId, setNewPmjayId] = useState('');
  const [newPackage, setNewPackage] = useState('HBP-GS-021 Laparoscopic Cholecystectomy (₹26,000)');
  const [newDoctor, setNewDoctor] = useState('Dr. Alok Verma (MS Gen Surgery)');
  const [newNotes, setNewNotes] = useState('');

  const filteredCases = cases.filter(c => {
    const matchesTab = activeTab === 'all' || c.status === activeTab;
    const matchesQuery = !searchQuery.trim() || 
      c.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.packageName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesQuery;
  });

  const handleCreatePreAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName.trim() || !newPmjayId.trim()) return;

    const newCase: PreAuthCase = {
      id: `pa-${Date.now()}`,
      caseNumber: `TMS-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      patientName: newPatientName.trim(),
      patientAge: parseInt(newPatientAge) || 45,
      pmjayId: newPmjayId.trim().toUpperCase(),
      packageCode: newPackage.split(' ')[0],
      packageName: newPackage.split(' ').slice(1).join(' '),
      specialty: 'General Surgery',
      requestedAmount: 32000,
      status: 'Under Review',
      submittedAt: 'Just now',
      treatingDoctor: newDoctor,
      documentsCount: 3
    };

    setCases(prev => [newCase, ...prev]);
    setShowNewPreAuthModal(false);
    setNewPatientName('');
    setNewPatientAge('');
    setNewPmjayId('');
    setNewNotes('');
  };

  const handleApproveCase = (id: string) => {
    setCases(prev => prev.map(c => c.id === id ? { ...c, status: 'Approved', approvedAmount: c.requestedAmount } : c));
  };

  return (
    <div className="space-y-6">
      
      {/* Top Shared Header Banner */}
      <AdminDeskHeader
        hospital={hospital}
        adminUsername={adminUsername}
        activeRole="preauth"
        language={language}
        onSwitchDesk={onSwitchDesk}
        onLogout={onLogout}
        onOpenEditModal={onOpenEditModal}
      />

      {/* Metrics Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-emerald-900">
            <span className="text-xs font-bold text-slate-500 uppercase">
              {isHindi ? 'मंजूर कैशलेस राशि' : 'Cashless Cleared'}
            </span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">₹18,45,000</div>
          <p className="text-[11px] text-emerald-600 font-semibold">142 Cases This Month</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-blue-900">
            <span className="text-xs font-bold text-slate-500 uppercase">
              {isHindi ? 'अनुमोदन सफलता दर' : 'Pre-Auth Approval'}
            </span>
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">98.4%</div>
          <p className="text-[11px] text-slate-500">NHA Standard Benchmark</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-purple-900">
            <span className="text-xs font-bold text-slate-500 uppercase">
              {isHindi ? 'औसत अनुमोदन समय' : 'Avg. Turnaround'}
            </span>
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">14 Mins</div>
          <p className="text-[11px] text-purple-700 font-medium">HBP 2.0 Fast-Track</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-amber-900">
            <span className="text-xs font-bold text-slate-500 uppercase">
              {isHindi ? 'लंबित NHA क्वेरी' : 'Pending Queries'}
            </span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-900">
            {cases.filter(c => c.status === 'Query Raised').length} Actionable
          </div>
          <p className="text-[11px] text-amber-700 font-medium">Requires Doc Upload</p>
        </div>

      </div>

      {/* Hospital Desk Specific Info Card with Edit Option */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-emerald-900 text-xs font-extrabold uppercase tracking-wide">
            <FileCheck2 className="w-4 h-4 text-emerald-700" />
            <span>{isHindi ? 'टीएमएस नोडल क्लेम डेस्क विवरण' : 'TMS NHA Claims Nodal Authority'}</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            {isHindi && hospital.nameHi ? hospital.nameHi : hospital.name} • {hospital.facilityId}
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
            <span>Nodal Officer: <strong className="text-slate-800">{hospital.nodalOfficer || 'Dr. R. K. Sharma (CMO)'}</strong></span>
            <span>•</span>
            <span>Pre-Auth Hotline: <strong className="text-slate-800">{hospital.contact || '108 / N/A'}</strong></span>
            <span>•</span>
            <span>Empaneled Specialties: <strong>{(hospital.specialties || []).join(', ') || 'General Surgery, Ortho, Gyn'}</strong></span>
          </div>
        </div>

        <button
          onClick={onOpenEditModal}
          className="inline-flex items-center gap-1.5 bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs shrink-0 self-start md:self-auto"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{isHindi ? 'क्लेम डेस्क विवरण संपादित करें' : 'Edit Claims Info'}</span>
        </button>
      </div>

      {/* Main Pre-Auth Management Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-5">
        
        {/* Header & New Booking Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-emerald-900" />
              <span>{isHindi ? 'सर्जिकल प्री-ऑथराइजेशन एवं क्लेम पाइपलाइन' : 'Pre-Authorization & Claims Pipeline (TMS)'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isHindi 
                ? 'मरीजों के सर्जरी पैकेज अनुमोदन, क्लेम राशि एवं डिजिटल दस्तावेजों की ट्रैकिंग।' 
                : 'Manage HBP 2.0 surgical packages, cashless pre-authorizations, and NHA queries.'}
            </p>
          </div>

          <button
            onClick={() => setShowNewPreAuthModal(true)}
            className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{isHindi ? 'नया प्री-ऑथ सबमिट करें' : 'Submit Pre-Authorization'}</span>
          </button>
        </div>

        {/* Filter Tabs & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {(['all', 'Approved', 'Query Raised', 'Under Review', 'Cashless Cleared'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab
                    ? 'bg-emerald-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab === 'all' ? (isHindi ? 'सभी क्लेम' : 'All Cases') : tab}
              </button>
            ))}
          </div>

          <div className="relative sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={isHindi ? 'मरीज अथवा केस खोजें...' : 'Search patient or case...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-900"
            />
          </div>

        </div>

        {/* Cases List */}
        <div className="space-y-3">
          {filteredCases.map((item) => (
            <div 
              key={item.id}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-200 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-start sm:items-center gap-2.5">
                  <span className="font-mono text-xs font-bold bg-slate-900 text-sky-300 px-2.5 py-1 rounded-lg">
                    {item.caseNumber}
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900">
                      {item.patientName} ({item.patientAge}y)
                    </h4>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {item.pmjayId}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                    item.status === 'Approved'
                      ? 'bg-blue-100 text-blue-800 border-blue-300'
                      : item.status === 'Cashless Cleared'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : item.status === 'Query Raised'
                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                      : 'bg-purple-100 text-purple-800 border-purple-300'
                  }`}>
                    {item.status}
                  </span>

                  <span className="font-extrabold text-xs sm:text-sm text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                    ₹{item.requestedAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Package & Doctor detail */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 pt-1 border-t border-slate-200/60">
                <div>
                  <span className="font-bold text-slate-800 block">{item.packageName}</span>
                  <span className="text-[11px] text-slate-500">
                    Dept: {item.specialty} • Surgeon: {item.treatingDoctor}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 text-[11px] flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{item.documentsCount} Docs Attached</span>
                  </span>

                  {item.status === 'Query Raised' && (
                    <button
                      onClick={() => alert(`NHA Query details: ${item.queryDetails}`)}
                      className="bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold px-3 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <AlertTriangle className="w-3 h-3" />
                      <span>{isHindi ? 'क्वेरी जवाब दें' : 'Respond to Query'}</span>
                    </button>
                  )}

                  {item.status === 'Under Review' && (
                    <button
                      onClick={() => handleApproveCase(item.id)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold px-3 py-1 rounded-lg transition-colors cursor-pointer"
                    >
                      {isHindi ? 'मंजूरी दें' : 'Fast-Track Approve'}
                    </button>
                  )}
                </div>
              </div>

              {/* Notice Banner if Query Raised */}
              {item.queryDetails && item.status === 'Query Raised' && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">NHA Review Note: </strong>
                    <span>{item.queryDetails}</span>
                  </div>
                </div>
              )}
            </div>
          ))}

          {filteredCases.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-xs">
              {isHindi ? 'कोई प्री-ऑथ रिकॉर्ड नहीं मिला।' : 'No pre-authorization cases found.'}
            </div>
          )}
        </div>

      </div>

      {/* New Pre-Auth Modal */}
      {showNewPreAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-emerald-800" />
                <span>{isHindi ? 'नया सर्जिकल प्री-ऑथ अनुरोध दर्ज करें' : 'Submit New Pre-Authorization (HBP 2.0)'}</span>
              </h3>
              <button 
                onClick={() => setShowNewPreAuthModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePreAuth} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  {isHindi ? 'मरीज का नाम' : 'Beneficiary / Patient Name'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rameshwar Lal"
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {isHindi ? 'उम्र (वर्ष)' : 'Age'}
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 52"
                    value={newPatientAge}
                    onChange={(e) => setNewPatientAge(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {isHindi ? 'PM-JAY कार्ड नंबर' : 'PM-JAY Card ID'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. PMJAY-CG-99214"
                    value={newPmjayId}
                    onChange={(e) => setNewPmjayId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs uppercase"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  {isHindi ? 'सर्जरी / उपचार पैकेज' : 'Covered Treatment Package (HBP 2.0)'}
                </label>
                <select
                  value={newPackage}
                  onChange={(e) => setNewPackage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                >
                  <option value="HBP-GS-021 Laparoscopic Cholecystectomy (₹26,000)">HBP-GS-021 Laparoscopic Cholecystectomy (₹26,000)</option>
                  <option value="HBP-ORT-014 Unilateral Total Knee Replacement (₹95,000)">HBP-ORT-014 Unilateral Total Knee Replacement (₹95,000)</option>
                  <option value="HBP-CAR-009 Coronary Angiography with Stent (₹65,000)">HBP-CAR-009 Coronary Angiography with Stent (₹65,000)</option>
                  <option value="HBP-OBG-003 Cesarean Section with Nursery (₹14,500)">HBP-OBG-003 Cesarean Section with Nursery (₹14,500)</option>
                  <option value="HBP-OPH-002 Phaco Cataract Surgery with Foldable IOL (₹10,500)">HBP-OPH-002 Phaco Cataract Surgery with Foldable IOL (₹10,500)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  {isHindi ? 'उपचारक विशेषज्ञ सर्जन' : 'Treating Specialist / Surgeon'}
                </label>
                <input
                  type="text"
                  value={newDoctor}
                  onChange={(e) => setNewDoctor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  {isHindi ? 'क्लिनिकल नोट्स एवं नैदानिक निष्कर्ष' : 'Clinical Diagnostic Notes'}
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Symptomatic cholelithiasis, USG verified multiple stones. Fit for laparoscopic surgery."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Hospital digital signature will be appended automatically upon submission.</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewPreAuthModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-5 py-2 rounded-xl"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit to TMS</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
