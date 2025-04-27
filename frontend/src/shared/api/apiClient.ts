import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {allSettled, createEvent} from 'effector';

import {appScope} from '@shared/config';

import {AccessTokenController} from './accessTokenController';
import {postApiV1AuthRefresh} from './requests';

export const refreshTokenExpired = createEvent();

const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = AccessTokenController.getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await postApiV1AuthRefresh({withCredentials: true});

        const newAccessToken = response.data.accessToken;
        AccessTokenController.saveToken(newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        allSettled(refreshTokenExpired, {scope: appScope});
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const promise = apiClient({
    ...config,
    ...options,
  });

  return promise;
};

export default {customInstance};
