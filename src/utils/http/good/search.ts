import { httpGet } from '@/utils/http/main';
import { GoodProp } from '@/utils/http/good/goodList';

/**
 * @description 搜索接口
 * @param keyword 搜索词
 * @param pageSize 每页大小
 * @param pageNum 页码,从 0 开始
 * @param oderRule 正序反序
 * @param orderBY 排序规则
 * @param min 最大价格
 * @param max 最小价格
 * */
export async function search(
  keyword: string,
  pageSize = 10,
  pageNum = 0,
  oderRule: 'ASC' | 'DESC' = 'ASC',
  orderBY = 'price',
  min = 0,
  max = 1000,
): Promise<GoodProp[]> {
  return await httpGet<undefined, GoodProp[]>(
    `/good/search?keyword=${keyword}&pageSize=${pageSize}&pageNum=${pageNum}&orderRule=${oderRule}&orderBY=${orderBY}&min=${min}&max=${max}`,
    undefined,
  );
}
