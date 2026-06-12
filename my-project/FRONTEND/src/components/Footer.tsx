import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8 px-6 md:px-12 border-t border-[#FAF9F6]/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand column */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-primary-light border border-accent/20 flex items-center justify-center">
              <Sprout className="w-5 h-5 text-accent animate-float" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Ayur<span className="text-accent font-sans font-medium text-lg">Veda</span>
                <span className="text-white font-sans font-bold text-xs ml-1">Connect</span>
              </span>
              <p className="text-[8px] uppercase tracking-widest font-bold text-secondary">Ecosystem Platform</p>
            </div>
          </div>
          <p className="text-sm text-secondary leading-relaxed">
            Restoring harmony and balance in your life through time-tested Ayurvedic systems, organic remedies, and expert physician guidance.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="p-2 rounded-lg bg-primary-light hover:bg-accent hover:text-primary transition-all duration-300">
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-primary-light hover:bg-accent hover:text-primary transition-all duration-300">
              <FaTwitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-primary-light hover:bg-accent hover:text-primary transition-all duration-300">
              <FaInstagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-serif text-sm font-bold text-accent uppercase tracking-wider mb-6">Company Links</h4>
          <ul className="space-y-3 text-xs">
            <li>
              <Link to="/" className="text-secondary hover:text-white transition-colors duration-200">Home</Link>
            </li>
            <li>
              <Link to="/diseases" className="text-secondary hover:text-white transition-colors duration-200">Disease Library</Link>
            </li>
            <li>
              <Link to="/doctors" className="text-secondary hover:text-white transition-colors duration-200">Find Doctors</Link>
            </li>
            <li>
              <Link to="/clinics" className="text-secondary hover:text-white transition-colors duration-200">Affiliated Clinics</Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-serif text-sm font-bold text-accent uppercase tracking-wider mb-6">Resources</h4>
          <ul className="space-y-3 text-xs">
            <li>
              <a href="#" className="text-secondary hover:text-white transition-colors duration-200">Ayurvedic Diet Planner</a>
            </li>
            <li>
              <a href="#" className="text-secondary hover:text-white transition-colors duration-200">Dosha Assessment</a>
            </li>
            <li>
              <a href="#" className="text-secondary hover:text-white transition-colors duration-200">Blogs & Articles</a>
            </li>
            <li>
              <a href="#" className="text-secondary hover:text-white transition-colors duration-200">Health Guidelines</a>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="font-serif text-sm font-bold text-accent uppercase tracking-wider mb-6">Get in Touch</h4>
          <ul className="space-y-4 text-xs text-secondary">
            <li className="flex items-start space-x-3">
              <MapPin className="w-4.5 h-4.5 text-accent shrink-0" />
              <span>108 Lotus Sanctuary Lane, Heritage District, New Delhi, India</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-4.5 h-4.5 text-accent shrink-0" />
              <span>+91 11 4055 9900</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-4.5 h-4.5 text-accent shrink-0" />
              <span>support@ayurvedaconnect.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-[#FAF9F6]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-secondary">
        <p>© {new Date().getFullYear()} AyurVeda Connect. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Medical Disclaimer</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
