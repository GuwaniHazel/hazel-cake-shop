import React from 'react';
import { Crown, Sparkles, Award, Coffee, Heart, Star, Shield, Gift, ArrowRight, ChevronRight, Clock, Users, Gem, Leaf } from 'lucide-react';
import bakeryVideo from "../assets/videos/bakery.mp4";
import bakeryVideo1 from "../assets/videos/bakery1.mp4";

export const About = () => {
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
      
      {/* ====== HERO BANNER ====== */}
      <div className="relative py-24 overflow-hidden">
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
              Our Story
            </span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold">
            The Legend of <span style={{ color: colors.gold }}>Hazel</span>
          </h1>
          
          <p className="mt-4 text-white/70 text-sm max-w-2xl mx-auto leading-relaxed font-light">
            Born from a passion for timeless pastry arts, Hazel is a haven of luxury dessert crafts. 
            We marry classic French patisserie principles with modern flavor dynamics.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-10 mt-8">
            <div className="text-center">
              <p className="text-2xl font-serif font-bold" style={{ color: colors.gold }}>12+</p>
              <p className="text-[8px] uppercase tracking-wider text-white/40">Years Excellence</p>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
            <div className="text-center">
              <p className="text-2xl font-serif font-bold" style={{ color: colors.gold }}>150+</p>
              <p className="text-[8px] uppercase tracking-wider text-white/40">Cake Varieties</p>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
            <div className="text-center">
              <p className="text-2xl font-serif font-bold" style={{ color: colors.gold }}>5K+</p>
              <p className="text-[8px] uppercase tracking-wider text-white/40">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* ====== INTRODUCTION CARD ====== */}
        <div className="bg-white rounded-3xl shadow-xl border border-gold/10 p-8 sm:p-12 text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border border-gold/20 bg-cream/50">
            <Sparkles size={14} style={{ color: colors.gold }} />
            <span className="text-[8px] uppercase tracking-[0.3em] font-bold" style={{ color: colors.goldDark }}>
              Welcome to Hazel
            </span>
          </div>
          <p className="text-sm sm:text-base text-charcoal/70 font-light leading-relaxed italic">
            "Sweet moments deserve sweet art."
          </p>
          <div className="gold-divider w-20 mx-auto mt-4"></div>
          <p className="text-xs sm:text-sm text-charcoal/60 font-light max-w-xl mx-auto mt-4 leading-relaxed">
            We pledge to never use hydrogenated oils, artificial colorants, or bulk pre-mixes. 
            At Hazel, luxury is found in the purity of the taste.
          </p>
        </div>

        {/* ====== STORY SECTIONS ====== */}
        <div className="space-y-24">
          
          {/* Split 1 - The Beginning */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div className="flex flex-col space-y-5 text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: colors.gold }}></div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold" style={{ color: colors.goldDark }}>
                  The Beginning
                </span>
              </div>
              
              <h2 className="font-serif text-3xl sm:text-4xl font-bold" style={{ color: colors.mocha }}>
                Forged In <span style={{ color: colors.gold }}>Sweet</span> Dreams
              </h2>
              
              <p className="text-xs sm:text-sm text-charcoal/70 font-light leading-relaxed">
                Hazel began as a boutique private kitchen in Colombo, crafting handcrafted pastries 
                for a handful of discerning dessert lovers. Our founder, a master chocolatier, set 
                out to create products that were less sugary and more sophisticated.
              </p>
              
              <p className="text-xs sm:text-sm text-charcoal/70 font-light leading-relaxed">
                By focusing on pure, high-end ingredients—like Normandy butter, organic Madagascar 
                vanilla pods, and premium Belgian Callebaut chocolate—we quickly earned a reputation 
                for unmatched quality.
              </p>

              {/* Key Points */}
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <Shield size={14} style={{ color: colors.gold }} />
                  <span className="text-[10px] text-charcoal/60 font-light">Premium Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf size={14} style={{ color: colors.gold }} />
                  <span className="text-[10px] text-charcoal/60 font-light">Natural Ingredients</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={14} style={{ color: colors.gold }} />
                  <span className="text-[10px] text-charcoal/60 font-light">Artisan Crafted</span>
                </div>
              </div>
            </div>
            
            {/* Video Frame - Premium */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/20">
                  <video
                    className="w-full aspect-[4/3] object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src={bakeryVideo} type="video/mp4" />
                  </video>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-mocha/60 via-transparent to-transparent flex flex-col justify-end p-6">
                    <span className="text-[8px] uppercase tracking-widest font-bold" style={{ color: colors.goldLight }}>
                      Our Heritage
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white mt-1">Timeless Quality</h4>
                  </div>
                  
                  {/* Gold Corner Accents */}
                  <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-gold/40 rounded-tr-2xl"></div>
                  <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-gold/40 rounded-bl-2xl"></div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -right-4 bg-white shadow-xl rounded-xl px-4 py-3 border border-gold/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colors.gold}15` }}>
                      <Coffee size={18} style={{ color: colors.gold }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: colors.mocha }}>Artisan Craft</p>
                      <p className="text-[7px] text-charcoal/40 uppercase tracking-wider">Since 2013</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Split 2 - Our Philosophy */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Video Frame - Premium */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/20">
                  <video
                    className="w-full aspect-[4/3] object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src={bakeryVideo1} type="video/mp4" />
                  </video>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-mocha/60 via-transparent to-transparent flex flex-col justify-end p-6">
                    <span className="text-[8px] uppercase tracking-widest font-bold" style={{ color: colors.goldLight }}>
                      The Atelier
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white mt-1">Bespoke Aesthetics</h4>
                  </div>
                  
                  {/* Gold Corner Accents */}
                  <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-gold/40 rounded-tr-2xl"></div>
                  <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-gold/40 rounded-bl-2xl"></div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -left-4 bg-white shadow-xl rounded-xl px-4 py-3 border border-gold/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colors.gold}15` }}>
                      <Gem size={18} style={{ color: colors.gold }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: colors.mocha }}>Master Craft</p>
                      <p className="text-[7px] text-charcoal/40 uppercase tracking-wider">Award Winning</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex flex-col space-y-5 text-left">
              <div className="inline-flex items-center gap-2">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: colors.gold }}></div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold" style={{ color: colors.goldDark }}>
                  Our Philosophy
                </span>
              </div>
              
              <h2 className="font-serif text-3xl sm:text-4xl font-bold" style={{ color: colors.mocha }}>
                Baking as a <span style={{ color: colors.gold }}>Fine Art</span>
              </h2>
              
              <p className="text-xs sm:text-sm text-charcoal/70 font-light leading-relaxed">
                We believe that a cake is the centerpiece of life's most beautiful celebrations. 
                Whether it is a wedding, an anniversary, or a simple Sunday family gathering, we 
                craft our cakes to tell a story of celebration.
              </p>
              
              <p className="text-xs sm:text-sm text-charcoal/70 font-light leading-relaxed">
                Each confection is designed visually before baking. We look at textures, color 
                gradients, and floral arrangements, ensuring that the visual impact is just as 
                luxurious as the first bite.
              </p>

              {/* Key Points */}
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <Heart size={14} style={{ color: colors.gold }} />
                  <span className="text-[10px] text-charcoal/60 font-light">Made with Love</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={14} style={{ color: colors.gold }} />
                  <span className="text-[10px] text-charcoal/60 font-light">Award Winning</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift size={14} style={{ color: colors.gold }} />
                  <span className="text-[10px] text-charcoal/60 font-light">Bespoke Service</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ====== VALUES SECTION ====== */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold" style={{ color: colors.goldDark }}>
              Our Values
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2" style={{ color: colors.mocha }}>
              What Makes Us <span style={{ color: colors.gold }}>Different</span>
            </h2>
            <div className="gold-divider w-20 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Crown size={24} />,
                title: "Royal Quality",
                desc: "Premium ingredients sourced from around the world"
              },
              {
                icon: <Clock size={24} />,
                title: "Fresh Daily",
                desc: "Every cake baked fresh each morning"
              },
              {
                icon: <Sparkles size={24} />,
                title: "Artisan Craft",
                desc: "Master pastry chefs with decades of experience"
              },
              {
                icon: <Heart size={24} />,
                title: "Made with Love",
                desc: "Passion and care in every creation"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-gold/10"
              >
                <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110" 
                  style={{ backgroundColor: `${colors.gold}15`, color: colors.gold }}
                >
                  {item.icon}
                </div>
                <h3 className="font-serif text-lg font-bold mt-3" style={{ color: colors.mocha }}>
                  {item.title}
                </h3>
                <p className="text-[10px] text-charcoal/50 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

       
        {/* ====== CTA BANNER ====== */}
        <div className="mt-16 relative overflow-hidden rounded-3xl">
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
              <Crown size={14} style={{ color: colors.gold }} />
              <span className="text-[8px] uppercase tracking-[0.3em] font-light" style={{ color: colors.goldLight }}>Visit Us</span>
            </div>
            
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4">
              Experience <span style={{ color: colors.gold }}>Hazel</span> Today
            </h2>
            
            <p className="text-white/60 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
              Visit our boutique or order online to experience the finest handcrafted 
              cakes and pastries.
            </p>
            
            <button className="px-8 py-3.5 rounded-full text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-2 mx-auto"
              style={{ backgroundColor: colors.gold }}
            >
              Explore Our Menu
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;