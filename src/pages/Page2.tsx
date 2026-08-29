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
  Check,
  Compass,
  Globe
} from 'lucide-react';
import { Language, translations } from '../translations';
import { Hospital } from '../data/hospitals';
import { detectLocation, getBrowserGPS, getDetailedAddressFromCoords, UserLocation, POPULAR_CITIES } from '../utils/location';
import { fetchLiveOsmHospitals, getVerifiedRegionalHospitals } from '../utils/realHospitals';

interface Page2Props {
  language: Language;
  onBack: () => void;
}

type FilterType = 'all' | 'government' | 'private';

export const Page2: React.FC<Page2Props> = ({ language, onBack }) => {
  const t = translations[language];

  // User GPS / Coordinates State
  const [userLocation, setUserLocation] = useState<UserLocation>({
    lat: 21.1904,
    lng: 81.2849,
    area: 'Padmanabhpur',
    city: 'Durg',
    state: 'Chhattisgarh',
    source: 'gps'
  });
  
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [locationLoading, setLocationLoading] = useState<boolean>(true);
  const [hospitalsLoading, setHospitalsLoading] = useState<boolean>(true);
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);
  const [showCityPicker, setShowCityPicker] = useState<boolean>(false);
  const [citySearch, setCitySearch] = useState<string>('');

  // Hospital Filters & Search
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Load real hospitals for given coordinates
  const loadHospitalsForCoords = async (lat: number, lng: number) => {
    setHospitalsLoading(true);
    try {
      const realHosps = await fetchLiveOsmHospitals(lat, lng);
      setHospitals(realHosps);
    } catch (e) {
      console.warn('Error fetching live hospitals:', e);
      setHospitals(getVerifiedRegionalHospitals(lat, lng));
    } finally {
      setHospitalsLoading(false);
    }
  };

  // Main location trigger function (High Accuracy GPS + Nominatim Reverse Geocoding)
  const triggerGpsLocation = async () => {
    setLocationLoading(true);
    setPermissionDenied(false);

    try {
      const pos = await getBrowserGPS();
      const lat = Number(pos.coords.latitude.toFixed(5));
      const lng = Number(pos.coords.longitude.toFixed(5));
      
      const { area, city, state } = await getDetailedAddressFromCoords(lat, lng);

      const newLoc: UserLocation = {
        lat,
        lng,
        area: area || 'Current Area',
        city: city || 'Current City',
        state,
        source: 'gps'
      };

      setUserLocation(newLoc);
      setLocationLoading(false);
      await loadHospitalsForCoords(lat, lng);

    } catch (err) {
      console.warn('GPS permission denied or failed, checking IP fallback...', err);
      setPermissionDenied(true);
      
      try {
        const fallbackLoc = await detectLocation();
        setUserLocation(fallbackLoc);
        await loadHospitalsForCoords(fallbackLoc.lat, fallbackLoc.lng);
      } catch (e) {
        console.error(e);
      } finally {
        setLocationLoading(false);
      }
    }
  };

  useEffect(() => {
    // Automatically trigger GPS tracking as soon as user lands on Page 2
    triggerGpsLocation();
  }, []);

  const handleSelectCity = async (city: { name: string; area: string; lat: number; lng: number }) => {
    const selected: UserLocation = {
      lat: city.lat,
      lng: city.lng,
      area: city.area,
      city: city.name.split(',')[0].trim(),
      source: 'manual'
    };
    setUserLocation(selected);
    setShowCityPicker(false);
    await loadHospitalsForCoords(city.lat, city.lng);
  };

  // Filter based on government/private and search query
  const filteredHospitals = hospitals
    .filter(hosp => {
      if (filterType === 'all') return true;
      return hosp.type === filterType;
    })
    .filter(hosp => {
      const name = language === 'hi' ? (hosp.nameHi || hosp.name) : hosp.name;
      const specialties = language === 'hi' ? hosp.specialtiesHi.join(' ') : hosp.specialties.join(' ');
      const term = searchQuery.toLowerCase();
      return name.toLowerCase().includes(term) || specialties.toLowerCase().includes(term);
    })
    .slice(0, 10);

  // Exact Google Maps Directions & Search URLs using Real Coordinates
  const getGoogleMapsDirUrl = (hosp: Hospital) => {
    return `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${hosp.lat},${hosp.lng}`;
  };

  const getGoogleMapsSearchUrl = (hosp: Hospital) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hosp.name + ', ' + hosp.address)}`;
  };

  const displayLocationString = userLocation.area && userLocation.city && userLocation.area.toLowerCase() !== userLocation.city.toLowerCase()
    ? `${userLocation.area}, ${userLocation.city}`
    : (userLocation.city || userLocation.area || 'Current Location');

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      
      {/* Top Navigation & Live Location Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-900 bg-white hover:bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToStep1}</span>
        </button>

        {/* Dynamic Location Pill with GPS Coordinates & City Dropdown */}
        <div className="relative">
          <div className="flex items-center gap-1.5 bg-white border border-slate-200/90 rounded-xl p-1.5 shadow-2xs">
            
            {/* GPS Refresh Button */}
            <button
              onClick={triggerGpsLocation}
              disabled={locationLoading}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                userLocation.source === 'gps'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-blue-900 text-white hover:bg-blue-950 shadow-xs'
              }`}
              title="Click to track your real GPS coordinates"
            >
              {locationLoading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
              ) : (
                <LocateFixed className="w-3.5 h-3.5 text-white" />
              )}
              <span>{locationLoading ? t.locDetecting : (userLocation.source === 'gps' ? '📍 GPS Active' : '📍 Track GPS')}</span>
            </button>

            {/* Sub-locality & City Selector Dropdown */}
            <button
              onClick={() => setShowCityPicker(prev => !prev)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <div className="text-left">
                <span className="font-bold max-w-[150px] sm:max-w-[200px] truncate block text-xs" title={displayLocationString}>
                  {displayLocationString}
                </span>
                <span className="text-[10px] text-slate-400 font-mono block">
                  {userLocation.lat.toFixed(4)}°, {userLocation.lng.toFixed(4)}°
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
            </button>
          </div>

          {/* City Selector Dropdown Menu */}
          {showCityPicker && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-900">Select City / Area</span>
                <button
                  onClick={() => setShowCityPicker(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* City Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search city / area (e.g. Durg, Raipur)..."
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 pl-7 focus:outline-none focus:ring-1 focus:ring-blue-900"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
              </div>

              {/* City Options */}
              <div className="max-h-52 overflow-y-auto space-y-1 pr-1 text-xs">
                {POPULAR_CITIES
                  .filter(c => c.name.toLowerCase().includes(citySearch.toLowerCase()) || c.area.toLowerCase().includes(citySearch.toLowerCase()))
                  .map(c => (
                    <button
                      key={c.name}
                      onClick={() => handleSelectCity(c)}
                      className={`w-full text-left px-2.5 py-2 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                        userLocation.city === c.name.split(',')[0].trim()
                          ? 'bg-blue-900 text-white font-bold'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{c.name}</div>
                        <div className={`text-[10px] ${userLocation.city === c.name.split(',')[0].trim() ? 'text-blue-200' : 'text-slate-400'}`}>
                          {c.area} ({c.lat.toFixed(2)}°, {c.lng.toFixed(2)}°)
                        </div>
                      </div>
                      {userLocation.city === c.name.split(',')[0].trim() && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Prominent Location Permission Notice (if permission denied or not yet active) */}
      {permissionDenied && (
        <div className="bg-amber-50 border border-amber-300/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-600 text-white shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-amber-950">
                {language === 'hi' ? 'वास्तविक जीपीएस अनुमति दें' : 'Allow GPS Location Permission'}
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                {language === 'hi' 
                  ? 'अपने वास्तविक स्थान के सबसे नजदीकी वास्तविक अस्पतालों को देखने के लिए अनुमति दें।' 
                  : 'Grant location permission so Ayushman Acolyte can rank real hospitals from your exact live coordinates.'}
              </p>
            </div>
          </div>

          <button
            onClick={triggerGpsLocation}
            className="text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 px-4 py-2 rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <LocateFixed className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'जीपीएस अनुमति दें' : 'Allow Location'}</span>
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
              {t.p2Desc}{' '}
              <span className="font-extrabold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60 inline-block mt-0.5">
                📍 {displayLocationString} ({userLocation.lat.toFixed(4)}° N, {userLocation.lng.toFixed(4)}° E)
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs bg-slate-50 border border-slate-200/70 px-3 py-2 rounded-xl text-slate-700 shrink-0">
            <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Showing top <strong>10 Nearest Real Hospitals</strong></span>
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

      {/* Hospitals List or Loading State */}
      {hospitalsLoading ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3 shadow-xs">
          <RefreshCw className="w-8 h-8 text-blue-900 animate-spin mx-auto" />
          <h4 className="text-sm font-bold text-slate-900">Locating Real Hospitals Nearest to Your Coordinates...</h4>
          <p className="text-xs text-slate-500">Calculating exact distances from {userLocation.lat.toFixed(4)}°, {userLocation.lng.toFixed(4)}°</p>
        </div>
      ) : (
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
              const estDriveMins = Math.max(3, Math.round(distance * 2.5));
              const mapsDirUrl = getGoogleMapsDirUrl(hosp);
              const mapsSearchUrl = getGoogleMapsSearchUrl(hosp);
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
                        title="Click to view hospital profile & location in Google Maps"
                      >
                        <span className="group-hover/name:underline decoration-blue-900 decoration-2 underline-offset-2">
                          {language === 'hi' ? (hosp.nameHi || hosp.name) : hosp.name}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/name:text-blue-900 shrink-0" />
                      </a>

                      {/* Address, Real Coordinates & Beds */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{language === 'hi' ? (hosp.addressHi || hosp.address) : hosp.address}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono text-[11px]">
                          <Globe className="w-3 h-3 text-slate-500 shrink-0" />
                          <span>{hosp.lat.toFixed(4)}°, {hosp.lng.toFixed(4)}°</span>
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

                    {/* Get Directions (Google Maps Direct Navigation from User Lat/Lng to Hospital Lat/Lng) */}
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
      )}

    </main>
  );
};
