import React from 'react';
import { Page } from '../types';

interface HomeProps {
    setCurrentPage: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-[60vh] md:h-[80vh] flex items-center justify-center text-white" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598813322433-4674b8a2135e?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center p-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-shadow">Welcome to the Equestrian Center</h1>
          <p className="text-lg md:text-2xl mb-8 text-shadow-sm">Your premier destination for equine excellence and care.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => setCurrentPage(Page.Accommodation)}
              className="bg-amber-800 text-white font-semibold py-3 px-8 rounded-md hover:bg-amber-900 transition-transform duration-300 transform hover:scale-105"
            >
              Book Stabling
            </button>
            <button 
              onClick={() => setCurrentPage(Page.Training)}
              className="bg-white text-amber-800 font-semibold py-3 px-8 rounded-md hover:bg-stone-100 transition-transform duration-300 transform hover:scale-105"
            >
              Explore Training
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-stone-800 mb-4">World-Class Facilities & Services</h2>
          <p className="text-stone-600 max-w-3xl mx-auto mb-12">We provide a comprehensive range of services to meet the needs of every horse and rider, from luxury accommodation to expert training programs.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="bg-amber-800 text-white rounded-full p-5 mb-4 inline-flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Luxury Stabling</h3>
              <p className="text-stone-600">Safe, comfortable, and spacious accommodations for your horse.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-amber-800 text-white rounded-full p-5 mb-4 inline-flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Training</h3>
              <p className="text-stone-600">Professional coaching for all disciplines and skill levels.</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="bg-amber-800 text-white rounded-full p-5 mb-4 inline-flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Comprehensive Care</h3>
              <p className="text-stone-600">Grooming, nutrition, and veterinary services on-site.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
