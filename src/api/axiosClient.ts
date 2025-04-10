/* eslint-disable @typescript-eslint/no-explicit-any */
import env from '../app/env';
import axios, { AxiosResponse } from 'axios';
import { BadRequestFieldError, HttpResponse } from '../models/http';
import AxiosResponseData from '../models/axios';
import { AuthResponse } from '../models/auth';

const baseURL = env.baseGatewayUrl;
const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420'
  },
  // withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosClient.interceptors.request.use(request => {
  const accessToken = localStorage.getItem('access-token');
  if (accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return request;
}, error => {
  return Promise.reject(error);
});

axiosClient.interceptors.response.use(
  // @ts-expect-error: we want to return the different data type
  (response: AxiosResponse<AxiosResponseData>) => {
    const { status, data: responseData, headers } = response;
    const data: HttpResponse<object> = {
      status,
      ok: true,
      body: responseData,
    };

    if (headers.link) {
      data.pagination = {
        paging: 0,
        total: Number(headers['x-total-count']),
      };
    }

    return data;
  },
  async (error) => {
    const { response, config } = error as { response: AxiosResponse<AxiosResponseData>; config: any };
    const { status, data } = response;
    const fieldErrors: BadRequestFieldError = {};

    if (status === 401 && !config._retry) {
      if (!config.url.includes('api/auth')) {
        config._retry = true;
        try {
          const refreshToken = localStorage.getItem('refresh-token');
          const response = await axios.get(`${baseURL}/api/auth/refresh-token`, {
            headers: {
              'Authorization': `Bearer ${refreshToken}`,
              'X-Refresh-Token': refreshToken,
            },
          });
          const refreshResponse: AuthResponse = response.data;
          localStorage.setItem('access-token', refreshResponse.accessToken);
          config.headers['Authorization'] = `Bearer ${refreshResponse.accessToken}`;
          return axiosClient(config);
        } catch (refreshError) {
          // store.dispatch(resetIsLogin());
          localStorage.removeItem('access-token');
          localStorage.removeItem('refresh-token');
          return Promise.reject(refreshError);
        }
      }
    }

    if (data?.fieldErrors?.length) {
      data.fieldErrors.forEach(({ field, messageCode }) => {
        if (fieldErrors[field]) {
          fieldErrors[field].push(messageCode);
        } else {
          fieldErrors[field] = [messageCode];
        }
      });
    }

    const httpError: HttpResponse = {
      status,
      ok: false,
      error: {
        unauthorized: status === 401,
        badRequest: status === 400,
        notFound: status === 404,
        clientError: status >= 400 && status <= 499,
        serverError: status >= 500 && status <= 599,
        // message: data.messageCode || data.data.messageCode,
        // title: `${data.messageCode}-title`,
        errors: data.errors,
        detail: data.detail,
        data: data.data,
      },
    };

    return Promise.reject(httpError);
  }
);

const handleRequest = (promise: Promise<HttpResponse>) =>
  promise.then((res) => res).catch((err) => err as HttpResponse<any>);

export default axiosClient;

export { handleRequest };
