import React, { useState } from 'react';
import { Page } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Accommodation from './pages/Accommodation';
import Training from './pages/Training';
import Services from './pages/Services';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <Home setCurrentPage={setCurrentPage} />;
      case Page.Accommodation:
        return <Accommodation />;
      case Page.Training:
        return <Training />;
      case Page.Services:
        return <Services />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 text-stone-800">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
