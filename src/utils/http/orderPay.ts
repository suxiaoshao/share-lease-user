import axios, { AxiosError, AxiosResponse } from 'axios';
import { HttpData } from '@/utils/http/main';

async function httpBase<Req, Res>(method: 'get' | 'post' | 'put' | 'delete', url: string, data: Req): Promise<any> {
  const resData: AxiosResponse<HttpData<Res>> = (await axios({
    method,
    data,
    url,
  }).catch((err: AxiosError<HttpData<Res>>) => {
    console.log(err);
    throw new Error('网络错误');
  })) as AxiosResponse<HttpData<Res>>;
  return resData.data;
}

async function httpPost<Req, Res>(url: string, data: Req): Promise<Res> {
  return await httpBase<Req, Res>('post', url, data);
}

/**
 * @description 订单支付
 * @param oid 订单 id
 * */

export async function pay(oid: number): Promise<string> {
  return await httpPost<undefined, string>(`/order/pay/${oid}`, undefined);
}
