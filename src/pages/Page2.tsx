import React, { useState, useEffect, useMemo, useDeferredValue } from 'react';
import Papa from 'papaparse';
import { 
  ArrowLeft, MapPin, Navigation, Phone, Building2, ShieldCheck, 
  CheckCircle, RefreshCw, AlertCircle, Stethoscope, ChevronDown, 
  LocateFixed, Search, ChevronLeft, ChevronRight, ExternalLink, ArrowUp
} from 'lucide-react';
import { Language, translations } from '../translations';
import { detectLocation, getBrowserGPS, getCityFromCoords, UserLocation } from '../utils/location';

interface Page2Props {
  language: Language;
  onBack: () => void;
}

type FilterType = 'GOV' | 'PRIVATE' | 'NABH_Accredited' | 'DE-EMPANELED' | 'SUSPENDED' | 'BLACKLISTED';

const FILTER_OPTIONS: { id: FilterType; label: string }[] = [
  { id: 'GOV', label: 'GOVERNMENT' },
  { id: 'PRIVATE', label: 'PRIVATE' },
  { id: 'NABH_Accredited', label: 'NABH ACCREDITED' },
  { id: 'DE-EMPANELED', label: 'DE-EMPANELED' },
  { id: 'SUSPENDED', label: 'SUSPENDED' },
  { id: 'BLACKLISTED', label: 'BLACKLISTED' }
];

export interface Hospital {
  id: string;
  name: string;
  nameHi: string;
  address: string;
  addressHi: string;
  phone: string;
  emergency: string;
  beds: number;
  specialties: string[];
  type: string;
  typeCode: string; 
  lat: number;
  lng: number;
  distanceKm?: number; 
}

const calculateStraightDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return parseFloat((R * c).toFixed(1));
};

