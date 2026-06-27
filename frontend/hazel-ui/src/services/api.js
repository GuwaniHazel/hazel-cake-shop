import axios from 'axios';

const API_BASE_URL = 'http://localhost:5165/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach the JWT token if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('hazel_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const api = {
  // Authentication
  auth: {
    login: async (email, password) => {
      const response = await apiClient.post('/auth/login', { email, password });
      return response.data;
    },
    register: async (email, password) => {
      const response = await apiClient.post('/auth/register', { email, password });
      return response.data;
    },
    forgotPassword: async (email) => {
      const response = await apiClient.post('/auth/forgot-password', { email });
      return response.data;
    },
    getProfile: async () => {
      const response = await apiClient.get('/auth/profile');
      return response.data;
    },
    updateProfile: async (data) => {
      const response = await apiClient.put('/auth/profile', data);
      return response.data;
    },
    getAllUsers: async () => {
      const response = await apiClient.get('/auth/users');
      return response.data;
    },
  },

  // Cakes CRUD
  cakes: {
    getAll: async (category = '', search = '') => {
      const response = await apiClient.get('/cakes', {
        params: { category, search },
      });
      return response.data;
    },
    getById: async (id) => {
      const response = await apiClient.get(`/cakes/${id}`);
      return response.data;
    },
    create: async (formData) => {
      const response = await apiClient.post('/cakes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    update: async (id, formData) => {
      const response = await apiClient.put(`/cakes/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    delete: async (id) => {
      const response = await apiClient.delete(`/cakes/${id}`);
      return response.data;
    },
  },

  // Orders
  orders: {
    create: async (orderItems) => {
      const response = await apiClient.post('/orders', { orderItems });
      return response.data;
    },
    getMy: async () => {
      const response = await apiClient.get('/orders/my');
      return response.data;
    },
    getAll: async () => {
      const response = await apiClient.get('/orders');
      return response.data;
    },
    updateStatus: async (id, status) => {
      const response = await apiClient.put(`/orders/${id}/status`, { status });
      return response.data;
    },
  },

  // Branches
  branches: {
    getAll: async () => {
      const response = await apiClient.get('/branches');
      return response.data;
    },
  },
};

export default api;
