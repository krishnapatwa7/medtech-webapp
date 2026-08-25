import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Page1 } from './pages/Page1';
import { Page2 } from './pages/Page2';
import { Language } from './translations';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'page1' | 'page2'>('page1');
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header 
        language={language}
        onToggleLanguage={toggleLanguage}
        onHomeClick={() => setCurrentPage('page1')} 
      />
      
      {currentPage === 'page1' ? (
        <Page1 
          language={language}
          onHaveCard={() => setCurrentPage('page2')} 
        />
      ) : (
        <Page2 
          language={language}
          onBack={() => setCurrentPage('page1')} 
        />
      )}

      <Footer language={language} />
    </div>
  );
};

export default App;
