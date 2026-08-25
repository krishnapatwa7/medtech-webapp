import React, { useState, useEffect } from 'react';
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
  RefreshCw,
  AlertCircle,
  Stethoscope,
  BedDouble,
  ChevronDown,
  LocateFixed,
  Search,
  Check
} from 'lucide-react';
import { Language, translations } from '../translations';
import { Hospital } from '../data/hospitals';
import { getNearbyHospitals } from '../utils/distance';
import { detectLocation, getBrowserGPS, getCityFromCoords, UserLocation, POPULAR_CITIES } from '../utils/location';

interface Page2Props {
  language: Language;
  onBack: () => void;
}

type FilterType = 'all' | 'government' | 'private';

export const Page2: React.FC<Page2Props> = ({ language, onBack }) => {
  const t = translations[language];

  // Location State
  const [userLocation, setUserLocation] = useState<UserLocation>({
    lat: 28.6139,
    lng: 77.2090,
    city: 'New Delhi / NCR',
    source: 'manual'
  });
  const [locationLoading, setLocationLoading] = useState<boolean>(true);
  const [permissionPrompt, setPermissionPrompt] = useState<boolean>(false);
  const [showCityPicker, setShowCityPicker] = useState<boolean>(false);
  const [citySearch, setCitySearch] = useState<string>('');

  // Hospital Filters & Search
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Main location trigger function
  const triggerGpsLocation = async () => {
    setLocationLoading(true);
    setPermissionPrompt(false);
    try {
      const pos = await getBrowserGPS();
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const city = await getCityFromCoords(lat, lng);

      setUserLocation({
        lat,
        lng,
        city: city || 'Your GPS Location',
        source: 'gps'
      });
      setLocationLoading(false);
    } catch (err) {
      console.warn('GPS prompt error, falling back to IP detection...', err);
      // Fallback to IP geolocation so it still tracks the user's city
      try {
        const fallbackLoc = await detectLocation();
        setUserLocation(fallbackLoc);
      } catch (e) {
        console.error(e);
      } finally {
        setLocationLoading(false);
        setPermissionPrompt(true);
      }
    }
  };

  useEffect(() => {
    // Automatically trigger GPS tracking on Page 2 entry
    triggerGpsLocation();
  }, []);

  const handleSelectCity = (city: { name: string; lat: number; lng: number }) => {
    setUserLocation({
      lat: city.lat,
      lng: city.lng,
      city: city.name,
      source: 'manual'
    });
    setShowCityPicker(false);
  };

  const hospitals: Hospital[] = getNearbyHospitals(userLocation.lat, userLocation.lng, filterType);

  // Filter with search query if user searches
  const filteredHospitals = hospitals.filter(hosp => {
    const name = language === 'hi' ? hosp.nameHi : hosp.name;
    const specialties = language === 'hi' ? hosp.specialtiesHi.join(' ') : hosp.specialties.join(' ');
    const term = searchQuery.toLowerCase();
    return name.toLowerCase().includes(term) || specialties.toLowerCase().includes(term);
  });

  // Construct official Google Maps Search & Directions URLs
  const getGoogleMapsSearchUrl = (hosp: Hospital) => {
    const query = `${hosp.name}, ${userLocation.city || 'India'}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  };

  const getGoogleMapsDirUrl = (hosp: Hospital) => {
    const destination = `${hosp.name}, ${hosp.address}, ${userLocation.city || 'India'}`;
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
  };

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      
      {/* Top Navigation & Location Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-900 bg-white hover:bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToStep1}</span>
        </button>

        {/* Dynamic Location Bar with Auto-Track & City Dropdown */}
        <div className="relative">
          <div className="flex items-center gap-1.5 bg-white border border-slate-200/90 rounded-xl p-1.5 shadow-2xs">
            
            {/* Direct GPS Locate Button */}
            <button
              onClick={triggerGpsLocation}
              disabled={locationLoading}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                userLocation.source === 'gps'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-blue-900 text-white hover:bg-blue-950 shadow-xs'
              }`}
              title="Click to automatically track GPS location"
            >
              {locationLoading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
              ) : (
                <LocateFixed className="w-3.5 h-3.5 text-white" />
              )}
              <span>{locationLoading ? t.locDetecting : (userLocation.source === 'gps' ? '📍 Live GPS Active' : '📍 Track My Location')}</span>
            </button>

            {/* City Selector Dropdown */}
            <button
              onClick={() => setShowCityPicker(prev => !prev)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span className="font-bold max-w-[150px] truncate">{userLocation.city || 'Select City'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* City Selector Dropdown Menu */}
          {showCityPicker && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-900">Select Your City / District</span>
                <button
                  onClick={() => setShowCityPicker(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              </div>

              {/* City Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search city (e.g. Lucknow, Jaipur, Delhi)..."
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 pl-7 focus:outline-none focus:ring-1 focus:ring-blue-900"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
              </div>

              {/* City Options */}
              <div className="max-h-48 overflow-y-auto space-y-1 pr-1 text-xs">
                {POPULAR_CITIES
                  .filter(c => c.name.toLowerCase().includes(citySearch.toLowerCase()))
                  .map(c => (
                    <button
                      key={c.name}
                      onClick={() => handleSelectCity(c)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                        userLocation.city === c.name
                          ? 'bg-blue-900 text-white font-bold'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span>{c.name}</span>
                      {userLocation.city === c.name && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Permission Notice Banner (If GPS not granted) */}
      {userLocation.source !== 'gps' && (
        <div className="bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-200/90 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-blue-900 text-white shrink-0 mt-0.5 sm:mt-0">
              <LocateFixed className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-blue-950">
                {language === 'hi' ? 'सटीक दूरी के लिए जीपीएस लोकेशन अनुमति दें' : 'Allow GPS to Locate Nearest Hospitals to You'}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                {language === 'hi' 
                  ? 'अपनी सटीक लाइव लोकेशन पर आधारित 10 सबसे नजदीकी आयुष्मान अस्पताल देखने के लिए अनुमति दें।' 
                  : 'Click below to grant GPS permission for accurate kilometer distances from your current location.'}
              </p>
            </div>
          </div>

          <button
            onClick={triggerGpsLocation}
            className="text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 px-4 py-2 rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'जीपीएस अनुमति दें (Allow GPS)' : 'Enable Live GPS'}</span>
          </button>
        </div>
      )}

      {/* Page Title & Intro */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/70 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-800" />
              <span>{t.p2HeaderBadge}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {t.p2Title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              {t.p2Desc} <span className="font-semibold text-slate-900">({userLocation.city})</span>
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs bg-slate-50 border border-slate-200/70 px-3 py-2 rounded-xl text-slate-700 shrink-0">
            <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Showing top <strong>10 Nearest Hospitals</strong></span>
          </div>
        </div>

        {/* Filter Controls (Government, Private, Both) */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 hidden sm:inline">{t.filterLabel}</span>
            
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 gap-1 w-full sm:w-auto">
              <button
                onClick={() => setFilterType('all')}
                className={`flex-1 sm:flex-none text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {t.filterAll}
              </button>

              <button
                onClick={() => setFilterType('government')}
                className={`flex-1 sm:flex-none text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filterType === 'government'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                🏛️ {t.filterGovt}
              </button>

              <button
                onClick={() => setFilterType('private')}
                className={`flex-1 sm:flex-none text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filterType === 'private'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                🏥 {t.filterPrivate}
              </button>
            </div>
          </div>

          {/* Quick Search */}
          <div className="relative">
            <input
              type="text"
              placeholder={language === 'hi' ? 'अस्पताल या सर्जरी खोजें...' : 'Search hospital or surgery...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent placeholder:text-slate-400"
            />
            <Stethoscope className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>
      </div>

      {/* 10 Ranked Hospitals List */}
      <div className="space-y-4">
        {filteredHospitals.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">{t.noHospitalsFound}</p>
            <button 
              onClick={() => { setFilterType('all'); setSearchQuery(''); }}
              className="text-xs text-blue-900 font-bold underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredHospitals.map((hosp, index) => {
            const distance = hosp.distanceKm ?? 1.2;
            const estDriveMins = Math.max(4, Math.round(distance * 2.8));
            const mapsSearchUrl = getGoogleMapsSearchUrl(hosp);
            const mapsDirUrl = getGoogleMapsDirUrl(hosp);
            const isGovt = hosp.type === 'government';

            return (
              <div 
                key={hosp.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-900/40 p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all space-y-4"
              >
                {/* Header: Rank + Name + Distance Pill */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Rank Badge */}
                      <span className="bg-slate-900 text-white text-[11px] font-black px-2 py-0.5 rounded-md">
                        {t.rankedPrefix}{index + 1}
                      </span>

                      {/* Type Badge */}
                      {isGovt ? (
                        <span className="bg-blue-50 text-blue-900 border border-blue-200/80 text-[11px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-blue-800" />
                          <span>{language === 'hi' ? 'सरकारी अस्पताल (Government)' : 'Government Hospital'}</span>
                        </span>
                      ) : (
                        <span className="bg-emerald-50 text-emerald-900 border border-emerald-200 text-[11px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-emerald-700" />
                          <span>{language === 'hi' ? 'निजी सूचीबद्ध (Private Empaneled)' : 'Private Empaneled'}</span>
                        </span>
                      )}

                      {/* Ayushman Mitra Desk */}
                      <span className="bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>{t.ayushmanMitra}</span>
                      </span>
                    </div>

                    {/* Hospital Name (Clickable directly to Google Maps) */}
                    <a
                      href={mapsSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/name inline-flex items-center gap-1.5 text-base sm:text-lg font-extrabold text-slate-900 hover:text-blue-900 pt-0.5 transition-colors cursor-pointer"
                      title="Click to view hospital location & route in Google Maps"
                    >
                      <span className="group-hover/name:underline decoration-blue-900 decoration-2 underline-offset-2">
                        {language === 'hi' ? hosp.nameHi : hosp.name}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/name:text-blue-900 shrink-0" />
                    </a>

                    {/* Address & Beds */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{language === 'hi' ? hosp.addressHi : hosp.address} ({userLocation.city})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BedDouble className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{hosp.beds} {t.bedsAvailable}</span>
                      </div>
                    </div>
                  </div>

                  {/* Distance Card Pill */}
                  <div className="sm:text-right shrink-0 bg-slate-50 sm:bg-transparent p-2.5 sm:p-0 rounded-xl flex sm:flex-col items-center sm:items-end justify-between border border-slate-100 sm:border-0">
                    <div className="text-base sm:text-xl font-black text-blue-900 flex items-center gap-1">
                      <Navigation className="w-4 h-4 text-blue-700" />
                      <span>{distance} km</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>~{estDriveMins} mins {t.estDrive}</span>
                    </div>
                  </div>
                </div>

                {/* Specialties Covered under PM-JAY */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-blue-900" />
                    <span>{t.specialtiesCovered}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(language === 'hi' ? hosp.specialtiesHi : hosp.specialties).map((spec, i) => (
                      <span 
                        key={i}
                        className="bg-slate-100 text-slate-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-slate-200/80"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: Directions, Call, Emergency */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Call Hospital */}
                    <a
                      href={`tel:${hosp.phone}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-blue-900" />
                      <span>{t.callHospital}: {hosp.phone}</span>
                    </a>

                    {/* Emergency Call */}
                    <a
                      href={`tel:${hosp.emergency}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100/70 border border-rose-200 px-3 py-1.5 rounded-xl transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                      <span>{t.emergencyCall}: {hosp.emergency}</span>
                    </a>
                  </div>

                  {/* Get Directions (Google Maps Direct Navigation) */}
                  <a
                    href={mapsDirUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer w-full sm:w-auto justify-center"
                  >
                    <Navigation className="w-3.5 h-3.5 text-sky-300" />
                    <span>{t.getDirections}</span>
                    <ExternalLink className="w-3 h-3 text-slate-300" />
                  </a>
                </div>

              </div>
            );
          })
        )}
      </div>

    </main>
  );
};
