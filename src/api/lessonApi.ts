import axiosClient, { handleRequest } from './axiosClient';

const lessonApi = {
  fetchLessons: (page: number, size: number): Promise<any> => {
    const params = { page, size };
    return handleRequest(axiosClient.get('/lesson', { params }));
  },
  addLesson: (lesson: any): Promise<any> => {
    const url = '/admin/lesson';
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    return handleRequest(axiosClient.post(url, lesson, { headers }));
  },
  updateLesson: (id: number, lesson: any): Promise<any> => {
    const url = `/admin/lesson/${id}`;
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    return handleRequest(axiosClient.put(url, lesson, { headers }));
  },
  detailLesson: (id: number): Promise<any> => {
    const url = `/lesson/${id}`;
    return handleRequest(axiosClient.get(url));
  },
  deleteLesson: (id: number): Promise<any> => {
    const url = `/admin/lesson/${id}`;
    return handleRequest(axiosClient.delete(url));
  },
  getLesson: (id: number): Promise<any> => {
    const url = `/lesson/${id}`;
    return handleRequest(axiosClient.get(url));
  },

  getChapter: (): Promise<any> => {
    const url = '/chapter';
    return handleRequest(axiosClient.get(url));
  },

  searchLessons: (searchQuery: string, page: number, size: number, sort: string, chapterId: number): Promise<any> => {
    const params: any = { page, size, sort };

    if (searchQuery) {
      const searchParams = new URLSearchParams(searchQuery);
      const titleSearch = searchParams.get('title.contains');
      const descriptionSearch = searchParams.get('description.contains');

      if (titleSearch) {
        params['title.contains'] = titleSearch;
      }

      if (descriptionSearch) {
        params['description.contains'] = descriptionSearch;
      }

      if (chapterId) {
        params['chapterId.equals'] = chapterId;
      }
    }

    return handleRequest(axiosClient.get('/lesson', { params }));
  },
};

export default lessonApi;
