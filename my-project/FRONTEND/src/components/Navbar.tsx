import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Sprout, Shield } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/diseases', label: 'Diseases' },
    { path: '/treatments', label: 'Treatments' },
    { path: '/doctors', label: 'Doctors' },
    { path: '/clinics', label: 'Clinics' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/about', label: 'About' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3.5 bg-[#F8FFF8]/90 backdrop-blur-md border-b border-[#2E7D32]/10 shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
            <Sprout className="w-5 h-5 text-accent" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-primary">
              Ayur<span className="text-accent font-sans font-medium text-lg">Veda</span>
              <span className="text-primary font-sans font-bold text-xs ml-1">Connect</span>
            </span>
            <p className="text-[8px] uppercase tracking-widest font-bold text-text-secondary">Ecosystem Platform</p>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-7">
          <div className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `font-semibold text-xs transition-colors duration-200 relative py-1 hover:text-primary ${
                    isActive ? 'text-primary' : 'text-text-secondary'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full animate-fade-in-up" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="w-[1px] h-5 bg-gray-200 mx-1" />

          {/* Auth Actions */}
          <div className="flex items-center space-x-3">
            <Link to="/dashboard" className="text-xs font-bold text-primary hover:text-primary-light px-4 py-2 rounded-full transition-colors">
              Login
            </Link>
            <Link to="/dashboard" className="bg-primary hover:bg-primary-light text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md shadow-primary/10 transition-all duration-300 transform hover:-translate-y-0.5">
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-xl text-primary hover:bg-[#2E7D32]/5 transition-colors focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#F8FFF8] border-b border-[#2E7D32]/10 py-6 px-8 shadow-xl animate-fade-in-up">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-semibold py-2 border-b border-gray-100 ${
                    isActive ? 'text-primary font-bold' : 'text-text-secondary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-2 flex flex-col space-y-3">
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 border border-[#2E7D32]/20 text-primary font-bold text-xs rounded-xl text-center"
              >
                Login
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="w-full bg-primary text-white font-bold text-xs py-3 rounded-xl shadow-md text-center"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
