import { HttpResponse } from '../models/http';
import axiosClient, { handleRequest } from './axiosClient';

const commonApi = {
  uploadImage: (body: any): Promise<HttpResponse<any>> => {
    const url = `/admin/media/upload-image`;
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    return handleRequest(axiosClient.post(url, body, {headers}));
  },
  uploadVideo: (body: any): Promise<HttpResponse<any>> => {
    const url = `/admin/media/upload-video`;
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    return handleRequest(axiosClient.post(url, body, {headers}));
  },
};

export default commonApi;