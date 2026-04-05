import axios from 'axios';
import { APP_CONFIG } from '../config/env';

export const httpClient = axios.create({
  baseURL: APP_CONFIG.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'No se pudo completar la solicitud.';

    return Promise.reject(new Error(message));
  }
);
