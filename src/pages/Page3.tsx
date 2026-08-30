import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Navigation, 
  Phone, 
  PhoneCall, 
  Building2, 
  ShieldCheck, 
  CheckCircle, 
  Sparkles, 
  Clock, 
  ExternalLink,
  Star,
  Check,
  Stethoscope,
  BedDouble,
  HeartHandshake,
  UserCheck,
  FileText,
  AlertCircle,
  PlusCircle,
  X,
  Send,
  Calendar,
  ThumbsUp
} from 'lucide-react';
import { Language, translations } from '../translations';
import { Hospital } from '../data/hospitals';
import { initialReviews, Review } from '../data/reviews';
import { UserLocation } from '../utils/location';

interface Page3Props {
  hospital: Hospital;
  userLocation: UserLocation;
  language: Language;
  onBack: () => void;
}

export const Page3: React.FC<Page3Props> = ({ hospital, userLocation, language, onBack }) => {
  const t = translations[language];

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>(initialReviews.default);
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Form State
  const [formName, setFormName] = useState<string>('');
  const [formTreatment, setFormTreatment] = useState<string>('');
  const [formRating, setFormRating] = useState<number>(5);
  const [formComment, setFormComment] = useState<string>('');
  const [formCashless, setFormCashless] = useState<'100% Cashless' | 'Smooth Approval' | 'Fast Admission'>('100% Cashless');

  const isGovt = hospital.type === 'government';
  const hospitalName = language === 'hi' ? (hospital.nameHi || hospital.name) : hospital.name;
  const hospitalAddress = language === 'hi' ? (hospital.addressHi || hospital.address) : hospital.address;

  // Google Maps navigation & search URLs
  const mapsDirUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${hospital.lat},${hospital.lng}`;
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.name + ', ' + hospital.address)}`;

  const distance = hospital.distanceKm ?? 1.2;
  const estDriveMins = Math.max(3, Math.round(distance * 2.5));

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      hospitalId: hospital.id,
      userName: formName.trim(),
      userCity: `${userLocation.area}, ${userLocation.city}`,
      treatment: formTreatment.trim() || 'General PM-JAY Treatment',
      treatmentHi: formTreatment.trim() || 'सामान्य पीएम-जय उपचार',
      rating: formRating,
      date: 'Just now (Verified)',
      verifiedBeneficiary: true,
      comment: formComment.trim(),
      commentHi: formComment.trim(),
      ayushmanMitraRating: formRating,
      cashlessExperience: formCashless
    };

    setReviews([newRev, ...reviews]);
    setShowReviewModal(false);
    setFormName('');
    setFormTreatment('');
    setFormComment('');
    setSuccessMessage(t.reviewSuccessMsg);
    setTimeout(() => setSuccessMessage(''), 6000);
  };

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-900 bg-white hover:bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToHospitals}</span>
        </button>

        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>{t.p3Badge}</span>
        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Hero Hospital Info Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-8 shadow-xs space-y-6">
        
        {/* Title, Badges & Distance */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {isGovt ? (
                <span className="bg-blue-50 text-blue-900 border border-blue-200 text-xs font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-blue-800" />
                  <span>{language === 'hi' ? 'सरकारी अस्पताल (Government)' : 'Government Facility'}</span>
                </span>
              ) : (
                <span className="bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'hi' ? 'निजी अस्पताल (PM-JAY Empaneled)' : 'Private Empaneled'}</span>
                </span>
              )}

              <span className="bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.ayushmanMitra}</span>
              </span>

              <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-0.5 rounded-md">
                AB-PMJAY Code: #{hospital.id.toUpperCase()}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {hospitalName}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{hospitalAddress}</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded font-mono text-xs text-slate-700">
                <span>{hospital.lat.toFixed(4)}° N, {hospital.lng.toFixed(4)}° E</span>
              </div>
            </div>
          </div>

          {/* Distance & Travel Card */}
          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl shrink-0 text-left md:text-right space-y-1">
            <div className="text-xl font-black text-blue-900 flex items-center md:justify-end gap-1.5">
              <Navigation className="w-4 h-4 text-blue-700" />
              <span>{distance} km away</span>
            </div>
            <div className="text-xs text-slate-500 font-medium flex items-center md:justify-end gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>~{estDriveMins} mins drive from your location</span>
            </div>
          </div>
        </div>

        {/* 4 Quick Stat Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
            <div className="flex items-center gap-1 text-amber-500 font-black text-lg">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>4.8</span>
              <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
            </div>
            <div className="text-xs text-slate-600 font-semibold mt-0.5">Beneficiary Score</div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
            <div className="text-lg font-black text-blue-900">{hospital.beds}+</div>
            <div className="text-xs text-slate-600 font-semibold mt-0.5">Total Hospital Beds</div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
            <div className="text-lg font-black text-emerald-700">₹0 Cashless</div>
            <div className="text-xs text-slate-600 font-semibold mt-0.5">Under PM-JAY Limit</div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
            <div className="text-lg font-black text-slate-900">24x7 Open</div>
            <div className="text-xs text-slate-600 font-semibold mt-0.5">Ayushman Help Counter</div>
          </div>
        </div>

        {/* Direct Action Buttons: Maps, Call, Emergency */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={`tel:${hospital.phone}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 px-3.5 py-2 rounded-xl shadow-2xs transition-colors"
            >
              <Phone className="w-4 h-4 text-blue-900" />
              <span>{t.callHospital}: {hospital.phone}</span>
            </a>

            <a
              href={`tel:${hospital.emergency}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3.5 py-2 rounded-xl transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-rose-600 animate-pulse" />
              <span>{t.emergencyCall}: {hospital.emergency}</span>
            </a>
          </div>

          <a
            href={mapsDirUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer w-full sm:w-auto justify-center"
          >
            <Navigation className="w-4 h-4 text-sky-300" />
            <span>{t.getDirections} (Google Maps)</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
          </a>
        </div>

      </div>

      {/* Covered Specialties & Free Surgery Packages Grid */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-slate-900">
            <Stethoscope className="w-5 h-5 text-blue-900" />
            <span>{t.keySpecialtiesTitle}</span>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
            {t.cashlessCovered}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {(language === 'hi' ? hospital.specialtiesHi : hospital.specialties).map((spec, idx) => (
            <div 
              key={idx}
              className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{spec}</span>
              </div>
              <span className="text-[10px] font-black text-emerald-700 bg-emerald-100/60 px-1.5 py-0.2 rounded">
                FREE
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Ayushman Mitra Help Desk Details & Document Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Ayushman Mitra Desk Info */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-2.5">
            <UserCheck className="w-4 h-4 text-blue-900" />
            <span>{t.ayushmanMitraDeskTitle}</span>
          </div>
          
          <div className="space-y-2 text-xs text-slate-600">
            <p className="font-semibold text-slate-800 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{t.mitraTiming}</span>
            </p>
            <p className="flex items-start gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-900 shrink-0 mt-0.5" />
              <span>{t.mitraDocsRequired}</span>
            </p>
            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-blue-950 font-medium">
              💡 For instant cashless admission, carry your Physical Ayushman Card or digital ABHA card on your phone.
            </div>
          </div>
        </div>

        {/* Hospital Facilities Checklist */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-2.5">
            <Building2 className="w-4 h-4 text-blue-900" />
            <span>{t.hospitalOverview}</span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{t.facilityPharmacy}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{t.facilityBloodBank}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{t.facilityIcu}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{t.facilityDiagnostics}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{t.facilityCashlessDesk}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Beneficiary Reviews & Ratings Section */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
        
        {/* Reviews Header & Write Review Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
              {t.reviewsTitle}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified feedback from patients treated under Ayushman Bharat (PM-JAY) at this hospital.
            </p>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer w-fit"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.writeReviewBtn}</span>
          </button>
        </div>

        {/* Write Review Modal / Form */}
        {showReviewModal && (
          <form onSubmit={handleReviewSubmit} className="bg-slate-50 border-2 border-blue-900/30 rounded-2xl p-5 sm:p-6 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-900" />
                <span>Submit Your Verified Beneficiary Experience</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">{t.yourName} *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Sahu"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{t.treatmentAvailed} *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Knee Replacement, Cataract, Normal Delivery"
                  value={formTreatment}
                  onChange={(e) => setFormTreatment(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">{t.ratingLabel} (1 to 5 Stars)</label>
                <div className="flex items-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFormRating(star)}
                      className="cursor-pointer p-0.5 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= formRating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">{formRating} / 5</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Cashless Experience Tag</label>
                <select
                  value={formCashless}
                  onChange={(e) => setFormCashless(e.target.value as any)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                >
                  <option value="100% Cashless">100% Cashless (Zero Out-of-Pocket Expense)</option>
                  <option value="Smooth Approval">Smooth PM-JAY Approval</option>
                  <option value="Fast Admission">Fast Admission by Ayushman Mitra</option>
                </select>
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-bold text-slate-700 mb-1">{t.commentsLabel} *</label>
              <textarea
                required
                rows={3}
                placeholder="Describe how the hospital staff, doctor, and Ayushman Mitra helped you during your treatment..."
                value={formComment}
                onChange={(e) => setFormComment(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="text-xs font-bold text-slate-600 bg-white hover:bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 cursor-pointer"
              >
                {t.cancelReviewBtn}
              </button>

              <button
                type="submit"
                className="text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 px-5 py-2 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.submitReviewBtn}</span>
              </button>
            </div>
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3"
            >
              {/* Reviewer Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {rev.userName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{rev.userName}</h4>
                      {rev.verifiedBeneficiary && (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-1.5 py-0.2 rounded flex items-center gap-0.5">
                          <CheckCircle className="w-2.5 h-2.5" />
                          <span>Verified Patient</span>
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">{rev.userCity}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Stars */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{rev.date}</span>
                  </span>
                </div>
              </div>

              {/* Treatment & Cashless Badge */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="bg-blue-50 text-blue-900 border border-blue-100 font-semibold px-2 py-0.5 rounded-md">
                  Treatment: {language === 'hi' ? rev.treatmentHi : rev.treatment}
                </span>

                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3 text-emerald-600" />
                  <span>{rev.cashlessExperience}</span>
                </span>
              </div>

              {/* Review Content */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                "{language === 'hi' ? rev.commentHi : rev.comment}"
              </p>
            </div>
          ))}
        </div>

      </div>

    </main>
  );
};
