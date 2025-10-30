import useAxiosInstance from '@hooks/useAxiosInstance';
import { BACKEND_BASE_URL } from '@/config';
import { useCallback } from 'react';
import type {
  BachelorAnmeldung,
  NachklausurAntrag,
} from '@/@custom-types/formTypes';

export default function useApiForm() {
  const axiosInstance = useAxiosInstance(BACKEND_BASE_URL);

  const getDozentNames = useCallback(
    async () => {
      const response = await axiosInstance.get('/dozenten/names');
      return response.data;
    },
    [axiosInstance]
  );

  const createNachklausurAntrag = useCallback(
    async (data: NachklausurAntrag) => {
      const response = await axiosInstance.post('/nachklausur', data);
      return response.data;
    },
    [axiosInstance]
  );

  const createBachelorAnmeldung = useCallback(
    async (data: BachelorAnmeldung) => {
      const formData = new FormData();
      formData.append('thema', data.thema);
      formData.append('prüfer', data.prüfer);
      formData.append('prüfungstermin', data.prüfungstermin);
      formData.append('expose', data.expose);
      const response = await axiosInstance.post('/bachelorarbeit', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    [axiosInstance]
  );

  const getStudienbescheinigung = useCallback(async () => {
    const response = await axiosInstance.get('/studienbescheinigung', {
      responseType: 'blob',
    });
    return response.data;
  }, [axiosInstance]);

  return {
    getDozentNames,
    createNachklausurAntrag,
    createBachelorAnmeldung,
    getStudienbescheinigung,
  };
}
