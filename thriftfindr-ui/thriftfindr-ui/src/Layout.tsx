import React from 'react';
import { Outlet } from 'react-router-dom';
import { Info } from 'lucide-react'; 

const Header: React.FC = () => {
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="font-bold text-2xl text-brand-charcoal tracking-tight">
              ThriftFindr
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {}
              <a href="/" className="text-brand-gray-medium hover:text-brand-charcoal px-3 py-2 rounded-md text-base font-medium transition-colors">
                Home 
              </a>
              <a href="/stores" className="text-brand-gray-medium hover:text-brand-charcoal px-3 py-2 rounded-md text-base font-medium transition-colors">
                Browse Stores
              </a>
              <a href="#about-us" className="text-brand-gray-medium hover:text-brand-charcoal px-3 py-2 rounded-md text-base font-medium transition-colors">
                About Us
              </a>
            </div>
          </div>
          {}
        </div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-white font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <a href="/" className="font-bold text-xl text-brand-charcoal tracking-tight">
              ThriftFindr
            </a>
            <p className="text-sm text-brand-gray-medium mt-1">
              &copy; {new Date().getFullYear()} ThriftFindr. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Info size={18} className="text-brand-gray-medium" />
            <a href="#privacy" className="text-sm text-brand-gray-medium hover:text-brand-charcoal transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="text-sm text-brand-gray-medium hover:text-brand-charcoal transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-inter">
      <Header />
      <main className="flex-grow bg-gray-100">
        <Outlet /> {}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 