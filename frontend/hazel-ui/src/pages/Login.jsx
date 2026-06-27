import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Crown, Sparkles, Mail, Lock, ArrowRight, Shield, Eye, EyeOff, CheckCircle } from 'lucide-react';
import logVideo from '../assets/videos/log1.mp4';

export const Login = () => {
  const { login, register, forgotPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const from = location.state?.from?.pathname || '/';

  const resetMessages = () => {
    setError('');
    setSuccess('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    resetMessages();
    setLoading(true);
    
    const result = await login(email, password);
    setLoading(false);
    
    if (result.success) {
      const token = localStorage.getItem('hazel_token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
          if (role === 'Admin') {
            navigate('/admin');
          } else {
            navigate(from, { replace: true });
          }
        } catch {
          navigate('/');
        }
      } else {
        navigate('/');
      }
    } else {
      setError(result.error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    resetMessages();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    setLoading(true);
    const result = await register(email, password);
    setLoading(false);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    resetMessages();
    setLoading(true);
    
    try {
      const data = await api.auth.forgotPassword(email);
      setSuccess(data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-16 px-4 relative overflow-hidden" style={{ backgroundColor: colors.cream }}>
     {/* ===== VIDEO BACKGROUND */}
<div className="absolute inset-0 overflow-hidden">

  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src={logVideo} type="video/mp4" />
  </video>

  {/* Pastel overlay */}
  <div
    className="absolute inset-0"
    style={{
      background: `
        linear-gradient(
          135deg,
          rgba(250,246,240,0.75),
          rgba(247,240,232,0.65),
          rgba(232,196,184,0.45)
        )

        
      `,
      backdropFilter: "blur(3px)"

      
    }}
  ></div>

</div>
      
      {/* ====== MAIN CARD ====== */}
      <div
  className="max-w-md w-full rounded-3xl overflow-hidden relative z-10 border"
  style={{
    background: "rgba(255,255,255,0.78)",
    backdropFilter: "blur(25px)",
    WebkitBackdropFilter: "blur(25px)",
    borderColor: "rgba(255,255,255,0.3)",
    boxShadow:
      "0 20px 60px rgba(0,0,0,0.12)"
  }}
>
        
        {/* ====== BRAND HEADER ====== */}
        <div className="relative py-8 px-6 text-center" style={{ 
          background: `linear-gradient(135deg, ${colors.mocha}, ${colors.mochaLight})` 
        }}>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full" 
              style={{ 
                background: `radial-gradient(circle, ${colors.gold}40, transparent 70%)`,
              }}
            ></div>
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 border border-gold/30 rounded-full backdrop-blur-sm bg-white/5">
              <Crown size={12} style={{ color: colors.gold }} />
              <span className="text-[8px] uppercase tracking-[0.3em] font-light" style={{ color: colors.goldLight }}>
                Hazel Luxury Desserts
              </span>
            </div>
            
            <h2 className="font-serif text-2xl font-bold text-white">
              {isForgot ? 'Reset Password' : isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            
            <p className="text-white/60 text-xs mt-1 font-light">
              {isForgot 
                ? 'Enter your email to reset your password' 
                : isSignUp 
                  ? 'Join our luxury dessert community' 
                  : 'Sign in to your account'}
            </p>
          </div>
        </div>

        {/* ====== TABS ====== */}
        {!isForgot && (
          <div className="flex border-b border-gold/10 bg-cream/30">
            <button
              onClick={() => { setIsSignUp(false); resetMessages(); }}
              className={`w-1/2 py-4 text-center font-serif text-sm font-medium transition-all duration-300 relative ${
                !isSignUp 
                  ? 'text-gold-dark' 
                  : 'text-charcoal/40 hover:text-gold'
              }`}
            >
              <span className="relative z-10">Sign In</span>
              {!isSignUp && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: colors.gold }}></div>
              )}
            </button>
            <button
              onClick={() => { setIsSignUp(true); resetMessages(); }}
              className={`w-1/2 py-4 text-center font-serif text-sm font-medium transition-all duration-300 relative ${
                isSignUp 
                  ? 'text-gold-dark' 
                  : 'text-charcoal/40 hover:text-gold'
              }`}
            >
              <span className="relative z-10">Sign Up</span>
              {isSignUp && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: colors.gold }}></div>
              )}
            </button>
          </div>
        )}

        {/* ====== FORM CONTENT ====== */}
        <div className="p-6 sm:p-8">
          
          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-3 rounded-xl border flex items-start gap-2" style={{ 
              backgroundColor: '#fef2f2',
              borderColor: '#fecaca'
            }}>
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#ef4444' }}></div>
              <p className="text-[11px] text-red-600 leading-relaxed">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 rounded-xl border flex items-start gap-2" style={{ 
              backgroundColor: '#f0fdf4',
              borderColor: '#bbf7d0'
            }}>
              <CheckCircle size={14} style={{ color: '#22c55e' }} className="mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-green-600 leading-relaxed">{success}</p>
            </div>
          )}

          {/* ====== LOGIN FORM ====== */}
          {!isSignUp && !isForgot && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: colors.charcoal + '60' }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: colors.gold + '50' }} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 text-sm"
                    style={{ 
                      borderColor: `${colors.gold}20`,
                      backgroundColor: colors.cream,
                      color: colors.mocha
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.gold;
                      e.target.style.boxShadow = `0 0 0 4px ${colors.gold}20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = `${colors.gold}20`;
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider" style={{ color: colors.charcoal + '60' }}>
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => { setIsForgot(true); resetMessages(); }}
                    className="text-[9px] font-medium transition-colors hover:underline focus:outline-none"
                    style={{ color: colors.gold }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: colors.gold + '50' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 text-sm"
                    style={{ 
                      borderColor: `${colors.gold}20`,
                      backgroundColor: colors.cream,
                      color: colors.mocha
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.gold;
                      e.target.style.boxShadow = `0 0 0 4px ${colors.gold}20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = `${colors.gold}20`;
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: colors.gold + '50' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2"
                style={{ backgroundColor: colors.gold }}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={14} />
                  </>
                )}
              </button>

              <p className="text-[9px] text-center text-charcoal/30 mt-2">
                By signing in, you agree to our Terms & Conditions
              </p>
            </form>
          )}

          {/* ====== REGISTRATION FORM ====== */}
          {isSignUp && !isForgot && (
            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: colors.charcoal + '60' }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: colors.gold + '50' }} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 text-sm"
                    style={{ 
                      borderColor: `${colors.gold}20`,
                      backgroundColor: colors.cream,
                      color: colors.mocha
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.gold;
                      e.target.style.boxShadow = `0 0 0 4px ${colors.gold}20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = `${colors.gold}20`;
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: colors.charcoal + '60' }}>
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: colors.gold + '50' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full pl-10 pr-12 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 text-sm"
                    style={{ 
                      borderColor: `${colors.gold}20`,
                      backgroundColor: colors.cream,
                      color: colors.mocha
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.gold;
                      e.target.style.boxShadow = `0 0 0 4px ${colors.gold}20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = `${colors.gold}20`;
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: colors.gold + '50' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: colors.charcoal + '60' }}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: colors.gold + '50' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 text-sm"
                    style={{ 
                      borderColor: `${colors.gold}20`,
                      backgroundColor: colors.cream,
                      color: colors.mocha
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.gold;
                      e.target.style.boxShadow = `0 0 0 4px ${colors.gold}20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = `${colors.gold}20`;
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2"
                style={{ backgroundColor: colors.gold }}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={14} />
                  </>
                )}
              </button>

              <p className="text-[9px] text-center text-charcoal/30 mt-2">
                By creating an account, you agree to our Terms & Conditions
              </p>
            </form>
          )}

          {/* ====== FORGOT PASSWORD FORM ====== */}
          {isForgot && (
            <form onSubmit={handleForgot} className="space-y-5">
              <p className="text-xs text-charcoal/50 leading-relaxed font-light">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: colors.charcoal + '60' }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: colors.gold + '50' }} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 text-sm"
                    style={{ 
                      borderColor: `${colors.gold}20`,
                      backgroundColor: colors.cream,
                      color: colors.mocha
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.gold;
                      e.target.style.boxShadow = `0 0 0 4px ${colors.gold}20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = `${colors.gold}20`;
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2"
                  style={{ backgroundColor: colors.gold }}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => { setIsForgot(false); resetMessages(); }}
                  className="w-full py-2.5 text-xs font-medium transition-colors rounded-full hover:bg-gold/5"
                  style={{ color: colors.goldDark }}
                >
                  ← Back to Sign In
                </button>
              </div>
            </form>
          )}

          {/* ====== DIVIDER WITH SPARKLES ====== */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: `${colors.gold}10` }}></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 text-[8px] uppercase tracking-widest" style={{ 
                backgroundColor: colors.white,
                color: colors.charcoal + '30'
              }}>
                <Sparkles size={10} className="inline mr-1" style={{ color: colors.gold }} />
                Secure & Private
                <Sparkles size={10} className="inline ml-1" style={{ color: colors.gold }} />
              </span>
            </div>
          </div>

          {/* ====== SECURITY BADGES ====== */}
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-1.5">
              <Shield size={12} style={{ color: colors.gold }} />
              <span className="text-[7px] uppercase tracking-wider text-charcoal/30">SSL Secure</span>
            </div>
            <div className="w-px h-4" style={{ backgroundColor: `${colors.gold}20` }}></div>
            <div className="flex items-center gap-1.5">
              <Lock size={12} style={{ color: colors.gold }} />
              <span className="text-[7px] uppercase tracking-wider text-charcoal/30">Encrypted</span>
            </div>
            <div className="w-px h-4" style={{ backgroundColor: `${colors.gold}20` }}></div>
            <div className="flex items-center gap-1.5">
              <CheckCircle size={12} style={{ color: colors.gold }} />
              <span className="text-[7px] uppercase tracking-wider text-charcoal/30">Verified</span>
            </div>
          </div>
        </div>
      </div>

  
    </div>
  );
};

export default Login;