
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-800 text-stone-300">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Equestrian Center. All rights reserved.</p>
          <div className="flex mt-4 md:mt-0 space-x-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
