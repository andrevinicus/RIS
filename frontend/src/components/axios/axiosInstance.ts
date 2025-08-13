// axiosInstance.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // sua URL base
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (userInfo?.unidadeAtiva?.unidadePadraoID) {
    config.headers['X-Unidade-ID'] = userInfo.unidadeAtiva.unidadePadraoID; // envia ID da unidade
  }

  return config;
});

export default api;
