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
  ThumbsUp,
  Award,
  CreditCard,
  Activity,
  CheckCircle2,
  Info
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
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | '5' | '4' | 'CASHLESS'>('ALL');
  const [likedReviews, setLikedReviews] = useState<Record<string, number>>({});
  const [userVoted, setUserVoted] = useState<Record<string, boolean>>({});
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Form State
  const [formName, setFormName] = useState<string>('');
  const [formTreatment, setFormTreatment] = useState<string>('');
  const [formRating, setFormRating] = useState<number>(5);
  const [formHoverRating, setFormHoverRating] = useState<number>(0);
  const [formComment, setFormComment] = useState<string>('');
  const [formCashless, setFormCashless] = useState<'100% Cashless' | 'Smooth Approval' | 'Fast Admission'>('100% Cashless');

  const isGovt = (hospital.typeCode || hospital.type || '').toUpperCase() === 'G' || 
                 (hospital.typeCode || hospital.type || '').toUpperCase() === 'GOV' || 
                 hospital.type === 'government';
                 
  const hospitalName = language === 'hi' ? (hospital.nameHi || hospital.name) : hospital.name;
  const hospitalAddress = language === 'hi' ? (hospital.addressHi || hospital.address) : hospital.address;

  // Google Maps navigation & search URLs
  const mapsDirUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${hospital.lat},${hospital.lng}`;
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.name + ', ' + hospital.address)}`;

  const handleLikeReview = (reviewId: string) => {
    if (userVoted[reviewId]) return;
    setLikedReviews(prev => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1
    }));
    setUserVoted(prev => ({
      ...prev,
      [reviewId]: true
    }));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      hospitalId: hospital.id,
      userName: formName.trim(),
      userCity: `${userLocation.city || 'Local Citizen'}, ${userLocation.state || 'India'}`,
      treatment: formTreatment.trim() || 'General PM-JAY Treatment',
      treatmentHi: formTreatment.trim() || 'सामान्य पीएम-जय उपचार',
      rating: formRating,
      date: language === 'hi' ? 'अभी सत्यापित (Verified)' : 'Just now (Verified)',
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
    setFormRating(5);
    setSuccessMessage(t.reviewSuccessMsg);
    setTimeout(() => setSuccessMessage(''), 6000);
  };

  // Filtered Reviews list
  const filteredReviews = reviews.filter(rev => {
    if (selectedFilter === '5') return rev.rating === 5;
    if (selectedFilter === '4') return rev.rating === 4;
    if (selectedFilter === 'CASHLESS') return rev.cashlessExperience === '100% Cashless';
    return true;
  });

  return (
    <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 relative">
      
      {/* Top Official Tricolor Accent Strip & Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-900 bg-white hover:bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs transition-all cursor-pointer w-fit group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>{t.backToHospitals}</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-bold">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-900 px-3.5 py-1.5 rounded-xl border border-emerald-200/80 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{language === 'hi' ? 'एनएचए एवं पीएम-जय अधिकृत अस्पताल' : 'NHA & PM-JAY Empaneled Facility'}</span>
          </div>

          <div className="hidden md:inline-flex items-center gap-1.5 bg-blue-50 text-blue-900 px-3 py-1.5 rounded-xl border border-blue-200/80">
            <Award className="w-3.5 h-3.5 text-blue-800" />
            <span>{language === 'hi' ? '100% कैशलेस उपचार' : '100% Cashless Eligible'}</span>
          </div>
        </div>
      </div>

      {/* Success Banner */}
      {successMessage && (
        <div className="bg-emerald-50 border-2 border-emerald-400 text-emerald-950 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-between shadow-md animate-in fade-in duration-300">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage('')} className="text-emerald-700 hover:text-emerald-900 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Hero Hospital Detail Card */}
      <div className="relative overflow-hidden bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 shadow-sm space-y-6">
        
        {/* Subtle Government Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-white to-emerald-600"></div>

        {/* Title, Status Badges & Live Distance */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pt-2 border-b border-slate-100 pb-6">
          <div className="space-y-3 flex-1">
            
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2">
              {isGovt ? (
                <span className="bg-blue-50 text-blue-900 border border-blue-200 text-xs font-black px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-2xs">
                  <Building2 className="w-3.5 h-3.5 text-blue-800" />
                  <span>{language === 'hi' ? 'सरकारी अस्पताल (Public / Government)' : 'Government / Public Hospital'}</span>
                </span>
              ) : (
                <span className="bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-black px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-2xs">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'hi' ? 'निजी अस्पताल (PM-JAY Empaneled Private)' : 'Empaneled Private Hospital'}</span>
                </span>
              )}

              <span className="bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.ayushmanMitra}</span>
              </span>

              <span className="bg-slate-100 text-slate-700 text-xs font-mono font-bold px-2.5 py-1 rounded-lg border border-slate-200">
                AB-PMJAY Code: #{hospital.id.toString().toUpperCase()}
              </span>
            </div>

            {/* Hospital Main Name */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {hospitalName}
            </h1>

            {/* Location & GPS Info */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="font-medium leading-relaxed">{hospitalAddress}</span>
              </div>
              
              {hospital.lat !== 0 && (
                <div className="flex items-center gap-1 bg-slate-100 text-slate-700 font-mono text-[11px] px-2 py-0.5 rounded border border-slate-200">
                  <span>GPS: {hospital.lat.toFixed(4)}° N, {hospital.lng.toFixed(4)}° E</span>
                </div>
              )}
            </div>

          </div>

          {/* Official Verification & Empanelment Status Card */}
          <div className="bg-slate-50 border border-slate-200/90 p-4 sm:p-5 rounded-2xl shrink-0 text-left lg:text-right space-y-2 shadow-2xs">
            <div className="flex items-center lg:justify-end gap-1.5 text-xs font-bold text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{language === 'hi' ? 'सत्यापित सूचीबद्ध अस्पताल' : 'Verified Empaneled Facility'}</span>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              <span>{language === 'hi' ? 'कैशलेस पीएम-जय उपचार उपलब्ध' : 'Cashless PM-JAY Treatment Active'}</span>
            </div>
            <div className="pt-1 flex items-center lg:justify-end gap-1.5">
              <span className="inline-flex items-center gap-1 bg-emerald-100/80 text-emerald-900 text-[11px] font-black px-2.5 py-1 rounded-lg border border-emerald-300">
                <CheckCircle className="w-3 h-3 text-emerald-700" />
                <span>{language === 'hi' ? 'सक्रिय पैनल (Active)' : 'Active On Network'}</span>
              </span>
            </div>
          </div>

        </div>

        {/* 4 Core Beneficiary Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-1 shadow-2xs">
            <div className="flex items-center gap-1.5 text-amber-500 font-black text-xl">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span>4.8</span>
              <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
            </div>
            <div className="text-xs text-slate-600 font-bold">
              {language === 'hi' ? 'मरीज संतुष्टि स्कोर' : 'Beneficiary Rating'}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">120+ {language === 'hi' ? 'सत्यापित समीक्षाएं' : 'Verified Reviews'}</div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-1 shadow-2xs">
            <div className="text-xl font-black text-blue-900 flex items-center gap-1.5">
              <BedDouble className="w-5 h-5 text-blue-800" />
              <span>{hospital.beds}+</span>
            </div>
            <div className="text-xs text-slate-600 font-bold">
              {language === 'hi' ? 'कुल अस्पताल बेड्स' : 'Total Operational Beds'}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">ICU, CCU & General Wards</div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-1 shadow-2xs">
            <div className="text-xl font-black text-emerald-700 flex items-center gap-1.5">
              <CreditCard className="w-5 h-5 text-emerald-600" />
              <span>₹5,00,000</span>
            </div>
            <div className="text-xs text-slate-600 font-bold">
              {language === 'hi' ? 'वार्षिक मुफ्त स्वास्थ्य कवर' : 'Annual Cashless Limit'}
            </div>
            <div className="text-[10px] text-emerald-600 font-bold">100% Free under PM-JAY</div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-1 shadow-2xs">
            <div className="text-xl font-black text-slate-900 flex items-center gap-1.5">
              <UserCheck className="w-5 h-5 text-blue-900" />
              <span>24x7 {language === 'hi' ? 'खुला' : 'Active'}</span>
            </div>
            <div className="text-xs text-slate-600 font-bold">
              {language === 'hi' ? 'आयुष्मान मित्र सहायता डेस्क' : 'Ayushman Mitra Help Desk'}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Ground Floor Reception</div>
          </div>

        </div>

        {/* Primary Action Buttons: Maps, Call, Emergency */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={`tel:${hospital.phone}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 px-4 py-2.5 rounded-xl shadow-2xs transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 text-blue-900" />
              <span>{t.callHospital}: <strong className="text-slate-900">{hospital.phone}</strong></span>
            </a>

            <a
              href={`tel:${hospital.emergency}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-4 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-rose-600 animate-pulse" />
              <span>{t.emergencyCall}: <strong>{hospital.emergency}</strong></span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const el = document.getElementById('reviews-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>{language === 'hi' ? 'समीक्षाएं पढ़ें' : 'Read Reviews'} ({reviews.length})</span>
            </button>

            <a
              href={mapsDirUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-950 hover:to-indigo-950 px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-sky-300" />
              <span>{t.getDirections}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
            </a>
          </div>
        </div>

      </div>

      {/* Covered Specialties & Free Surgery Packages Grid */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-base font-extrabold text-slate-900">
            <Stethoscope className="w-5 h-5 text-blue-900" />
            <span>{t.keySpecialtiesTitle}</span>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 w-fit">
            {t.cashlessCovered}
          </span>
        </div>

        <p className="text-xs text-slate-500">
          {language === 'hi' 
            ? 'इस अस्पताल में निम्नलिखित सभी चिकित्सा विशेषज्ञताएं एवं संबंधित ऑपरेशन आयुष्मान भारत योजना के तहत पूरी तरह से मुफ्त हैं:'
            : 'All listed clinical specialties and associated surgical packages are covered with 100% zero out-of-pocket expense for PM-JAY cardholders:'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {(language === 'hi' ? (hospital.specialtiesHi || hospital.specialties) : hospital.specialties).map((spec, idx) => (
            <div 
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/70 hover:border-blue-300/60 flex items-center justify-between gap-3 transition-colors shadow-2xs"
            >
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="leading-snug">{spec}</span>
              </div>
              <span className="text-[10px] font-black text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md shrink-0">
                100% FREE
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step-by-Step Cashless Admission Walkthrough & Hospital Facilities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Ayushman Mitra Desk & 3-Step Cashless Process */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
            <UserCheck className="w-5 h-5 text-blue-900" />
            <span>{t.ayushmanMitraDeskTitle}</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
              <span className="w-6 h-6 rounded-full bg-blue-900 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
              <div className="text-xs space-y-0.5">
                <h5 className="font-bold text-slate-900">{language === 'hi' ? 'आयुष्मान मित्र काउंटर पर पहुंचें' : 'Visit Ayushman Mitra Desk'}</h5>
                <p className="text-slate-600">{language === 'hi' ? 'अस्पताल के मुख्य प्रवेश द्वार पर स्थित पीएम-जय हेल्पडेस्क पर जाएं।' : 'Located at the main hospital ground floor reception counter.'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
              <span className="w-6 h-6 rounded-full bg-blue-900 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
              <div className="text-xs space-y-0.5">
                <h5 className="font-bold text-slate-900">{language === 'hi' ? 'दस्तावेज़ सत्यापन (कार्ड दिखाएं)' : 'Card Verification & Eligibility'}</h5>
                <p className="text-slate-600">{language === 'hi' ? 'अपना आयुष्मान कार्ड / डिजिटल आभा आईडी और आधार कार्ड प्रस्तुत करें।' : 'Present physical Ayushman Card or digital ABHA card along with Aadhaar.'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
              <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
              <div className="text-xs space-y-0.5">
                <h5 className="font-bold text-slate-900">{language === 'hi' ? 'शून्य खर्च पर तत्काल कैशलेस भर्ती' : 'Zero-Deposit Instant Cashless Admission'}</h5>
                <p className="text-slate-600">{language === 'hi' ? 'बायोमेट्रिक प्रमाणीकरण के बाद दवाइयां, जांच एवं सर्जरी पूरी तरह मुफ्त होंगी।' : 'Pre-auth is initiated instantly with zero deposit for tests, beds, or medicines.'}</p>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200/70 text-blue-950 text-xs font-semibold flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
            <span>{language === 'hi' ? 'याद रखें: पीएम-जय के तहत किसी भी अधिकृत अस्पताल में कोई भी अग्रिम राशि (Security Deposit) नहीं ली जा सकती।' : 'Reminder: Empaneled hospitals cannot demand advance deposits or outside medicine purchases for covered packages.'}</span>
          </div>
        </div>

        {/* Hospital Facilities Roster */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
            <Building2 className="w-5 h-5 text-blue-900" />
            <span>{t.hospitalOverview}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{t.facilityPharmacy}</span>
              </div>
              <p className="text-[11px] text-slate-500 pl-6">{language === 'hi' ? 'मुफ्त दवा वितरण केंद्र' : 'Jan Aushadhi / PM-JAY Dispenser'}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{t.facilityBloodBank}</span>
              </div>
              <p className="text-[11px] text-slate-500 pl-6">{language === 'hi' ? '24x7 रक्त बैंक सुविधा' : '24x7 Blood Bank & Components'}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{t.facilityIcu}</span>
              </div>
              <p className="text-[11px] text-slate-500 pl-6">{language === 'hi' ? 'आपातकालीन गहन चिकित्सा' : 'Ventilator & HDU Beds'}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{t.facilityDiagnostics}</span>
              </div>
              <p className="text-[11px] text-slate-500 pl-6">{language === 'hi' ? 'सीटी स्कैन, एमआरआई, एक्स-रे' : 'CT Scan, MRI, Ultrasound'}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1 sm:col-span-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{t.facilityCashlessDesk}</span>
              </div>
              <p className="text-[11px] text-slate-500 pl-6">{language === 'hi' ? 'फास्ट-ट्रैक प्री-ऑथराइजेशन और बायोमेट्रिक सहायता' : 'Fast-track pre-auth & biometric desk for smooth admission'}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Beneficiary Reviews & Ratings Section */}
      <div id="reviews-section" className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 shadow-xs space-y-6">
        
        {/* Reviews Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {t.reviewsTitle}
              </h3>
              <span className="bg-blue-100 text-blue-950 text-xs font-black px-2.5 py-0.5 rounded-full">
                {reviews.length}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {language === 'hi' 
                ? 'आयुष्मान भारत के तहत इस अस्पताल में इलाज कराने वाले लाभार्थियों के वास्तविक और सत्यापित अनुभव।' 
                : 'Authentic feedback and cashless treatment experiences shared by verified PM-JAY patients.'}
            </p>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-blue-900 hover:bg-blue-950 px-5 py-2.5 rounded-2xl shadow-md transition-all cursor-pointer w-fit shrink-0 hover:scale-105"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.writeReviewBtn}</span>
          </button>
        </div>

        {/* Rating Breakdown & Filter Chips */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-center shrink-0 pr-4 border-r border-slate-200">
              <div className="text-3xl font-black text-slate-900">4.8</div>
              <div className="flex items-center gap-0.5 text-amber-400 justify-center my-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <div className="text-[10px] text-slate-500 font-bold">{reviews.length} {language === 'hi' ? 'समीक्षाएं' : 'Ratings'}</div>
            </div>

            <div className="space-y-1 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-28 font-medium">{language === 'hi' ? 'डॉक्टर एवं इलाज:' : 'Doctor Care:'}</span>
                <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full w-[96%]"></div>
                </div>
                <span className="font-bold text-slate-800">4.9 / 5</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-28 font-medium">{language === 'hi' ? 'कैशलेस प्रक्रिया:' : 'Cashless Process:'}</span>
                <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full w-[94%]"></div>
                </div>
                <span className="font-bold text-slate-800">4.8 / 5</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-28 font-medium">{language === 'hi' ? 'आयुष्मान मित्र सहायता:' : 'Mitra Desk Help:'}</span>
                <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full w-[98%]"></div>
                </div>
                <span className="font-bold text-slate-800">4.9 / 5</span>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {[
              { id: 'ALL', label: language === 'hi' ? 'सभी समीक्षाएं' : 'All Reviews' },
              { id: '5', label: '⭐ 5 Stars' },
              { id: '4', label: '⭐ 4 Stars' },
              { id: 'CASHLESS', label: language === 'hi' ? '💯 100% कैशलेस' : '💯 100% Cashless' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id as any)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  selectedFilter === f.id
                    ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Write Review Interactive Modal */}
        {showReviewModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <form 
              onSubmit={handleReviewSubmit} 
              className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-900" />
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    {language === 'hi' ? 'अपनी सत्यापित मरीज समीक्षा दर्ज करें' : 'Submit Your Verified Beneficiary Experience'}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t.yourName} *</label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'hi' ? 'उदा. रमेश साहू' : 'e.g. Ramesh Sahu'}
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t.treatmentAvailed} *</label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'hi' ? 'उदा. मोतियाबिंद, घुटना प्रत्यारोपण, सुरक्षित प्रसव, हर्निया' : 'e.g. Cataract Eye Surgery, Knee Replacement, Maternity Delivery'}
                    value={formTreatment}
                    onChange={(e) => setFormTreatment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.ratingLabel} (1 to 5 Stars)</label>
                    <div className="flex items-center gap-1.5 pt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onMouseEnter={() => setFormHoverRating(star)}
                          onMouseLeave={() => setFormHoverRating(0)}
                          onClick={() => setFormRating(star)}
                          className="cursor-pointer p-0.5 focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              star <= (formHoverRating || formRating)
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-extrabold text-slate-800 ml-2">{formRating} / 5</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{language === 'hi' ? 'कैशलेस अनुभव टैग' : 'Cashless Experience Tag'}</label>
                    <select
                      value={formCashless}
                      onChange={(e) => setFormCashless(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-900 font-medium"
                    >
                      <option value="100% Cashless">{language === 'hi' ? '100% कैशलेस (Zero Extra Expense)' : '100% Cashless (Zero Out-of-Pocket)'}</option>
                      <option value="Smooth Approval">{language === 'hi' ? 'सहज व त्वरित पीएम-जय अप्रूवल' : 'Smooth PM-JAY Approval'}</option>
                      <option value="Fast Admission">{language === 'hi' ? 'आयुष्मान मित्र द्वारा तत्काल दाखिला' : 'Fast Admission by Ayushman Mitra'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t.commentsLabel} *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder={language === 'hi' 
                      ? 'वर्णन करें कि डॉक्टर, नर्स और आयुष्मान मित्र ने आपके इलाज में किस प्रकार सहायता की...'
                      : 'Describe how the hospital doctor, staff, and Ayushman Mitra helped you during your cashless treatment...'}
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-900 leading-relaxed"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-5 py-2.5 rounded-xl cursor-pointer transition-colors"
                >
                  {t.cancelReviewBtn}
                </button>

                <button
                  type="submit"
                  className="text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 hover:scale-105"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.submitReviewBtn}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews List Cards */}
        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <div className="text-center p-8 text-slate-400 text-xs">
              {language === 'hi' ? 'इस श्रेणी में कोई समीक्षा नहीं है।' : 'No reviews in this category.'}
            </div>
          ) : (
            filteredReviews.map((rev) => {
              const likes = likedReviews[rev.id] || 0;
              const hasVoted = userVoted[rev.id] || false;

              return (
                <div
                  key={rev.id}
                  className="p-5 sm:p-6 rounded-3xl bg-slate-50/70 hover:bg-slate-50 border border-slate-200/80 space-y-3.5 transition-all shadow-2xs"
                >
                  {/* Reviewer Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-900 to-indigo-800 text-white flex items-center justify-center font-black text-sm shadow-xs shrink-0">
                        {rev.userName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-extrabold text-slate-900">{rev.userName}</h4>
                          {rev.verifiedBeneficiary && (
                            <span className="bg-emerald-100 text-emerald-900 text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-emerald-700" />
                              <span>{language === 'hi' ? 'सत्यापित लाभार्थी' : 'Verified Beneficiary'}</span>
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium">{rev.userCity}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Star Rating Display */}
                      <div className="flex items-center gap-0.5 bg-white border border-slate-200/80 px-2.5 py-1 rounded-xl shadow-2xs">
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
                        <span className="text-xs font-bold text-slate-700 ml-1.5">{rev.rating}.0</span>
                      </div>

                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                        <Calendar className="w-3 h-3" />
                        <span>{rev.date}</span>
                      </span>
                    </div>
                  </div>

                  {/* Treatment & Cashless Badge */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="bg-blue-50 text-blue-900 border border-blue-200/70 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                      <Stethoscope className="w-3 h-3 text-blue-800" />
                      <span>{language === 'hi' ? rev.treatmentHi : rev.treatment}</span>
                    </span>

                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                      <Award className="w-3 h-3 text-emerald-700" />
                      <span>{rev.cashlessExperience}</span>
                    </span>
                  </div>

                  {/* Review Text Content */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal bg-white p-3.5 rounded-2xl border border-slate-200/60 shadow-2xs">
                    "{language === 'hi' ? (rev.commentHi || rev.comment) : rev.comment}"
                  </p>

                  {/* Bottom Helpful Button */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => handleLikeReview(rev.id)}
                      disabled={hasVoted}
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        hasVoted 
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? 'text-emerald-600 fill-emerald-600' : 'text-slate-400'}`} />
                      <span>{hasVoted ? (language === 'hi' ? 'मददगार लगा' : 'Marked Helpful') : (language === 'hi' ? 'मददगार?' : 'Helpful?')}</span>
                      {likes > 0 && <span className="font-mono text-emerald-800">({likes})</span>}
                    </button>

                    <span className="text-[11px] text-slate-400">
                      Ayushman Mitra Rating: <strong className="text-slate-700">{rev.ayushmanMitraRating}/5 ⭐</strong>
                    </span>
                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>

    </main>
  );
};