const getSpecialtyColor = (name: string) => {
  const colors = [
    'bg-red-50 text-red-700 border-red-200',
    'bg-orange-50 text-orange-700 border-orange-200',
    'bg-amber-50 text-amber-700 border-amber-200',
    'bg-green-50 text-green-700 border-green-200',
    'bg-emerald-50 text-emerald-700 border-emerald-200',
    'bg-teal-50 text-teal-700 border-teal-200',
    'bg-cyan-50 text-cyan-700 border-cyan-200',
    'bg-sky-50 text-sky-700 border-sky-200',
    'bg-blue-50 text-blue-700 border-blue-200',
    'bg-indigo-50 text-indigo-700 border-indigo-200',
    'bg-violet-50 text-violet-700 border-violet-200',
    'bg-purple-50 text-purple-700 border-purple-200',
    'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
    'bg-pink-50 text-pink-700 border-pink-200',
    'bg-rose-50 text-rose-700 border-rose-200'
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export const Page2: React.FC<Page2Props> = ({ language, onBack }) => {
  const t = translations[language];

  const [userLocation, setUserLocation] = useState<UserLocation>({
    lat: 21.2120,
    lng: 81.3733,
    city: 'Bhilai',
    source: 'manual'
  });
  const [locationLoading, setLocationLoading] = useState<boolean>(true);
  const [showCityPicker, setShowCityPicker] = useState<boolean>(false);
  const [citySearch, setCitySearch] = useState<string>('');
  const [citySearchResults, setCitySearchResults] = useState<{name: string, lat: number, lng: number}[]>([]);

  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [specialtyMap, setSpecialtyMap] = useState<Record<string, string>>({});
  const [csvLoading, setCsvLoading] = useState<boolean>(true);
  const [filterType, setFilterType] = useState<FilterType>('GOV');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // React 18+ Hook: Defers the heavy filtering so typing remains instant
  const deferredSearchQuery = useDeferredValue(searchQuery);
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 20;

  const triggerGpsLocation = async () => {
    setLocationLoading(true);
    try {
      const pos = await getBrowserGPS();
      let lat = pos.coords.latitude;
      let lng = pos.coords.longitude;
      let city = await getCityFromCoords(lat, lng) || '';

      if (city.toLowerCase().includes('jabalpur') || city.toLowerCase().includes('raipur') || city === '') {
        lat = 21.2120;
        lng = 81.3733;
        city = 'Bhilai';
      }
      setUserLocation({ lat, lng, city: city, source: 'gps' });
    } catch (err) {
      setUserLocation({ lat: 21.2120, lng: 81.3733, city: 'Bhilai', source: 'gps' });
    } finally {
      setLocationLoading(false);
    }
  };

  useEffect(() => { triggerGpsLocation(); }, []);

  useEffect(() => {
    Papa.parse('/data/Speciality_ID_Data.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const map: Record<string, string> = {};
        
        if (results.data && results.data.length > 0) {
          const firstRow = results.data[0] as Record<string, any>;
          const keys = Object.keys(firstRow);
          
          const idKey = keys.find(k => k.toLowerCase().replace(/[^a-z]/g, '').includes('id'));
          const codeKey = keys.find(k => k.toLowerCase().replace(/[^a-z]/g, '').includes('code'));
          const nameKey = keys.find(k => k.toLowerCase().replace(/[^a-z]/g, '').includes('name'));

          results.data.forEach((row: any) => {
            const name = nameKey ? row[nameKey] : undefined;
            if (name) {
              const cleanName = name.trim();
              
              if (idKey && row[idKey]) {
                map[row[idKey].toString().trim().toUpperCase()] = cleanName;
              }
              if (codeKey && row[codeKey]) {
                map[row[codeKey].toString().trim().toUpperCase()] = cleanName;
              }
            }
          });
        }
        setSpecialtyMap(map);
      }
    });
  }, []);

  useEffect(() => {
    if (citySearch.length < 3) {
      setCitySearchResults([]);
      return;
    }
    const delaySearch = setTimeout(async () => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${citySearch}&countrycodes=in&limit=5`);
        const data = await res.json();
        const parsed = data.map((d: any) => ({
          name: d.display_name.split(',')[0] + ', ' + (d.display_name.split(',')[1] || ''),
          lat: parseFloat(d.lat),
          lng: parseFloat(d.lon)
        }));
        setCitySearchResults(parsed);
      } catch (error) {
        console.error("City search failed", error);
      }
    }, 500); 
    return () => clearTimeout(delaySearch);
  }, [citySearch]);

  const handleSelectCity = (city: { name: string; lat: number; lng: number }) => {
    setUserLocation({ lat: city.lat, lng: city.lng, city: city.name, source: 'manual' });
    setShowCityPicker(false);
  };

  useEffect(() => {
    setCsvLoading(true);
    const fileName = `/data/PM_JAY_${filterType}_Hospitals_Data.csv`;

    Papa.parse(fileName, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedHospitals: Hospital[] = results.data.map((row: any, index: number) => {
          const hLat = parseFloat(row.Hospital_Latitude) || 0;
          const hLng = parseFloat(row.Hospital_Longitude) || 0;
          const distance = calculateStraightDistance(userLocation.lat, userLocation.lng, hLat, hLng);
          const fallbackTypeCode = filterType === 'GOV' ? 'G' : 'P';
          
          const rawSpecialties = row.Speciality_Code ? String(row.Speciality_Code).split(',') : [];
          const cleanSpecialties = rawSpecialties.map(s => s.trim().toUpperCase()).filter(s => s !== '');

          return {
            id: row.Facility_ID || row.Hospital_ID || `hosp-${index}`,
            name: row.Hospital_Name || 'Unknown Hospital',
            nameHi: row.Hospital_Name || 'Unknown Hospital',
            address: `${row.Address || ''}, ${row.District_Code || ''}, ${row.State_Code || ''}`,
            addressHi: row.Address || '',
            phone: row.Hospital_Contact || 'N/A',
            emergency: '108',
            beds: 50,
            specialties: cleanSpecialties.length > 0 ? cleanSpecialties : ['GENERAL'],
            type: row.Hospital_Type || filterType,
            typeCode: row.Hospital_Type_Code || fallbackTypeCode,
            lat: hLat,
            lng: hLng,
            distanceKm: distance
          };
        });

        const sortedHospitals = parsedHospitals.sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
        setHospitals(sortedHospitals);
        setCurrentPage(1);
        setCsvLoading(false);
      }
    });
  }, [filterType, userLocation.lat, userLocation.lng]);

  // Performance Fix: useMemo ensures this 50,000 item loop ONLY runs when the deferred search query actually changes
  const searchedHospitals = useMemo(() => {
    const term = deferredSearchQuery.toLowerCase();
    
    if (!term) return hospitals;

    return hospitals.filter(hosp => {
      const mappedSpecialties = hosp.specialties
        .map(code => (specialtyMap[code] || code).toLowerCase())
        .join(' ');

      return hosp.name.toLowerCase().includes(term) || mappedSpecialties.includes(term);
    });
  }, [hospitals, deferredSearchQuery, specialtyMap]);

  const totalPages = Math.ceil(searchedHospitals.length / ITEMS_PER_PAGE);
  
  // Performance Fix: Memoize pagination slice
  const paginatedHospitals = useMemo(() => {
    return searchedHospitals.slice(
      (currentPage - 1) * ITEMS_PER_PAGE, 
      currentPage * ITEMS_PER_PAGE
    );
  }, [searchedHospitals, currentPage]);

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-900 bg-white hover:bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer w-fit">
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToStep1}</span>
        </button>

        <div className="relative">
          <div className="flex items-center gap-1.5 bg-white border border-slate-200/90 rounded-xl p-1.5 shadow-2xs">
            <button onClick={triggerGpsLocation} disabled={locationLoading} className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${userLocation.source === 'gps' ? 'bg-emerald-600 text-white' : 'bg-blue-900 text-white hover:bg-blue-950'}`}>
              {locationLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <LocateFixed className="w-3.5 h-3.5" />}
              <span>{locationLoading ? t.locDetecting : (userLocation.source === 'gps' ? '📍 Live GPS' : '📍 Track Location')}</span>
            </button>
            <button onClick={() => setShowCityPicker(prev => !prev)} className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer">
              <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span className="font-bold max-w-[150px] truncate">{userLocation.city || 'Select City'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
          
          {showCityPicker && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-900">Search Any City in India</span>
                <button onClick={() => setShowCityPicker(false)} className="text-xs text-slate-400 font-bold">✕</button>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="e.g. Bhilai, Pune, Patna..." 
                  value={citySearch} 
                  onChange={(e) => setCitySearch(e.target.value)} 
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 pl-7 focus:ring-1 focus:ring-blue-900" 
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
              </div>
              <div className="max-h-48 overflow-y-auto space-y-1 text-xs">
                {citySearch.length < 3 && <p className="text-slate-400 p-2 text-center">Type 3 letters to search...</p>}
                {citySearchResults.map(c => (
                  <button key={`${c.lat}-${c.lng}`} onClick={() => handleSelectCity(c)} className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between hover:bg-slate-100`}>
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">PM-JAY Hospital Database</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Showing sorted results closest to <span className="font-semibold text-slate-900">{userLocation.city}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-xs bg-slate-50 border border-slate-200/70 px-3 py-2 rounded-xl text-slate-700 shrink-0">
            <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Total Found: <strong>{searchedHospitals.length}</strong></span>
          </div>
        </div>

        <div className="pt-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto">
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  setFilterType(opt.id);
                  setSearchQuery('');
                }}
                className={`text-xs font-bold px-3.5 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  filterType === opt.id ? 'bg-blue-900 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="relative shrink-0 w-full sm:w-64 xl:w-auto">
            <input
              type="text"
              placeholder="Search hospital or surgery..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:w-64 text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 pl-8 focus:ring-2 focus:ring-blue-900"
            />
            <Stethoscope className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            
            {/* Tiny loading indicator to show background filtering is happening */}
            {searchQuery !== deferredSearchQuery && (
              <RefreshCw className="w-3.5 h-3.5 text-blue-500 animate-spin absolute right-3 top-2.5" />
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {csvLoading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center space-y-3">
            <RefreshCw className="w-8 h-8 text-blue-900 animate-spin" />
            <p className="text-sm font-semibold text-slate-700">Loading PM-JAY {filterType} Database...</p>
          </div>
        ) : paginatedHospitals.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">{t.noHospitalsFound}</p>
          </div>
        ) : (
          paginatedHospitals.map((hosp, index) => {
            const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hosp.name + ', ' + userLocation.city)}`;
            const mapsDirUrl = `https://www.google.com/maps/dir/?api=1&destination=${hosp.lat},${hosp.lng}`;
            const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
            
            const isGov = hosp.typeCode.toUpperCase() === 'G';
            const mappedTypeLabel = isGov ? 'Government' : (hosp.typeCode.toUpperCase() === 'P' ? 'Private' : hosp.typeCode);

            return (
              <div key={hosp.id} className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-900/40 p-5 sm:p-6 shadow-2xs transition-all space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                  
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-slate-900 text-white text-[11px] font-black px-2 py-0.5 rounded-md">#{globalIndex}</span>
                      
                      <span className="bg-blue-50 text-blue-900 border border-blue-200/80 text-[11px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-blue-800" />
                        <span>{hosp.type}</span>
                      </span>

                      <span className={`border text-[11px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1 ${
                        isGov ? 'bg-emerald-50 text-emerald-900 border-emerald-200/80' : 'bg-violet-50 text-violet-900 border-violet-200/80'
                      }`}>
                        {isGov ? <ShieldCheck className="w-3 h-3 text-emerald-800" /> : <CheckCircle className="w-3 h-3 text-violet-800" />}
                        <span>{mappedTypeLabel}</span>
                      </span>
                    </div>

                    <a href={mapsSearchUrl} target="_blank" rel="noopener noreferrer" className="group/name inline-flex items-center gap-1.5 text-base sm:text-lg font-extrabold text-slate-900 hover:text-blue-900 transition-colors cursor-pointer">
                      <span className="group-hover/name:underline decoration-blue-900 decoration-2 underline-offset-2">
                        {language === 'hi' ? hosp.nameHi : hosp.name}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/name:text-blue-900 shrink-0" />
                    </a>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{language === 'hi' ? hosp.addressHi : hosp.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 w-full lg:w-[45%] bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-800 uppercase tracking-wide pb-1.5 border-b border-slate-200/70">
                      <Stethoscope className="w-3.5 h-3.5 text-blue-900" />
                      <span>Specialties Available</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                      {hosp.specialties.map((cleanCode, i) => {
                        const specName = specialtyMap[cleanCode] || cleanCode;
                        const colorClass = getSpecialtyColor(specName);
                        
                        return (
                          <span 
                            key={`${cleanCode}-${i}`} 
                            className={`border text-[10px] font-bold px-2 py-1 rounded-md text-center shadow-2xs transition-colors ${colorClass}`}
                          >
                            {specName}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <a href={`tel:${hosp.phone}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl transition-colors">
                      <Phone className="w-3.5 h-3.5 text-blue-900" />
                      <span>Call: {hosp.phone}</span>
                    </a>
                  </div>
                  <a href={mapsDirUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 px-4 py-2 rounded-xl transition-colors cursor-pointer">
                    <Navigation className="w-3.5 h-3.5 text-sky-300" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>

      {!csvLoading && totalPages > 1 && (
        <div className="flex items-center justify-between bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          
          <span className="text-xs font-bold text-slate-600">
            Page {currentPage} of {totalPages}
          </span>
          
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {!csvLoading && hospitals.length > 0 && (
        <div className="flex justify-center pt-4 pb-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-blue-900 px-6 py-2.5 rounded-full shadow-2xs transition-all cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
            <span>Back to Top</span>
          </button>
        </div>
      )}

    </main>
  );
};