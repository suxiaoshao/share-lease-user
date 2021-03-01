import { httpGet } from '@/utils/http/main';
import { GoodProp } from '@/utils/http/good/goodList';

export interface GoodDetail extends GoodProp {
  prices: GoodPrice[];
}

export interface GoodPrice {
  /**
   * 价格 id
   * */
  gpid: number;
  /**
   * 商品 id
   * */
  gid: number;
  /**
   * 租用时间, 买的时候为 -1
   * */
  time: number;
  /**
   * 价格
   * */
  price: number;
  /**
   * 保证金
   * */
  pledge: number;
}

/**
 * @description 获取某个商品的纤细信息
 * @param gid 商品 id
 * */
export async function good(gid: number): Promise<GoodDetail> {
  return await httpGet<undefined, GoodDetail>(`/good/${gid}`, undefined);
}
