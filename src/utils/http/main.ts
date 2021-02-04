import axios, { AxiosResponse } from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://software.remotehost.icu';

export interface HttpSuccessData<T> {
  status: 0;
  message: string;
  data: T;
}

export interface HttpErrorData {
  status: 1001;
  message: string;
}

export type HttpData<T> = HttpSuccessData<T> | HttpErrorData;

export async function httpBase<Req, Res>(method: 'get' | 'post', url: string, data: Req): Promise<Res> {
  let resData: AxiosResponse<HttpData<Res>>;
  if (method === 'get') {
    resData = await axios
      .get<HttpData<Res>>(url, {
        params: data,
      })
      .catch(() => {
        throw '网络错误';
      });
  } else {
    resData = await axios.post<HttpData<Res>>(url, data).catch(() => {
      throw '网络错误';
    });
  }
  if (resData.data.status === 0) {
    return resData.data.data;
  }
  throw resData.data.message;
}

export async function httpGet<Req, Res>(url: string, data: Req): Promise<Res> {
  return await httpBase<Req, Res>('get', url, data);
}

export async function httpPost<Req, Res>(url: string, data: Req): Promise<Res> {
  return await httpBase<Req, Res>('post', url, data);
}
