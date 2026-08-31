import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Page0 } from './pages/Page0';
import { Page1 } from './pages/Page1';
import { Page2 } from './pages/Page2';
import { Page3 } from './pages/Page3';
import { AdminLogin } from './pages/AdminLogin';
import { Language } from './translations';
import { Hospital, baseHospitals } from './data/hospitals';
import { UserLocation } from './utils/location';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'page0' | 'page1' | 'page2' | 'page3' | 'adminLogin'>('page0');
  const [language, setLanguage] = useState<Language>('en');
  const [selectedHospital, setSelectedHospital] = useState<Hospital>(baseHospitals[0]);
  const [userLocation, setUserLocation] = useState<UserLocation>({
    lat: 21.2185,
    lng: 81.3090,
    landmark: 'Shri Shankaracharya Technical Campus',
    area: 'Junwani',
    city: 'Durg',
    state: 'Chhattisgarh',
    displayName: 'Shri Shankaracharya Technical Campus, Durg',
    source: 'gps'
  });

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  const handleSelectHospital = (hosp: Hospital, loc: UserLocation) => {
    setSelectedHospital(hosp);
    setUserLocation(loc);
    setCurrentPage('page3');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header 
        language={language}
        onToggleLanguage={toggleLanguage}
        onHomeClick={() => {
          setCurrentPage('page0');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />
      
      {/* PAGE 0: Dual Login Landing (User Login vs Hospital Admin Login) */}
      {currentPage === 'page0' && (
        <Page0
          language={language}
          onSelectUserLogin={() => {
            setCurrentPage('page1');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectAdminLogin={() => {
            setCurrentPage('adminLogin');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* USER FLOW: PAGE 1 (Card Status & Action Cards) */}
      {currentPage === 'page1' && (
        <Page1 
          language={language}
          onHaveCard={() => {
            setCurrentPage('page2');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onBackToPortals={() => {
            setCurrentPage('page0');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* USER FLOW: PAGE 2 (GPS Hospital Finder & Rankings) */}
      {currentPage === 'page2' && (
        <Page2 
          language={language}
          onBack={() => {
            setCurrentPage('page1');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectHospital={handleSelectHospital}
        />
      )}

      {/* USER FLOW: PAGE 3 (Hospital Information & Reviews) */}
      {currentPage === 'page3' && (
        <Page3
          hospital={selectedHospital}
          userLocation={userLocation}
          language={language}
          onBack={() => {
            setCurrentPage('page2');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* HOSPITAL ADMIN FLOW: (Staff Login & Dashboard Placeholder) */}
      {currentPage === 'adminLogin' && (
        <AdminLogin
          language={language}
          onBack={() => {
            setCurrentPage('page0');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      <Footer language={language} />
    </div>
  );
};

export default App;
