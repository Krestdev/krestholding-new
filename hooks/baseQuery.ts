import api from "@/providers/axios";

export class BaseQuery<T, U> {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  getBlobal = async (params?: Record<string, string | number>): Promise<T> => {
    const response = await api.get(this.url, { params });
    return response.data;
  };

  post = async (body: U): Promise<T> => {
    const response = await api.post(this.url, body);
    return response.data;
  };

  put = async (body: U): Promise<T> => {
    const response = await api.put(this.url, body);
    return response.data;
  };
}
