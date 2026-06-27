import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import FindShop from './pages/FindShop';
import Cart from './pages/Cart';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Helper component to conditionally hide Header/Footer on admin dashboard
const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPath && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/find-shop" element={<FindShop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Customer Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          
          {/* Protected Admin Dashboard */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="Admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          
          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isAdminPath && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
