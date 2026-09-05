import React, { useState } from 'react';
import { 
  X, 
  Save, 
  RotateCcw, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  BedDouble, 
  ShieldCheck, 
  UserCheck, 
  Plus, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { HospitalAdminData } from '../../types/admin';
import { Language } from '../../translations';

interface EditHospitalModalProps {
  isOpen: boolean;
  hospital: HospitalAdminData;
  language: Language;
  onClose: () => void;
  onSave: (updated: HospitalAdminData) => void;
  onResetDefaults: () => void;
}

export const EditHospitalModal: React.FC<EditHospitalModalProps> = ({
  isOpen,
  hospital,
  language,
  onClose,
  onSave,
  onResetDefaults
}) => {
  const isHindi = language === 'hi';

  const [formData, setFormData] = useState<HospitalAdminData>({ ...hospital });
  const [newSpecialty, setNewSpecialty] = useState<string>('');
  const [saveFeedback, setSaveFeedback] = useState<boolean>(false);

  // Sync state if hospital prop changes
  React.useEffect(() => {
    setFormData({ ...hospital });
  }, [hospital]);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof HospitalAdminData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddSpecialty = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newSpecialty.trim();
    if (!trimmed) return;
    const current = formData.specialties || [];
    if (!current.includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        specialties: [...(prev.specialties || []), trimmed]
      }));
    }
    setNewSpecialty('');
  };

  const handleRemoveSpecialty = (item: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: (prev.specialties || []).filter(s => s !== item)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSaveFeedback(true);
    setTimeout(() => {
      setSaveFeedback(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600 text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                {isHindi ? 'अस्पताल एवं डेस्क जानकारी संपादित करें' : 'Edit Hospital & Desk Information'}
              </h2>
              <p className="text-xs text-slate-400">
                Facility ID: <span className="font-mono text-sky-400 font-bold">{hospital.facilityId || hospital.hospitalId}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1 text-xs sm:text-sm">
          
          {saveFeedback && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="font-bold">
                {isHindi ? 'जानकारी सफलतापूर्वक सुरक्षित कर ली गई है!' : 'Hospital details updated & saved successfully!'}
              </span>
            </div>
          )}

          {/* Section 1: Basic Hospital Identity */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>{isHindi ? 'अस्पताल का नाम व पहचान' : 'Hospital Identification'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1 text-xs">
                  {isHindi ? 'अस्पताल का नाम (अंग्रेजी)' : 'Hospital Name (English)'}
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-900 focus:ring-1 focus:ring-blue-900 text-xs font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1 text-xs">
                  {isHindi ? 'अस्पताल का नाम (हिंदी)' : 'Hospital Name (Hindi)'}
                </label>
                <input
                  type="text"
                  value={formData.nameHi || ''}
                  onChange={(e) => handleInputChange('nameHi', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-900 focus:ring-1 focus:ring-blue-900 text-xs font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1 text-xs">
                  {isHindi ? 'अस्पताल प्रकार' : 'Facility Type'}
                </label>
                <select
                  value={formData.type || 'GOV'}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-900 text-xs font-medium bg-white"
                >
                  <option value="GOV">GOV (Government / सार्वजनिक)</option>
                  <option value="PRIVATE">PRIVATE (Empaneled Private / निजी)</option>
                  <option value="NABH_Accredited">NABH Accredited</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1 text-xs">
                  {isHindi ? 'पीएम-जय योजना कोड' : 'Empanelment Scheme Code'}
                </label>
                <input
                  type="text"
                  value={formData.schemeCode || 'PM-JAY'}
                  onChange={(e) => handleInputChange('schemeCode', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-900 text-xs font-medium"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Contact & Address Information */}
          <div className="space-y-3 pt-3 border-t border-slate-200">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>{isHindi ? 'संपर्क एवं पता विवरण' : 'Contact & Address Details'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1 text-xs">
                  {isHindi ? 'आधिकारिक संपर्क नंबर' : 'Primary Contact Phone'}
                </label>
                <input
                  type="text"
                  value={formData.contact || ''}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-900 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1 text-xs">
                  {isHindi ? 'आपातकालीन हेल्पलाइन' : 'Emergency Triage Contact'}
                </label>
                <input
                  type="text"
                  value={formData.emergencyContact || '108 / 0788-2322300'}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-900 text-xs font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1 text-xs">
                  {isHindi ? 'प्रशासनिक ईमेल' : 'Official Portal Email'}
                </label>
                <input
                  type="email"
                  value={formData.email || 'admin.desk@hospital.gov.in'}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-900 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1 text-xs">
                  {isHindi ? 'राज्य एवं जिला' : 'State & District'}
                </label>
                <input
                  type="text"
                  value={formData.stateName ? `${formData.districtCode || ''}, ${formData.stateName}` : ''}
                  onChange={(e) => handleInputChange('stateName', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-900 text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1 text-xs">
                {isHindi ? 'अस्पताल का पूरा पता' : 'Hospital Full Address'}
              </label>
              <textarea
                value={formData.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-900 text-xs font-medium"
              />
            </div>
          </div>

          {/* Section 3: Operational & Desk Details */}
          <div className="space-y-3 pt-3 border-t border-slate-200">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-purple-600" />
              <span>{isHindi ? 'परिचालन डेस्क एवं नोडल अधिकारी' : 'Desk Leads & Capacity Metrics'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1 text-xs">
                  {isHindi ? 'कुल बेड क्षमता' : 'Total Bed Capacity'}
                </label>
                <input
                  type="number"
                  value={formData.totalBeds || 400}
                  onChange={(e) => handleInputChange('totalBeds', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-900 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1 text-xs">
                  {isHindi ? 'आईसीयू बेड' : 'ICU Beds'}
                </label>
                <input
                  type="number"
                  value={formData.icuBeds || 45}
                  onChange={(e) => handleInputChange('icuBeds', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-900 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1 text-xs">
                  {isHindi ? 'ऑक्सीजन सपोर्ट बेड' : 'Oxygen Beds'}
                </label>
                <input
                  type="number"
                  value={formData.oxygenBeds || 80}
                  onChange={(e) => handleInputChange('oxygenBeds', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-900 text-xs font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1 text-xs">
                  {isHindi ? 'नोडल क्लेम अधिकारी' : 'NHA Nodal Claims Officer'}
                </label>
                <input
                  type="text"
                  value={formData.nodalOfficer || 'Dr. R. K. Sharma (CMO)'}
                  onChange={(e) => handleInputChange('nodalOfficer', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-900 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1 text-xs">
                  {isHindi ? 'आयुष्मान मित्र प्रमुख' : 'Lead Ayushman Mitra'}
                </label>
                <input
                  type="text"
                  value={formData.mitraLead || 'Sunita Verma (Desk Incharge)'}
                  onChange={(e) => handleInputChange('mitraLead', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-900 text-xs font-medium"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Empaneled Specialties Tags */}
          <div className="space-y-3 pt-3 border-t border-slate-200">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{isHindi ? 'पंजीकृत विशेषज्ञताएं (Specialties)' : 'Empaneled Medical Specialties'}</span>
            </h3>

            {/* Specialties Chips */}
            <div className="flex flex-wrap gap-1.5">
              {(formData.specialties || []).map((spec) => (
                <span
                  key={spec}
                  className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-900 border border-blue-200 px-2.5 py-1 rounded-lg text-xs font-bold"
                >
                  <span>{spec}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecialty(spec)}
                    className="text-blue-500 hover:text-rose-600 rounded-full cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
              {(!formData.specialties || formData.specialties.length === 0) && (
                <span className="text-slate-400 text-xs italic">
                  {isHindi ? 'कोई विशेषज्ञता नहीं जोड़ी गई।' : 'No specialties added.'}
                </span>
              )}
            </div>

            {/* Add Specialty input */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                placeholder={isHindi ? 'उदा. Cardiology, General Surgery...' : 'e.g. Cardiology, Ophthalmology...'}
                value={newSpecialty}
                onChange={(e) => setNewSpecialty(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSpecialty(e);
                  }
                }}
                className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-900 text-xs"
              />
              <button
                type="button"
                onClick={handleAddSpecialty}
                className="inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-900 text-white font-bold px-3 py-1.5 rounded-xl text-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isHindi ? 'जोड़ें' : 'Add'}</span>
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onResetDefaults}
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 text-xs font-bold px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isHindi ? 'मूल डेटा पुनर्स्थापित करें' : 'Reset to Registry Defaults'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold cursor-pointer"
              >
                {isHindi ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 bg-blue-900 hover:bg-blue-950 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isHindi ? 'बदलाव सुरक्षित करें' : 'Save Changes'}</span>
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
