import { useMemo } from 'react';
import axios from 'axios';
import i18n from '@/i18n';
import useUser from './useUser';

const useAxiosInstance = (baseUrl: string) => {
  const user = useUser();
  
  return useMemo(() => {
    const instance = axios.create({ baseURL: baseUrl });
    // Interceptor für Authorization-Header
    instance.interceptors.request.use((config) => {
      config.headers = config.headers || {};
      const token = user.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (i18n.language) {
        config.headers['Accept-Language'] = i18n.language;
      }
      return config;
    });
    return instance;
  }, [baseUrl, user]);
};

export default useAxiosInstance;
