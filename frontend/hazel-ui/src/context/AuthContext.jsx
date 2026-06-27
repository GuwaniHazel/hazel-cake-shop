import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Validate token on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('hazel_token');
      if (token) {
        try {
          const profile = await api.auth.getProfile();
          setUser({
            email: profile.email,
            role: profile.role,
            id: profile.id
          });
        } catch (error) {
          console.error("Session verification failed. Logging out.", error);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await api.auth.login(email, password);
      localStorage.setItem('hazel_token', data.token);
      setUser({
        email: data.email,
        role: data.role
      });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please check credentials.';
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    try {
      const data = await api.auth.register(email, password);
      localStorage.setItem('hazel_token', data.token);
      setUser({
        email: data.email,
        role: data.role
      });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Try again.';
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('hazel_token');
    setUser(null);
  };

  const updateProfile = async (email, currentPassword, newPassword) => {
    try {
      const data = await api.auth.updateProfile({ email, currentPassword, newPassword });
      // Update local token
      localStorage.setItem('hazel_token', data.token);
      setUser({
        email: data.email,
        role: data.role
      });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Update failed.';
      return { success: false, error: message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
