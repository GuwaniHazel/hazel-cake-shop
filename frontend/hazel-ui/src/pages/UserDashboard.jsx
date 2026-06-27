import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { User, ShoppingBag, Eye, Settings, Calendar, Crown, Mail, Lock, LogOut, ChevronRight, Award, Clock, Package, Shield } from 'lucide-react';

export const UserDashboard = () => {
  const { user, updateProfile } = useAuth();
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [activeTab, setActiveTab] = useState('orders');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const profileData = await api.auth.getProfile();
        setProfile(profileData);
        setEmail(profileData.email);

        const ordersData = await api.orders.getMy();
        setOrders(ordersData);
      } catch (error) {
        console.error("Failed to load user dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');

    const result = await updateProfile(email, currentPassword, newPassword);
    if (result.success) {
      setProfileSuccess('Profile updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
    } else {
      setProfileError(result.error);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Pending': return { bg: '#fef3c7', text: '#d97706', border: '#fcd34d' };
      case 'Processing': return { bg: '#dbeafe', text: '#2563eb', border: '#93c5fd' };
      case 'Completed': return { bg: '#d1fae5', text: '#059669', border: '#6ee7b7' };
      case 'Cancelled': return { bg: '#fee2e2', text: '#dc2626', border: '#fca5a5' };
      default: return { bg: '#f3f4f6', text: '#6b7280', border: '#d1d5db' };
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock size={12} />;
      case 'Processing': return <Package size={12} />;
      case 'Completed': return <Award size={12} />;
      case 'Cancelled': return <LogOut size={12} />;
      default: return null;
    }
  };

  const getOrderStats = () => {
    const total = orders.length;
    const completed = orders.filter(o => o.status === 'Completed').length;
    const pending = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
    return { total, completed, pending };
  };

  const stats = getOrderStats();

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.cream }}>
      
      {/* ====== HERO BANNER ====== */}
      <div className="relative py-12 overflow-hidden">
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
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center" 
                style={{ 
                  borderColor: colors.gold,
                  backgroundColor: `${colors.gold}20`
                }}>
                <User size={28} style={{ color: colors.gold }} />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 backdrop-blur-sm bg-white/5">
                  <Crown size={10} style={{ color: colors.gold }} />
                  <span className="text-[7px] uppercase tracking-[0.3em] font-light" style={{ color: colors.goldLight }}>
                    {user?.role || 'Customer'} Account
                  </span>
                </div>
                <h1 className="font-serif text-2xl font-bold text-white mt-1">{user?.email}</h1>
                {profile && (
                  <div className="flex items-center gap-2 text-white/50 text-[10px] mt-0.5">
                    <Calendar size={12} />
                    <span>Joined {new Date(profile.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4">
              <div className="text-center px-4 py-2 rounded-xl border border-white/10 backdrop-blur-sm bg-white/5">
                <p className="text-xl font-serif font-bold text-white">{stats.total}</p>
                <p className="text-[7px] uppercase tracking-wider text-white/40">Total Orders</p>
              </div>
              <div className="text-center px-4 py-2 rounded-xl border border-white/10 backdrop-blur-sm bg-white/5">
                <p className="text-xl font-serif font-bold" style={{ color: colors.gold }}>{stats.completed}</p>
                <p className="text-[7px] uppercase tracking-wider text-white/40">Completed</p>
              </div>
              <div className="text-center px-4 py-2 rounded-xl border border-white/10 backdrop-blur-sm bg-white/5">
                <p className="text-xl font-serif font-bold text-white">{stats.pending}</p>
                <p className="text-[7px] uppercase tracking-wider text-white/40">Pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-20">
        
        {/* ====== TAB NAVIGATION ====== */}
        <div className="bg-white rounded-2xl border border-gold/10 shadow-xl p-2 mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 min-w-[120px] px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === 'orders' 
                ? 'text-white shadow-lg' 
                : 'text-charcoal/50 hover:text-gold'
            }`}
            style={{
              backgroundColor: activeTab === 'orders' ? colors.gold : 'transparent'
            }}
          >
            <ShoppingBag size={14} />
            My Orders
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 min-w-[120px] px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === 'profile' 
                ? 'text-white shadow-lg' 
                : 'text-charcoal/50 hover:text-gold'
            }`}
            style={{
              backgroundColor: activeTab === 'profile' ? colors.gold : 'transparent'
            }}
          >
            <Settings size={14} />
            Account Settings
          </button>
        </div>

        {/* ====== TAB CONTENT ====== */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-2 rounded-full animate-spin" style={{ 
              borderColor: `${colors.gold}30`,
              borderTopColor: colors.gold 
            }}></div>
            <p className="mt-4 text-xs text-charcoal/40 animate-pulse">Loading your dashboard...</p>
          </div>
        ) : activeTab === 'orders' ? (
          
          /* ====== ORDERS TAB ====== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Orders List */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-gold/10 shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gold/10">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} style={{ color: colors.gold }} />
                  <h3 className="font-serif text-xl font-bold" style={{ color: colors.mocha }}>Order History</h3>
                  <span className="ml-auto text-[10px] px-3 py-1 rounded-full font-bold" 
                    style={{ 
                      backgroundColor: `${colors.gold}10`,
                      color: colors.goldDark 
                    }}>
                    {orders.length} Orders
                  </span>
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="p-16 text-center">
                  <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${colors.gold}10` }}>
                    <ShoppingBag size={28} style={{ color: colors.gold }} />
                  </div>
                  <p className="text-sm text-charcoal/40 font-light">You haven't placed any orders yet.</p>
                  <div className="gold-divider w-16 mx-auto my-4"></div>
                  <button className="px-6 py-2.5 rounded-full text-white text-[10px] uppercase tracking-wider font-bold transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: colors.gold }}>
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b" style={{ borderColor: `${colors.gold}10` }}>
                        <th className="p-5 text-[9px] uppercase tracking-wider font-bold" style={{ color: colors.goldDark }}>Order ID</th>
                        <th className="p-5 text-[9px] uppercase tracking-wider font-bold" style={{ color: colors.goldDark }}>Date</th>
                        <th className="p-5 text-[9px] uppercase tracking-wider font-bold" style={{ color: colors.goldDark }}>Amount</th>
                        <th className="p-5 text-[9px] uppercase tracking-wider font-bold" style={{ color: colors.goldDark }}>Status</th>
                        <th className="p-5 text-[9px] uppercase tracking-wider font-bold" style={{ color: colors.goldDark }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor: `${colors.gold}5` }}>
                      {orders.map((order) => {
                        const statusStyle = getStatusBadgeColor(order.status);
                        return (
                          <tr key={order.id} className="hover:bg-gold/5 transition-colors cursor-pointer"
                            onClick={() => setSelectedOrder(order)}>
                            <td className="p-5">
                              <span className="font-serif font-bold text-sm" style={{ color: colors.mocha }}>
                                #HZ-{String(order.id).padStart(4, '0')}
                              </span>
                            </td>
                            <td className="p-5 text-xs text-charcoal/50">
                              {new Date(order.orderDate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </td>
                            <td className="p-5 font-bold text-sm" style={{ color: colors.goldDark }}>
                              Rs. {order.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="p-5">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold border`}
                                style={{ 
                                  backgroundColor: statusStyle.bg,
                                  color: statusStyle.text,
                                  borderColor: statusStyle.border
                                }}>
                                {getStatusIcon(order.status)}
                                {order.status}
                              </span>
                            </td>
                            <td className="p-5">
                              <button
                                onClick={(e) => { e.stopPropagation(); setSelectedOrder(order); }}
                                className="p-2 rounded-full transition-all duration-300 hover:scale-110"
                                style={{ color: colors.gold }}
                              >
                                <Eye size={14} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Order Details Panel */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-gold/10 shadow-xl p-6 sticky top-24">
                {selectedOrder ? (
                  <>
                    <div className="flex justify-between items-start pb-4 border-b border-gold/10">
                      <div>
                        <h3 className="font-serif text-xl font-bold" style={{ color: colors.mocha }}>Order Details</h3>
                        <p className="text-[10px] text-charcoal/40 mt-0.5">
                          #HZ-{String(selectedOrder.id).padStart(4, '0')} • {new Date(selectedOrder.orderDate).toLocaleString()}
                        </p>
                      </div>
                      {(() => {
                        const statusStyle = getStatusBadgeColor(selectedOrder.status);
                        return (
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-bold border`}
                            style={{ 
                              backgroundColor: statusStyle.bg,
                              color: statusStyle.text,
                              borderColor: statusStyle.border
                            }}>
                            {getStatusIcon(selectedOrder.status)}
                            {selectedOrder.status}
                          </span>
                        );
                      })()}
                    </div>

                    <div className="space-y-4 my-6">
                      {selectedOrder.orderItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gold/5 transition-colors">
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-gold/10" 
                            style={{ backgroundColor: colors.champagne }}>
                            {item.cakeImageUrl ? (
                              <img src={`http://localhost:5165${item.cakeImageUrl}`} alt={item.cakeName} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-serif text-lg font-bold" style={{ color: colors.gold }}>
                                {item.cakeName[0]}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate" style={{ color: colors.mocha }}>{item.cakeName}</p>
                            <p className="text-[10px] text-charcoal/40">Qty: {item.quantity} × Rs. {item.price.toFixed(2)}</p>
                          </div>
                          <span className="font-bold text-sm" style={{ color: colors.goldDark }}>
                            Rs. {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="gold-divider my-4"></div>

                    <div className="flex justify-between items-center">
                      <span className="font-serif text-lg font-bold" style={{ color: colors.mocha }}>Total</span>
                      <span className="text-xl font-serif font-bold" style={{ color: colors.gold }}>
                        Rs. {selectedOrder.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="py-16 text-center">
                    <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 border-2 border-dashed" 
                      style={{ borderColor: `${colors.gold}30` }}>
                      <Eye size={28} style={{ color: colors.gold }} />
                    </div>
                    <h4 className="font-serif text-lg font-bold" style={{ color: colors.mocha }}>Select an Order</h4>
                    <p className="text-[10px] text-charcoal/40 mt-1 max-w-xs mx-auto">
                      Click the eye icon next to an order to view its details
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        ) : (
          
          /* ====== PROFILE TAB ====== */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border border-gold/10 shadow-xl p-8">
              <div className="flex items-center gap-2 pb-4 border-b border-gold/10">
                <Settings size={18} style={{ color: colors.gold }} />
                <h3 className="font-serif text-xl font-bold" style={{ color: colors.mocha }}>Account Settings</h3>
              </div>

              {profileError && (
                <div className="mt-4 p-3 rounded-xl border flex items-start gap-2" style={{ 
                  backgroundColor: '#fef2f2',
                  borderColor: '#fecaca'
                }}>
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#ef4444' }}></div>
                  <p className="text-[11px] text-red-600 leading-relaxed">{profileError}</p>
                </div>
              )}

              {profileSuccess && (
                <div className="mt-4 p-3 rounded-xl border flex items-start gap-2" style={{ 
                  backgroundColor: '#f0fdf4',
                  borderColor: '#bbf7d0'
                }}>
                  <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-[11px] text-green-600 leading-relaxed">{profileSuccess}</p>
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-6 mt-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: colors.charcoal + '60' }}>
                    <Mail size={12} className="inline mr-1.5" style={{ color: colors.gold }} />
                    Registered Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 text-sm"
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

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: colors.charcoal + '60' }}>
                    <Lock size={12} className="inline mr-1.5" style={{ color: colors.gold }} />
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Leave blank unless changing password"
                    className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 text-sm"
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

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: colors.charcoal + '60' }}>
                    <Lock size={12} className="inline mr-1.5" style={{ color: colors.gold }} />
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Leave blank unless changing password"
                    className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 text-sm"
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

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2"
                  style={{ backgroundColor: colors.gold }}
                >
                  <Settings size={14} />
                  Save Changes
                  <ChevronRight size={14} />
                </button>
              </form>

              {/* Security Badges */}
              <div className="mt-6 pt-4 border-t border-gold/10 flex justify-center gap-6">
                <div className="flex items-center gap-1.5">
                  <Lock size={12} style={{ color: colors.gold }} />
                  <span className="text-[7px] uppercase tracking-wider text-charcoal/30">Secure</span>
                </div>
                <div className="w-px h-4" style={{ backgroundColor: `${colors.gold}20` }}></div>
                <div className="flex items-center gap-1.5">
                  <Shield size={12} style={{ color: colors.gold }} />
                  <span className="text-[7px] uppercase tracking-wider text-charcoal/30">Encrypted</span>
                </div>
                <div className="w-px h-4" style={{ backgroundColor: `${colors.gold}20` }}></div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-3 h-3" style={{ color: colors.gold }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[7px] uppercase tracking-wider text-charcoal/30">Verified</span>
                </div>
              </div>
            </div>
          </div>
        )}

        
        <div className="h-16"></div>

      </div>
    </div>
  );
};

export default UserDashboard;