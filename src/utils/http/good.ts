import { httpGet } from '@/utils/http/main';
import { GoodProp } from '@/utils/http/goodList';

export type GoodDetail = GoodProp & {
  prices: GoodPrice[];
};

export interface GoodPrice {
  gpid: number;
  gid: number;
  time: number;
  price: number;
  pledge: number;
}

export async function good(i: number): Promise<GoodDetail> {
  return await httpGet<undefined, GoodDetail>(`/good/${i}`, undefined);
}
