import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Cake, ShoppingBag, Users, Plus, Trash2, Edit3, Image, LogOut, 
  Check, X, RefreshCw, Crown, Sparkles, Award, Clock, 
  Package, CreditCard, BarChart3, TrendingUp, TrendingDown,
  Search, Filter, ChevronDown, ChevronRight, Menu
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('cakes');
  const [cakes, setCakes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Modals and Forms
  const [cakeModalOpen, setCakeModalOpen] = useState(false);
  const [editingCake, setEditingCake] = useState(null);
  const [cakeName, setCakeName] = useState('');
  const [cakeDescription, setCakeDescription] = useState('');
  const [cakePrice, setCakePrice] = useState('');
  const [cakeCategory, setCakeCategory] = useState('Chocolate');
  const [cakeImageFile, setCakeImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      if (activeTab === 'cakes') {
        const data = await api.cakes.getAll();
        setCakes(data);
      } else if (activeTab === 'orders') {
        const data = await api.orders.getAll();
        setOrders(data);
      } else if (activeTab === 'users') {
        const data = await api.auth.getAllUsers();
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [activeTab]);

  const handleOpenAddCake = () => {
    setEditingCake(null);
    setCakeName('');
    setCakeDescription('');
    setCakePrice('');
    setCakeCategory('Chocolate');
    setCakeImageFile(null);
    setImagePreview(null);
    setCakeModalOpen(true);
  };

  const handleOpenEditCake = (cake) => {
    setEditingCake(cake);
    setCakeName(cake.name);
    setCakeDescription(cake.description || '');
    setCakePrice(cake.price.toString());
    setCakeCategory(cake.category);
    setCakeImageFile(null);
    setImagePreview(cake.imageUrl ? `http://localhost:5165${cake.imageUrl}` : null);
    setCakeModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCakeImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCakeSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSubmitting(true);

    const formData = new FormData();
    formData.append('name', cakeName);
    formData.append('description', cakeDescription);
    formData.append('price', parseFloat(cakePrice));
    formData.append('category', cakeCategory);
    if (cakeImageFile) {
      formData.append('imageFile', cakeImageFile);
    }

    try {
      if (editingCake) {
        await api.cakes.update(editingCake.id, formData);
        setMessage('Cake updated successfully.');
      } else {
        await api.cakes.create(formData);
        setMessage('Cake added successfully.');
      }
      setCakeModalOpen(false);
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error occurred while saving cake.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCake = async (id) => {
    if (!window.confirm('Are you sure you want to delete this cake?')) return;
    try {
      await api.cakes.delete(id);
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      alert('Failed to delete cake.');
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.orders.updateStatus(orderId, newStatus);
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      alert('Failed to update status.');
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
      case 'Completed': return <Check size={12} />;
      case 'Cancelled': return <X size={12} />;
      default: return null;
    }
  };

  // Calculate Stats
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
  const completedOrders = orders.filter(o => o.status === 'Completed').length;

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: colors.cream }}>
      
      {/* ====== SIDEBAR ====== */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-white border-r border-gold/10 flex flex-col transition-all duration-500 fixed h-full z-30 shadow-xl`}>
        {/* Brand */}
        <div className={`p-6 border-b border-gold/10 flex ${sidebarOpen ? 'justify-between' : 'justify-center'} items-center`}>
          {sidebarOpen ? (
            <>
              <div>
                <h2 className="font-serif text-2xl font-bold" style={{ color: colors.mocha }}>
                  <span className="font-serif text-2xl font-bold tracking-[0.2em] text-primary group-hover:text-primary-light transition-colors">
                HAZEL
              </span>
                </h2>
                <span className="text-[12px] uppercase tracking-[0.3em] font-light" style={{ color: colors.goldDark }}>
                  Admin Panel
                </span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-lg hover:bg-gold/5">
                <Menu size={18} style={{ color: colors.gold }} />
              </button>
            </>
          ) : (
            <Crown size={28} style={{ color: colors.gold }} />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {[
            { id: 'cakes', icon: <Cake size={18} />, label: 'Cakes Menu' },
            { id: 'orders', icon: <ShoppingBag size={18} />, label: 'Orders List' },
            { id: 'users', icon: <Users size={18} />, label: 'Customers' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center ${sidebarOpen ? 'space-x-3 px-4' : 'justify-center'} py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === item.id 
                  ? 'text-white shadow-lg' 
                  : 'text-charcoal/50 hover:bg-gold/5'
              }`}
              style={{
                backgroundColor: activeTab === item.id ? colors.gold : 'transparent'
              }}
            >
              {item.icon}
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Sign Out */}
        <div className="p-4 border-t border-gold/10">
          <button
            onClick={() => { logout(); navigate('/login'); }}
            className={`w-full flex items-center ${sidebarOpen ? 'space-x-3 px-4' : 'justify-center'} py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-red-50`}
            style={{ color: '#dc2626' }}
          >
            <LogOut size={18} />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* ====== MAIN CONTENT ====== */}
      <main className={`flex-1 transition-all duration-500 ${sidebarOpen ? 'ml-72' : 'ml-20'} p-6`}>
        
        {/* ====== TOP BAR ====== */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold" style={{ color: colors.mocha }}>
              <span className="capitalize">{activeTab}</span>
              <span className="text-sm font-light ml-3" style={{ color: colors.goldDark }}>
                Management Dashboard
              </span>
            </h1>
            <div className="gold-divider w-24 mt-1"></div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl border border-gold/10 hover:bg-gold/5"
            >
              <Menu size={20} style={{ color: colors.gold }} />
            </button>
            <button
              onClick={fetchDashboardData}
              className="p-2.5 rounded-xl border border-gold/10 hover:bg-gold/5 transition-all duration-300 hover:scale-105"
            >
              <RefreshCw size={16} style={{ color: colors.gold }} />
            </button>
          </div>
        </div>

        {/* ====== STATS CARDS ====== */}
        {activeTab === 'orders' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl border border-gold/10 shadow-lg p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-charcoal/40 font-bold">Total Orders</p>
                  <p className="text-2xl font-serif font-bold mt-1" style={{ color: colors.mocha }}>{totalOrders}</p>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colors.gold}15` }}>
                  <ShoppingBag size={20} style={{ color: colors.gold }} />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl border border-gold/10 shadow-lg p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-charcoal/40 font-bold">Revenue</p>
                  <p className="text-2xl font-serif font-bold mt-1" style={{ color: colors.gold }}>
                    Rs. {totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colors.gold}15` }}>
                  <CreditCard size={20} style={{ color: colors.gold }} />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl border border-gold/10 shadow-lg p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-charcoal/40 font-bold">Pending</p>
                  <p className="text-2xl font-serif font-bold mt-1" style={{ color: '#d97706' }}>{pendingOrders}</p>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#fef3c7' }}>
                  <Clock size={20} style={{ color: '#d97706' }} />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl border border-gold/10 shadow-lg p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-charcoal/40 font-bold">Completed</p>
                  <p className="text-2xl font-serif font-bold mt-1" style={{ color: '#059669' }}>{completedOrders}</p>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#d1fae5' }}>
                  <Award size={20} style={{ color: '#059669' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====== MESSAGES ====== */}
        {error && (
          <div className="mb-6 p-4 rounded-xl border flex items-start gap-3" style={{ 
            backgroundColor: '#fef2f2',
            borderColor: '#fecaca'
          }}>
            <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#ef4444' }}></div>
            <p className="text-[11px] text-red-600 leading-relaxed">{error}</p>
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 rounded-xl border flex items-start gap-3" style={{ 
            backgroundColor: '#f0fdf4',
            borderColor: '#bbf7d0'
          }}>
            <Check size={14} style={{ color: '#22c55e' }} className="mt-0.5 flex-shrink-0" />
            <p className="text-[11px] text-green-600 leading-relaxed">{message}</p>
          </div>
        )}

        {/* ====== CONTENT PANELS ====== */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-12 h-12 border-2 rounded-full animate-spin" style={{ 
              borderColor: `${colors.gold}30`,
              borderTopColor: colors.gold 
            }}></div>
            <p className="mt-4 text-xs text-charcoal/40 animate-pulse">Loading dashboard data...</p>
          </div>
        ) : activeTab === 'cakes' ? (
          /* ====== CAKES PANEL ====== */
          <div className="bg-white rounded-2xl border border-gold/10 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gold/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Cake size={18} style={{ color: colors.gold }} />
                <h3 className="font-serif text-xl font-bold" style={{ color: colors.mocha }}>
                  Products List
                </h3>
                <span className="text-[10px] px-3 py-1 rounded-full font-bold" 
                  style={{ 
                    backgroundColor: `${colors.gold}10`,
                    color: colors.goldDark 
                  }}>
                  {cakes.length} Items
                </span>
              </div>
              <button
                onClick={handleOpenAddCake}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[10px] uppercase tracking-wider font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: colors.gold }}
              >
                <Plus size={14} />
                Add New Cake
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b" style={{ borderColor: `${colors.gold}10` }}>
                    <th className="p-5 text-[8px] uppercase tracking-wider font-bold" style={{ color: colors.goldDark }}>Image</th>
                    <th className="p-5 text-[8px] uppercase tracking-wider font-bold" style={{ color: colors.goldDark }}>Name</th>
                    <th className="p-5 text-[8px] uppercase tracking-wider font-bold" style={{ color: colors.goldDark }}>Category</th>
                    <th className="p-5 text-[8px] uppercase tracking-wider font-bold" style={{ color: colors.goldDark }}>Price</th>
                    <th className="p-5 text-[8px] uppercase tracking-wider font-bold" style={{ color: colors.goldDark }}>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: `${colors.gold}5` }}>
                  {cakes.map((cake) => (
                    <tr key={cake.id} className="hover:bg-gold/5 transition-colors">
                      <td className="p-5">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-gold/10" style={{ backgroundColor: colors.champagne }}>
                          {cake.imageUrl ? (
                            <img src={`http://localhost:5165${cake.imageUrl}`} alt={cake.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-serif text-lg font-bold" style={{ color: colors.gold }}>
                              {cake.name[0]}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-5 font-semibold text-sm" style={{ color: colors.mocha }}>{cake.name}</td>
                      <td className="p-5">
                        <span className="text-[8px] uppercase tracking-wider font-bold px-3 py-1 rounded-full" 
                          style={{ 
                            backgroundColor: `${colors.gold}10`,
                            color: colors.goldDark 
                          }}>
                          {cake.category}
                        </span>
                      </td>
                      <td className="p-5 font-bold text-sm" style={{ color: colors.goldDark }}>
                        Rs. {cake.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="p-5">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOpenEditCake(cake)}
                            className="p-2 rounded-xl transition-all duration-300 hover:scale-110"
                            style={{ color: colors.gold }}
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteCake(cake.id)}
                            className="p-2 rounded-xl transition-all duration-300 hover:scale-110"
                            style={{ color: '#dc2626' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'orders' ? (
          /* ====== ORDERS PANEL ====== */
          <div className="bg-white rounded-2xl border border-gold/10 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gold/10">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} style={{ color: colors.gold }} />
                <h3 className="font-serif text-xl font-bold" style={{ color: colors.mocha }}>
                  All Client Orders
                </h3>
                <span className="text-[10px] px-3 py-1 rounded-full font-bold" 
                  style={{ 
                    backgroundColor: `${colors.gold}10`,
                    color: colors.goldDark 
                  }}>
                  {orders.length} Orders
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b" style={{ borderColor: `${colors.gold}10` }}>
                    <th className="p-5 text-[8px] uppercase tracking-wider font-bold" style={{ color: colors.goldDark }}>Order ID</th>
                    <th className="p-5 text-[8px] uppercase tracking-wider font-bold" style={{ color: colors.goldDark }}>Customer</th>
                    <th className="p-5 text-[8px] uppercase tracking-wider font-bold" style={{ color: colors.goldDark }}>Items</th>
                    <th className="p-5 text-[8px] uppercase tracking-wider font-bold" style={{ color: colors.goldDark }}>Amount</th>
                    <th className="p-5 text-[8px] uppercase tracking-wider font-bold" style={{ color: colors.goldDark }}>Status</th>
                    <th className="p-5 text-[8px] uppercase tracking-wider font-bold" style={{ color: colors.goldDark }}>Manage</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: `${colors.gold}5` }}>
                  {orders.map((order) => {
                    const statusStyle = getStatusBadgeColor(order.status);
                    return (
                      <tr key={order.id} className="hover:bg-gold/5 transition-colors">
                        <td className="p-5 font-serif font-bold text-sm" style={{ color: colors.mocha }}>
                          #HZ-{String(order.id).padStart(4, '0')}
                        </td>
                        <td className="p-5 text-sm text-charcoal/60">{order.userEmail}</td>
                        <td className="p-5">
                          <div className="space-y-1 text-[10px] text-charcoal/50">
                            {order.orderItems.map((item) => (
                              <div key={item.id}>• {item.cakeName} <span className="font-bold text-charcoal/70">x{item.quantity}</span></div>
                            ))}
                          </div>
                        </td>
                        <td className="p-5 font-bold text-sm" style={{ color: colors.goldDark }}>
                          Rs. {order.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
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
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            className="px-3 py-1.5 rounded-lg border text-[10px] font-medium focus:outline-none focus:ring-2 transition-all"
                            style={{ 
                              borderColor: `${colors.gold}20`,
                              backgroundColor: colors.cream,
                              color: colors.mocha
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = colors.gold;
                              e.target.style.boxShadow = `0 0 0 3px ${colors.gold}20`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = `${colors.gold}20`;
                              e.target.style.boxShadow = 'none';
                            }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* ====== USERS PANEL ====== */
          <div className="bg-white rounded-2xl border border-gold/10 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gold/10">
              <div className="flex items-center gap-3">
                <Users size={18} style={{ color: colors.gold }} />
                <h3 className="font-serif text-xl font-bold" style={{ color: colors.mocha }}>
                  Registered Customers
                </h3>
                <span className="text-[10px] px-3 py-1 rounded-full font-bold" 
                  style={{ 
                    backgroundColor: `${colors.gold}10`,
                    color: colors.goldDark 
                  }}>
                  {users.length} Users
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b" style={{ borderColor: `${colors.gold}10` }}>
                    <th className="p-5 text-[8px] uppercase tracking-wider font-bold" style={{ color: colors.goldDark }}>User ID</th>
                    <th className="p-5 text-[8px] uppercase tracking-wider font-bold" style={{ color: colors.goldDark }}>Email</th>
                    <th className="p-5 text-[8px] uppercase tracking-wider font-bold" style={{ color: colors.goldDark }}>Role</th>
                    <th className="p-5 text-[8px] uppercase tracking-wider font-bold" style={{ color: colors.goldDark }}>Registered</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: `${colors.gold}5` }}>
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gold/5 transition-colors">
                      <td className="p-5 font-serif font-bold text-sm" style={{ color: colors.mocha }}>
                        #US-{String(u.id).padStart(4, '0')}
                      </td>
                      <td className="p-5 text-sm text-charcoal/60">{u.email}</td>
                      <td className="p-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[8px] font-bold border ${
                          u.role === 'Admin' 
                            ? 'border-red-200 text-red-700' 
                            : 'border-green-200 text-green-700'
                        }`}
                          style={{
                            backgroundColor: u.role === 'Admin' ? '#fef2f2' : '#f0fdf4'
                          }}>
                          {u.role === 'Admin' ? <Crown size={10} /> : <Check size={10} />}
                          {u.role}
                        </span>
                      </td>
                      <td className="p-5 text-xs text-charcoal/40">
                        {new Date(u.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ====== CAKE MODAL ====== */}
        {cakeModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white max-w-lg w-full rounded-3xl border border-gold/10 shadow-2xl p-8 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setCakeModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full transition-all duration-300 hover:bg-gold/5"
                style={{ color: colors.charcoal + '40' }}
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 pb-4 border-b border-gold/10">
                <Cake size={20} style={{ color: colors.gold }} />
                <h2 className="font-serif text-2xl font-bold" style={{ color: colors.mocha }}>
                  {editingCake ? 'Edit Cake' : 'Add New Cake'}
                </h2>
              </div>

              <form onSubmit={handleCakeSubmit} className="space-y-5 mt-6">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider mb-1.5" style={{ color: colors.charcoal + '60' }}>
                    Cake Name
                  </label>
                  <input
                    type="text"
                    required
                    value={cakeName}
                    onChange={(e) => setCakeName(e.target.value)}
                    placeholder="e.g. Vanilla Bean Mousse"
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
                  <label className="block text-[9px] font-bold uppercase tracking-wider mb-1.5" style={{ color: colors.charcoal + '60' }}>
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={cakeDescription}
                    onChange={(e) => setCakeDescription(e.target.value)}
                    placeholder="Describe textures, layers, flavor profiles..."
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider mb-1.5" style={{ color: colors.charcoal + '60' }}>
                      Price (Rs.)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={cakePrice}
                      onChange={(e) => setCakePrice(e.target.value)}
                      placeholder="38.00"
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
                    <label className="block text-[9px] font-bold uppercase tracking-wider mb-1.5" style={{ color: colors.charcoal + '60' }}>
                      Category
                    </label>
                    <select
                      value={cakeCategory}
                      onChange={(e) => setCakeCategory(e.target.value)}
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
                    >
                      <option value="Chocolate">Chocolate</option>
                      <option value="Fruit">Fruit</option>
                      <option value="Special">Special</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider mb-1.5" style={{ color: colors.charcoal + '60' }}>
                    Product Image
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed transition-all duration-300 text-xs font-bold hover:scale-105"
                      style={{ 
                        borderColor: `${colors.gold}30`,
                        backgroundColor: colors.cream,
                        color: colors.goldDark
                      }}>
                      <Image size={14} />
                      <span>{cakeImageFile ? 'Change File' : 'Choose File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    {cakeImageFile && (
                      <span className="text-[10px] text-charcoal/40 truncate max-w-[150px]">
                        {cakeImageFile.name}
                      </span>
                    )}
                  </div>

                  {imagePreview && (
                    <div className="mt-4 w-24 h-24 rounded-xl border border-gold/10 overflow-hidden shadow-lg">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4 border-t border-gold/10">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 rounded-full text-white text-[10px] uppercase tracking-wider font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50"
                    style={{ backgroundColor: colors.gold }}
                  >
                    {submitting ? 'Saving...' : editingCake ? 'Update Cake' : 'Add Cake'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCakeModalOpen(false)}
                    className="px-6 py-3 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all duration-300 border hover:bg-gold/5"
                    style={{ 
                      borderColor: `${colors.gold}30`,
                      color: colors.mocha 
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;