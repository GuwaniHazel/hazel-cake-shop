import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-secondary border-t-primary rounded-full animate-spin"></div>
          <span className="font-serif text-lg text-primary tracking-widest animate-pulse">HAZEL</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // If not matching role, redirect based on what role they are
    if (user.role === 'Admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
