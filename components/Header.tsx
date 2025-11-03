import React from 'react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavLink: React.FC<{
  page: Page;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  children: React.ReactNode;
}> = ({ page, currentPage, setCurrentPage, children }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => setCurrentPage(page)}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
        isActive
          ? 'bg-amber-800 text-white shadow-sm'
          : 'text-stone-600 hover:bg-stone-200 hover:text-stone-900'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage(Page.Home)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-amber-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 14h-4l-3.5-6-3.5 6H2"/>
            <path d="M14.5 14.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5"/>
            <path d="M5 18h11"/>
            <path d="M8 18V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6"/>
          </svg>
          <h1 className="text-2xl font-bold text-stone-800 tracking-tight">Equestrian Center</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-2" aria-label="Main navigation">
          <NavLink page={Page.Home} currentPage={currentPage} setCurrentPage={setCurrentPage}>Home</NavLink>
          <NavLink page={Page.Accommodation} currentPage={currentPage} setCurrentPage={setCurrentPage}>Accommodation</NavLink>
          <NavLink page={Page.Training} currentPage={currentPage} setCurrentPage={setCurrentPage}>Training</NavLink>
          <NavLink page={Page.Services} currentPage={currentPage} setCurrentPage={setCurrentPage}>Services</NavLink>
        </nav>
        <div className="md:hidden">
            {/* Mobile menu button can be added here */}
        </div>
      </div>
    </header>
  );
};

export default Header;
