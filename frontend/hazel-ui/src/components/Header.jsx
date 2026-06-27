import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, User, LogOut, Menu as MenuIcon, X } from 'lucide-react';

export const Header = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-cream/90 border-b border-primary/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex flex-col items-center group">
              <span className="font-serif text-2xl font-bold tracking-[0.2em] text-primary group-hover:text-primary-light transition-colors">
                HAZEL
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-primary/50 font-sans mt-0.5">
                Luxury Dessert Boutique
              </span>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            {[
              { name: 'Home', path: '/' },
              { name: 'Menu', path: '/menu' },
              { name: 'About', path: '/about' },
              { name: 'Find Shop', path: '/find-shop' },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors py-1 border-b-2 ${
                  isActive(link.path)
                    ? 'border-primary text-primary'
                    : 'border-transparent text-charcoal/70 hover:text-primary hover:border-primary/30'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Cart Icon */}
            <Link 
              to="/cart" 
              className={`relative p-2 transition-colors ${
                isActive('/cart') ? 'text-primary' : 'text-charcoal/70 hover:text-primary'
              }`}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center min-w-4 h-4 px-1 text-[9px] font-bold leading-none text-#8b654b bg-accent rounded-full transform translate-x-1/3 -translate-y-1/3">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 text-charcoal/75 hover:text-primary transition-colors focus:outline-none"
                >
                  <User size={18} strokeWidth={1.5} />
                  <span className="text-xs uppercase tracking-wider font-medium">{user.email.split('@')[0]}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-premium border border-primary/5 py-2 z-50">
                    <Link
                      to={user.role === 'Admin' ? '/admin' : '/dashboard'}
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2.5 text-xs uppercase tracking-wider text-charcoal/80 hover:bg-cream hover:text-primary transition-colors"
                    >
                      Dashboard
                    </Link>
                    <div className="border-t border-primary/5 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center px-4 py-2.5 text-xs uppercase tracking-wider text-red-600 hover:bg-red-50 transition-colors font-medium"
                    >
                      <LogOut size={14} className="mr-2" strokeWidth={1.5} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 rounded-full border border-primary/30 text-primary hover:border-primary hover:bg-primary hover:text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link 
              to="/cart" 
              className={`relative p-2 ${
                isActive('/cart') ? 'text-primary' : 'text-charcoal/70'
              }`}
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center min-w-4 h-4 px-1 text-[9px] font-bold leading-none text-white bg-accent rounded-full transform translate-x-1/3 -translate-y-1/3">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-charcoal/85 hover:text-primary focus:outline-none p-1"
            >
              {mobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <MenuIcon size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream/95 border-b border-primary/5 px-4 pt-4 pb-6 space-y-3 shadow-lg">
          {[
            { name: 'Home', path: '/' },
            { name: 'Menu', path: '/menu' },
            { name: 'About', path: '/about' },
            { name: 'Find Shop', path: '/find-shop' },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-sm uppercase tracking-widest py-2 border-b border-primary/5 font-medium ${
                isActive(link.path) ? 'text-primary' : 'text-charcoal/70'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            {user ? (
              <div className="space-y-3">
                <Link
                  to={user.role === 'Admin' ? '/admin' : '/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm uppercase tracking-widest font-semibold text-primary py-2"
                >
                  My Dashboard ({user.role})
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center text-sm uppercase tracking-widest font-medium text-red-600 py-2 border-t border-primary/5"
                >
                  <LogOut size={16} className="mr-2" strokeWidth={1.5} />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-3 rounded-full bg-primary text-white text-xs uppercase tracking-widest font-bold hover:bg-primary-dark transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
