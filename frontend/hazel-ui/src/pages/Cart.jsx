import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight, Crown, Sparkles, Award, Shield, Gift, CreditCard, Truck, Clock } from 'lucide-react';
import heroVideo1 from '../assets/videos/hero1.mp4';

export const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [checkingOut, setCheckingOut] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }

    setCheckingOut(true);
    setError('');

    const orderItemsPayload = cartItems.map(item => ({
      cakeId: item.cake.id,
      quantity: item.quantity
    }));

    try {
      await api.orders.create(orderItemsPayload);
      clearCart();
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to process checkout. Try again.');
    } finally {
      setCheckingOut(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-16 px-4 relative overflow-hidden" style={{ backgroundColor: colors.cream }}>
        
        {/* ====== BACKGROUND VIDEO - SHIFTED UP TO SHOW CAKES ====== */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
            style={{ 
              objectPosition: '50% 20%', /* Shift video up to show cakes */
            }}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={heroVideo1} type="video/mp4" />
          </video>
        </div>

          {/* Light Overlay for Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/95"></div>
       
        

        {/* Subtle Gold Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.05),transparent_60%)]"></div>

       
        {/* Success Card */}
        <div className="max-w-md w-full bg-white/95 backdrop-blur-sm p-10 rounded-3xl border border-gold/10 shadow-2xl text-center relative z-10">
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 border-2" 
            style={{ 
              backgroundColor: `${colors.gold}15`,
              borderColor: colors.gold
            }}>
            <ShoppingBag size={32} style={{ color: colors.gold }} />
          </div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-gold/20" style={{ backgroundColor: `${colors.gold}10` }}>
            <Sparkles size={12} style={{ color: colors.gold }} />
            <span className="text-[8px] uppercase tracking-[0.3em] font-bold" style={{ color: colors.goldDark }}>Order Confirmed</span>
          </div>
          
          <h2 className="font-serif text-3xl font-bold" style={{ color: colors.mocha }}>Thank You!</h2>
          
          <p className="text-xs text-charcoal/60 mt-3 leading-relaxed">
            Your purchase request was successfully registered! Our pastry chefs are preparing 
            your fresh delicacies.
          </p>
          
          <div className="gold-divider w-16 mx-auto my-6"></div>
          
          <div className="flex flex-col space-y-3">
            <Link
              to="/dashboard"
              className="w-full py-3.5 rounded-full text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: colors.gold }}
            >
              Go to Dashboard
            </Link>
            <Link
              to="/menu"
              className="w-full py-3.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300 border hover:bg-gold/5"
              style={{ 
                borderColor: `${colors.gold}30`,
                color: colors.mocha 
              }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.cream }}>
      
      {/* ====== HERO BANNER ====== */}
      <div className="relative py-16 overflow-hidden">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 border border-gold/30 rounded-full backdrop-blur-sm bg-white/5">
            <Crown size={14} style={{ color: colors.gold }} />
            <span className="text-[10px] uppercase tracking-[0.3em] font-light" style={{ color: colors.goldLight }}>
              Your Selection
            </span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl font-bold">
            Shopping <span style={{ color: colors.gold }}>Cart</span>
          </h1>
          
          <p className="mt-3 text-white/60 text-sm max-w-2xl mx-auto leading-relaxed font-light">
            Review your luxury selections before placing your order
          </p>

          {/* Cart Stats */}
          <div className="flex justify-center gap-8 mt-6">
            <div className="flex items-center gap-2">
              <ShoppingBag size={16} style={{ color: colors.gold }} />
              <span className="text-sm font-light text-white/70">
                {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
              </span>
            </div>
            <div className="w-px h-6 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <Sparkles size={16} style={{ color: colors.gold }} />
              <span className="text-sm font-light text-white/70">
                Rs. {cartTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ====== MAIN CONTENT - LARGER GAP ====== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-20">
        
        {cartItems.length === 0 ? (
          <div className="max-w-md mx-auto text-center p-12 bg-white rounded-3xl border border-gold/10 shadow-xl mt-8">
            <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${colors.gold}10` }}>
              <ShoppingBag size={32} style={{ color: colors.gold }} />
            </div>
            <h3 className="font-serif text-2xl font-bold" style={{ color: colors.mocha }}>Cart is Empty</h3>
            <p className="text-xs text-charcoal/50 mt-2 leading-relaxed">
              You haven't added any luxury treats to your cart yet.
            </p>
            <div className="gold-divider w-16 mx-auto my-6"></div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: colors.gold }}
            >
              Explore Menu
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
            
            {/* ====== LEFT SIDE - Cart Items ====== */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.cake.id}
                  className="group bg-white rounded-2xl border border-gold/10 shadow-lg p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-gold/10" style={{ backgroundColor: colors.champagne }}>
                      {item.cake.imageUrl && item.cake.imageUrl.startsWith('/uploads/') ? (
                        <img
                          src={`http://localhost:5165${item.cake.imageUrl}`}
                          alt={item.cake.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-serif text-2xl font-bold" style={{ color: colors.gold }}>
                          {item.cake.name[0]}
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 text-left w-full">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-serif text-lg font-bold" style={{ color: colors.mocha }}>
                            {item.cake.name}
                          </h3>
                          <span className="inline-block text-[8px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full mt-1" 
                            style={{ 
                              backgroundColor: `${colors.gold}10`,
                              color: colors.goldDark 
                            }}>
                            {item.cake.category}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.cake.id)}
                          className="p-2 rounded-full transition-all duration-300 hover:scale-110 opacity-60 hover:opacity-100"
                          style={{ color: colors.charcoal }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center gap-4">
                      {/* Quantity Selector */}
                      <div className="flex items-center border rounded-full overflow-hidden" style={{ borderColor: `${colors.gold}20` }}>
                        <button
                          onClick={() => updateQuantity(item.cake.id, item.quantity - 1)}
                          className="p-2 transition-all duration-300 hover:bg-gold/10"
                          style={{ color: colors.gold }}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center text-sm font-bold" style={{ color: colors.mocha }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cake.id, item.quantity + 1)}
                          className="p-2 transition-all duration-300 hover:bg-gold/10"
                          style={{ color: colors.gold }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Price - Sri Lankan Rupees */}
                      <div className="text-right">
                        <span className="text-sm font-bold" style={{ color: colors.goldDark }}>
                          Rs. {(item.cake.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <p className="text-[8px] text-charcoal/30">Rs. {item.cake.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} each</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              <button
                onClick={clearCart}
                className="text-xs font-light transition-colors hover:text-red-500"
                style={{ color: colors.charcoal + '60' }}
              >
                Clear All Items
              </button>
            </div>

            {/* ====== RIGHT SIDE - Order Summary ====== */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl border border-gold/10 shadow-xl p-6 sticky top-24">
                
                {/* Summary Header */}
                <div className="flex items-center gap-2 pb-4 border-b" style={{ borderColor: `${colors.gold}10` }}>
                  <Crown size={18} style={{ color: colors.gold }} />
                  <h3 className="font-serif text-xl font-bold" style={{ color: colors.mocha }}>
                    Order Summary
                  </h3>
                </div>

                {error && (
                  <div className="mt-4 p-3 rounded-xl border" style={{ 
                    backgroundColor: '#fee2e2',
                    borderColor: '#fecaca'
                  }}>
                    <p className="text-[10px] text-red-600">{error}</p>
                  </div>
                )}

                {/* Items Count */}
                <div className="mt-4 flex justify-between text-sm">
                  <span className="text-charcoal/50">Items</span>
                  <span className="font-medium" style={{ color: colors.mocha }}>
                    {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                  </span>
                </div>

                {/* Price Breakdown - Sri Lankan Rupees */}
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-charcoal/50">Subtotal</span>
                    <span className="font-medium" style={{ color: colors.mocha }}>
                      Rs. {cartTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/50">Delivery</span>
                    <span className="font-medium" style={{ color: colors.gold }}>
                      <Truck size={12} className="inline mr-1" />
                      Free
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/50">Tax</span>
                    <span className="font-medium text-charcoal/40">Included</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="gold-divider my-4"></div>

                {/* Total - Sri Lankan Rupees */}
                <div className="flex justify-between items-center">
                  <span className="font-serif text-lg font-bold" style={{ color: colors.mocha }}>
                    Total
                  </span>
                  <span className="text-2xl font-serif font-bold" style={{ color: colors.gold }}>
                    Rs. {cartTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Premium Badges */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[7px] uppercase tracking-wider font-bold" 
                    style={{ 
                      backgroundColor: `${colors.gold}10`,
                      color: colors.goldDark 
                    }}>
                    <Shield size={10} />
                    Premium Quality
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[7px] uppercase tracking-wider font-bold" 
                    style={{ 
                      backgroundColor: `${colors.gold}10`,
                      color: colors.goldDark 
                    }}>
                    <Gift size={10} />
                    Free Delivery
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={checkingOut}
                  className="w-full mt-6 py-4 rounded-full text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2"
                  style={{ backgroundColor: colors.gold }}
                >
                  {checkingOut ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard size={16} />
                      {user ? 'Place Order' : 'Sign In to Order'}
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>

                {!user && (
                  <p className="text-[9px] text-center text-charcoal/40 mt-3 leading-relaxed">
                    Sign in to place your order and track delivery
                  </p>
                )}

                {/* Delivery Info */}
                <div className="mt-4 p-3 rounded-xl" style={{ backgroundColor: `${colors.gold}5` }}>
                  <div className="flex items-center gap-2 text-[9px]" style={{ color: colors.charcoal + '70' }}>
                    <Clock size={12} style={{ color: colors.gold }} />
                    <span>Estimated delivery: 2-3 business days</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;