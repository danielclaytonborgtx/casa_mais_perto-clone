// src/services/api.ts
import axios from 'axios';
import Constants from 'expo-constants';

const api = axios.create({
  baseURL: Constants.manifest?.extra?.API_URL || 'http://localhost:3000', // URL padrão de fallback
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
