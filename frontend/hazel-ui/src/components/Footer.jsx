import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-mocha text-cream/80 border-t border-accent/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="flex flex-col space-y-5 text-left">
            <Link to="/" className="flex flex-col group">
              <span className="font-serif text-2xl font-bold tracking-[0.2em] text-cream group-hover:text-secondary transition-colors">
                HAZEL
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-cream/40 font-sans mt-0.5">
                Luxury Dessert Boutique
              </span>
            </Link>
            <p className="text-xs font-light text-cream/60 leading-relaxed">
              Crafting exquisite, high-end pastry experiences and bespoke celebration cakes, made with organic ingredients and micro-refined details.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-4 text-left">
            <h4 className="font-serif text-sm text-accent uppercase tracking-wider font-semibold">Explore</h4>
            <div className="flex flex-col space-y-2.5 text-xs font-light text-cream/60">
              <Link to="/" className="hover:text-cream hover:underline underline-offset-4 transition-colors">Home</Link>
              <Link to="/menu" className="hover:text-cream hover:underline underline-offset-4 transition-colors">Dessert Menu</Link>
              <Link to="/about" className="hover:text-cream hover:underline underline-offset-4 transition-colors">Our Story</Link>
              <Link to="/find-shop" className="hover:text-cream hover:underline underline-offset-4 transition-colors">Boutique Locations</Link>
            </div>
          </div>

          {/* Boutique Hours */}
          <div className="flex flex-col space-y-4 text-left">
            <h4 className="font-serif text-sm text-accent uppercase tracking-wider font-semibold">Boutique Hours</h4>
            <div className="space-y-2 text-xs font-light text-cream/60">
              <p><strong className="text-cream font-medium">Monday - Friday:</strong> 8:00 AM - 9:00 PM</p>
              <p><strong className="text-cream font-medium">Saturday - Sunday:</strong> 9:00 AM - 10:00 PM</p>
              <p className="text-xs text-accent font-medium pt-1">Bespoke Orders: 48h advance notice</p>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col space-y-4 text-left">
            <h4 className="font-serif text-sm text-accent uppercase tracking-wider font-semibold">Contact Us</h4>
            <div className="space-y-2.5 text-xs font-light text-cream/60">
              <p>120 Galle Road, Colombo 03, Sri Lanka</p>
              <p>Email: <a href="mailto:concierge@hazel.com" className="hover:text-cream hover:underline underline-offset-4 transition-colors">concierge@hazel.com</a></p>
              <p>Hotline: <a href="tel:+94112345678" className="hover:text-cream hover:underline underline-offset-4 transition-colors">+94 11 234 5678</a></p>
            </div>
          </div>
        </div>

        {/* Gold Divider */}
        <div className="gold-divider mb-10"></div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase tracking-wider font-light text-cream/40">
          <p>© {new Date().getFullYear()} Hazel Boutique. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <span className="hover:text-cream cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-cream cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-cream cursor-pointer transition-colors">FAQ</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
