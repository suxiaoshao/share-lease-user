import { httpGet } from '@/utils/http/main';
import { GoodProp } from '@/utils/http/good/goodList';

/**
 * 获取首页头部滚动条商品数据
 * */
export async function getHeader(): Promise<GoodProp[]> {
  return await httpGet<undefined, GoodProp[]>('/good/header', undefined);
}
