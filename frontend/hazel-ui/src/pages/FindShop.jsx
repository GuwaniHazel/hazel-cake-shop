import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Phone, MapPin, Map, Clock, Crown, Sparkles, ChevronRight, Navigation, Calendar, Mail, Smartphone } from 'lucide-react';

export const FindShop = () => {
  const [branches, setBranches] = useState([]);
  const [activeBranch, setActiveBranch] = useState(null);
  const [loading, setLoading] = useState(true);

  // Luxury Color Palette
  const colors = {
    gold: '#C9A96E',
    goldLight: '#E8D5A3',
    goldDark: '#A8894A',
    mocha: '#4A3728',
    mochaLight: '#7A5C44',
    cream: '#FAF6F0',
    white: '#FFFFFF',
    charcoal: '#2C2420',
  };

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const data = await api.branches.getAll();
        setBranches(data);
        if (data.length > 0) {
          setActiveBranch(data[0]);
        }
      } catch (error) {
        console.error("Failed to load branches", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();
  }, []);

  // Format Sri Lankan phone number
  const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.startsWith('94')) {
      const number = cleaned.slice(2);
      if (number.length === 9) {
        return `+94 ${number.slice(0, 2)} ${number.slice(2, 5)} ${number.slice(5)}`;
      }
      return `+94 ${number}`;
    } else if (cleaned.startsWith('0')) {
      const number = cleaned.slice(1);
      if (number.length === 9) {
        return `0${number.slice(0, 2)} ${number.slice(2, 5)} ${number.slice(5)}`;
      }
      return `0${number}`;
    } else if (cleaned.length === 10 && !cleaned.startsWith('0')) {
      return `0${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
    }
    return phone;
  };

  // Generate Google Maps embed URL
  const getGoogleMapsEmbedUrl = (address) => {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodedAddress}&zoom=15`;
  };

  // Generate Google Maps directions URL
  const getDirectionsUrl = (address) => {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  };

  // Sri Lankan phone numbers for branches
  const branchPhoneNumbers = {
    'Colombo': '+94 112 345 678',
    'Kandy': '+94 812 345 678',
    'Galle': '+94 912 345 678',
    'Negombo': '+94 312 345 678',
    'Bentota': '+94 342 345 678',
    'Nuwara Eliya': '+94 522 345 678',
  };

  // Get phone number for branch
  const getBranchPhone = (branch) => {
    return branchPhoneNumbers[branch.city] || branch.phone || '+94 112 345 678';
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.cream }}>
      
      {/* ====== HERO BANNER ====== */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0" style={{ 
          background: `linear-gradient(135deg, ${colors.mocha}, ${colors.mochaLight})` 
        }}></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(201,169,110,0.3) 0%, transparent 70%)' 
            }}
          ></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-gold/30 rounded-full backdrop-blur-sm bg-white/5">
            <Crown size={14} style={{ color: colors.gold }} />
            <span className="text-[10px] uppercase tracking-[0.3em] font-light" style={{ color: colors.goldLight }}>
              Visit Our Boutiques
            </span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold">
            Find a <span style={{ color: colors.gold }}>Hazel</span> Boutique
          </h1>
          
          <p className="mt-4 text-white/70 text-sm max-w-2xl mx-auto leading-relaxed font-light">
            Step into the world of Hazel. Experience our pastry collections in person 
            at our boutique locations across Sri Lanka.
          </p>
        </div>
      </div>

      {/* ====== MAIN CONTENT - LARGER GAP ====== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-2 rounded-full animate-spin" style={{ 
              borderColor: `${colors.gold}30`,
              borderTopColor: colors.gold 
            }}></div>
            <p className="mt-4 text-xs text-charcoal/40 animate-pulse">Loading boutique locations...</p>
          </div>
        ) : (
          <>
            {/* ====== BRANCH LIST & MAP SECTION - LARGER GAP ====== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
              
              {/* LEFT SIDE - Branch List */}
              <div className="lg:col-span-5 space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {branches.map((branch) => {
                  const phone = getBranchPhone(branch);
                  return (
                    <button
                      key={branch.id}
                      onClick={() => setActiveBranch(branch)}
                      className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${
                        activeBranch?.id === branch.id
                          ? 'bg-white border-gold/30 shadow-xl'
                          : 'bg-white/60 border-gold/10 hover:bg-white hover:border-gold/20'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-serif text-xl font-bold" style={{ color: colors.mocha }}>
                            {branch.city} Boutique
                          </h3>
                          {activeBranch?.id === branch.id && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[6px] uppercase tracking-wider font-bold mt-1" 
                              style={{ backgroundColor: `${colors.gold}15`, color: colors.goldDark }}
                            >
                              <Sparkles size={8} />
                              Selected
                            </span>
                          )}
                        </div>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                          style={{ 
                            backgroundColor: activeBranch?.id === branch.id ? colors.gold : `${colors.gold}10`,
                            color: activeBranch?.id === branch.id ? colors.white : colors.gold
                          }}
                        >
                          <MapPin size={14} />
                        </div>
                      </div>
                      
                      <div className="mt-3 space-y-2 text-sm font-light" style={{ color: colors.charcoal }}>
                        <div className="flex items-start gap-2">
                          <MapPin size={14} style={{ color: colors.goldDark }} className="mt-0.5 flex-shrink-0" />
                          <span className="text-xs">{branch.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Smartphone size={14} style={{ color: colors.goldDark }} className="flex-shrink-0" />
                          <span className="text-xs font-medium" style={{ color: colors.mocha }}>
                            {formatPhoneNumber(phone)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium" style={{ color: colors.goldDark }}>
                          <Clock size={14} />
                          <span>Open Daily: 9:00 AM - 10:00 PM</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* RIGHT SIDE - Google Map with Image */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-2xl border border-gold/10 shadow-xl overflow-hidden">
                  {activeBranch ? (
                    <>
                      {/* ====== MAP IMAGE CONTAINER ====== */}
<div className="relative h-[450px] w-full bg-cream overflow-hidden rounded-2xl">
  
  {/* Sri Lanka Map Image - Replace with your map image URL */}
  <img
    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1920&q=80"
    alt="Sri Lanka Map"
    className="w-full h-full object-cover"
  />
  
  {/* Dark Overlay for Premium Feel */}
  <div className="absolute inset-0" style={{ 
    background: 'linear-gradient(135deg, rgba(74,55,40,0.3) 0%, rgba(74,55,40,0.1) 100%)' 
  }}></div>
  
  {/* Gold Corner Accents */}
  <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 rounded-tr-2xl pointer-events-none" 
    style={{ borderColor: colors.gold + '80' }}>
  </div>
  <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 rounded-bl-2xl pointer-events-none" 
    style={{ borderColor: colors.gold + '80' }}>
  </div>
  
  {/* Location Pin with Gold Effect */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
    <div className="relative flex flex-col items-center">
      {/* Pulse Ring */}
      <div className="absolute -inset-4 rounded-full animate-ping" 
        style={{ backgroundColor: colors.gold + '30' }}>
      </div>
      <div className="absolute -inset-8 rounded-full animate-pulse" 
        style={{ backgroundColor: colors.gold + '10' }}>
      </div>
      
      {/* Pin Icon */}
      <div className="relative w-14 h-14 rounded-full flex items-center justify-center border-2 shadow-xl z-10"
        style={{ 
          backgroundColor: colors.white,
          borderColor: colors.gold,
          boxShadow: `0 0 30px ${colors.gold}40`
        }}>
        <MapPin size={24} style={{ color: colors.gold }} />
      </div>
      
      {/* Pin Label */}
      <div className="mt-3 px-4 py-1.5 rounded-full backdrop-blur-sm border shadow-lg z-10"
        style={{ 
          backgroundColor: colors.white + '95',
          borderColor: colors.gold + '40'
        }}>
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: colors.mocha }}>
          Hazel Boutique
        </span>
      </div>
      
      {/* Pin Line */}
      <div className="w-0.5 h-6" style={{ backgroundColor: colors.gold + '60' }}></div>
    </div>
  </div>
  
  {/* Bottom Gradient Overlay */}
  <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" 
    style={{ 
      background: `linear-gradient(to top, ${colors.white}, transparent)` 
    }}>
  </div>
  
  {/* Top Gradient Overlay */}
  <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none" 
    style={{ 
      background: `linear-gradient(to bottom, ${colors.white}80, transparent)` 
    }}>
  </div>
</div>
                        

                      {/* Map Footer */}
                      <div className="p-5 border-t border-gold/10">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div>
                            <h4 className="font-serif text-lg font-bold" style={{ color: colors.mocha }}>
                              {activeBranch.city} Boutique
                            </h4>
                            <p className="text-xs font-light" style={{ color: colors.charcoal }}>
                              {activeBranch.address}
                            </p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-[10px] font-medium" style={{ color: colors.goldDark }}>
                                <Clock size={12} className="inline mr-1" />
                                9:00 AM - 10:00 PM
                              </span>
                              <span className="text-[10px] font-medium" style={{ color: colors.goldDark }}>
                                <Smartphone size={12} className="inline mr-1" />
                                {formatPhoneNumber(getBranchPhone(activeBranch))}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-3">
                            <a
                              href={getDirectionsUrl(activeBranch.address)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[10px] uppercase tracking-wider font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                              style={{ backgroundColor: colors.gold }}
                            >
                              <Navigation size={14} />
                              Get Directions
                            </a>
                            <a
                              href={`tel:${getBranchPhone(activeBranch).replace(/\s/g, '')}`}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all duration-300 hover:scale-105 border"
                              style={{ 
                                borderColor: `${colors.gold}30`,
                                color: colors.mocha 
                              }}
                            >
                              <Smartphone size={14} />
                              Call Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="h-[450px] flex flex-col items-center justify-center p-8 text-center">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${colors.gold}10` }}>
                        <MapPin size={32} style={{ color: colors.gold }} />
                      </div>
                      <h3 className="font-serif text-xl font-bold" style={{ color: colors.mocha }}>
                        Select a Location
                      </h3>
                      <p className="text-xs text-charcoal/50 mt-2 max-w-sm">
                        Choose a boutique from the list to view its location on the map.
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </>
        )}

        {/* ====== BOUTIQUE INFO CARDS WITH PHONE NUMBERS ====== */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 text-center border border-gold/10 shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: `${colors.gold}15` }}>
              <Clock size={20} style={{ color: colors.gold }} />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: colors.mocha }}>Opening Hours</h4>
            <p className="text-[10px] text-charcoal/50 mt-1">Mon - Sun: 9:00 AM - 10:00 PM</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 text-center border border-gold/10 shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: `${colors.gold}15` }}>
              <Smartphone size={20} style={{ color: colors.gold }} />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: colors.mocha }}>Call Us</h4>
            <a href="tel:+94112345678" className="text-[10px] text-charcoal/50 mt-1 hover:text-gold transition-colors block">
              +94 112 345 678
            </a>
            <p className="text-[8px] text-charcoal/30 mt-0.5">(Daily 9AM - 10PM)</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 text-center border border-gold/10 shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: `${colors.gold}15` }}>
              <Mail size={20} style={{ color: colors.gold }} />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: colors.mocha }}>Email Us</h4>
            <a href="mailto:info@hazel.com" className="text-[10px] text-charcoal/50 mt-1 hover:text-gold transition-colors block">
              info@hazel.com
            </a>
            <p className="text-[8px] text-charcoal/30 mt-0.5">We reply within 24hrs</p>
          </div>
        </div>

        {/* ====== QUICK CONTACT SECTION ====== */}
        <div className="mt-16 bg-white rounded-2xl border border-gold/10 shadow-lg p-6 sm:p-8">
          <div className="text-center mb-6">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold" style={{ color: colors.goldDark }}>
              Quick Contact
            </span>
            <h3 className="font-serif text-2xl font-bold mt-1" style={{ color: colors.mocha }}>
              Reach Us Anywhere in <span style={{ color: colors.gold }}>Sri Lanka</span>
            </h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { city: 'Colombo', phone: '+94 112 345 678', icon: <MapPin size={16} /> },
              { city: 'Kandy', phone: '+94 812 345 678', icon: <MapPin size={16} /> },
              { city: 'Galle', phone: '+94 912 345 678', icon: <MapPin size={16} /> },
              { city: 'Negombo', phone: '+94 312 345 678', icon: <MapPin size={16} /> },
            ].map((location, index) => (
              <div key={index} className="text-center p-3 rounded-xl transition-all duration-300 hover:bg-gold/5">
                <div className="flex items-center justify-center gap-1 text-xs font-medium" style={{ color: colors.goldDark }}>
                  {location.icon}
                  <span>{location.city}</span>
                </div>
                <a href={`tel:${location.phone.replace(/\s/g, '')}`} 
                   className="text-[11px] font-bold mt-1 hover:text-gold transition-colors block"
                   style={{ color: colors.mocha }}>
                  {location.phone}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ====== CTA BANNER ====== */}
        <div className="mt-20 relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0" style={{ 
            background: `linear-gradient(135deg, ${colors.mocha}, ${colors.mochaLight})` 
          }}></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-1/2 h-full" 
              style={{ 
                backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(201,169,110,0.3) 0%, transparent 70%)' 
              }}
            ></div>
          </div>
          
          <div className="relative z-10 p-10 sm:p-12 text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 border border-gold/30 rounded-full backdrop-blur-sm bg-white/5">
              <Smartphone size={14} style={{ color: colors.gold }} />
              <span className="text-[8px] uppercase tracking-[0.3em] font-light" style={{ color: colors.goldLight }}>Call or Visit</span>
            </div>
            
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4">
              Can't Find Us? <span style={{ color: colors.gold }}>We Deliver!</span>
            </h2>
            
            <p className="text-white/60 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
              Can't make it to our boutique? Order online and get our premium cakes 
              delivered straight to your door. Call us for same-day delivery!
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="tel:+94112345678" 
                 className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                 style={{ backgroundColor: colors.gold }}>
                <Smartphone size={14} />
                Call to Order
              </a>
              <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:scale-105 border border-white/30">
                Order Online
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ====== CUSTOM SCROLLBAR STYLES ====== */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${colors.cream};
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${colors.gold};
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${colors.goldDark};
        }
      `}</style>
    </div>
  );
};

export default FindShop;