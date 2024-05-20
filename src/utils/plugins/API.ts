import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { API_URL } from '../../constants';
import { store } from '../../redux/store';
import { removeAuth, addAuth } from '../../redux/slices/auth';
import _ from 'lodash';
import { removeMe } from '../../redux/slices/me';

const { dispatch } = store;

let isRefreshing = false;
let failedRequests: (() => void)[] = [];

const API: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

const getAuth = (): string | null => {
  const state = store.getState();
  const accessToken = _.get(state, 'auth.accessToken', null);
  return accessToken ? `Bearer ${accessToken}` : null;
};

// API.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const authentication = getAuth();
//     if (authentication) {
//       config.headers.Authorization = authentication;
//     }
//     return config;
//   },
//   () => {
//     dispatch(removeMe());
//     dispatch(removeAuth());
//     window.location.reload();
//   },
// );

// API.interceptors.response.use(
//   (res: AxiosResponse) => res,
//   async (error: AxiosError) => {
//     if (error.response?.status === 401) {
//       const originalRequest = error.config as AxiosRequestConfig;
//       if (!isRefreshing) {
//         isRefreshing = true;
//
//         const state = store.getState();
//         const refreshToken = _.get(state, 'auth.refreshToken', null);
//         try {
//           const response = await API.post<{
//             data: { accessToken: string; refreshToken: string };
//           }>('/auth/token', {
//             refreshToken,
//           });
//           const { data } = response.data;
//           dispatch(addAuth(data));
//           failedRequests.forEach((prom) => prom());
//           failedRequests = [];
//           originalRequest.headers!.Authorization = `Bearer ${data.accessToken}`;
//           return axios(originalRequest);
//         } catch (err) {
//           dispatch(removeMe());
//           dispatch(removeAuth());
//           window.location.reload();
//           throw err;
//         } finally {
//           isRefreshing = false;
//         }
//       } else {
//         return new Promise<AxiosResponse>((resolve) => {
//           failedRequests.push(() => {
//             originalRequest.headers!.Authorization = getAuth() || '';
//             resolve(axios(originalRequest));
//           });
//         });
//       }
//     } else {
//       throw error;
//     }
//   },
// );

export default API;
