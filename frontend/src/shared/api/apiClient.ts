import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

const BASE_URL = 'http://localhost:8080';

const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: BASE_URL,
});

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
