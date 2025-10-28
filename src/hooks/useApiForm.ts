import useAxiosInstance from '@hooks/useAxiosInstance';
import { BACKEND_BASE_URL } from '@/config';
import { useCallback } from 'react';
import type { BachelorAnmeldung, NachklausurAntrag } from '@/@custom-types/formTypes';

export default function useApiForm() {
  console.log(BACKEND_BASE_URL);
  const axiosInstance = useAxiosInstance(BACKEND_BASE_URL);

  const createNachklausurAntrag = useCallback(
    async (data: NachklausurAntrag) => {
      const response = await axiosInstance.post('/antrag/nachklausur', data);
      console.log('Nachklausur Antrag erstellt:', response.data);
      return response.data;
    },
    [axiosInstance]
  );

  const createBachelorAnmeldung = useCallback(
    async (formData: FormData) => {
      const response = await axiosInstance.post('/antrag/bachelorarbeit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Bachelor Anmeldung erstellt:', response.data);
      return response.data;
    },
    [axiosInstance]
  );

  const getStudienbescheinigung = useCallback(async () => {
    const response = await axiosInstance.post('/studienbescheinigung', {}, { responseType: 'blob' });
    return response.data;
  }, [axiosInstance]);

  //function to upload bachelorthesis expose
  const uploadBachelorthesisExpose = useCallback(async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axiosInstance.post('/bachelorarbeit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Bachelorthesis Exposé hochgeladen:', response.data);
      return response.data;
    },
    [axiosInstance]
  );

  return { createNachklausurAntrag, createBachelorAnmeldung, getStudienbescheinigung, uploadBachelorthesisExpose };
}
