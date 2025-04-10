import axiosClient, { handleRequest } from "@/api/axiosClient";

const chapterApi = {
  fetchChapters: (): Promise<any> => {
    return handleRequest(axiosClient.get('/chapter'));
  },
  getChapter: (id: number): Promise<any> => {
    return handleRequest(axiosClient.get(`/chapter/${id}`));
  },
  createChapter: (body: any): Promise<any> => {
    return handleRequest(axiosClient.post(`/admin/chapter`, body));
  },
  updateChapter: (id: any, body: any): Promise<any> => {
    return handleRequest(axiosClient.put(`/admin/chapter/${id}`, body));
  },
  deleteChapter: (id: number): Promise<any> => {
    return handleRequest(axiosClient.delete(`/admin/chapter/${id}`));
  },
}

export default chapterApi;