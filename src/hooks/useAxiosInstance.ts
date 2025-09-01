import { useMemo } from 'react';
import axios from 'axios';
import i18n from '@/i18n';

const useAxiosInstance = (baseUrl: string) => {
  return useMemo(() => {
    const instance = axios.create({ baseURL: baseUrl });
    // Interceptor für Authorization-Header
    instance.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth_token');
      config.headers = config.headers || {};
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      if (i18n.language) {
        config.headers['Accept-Language'] = i18n.language;
      }
      return config;
    });
    return instance;
  }, [baseUrl]);
};

export default useAxiosInstance;
