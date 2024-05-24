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

API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authentication = getAuth();
    if (authentication) {
      config.headers.Authorization = authentication;
    }
    return config;
  },
  () => {
    dispatch(removeMe({}));
    dispatch(removeAuth({}));
    window.location.reload();
  },
);

API.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: AxiosError) => {
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as AxiosRequestConfig;
    if (isRefreshing) {
      failedRequests.push(() => {
        originalRequest.headers!.Authorization = getAuth() || '';
        axios(originalRequest);
      });
      return Promise.reject(error);
    }

    isRefreshing = true;
    const state = store.getState();
    const refreshToken = _.get(state, 'auth.refreshToken', null);

    if (!refreshToken) {
      dispatch(removeMe({}));
      dispatch(removeAuth({}));
      return Promise.reject(error);
    }

    API.post<{
      data: {
        authentication: { accessToken: string; refreshToken: string };
      };
    }>('/auth/refresh', {
      refreshToken,
    })
      .then((response) => {
        const { authentication } = response.data.data;
        dispatch(addAuth(authentication));
        failedRequests.push(() => {
          originalRequest.headers!.Authorization = `Bearer ${authentication.accessToken}`;
          axios(originalRequest);
        });
        failedRequests.forEach((prom) => prom());
        failedRequests = [];
      })
      .catch((_err) => {
        dispatch(removeMe({}));
        dispatch(removeAuth({}));
        window.location.reload();
      })
      .finally(() => {
        isRefreshing = false;
      });

    return Promise.reject(error);
  },
);

export default API;
