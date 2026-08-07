import api from "@/providers/axios";

export class BaseListQuery<T, U> {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  get = async (params?: Record<string, string | number>): Promise<Array<T>> => {
    const response = await api.get(this.url, { params });
    return response.data.docs;
  };

  getBySlug = async (
    slug: string,
    params?: Record<string, string | number>,
  ): Promise<T | undefined> => {
    const response = await api.get(this.url, {
      params: { "where[slug][equals]": slug, ...params },
    });
    return response.data.docs?.[0];
  };

  getById = async (id: string | number): Promise<T> => {
    const response = await api.get(`${this.url}/${id}`);
    return response.data;
  };

  post = async (body: U): Promise<T> => {
    const response = await api.post(this.url, body);
    return response.data;
  };

  put = async (id: string | number, body: U): Promise<T> => {
    const response = await api.put(`${this.url}/${id}`, body);
    return response.data;
  };

  delete = async (id: string | number): Promise<T> => {
    const response = await api.delete(`${this.url}/${id}`);
    return response.data;
  };
}
