import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { ShoppingCart, ArrowRight, Award, Coffee, Clock, Star, ChevronRight, Heart, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import homeVideo1 from '../assets/videos/home1.mp4';
import homeVideo2 from "../assets/videos/home2.mp4";

// Helper to map cake names to beautiful Unsplash fallbacks
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

export const Home = () => {
  const [featuredCakes, setFeaturedCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const data = await api.cakes.getAll();
        setFeaturedCakes(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to load featured cakes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCakes();
  }, []);

  // Luxury Color Palette
  const colors = {
    gold: '#C9A96E',
    goldLight: '#E8D5A3',
    goldDark: '#A8894A',
    champagne: '#F7F0E8',
    cream: '#FAF6F0',
    mocha: '#4A3728',
    mochaLight: '#7A5C44',
    charcoal: '#2C2420',
    white: '#FFFFFF',
    roseGold: '#E8C4B8',
    sage: '#D4D0C8',
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.cream }}>

      {/* ====== 1. LUXURY HERO SECTION ====== */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={homeVideo2} type="video/mp4" />
        </video>

        {/* Elegant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>

        {/* Decorative Gold Dust Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gold/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          {/* Gold Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2 mb-8 border border-gold/30 rounded-full backdrop-blur-sm bg-white/5">
            <Sparkles size={14} className="text-gold" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-light">Artisan Pâtisserie</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="text-white">Exquisite</span>
            <br />
            <span className="text-white bg-clip-text bg-gradient-to-r from-gold via-goldLight to-gold">
              Creations
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
            Handcrafted with French butter, Madagascar vanilla, and premium chocolate.
            Each cake is a masterpiece of taste and design.
          </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

      <Link
        to="/menu"
        className="px-10 py-4 rounded-full text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-lg hover:scale-105"
        style={{ backgroundColor: '#C9A96E' }}
      >
        Order Now
      </Link>

      <Link
        to="/about"
        className="px-10 py-4 rounded-full border border-white/30 text-white text-xs uppercase tracking-widest font-bold hover:bg-white/10 transition"
      >
        Our Story
      </Link>

    </div>
  </div>

  {/* 🔻 SCROLL INDICATOR */}
  <div className="absolute bottom-6 text-white/50 text-xs tracking-widest animate-bounce">
    SCROLL DOWN
  </div>
      </section>

      {/* ====== 2. FEATURED SECTION ====== */}
      <section className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">Signature Collection</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mt-3" style={{ color: colors.mocha }}>
            Featured Delicacies
          </h2>
          <div className="w-20 h-0.5 mx-auto mt-6" style={{ background: `linear-gradient(90deg, transparent, ${colors.gold}, transparent)` }}></div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-2 border-gold/20 border-t-gold rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCakes.map((cake) => (
              <div 
                key={cake.id} 
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden bg-cream">
                  <img
                    src={cake.imageUrl ? `http://localhost:5165${cake.imageUrl}` : getCakeFallbackImage(cake.name)}
                    alt={cake.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = getCakeFallbackImage(cake.name);
                    }}
                  />
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gold/20">
                    <span className="text-xs font-bold" style={{ color: colors.goldDark }}>
                      Rs. {cake.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Quick Add Button (Visible on Hover) */}
                  <button
                    onClick={() => addToCart(cake, 1)}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 w-11/12 px-6 py-3 bg-white/95 backdrop-blur-sm rounded-full text-xs uppercase font-bold transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-105 shadow-lg"
                    style={{ color: colors.mocha }}
                  >
                    <ShoppingCart size={14} className="inline mr-2" />
                    Add to Cart
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-[8px] uppercase tracking-[0.2em] font-bold" style={{ color: colors.goldDark }}>
                    {cake.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold mt-1" style={{ color: colors.mocha }}>
                    {cake.name}
                  </h3>
                  <p className="text-xs text-charcoal/60 mt-2 line-clamp-2 leading-relaxed">
                    {cake.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Link */}
        <div className="text-center mt-16">
          <Link
            to="/menu"
            className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-all duration-300"
            style={{ color: colors.goldDark }}
          >
            <span>View All Creations</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ====== 3. ABOUT PREVIEW SECTION ====== */}
      <section className="py-28 bg-white border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left: Video/Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <video
                  className="w-full aspect-[4/3] object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={homeVideo1} type="video/mp4" />
                </video>
                
                {/* Gold Accent Frame */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-gold/30 rounded-full"></div>
                <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-gold/20 rounded-full"></div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white shadow-xl rounded-2xl px-6 py-4 border border-gold/20">
                <div className="flex items-center gap-3">
                  <Award size={20} className="text-gold" />
                  <div>
                    <p className="text-xs font-bold" style={{ color: colors.mocha }}>Award Winning</p>
                    <p className="text-[8px] uppercase tracking-wider text-charcoal/50">Pâtisserie 2025</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="flex flex-col space-y-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold">The Philosophy</span>
                <h2 className="font-serif text-4xl sm:text-5xl font-bold mt-3 leading-tight" style={{ color: colors.mocha }}>
                  Artisanal Craftsmanship
                  <br />
                  <span className="text-gold">Perfected</span>
                </h2>
              </div>

              <div className="space-y-4 text-sm leading-relaxed" style={{ color: colors.mochaLight }}>
                <p>
                  Founded with a vision to redefine dessert culture, Hazel creates culinary art. 
                  Our boutique bakery focuses on low-sugar, high-flavor sponge structures matched 
                  with creamy Italian buttercreams and Parisian ganaches.
                </p>
                <p>
                  We believe that desserts should not only taste heavenly but look like fine 
                  sculptures. Every cake is individually tailored and curated by our master pastry chefs.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gold/10">
                <div>
                  <p className="text-2xl font-serif font-bold text-gold">12+</p>
                  <p className="text-[10px] uppercase tracking-wider text-charcoal/50">Years Experience</p>
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-gold">150+</p>
                  <p className="text-[10px] uppercase tracking-wider text-charcoal/50">Cake Varieties</p>
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-gold">5K+</p>
                  <p className="text-[10px] uppercase tracking-wider text-charcoal/50">Happy Customers</p>
                </div>
              </div>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl w-fit"
                style={{ backgroundColor: colors.gold }}
              >
                Discover Our Story
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== 4. WHY CHOOSE US ====== */}
      <section className="py-28" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold">Why Choose Us</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold mt-3" style={{ color: colors.mocha }}>
              The Hazel Difference
            </h2>
            <div className="w-20 h-0.5 mx-auto mt-6" style={{ background: `linear-gradient(90deg, transparent, ${colors.gold}, transparent)` }}></div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Coffee size={28} />,
                title: "Premium Ingredients",
                desc: "French butter, Madagascar vanilla, and single-origin chocolate in every creation."
              },
              {
                icon: <Clock size={28} />,
                title: "Made Fresh Daily",
                desc: "Every cake is baked fresh each morning with meticulous attention to detail."
              },
              {
                icon: <Star size={28} />,
                title: "Artisan Craftsmanship",
                desc: "Master pastry chefs with decades of experience in luxury patisserie."
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${colors.gold}15`, color: colors.gold }}
                >
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl font-bold mt-4" style={{ color: colors.mocha }}>
                  {item.title}
                </h3>
                <p className="text-xs text-charcoal/60 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== 5. CTA BANNER ====== */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.mocha}, ${colors.mochaLight})` }}></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full" 
              style={{ 
                backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(201,169,110,0.3) 0%, transparent 70%)' 
              }}
            ></div>
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-6">
            Ready to Indulge?
          </h2>
          <p className="text-white/70 text-sm mb-10 max-w-xl mx-auto leading-relaxed">
            Experience the finest handcrafted cakes. Order now for same-day delivery 
            or visit our boutique.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/menu"
              className="px-10 py-4 rounded-full bg-gold text-white text-xs uppercase tracking-widest font-bold hover:bg-goldDark transition-all duration-300 hover:scale-105 shadow-xl"
            >
              Order Now
            </Link>
            <Link
              to="/contact"
              className="px-10 py-4 rounded-full border border-white/30 text-white text-xs uppercase tracking-widest font-bold hover:bg-white/10 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;