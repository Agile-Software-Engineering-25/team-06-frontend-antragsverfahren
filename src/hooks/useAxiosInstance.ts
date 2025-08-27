import { useMemo } from 'react';
import axios from 'axios';

const useAxiosInstance = (baseUrl: string) => {
  return useMemo(() => {
    const instance = axios.create({ baseURL: baseUrl });
    // Interceptor für Authorization-Header
    instance.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });
    return instance;
  }, [baseUrl]);
};

export default useAxiosInstance;
