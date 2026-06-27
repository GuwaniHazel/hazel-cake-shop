import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { Search, ShoppingCart, Sparkles, Award, Star, Heart, Filter, ArrowRight, Crown, Coffee, ChevronRight } from 'lucide-react';
import menuVideo1 from '../assets/videos/menu1.mp4';

// Helper to map cake names to beautiful Unsplash fallbacks if backend images fail
const getCakeFallbackImage = (cakeName) => {
  const name = cakeName.toLowerCase();
  if (name.includes('praline') || name.includes('hazelnut')) {
    return 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80';
  }
  if (name.includes('rose') || name.includes('raspberry')) {
    return 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80';
  }
  if (name.includes('espresso') || name.includes('truffle') || name.includes('chocolate')) {
    return 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80';
  }
  if (name.includes('caramel') || name.includes('macadamia')) {
    return 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=800&q=80';
  }
  if (name.includes('pistachio') || name.includes('cardamom')) {
    return 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80';
  }
  if (name.includes('vanilla')) {
    return 'https://images.unsplash.com/photo-1464349172961-1ee462e48517?auto=format&fit=crop&w=800&q=80';
  }
  return 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80';
};

export const Menu = () => {
  const [cakes, setCakes] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const categories = ['All', 'Chocolate', 'Fruit', 'Special'];

  const fetchCakes = async () => {
    setLoading(true);
    try {
      const data = await api.cakes.getAll(category === 'All' ? '' : category, search);
      setCakes(data);
    } catch (error) {
      console.error("Failed to load cakes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCakes();
  }, [category]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCakes();
  };

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
    champagne: '#F7F0E8',
    rose: '#E8C4B8',
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.cream }}>
      
      {/* ====== HERO SECTION - MAIN BANNER WITH CARVED CORNERS ====== */}
      <div className="relative overflow-hidden" style={{ backgroundColor: colors.mocha }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[360px] lg:min-h-[450px]">
            
            {/* LEFT SIDE - Content */}
            <div className="flex flex-col justify-center py-8 lg:py-12 pr-0 lg:pr-12 text-white">
              {/* Top Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 border border-gold/30 rounded-full w-fit backdrop-blur-sm bg-white/5">
                <Crown size={12} style={{ color: colors.gold }} />
                <span className="text-[8px] uppercase tracking-[0.3em] font-light" style={{ color: colors.goldLight }}>
                  Artisan Pâtisserie
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Sweet Moments
                <br />
                <span style={{ color: colors.gold }}>Start Here.</span>
              </h1>

              {/* Description */}
              <p className="mt-3 text-white/60 text-xs sm:text-sm max-w-md leading-relaxed font-light">
                The charming toffee-laden pastry and the elegant coffee-infused mousse, 
                your afternoon joy awaits.
              </p>

              {/* CTA Button */}
              <div className="mt-5">
                <button className="group inline-flex items-center gap-2 px-7 py-2.5 rounded-full text-white text-[10px] uppercase tracking-widest font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{ backgroundColor: colors.gold }}
                >
                  Explore More
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-7 mt-6 pt-5 border-t border-white/10">
                <div>
                  <p className="text-xl font-serif font-bold" style={{ color: colors.gold }}>50+</p>
                  <p className="text-[7px] uppercase tracking-wider text-white/40">Exclusive Cakes</p>
                </div>
                <div>
                  <p className="text-xl font-serif font-bold" style={{ color: colors.gold }}>100%</p>
                  <p className="text-[7px] uppercase tracking-wider text-white/40">Natural</p>
                </div>
                <div>
                  <p className="text-xl font-serif font-bold" style={{ color: colors.gold }}>24/7</p>
                  <p className="text-[7px] uppercase tracking-wider text-white/40">Freshly Baked</p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Video with Carved Corners */}
            <div className="relative h-[220px] lg:h-160 overflow-hidden my-3 lg:my-9 ml-0 lg:ml-8">
              {/* Video Container with Carved Corners */}
             <div className="relative w-full h-full overflow-hidden rounded-[28px] shadow-2xl">
                <video
                     src={menuVideo1}
                     autoPlay
                     muted
                     loop
                     playsInline
                     className="w-full h-full object-cover object-center"
                />
                
                {/* Inner Shadow for Carved Effect */}
                <div className="absolute inset-0 pointer-events-none rounded-2xl lg:rounded-3xl shadow-inner" 
                  style={{ boxShadow: 'inset 0 0 50px rgba(0,0,0,0.3)' }}
                ></div>
                
                {/* Gold Accent Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-mocha/30 via-transparent to-transparent rounded-2xl lg:rounded-3xl"></div>
                
                {/* Carved Corner Accents - Gold */}
                <div className="absolute top-3 right-3 w-14 h-14 border-t-2 border-r-2 border-gold/40 rounded-tr-2xl pointer-events-none"></div>
                <div className="absolute bottom-3 left-3 w-14 h-14 border-b-2 border-l-2 border-gold/40 rounded-bl-2xl pointer-events-none"></div>

                {/* Carved Corner Accents - White (for depth) */}
                <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-white/10 rounded-tr-xl pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-white/10 rounded-bl-xl pointer-events-none"></div>

                {/* Floating Badge on Video */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-3.5 py-2.5 shadow-2xl border border-gold/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: `${colors.gold}20` }}>
                      <Coffee size={15} style={{ color: colors.gold }} />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: colors.mocha }}>Signature Blend</p>
                      <p className="text-[6px] text-charcoal/40 uppercase tracking-wider">Premium Selection</p>
                    </div>
                  </div>
                </div>

                {/* Video Play Indicator */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></div>
                    <span className="text-[6px] text-white/60 uppercase tracking-wider">Now Playing</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Gold Divider at bottom - Enhanced */}
        <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${colors.gold}, ${colors.goldLight}, ${colors.gold}, transparent)` }}></div>
      </div>

      {/* ====== MAIN CONTENT ====== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Page Title - Simplified */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-2 rounded-full border border-gold/20 bg-white/80 backdrop-blur-sm shadow-sm">
            <Sparkles size={11} className="text-gold" />
            <span className="text-[8px] uppercase tracking-[0.3em] text-gold font-bold">Explore Our Collection</span>
          </div>
          <div className="gold-divider w-16 mx-auto"></div>
          <p className="mt-2 text-[9px] text-charcoal/50 font-light max-w-md mx-auto">
            Handcrafted with passion, each creation tells a story of luxury and taste
          </p>
        </div>

      {/* Filter and Search Bar - Enhanced with glass morphism */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gold/10 shadow-xl">
          
          {/* Category Filter Pills - With gold accent for active */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all duration-300 ${
                  category === cat
                    ? 'text-white shadow-lg shadow-gold/20'
                    : 'bg-cream text-mocha hover:bg-gold/5'
                }`}
                style={{
                  backgroundColor: category === cat ? colors.gold : 'transparent',
                  border: category === cat ? 'none' : `1px solid ${colors.gold}20`
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input - With gold focus ring */}
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80 flex-shrink-0">
            <input
              type="text"
              placeholder="Search decadent cakes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-gold/20 bg-cream/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all text-xs text-mocha placeholder-charcoal/40"
            />
            <button type="submit" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold/60 hover:text-gold transition-colors">
              <Search size={14} />
            </button>
          </form>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin"></div>
          </div>
        ) : cakes.length === 0 ? (
          <div className="text-center py-24 bg-white/50 rounded-2xl border-2 border-dashed border-gold/20">
            <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-4">
              <Search size={24} className="text-gold" />
            </div>
            <p className="text-charcoal/60 font-light mb-4 text-sm">No cakes match your criteria at this moment.</p>
            <button
              onClick={() => { setCategory('All'); setSearch(''); }}
              className="px-6 py-2.5 text-white text-[10px] uppercase tracking-wider font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: colors.gold }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* Results counter - New addition */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colors.gold }}></div>
                <span className="text-xs text-charcoal/50">
                  <span className="font-bold" style={{ color: colors.gold }}>{cakes.length}</span> 
                  {' '}artisan creations
                </span>
              </div>
              <div className="flex items-center gap-1 text-[9px] text-charcoal/30 uppercase tracking-wider">
                <Award size={12} />
                <span>Premium Quality</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {cakes.map((cake) => (
                <div key={cake.id} className="group luxury-card overflow-hidden bg-white flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                  {/* Product Image Panel */}
                  <div className="relative h-72 bg-cream-dark overflow-hidden flex items-center justify-center border-b border-gold/10">
                    <img
                      src={cake.imageUrl ? `http://localhost:5165${cake.imageUrl}` : getCakeFallbackImage(cake.name)}
                      alt={cake.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getCakeFallbackImage(cake.name);
                      }}
                    />
                    
                    {/* Premium Badge - New addition */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-[8px] uppercase tracking-wider font-bold shadow-lg border border-gold/20" style={{ color: colors.goldDark }}>
                        <Star size={10} className="inline mr-1" />
                        Premium
                      </span>
                    </div>

                    {/* Price Badge - Enhanced */}
                    

                    {/* Quick Add Button - New addition (hover effect) */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <button
                        onClick={() => addToCart(cake, 1)}
                        className="w-full px-6 py-3 bg-white/95 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-lg"
                        style={{ color: colors.mocha }}
                      >
                        <ShoppingCart size={14} className="inline mr-2" />
                        Quick Add
                      </button>
                    </div>
                  </div>

                  {/* Card Info Details - Enhanced */}
                  <div className="p-6 text-left flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] uppercase font-bold tracking-widest" style={{ color: colors.goldDark }}>
                          {cake.category}
                        </span>
                        <button className="text-charcoal/20 hover:text-rose transition-colors">
                          <Heart size={12} />
                        </button>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-mocha mt-1 mb-2">{cake.name}</h3>
                      <p className="text-xs font-light text-charcoal/70 mb-6 leading-relaxed line-clamp-3">{cake.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                      <span className="text-sm font-bold" style={{ color: colors.goldDark }}>
                        Rs. {cake.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <button
                        onClick={() => addToCart(cake, 1)}
                        className="px-4 py-2 rounded-full text-xs uppercase font-bold text-white transition hover:opacity-90 hover:scale-105"
                        style={{ backgroundColor: '#8b654b' }} >
                        <ShoppingCart size={14} className="inline mr-1" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

{/* ====== FEATURES SECTION ====== */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 py-6 px-4 bg-white rounded-2xl border border-gold/10 shadow-lg">
          <div className="text-center group transition-all duration-300 hover:-translate-y-1">
            <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-1.5 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: `${colors.gold}15` }}>
              <Coffee size={14} style={{ color: colors.gold }} />
            </div>
            <h4 className="text-[9px] font-bold uppercase tracking-wider" style={{ color: colors.mocha }}>Premium Ingredients</h4>
            <p className="text-[7px] text-charcoal/40 mt-0.5">Finest quality sourced</p>
          </div>
          
          <div className="text-center group transition-all duration-300 hover:-translate-y-1">
            <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-1.5 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: `${colors.gold}15` }}>
              <Sparkles size={14} style={{ color: colors.gold }} />
            </div>
            <h4 className="text-[9px] font-bold uppercase tracking-wider" style={{ color: colors.mocha }}>Artisan Crafted</h4>
            <p className="text-[7px] text-charcoal/40 mt-0.5">Master pastry chefs</p>
          </div>
          
          <div className="text-center group transition-all duration-300 hover:-translate-y-1">
            <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-1.5 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: `${colors.gold}15` }}>
              <Star size={14} style={{ color: colors.gold }} />
            </div>
            <h4 className="text-[9px] font-bold uppercase tracking-wider" style={{ color: colors.mocha }}>Award Winning</h4>
            <p className="text-[7px] text-charcoal/40 mt-0.5">Recognized excellence</p>
          </div>
          
          <div className="text-center group transition-all duration-300 hover:-translate-y-1">
            <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-1.5 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: `${colors.gold}15` }}>
              <Crown size={14} style={{ color: colors.gold }} />
            </div>
            <h4 className="text-[9px] font-bold uppercase tracking-wider" style={{ color: colors.mocha }}>Bespoke Service</h4>
            <p className="text-[7px] text-charcoal/40 mt-0.5">Custom cakes</p>
          </div>
        </div>

        {/* ====== CTA BANNER ====== */}
        <div className="mt-10 relative overflow-hidden rounded-2xl">
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
          
          <div className="relative z-10 p-6 sm:p-8 text-center text-white">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-2 border border-gold/30 rounded-full backdrop-blur-sm bg-white/5">
              <Crown size={10} style={{ color: colors.gold }} />
              <span className="text-[6px] uppercase tracking-[0.3em] font-light" style={{ color: colors.goldLight }}>Bespoke Service</span>
            </div>
            
            <h2 className="font-serif text-lg sm:text-xl font-bold mb-2">
              Custom <span style={{ color: colors.gold }}>Creation</span> Available
            </h2>
            
            <p className="text-white/60 text-[10px] max-w-xl mx-auto mb-4 leading-relaxed">
              Can't find what you're looking for? Our master pastry chefs can create 
              a bespoke cake tailored to your vision.
            </p>
            
            <button className="px-6 py-2.5 rounded-full text-white text-[9px] uppercase tracking-widest font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-2 mx-auto"
              style={{ backgroundColor: colors.gold }}
            >
              Request a Custom Cake
              <ArrowRight size={11} />
            </button>
          </div>
        </div>









      </div>
    </div>
  );
};

export default Menu;