import { httpGet } from '@/utils/http/main';
import { GoodProp } from '@/utils/http/good/goodList';

/**
 * @description 根据类型排序
 * @param type
 * @param pageSize 每页大小
 * @param pageNum 页码,从 0 开始
 * @param orderRule 正序反序
 * @param orderBY 排序规则
 * */
export async function searchByType(
  type: string,
  pageSize: number,
  pageNum: number,
  orderRule: 'ASC' | 'DESC',
  orderBY: 'price' | 'gid' | 'rent',
): Promise<GoodProp[]> {
  return await httpGet<undefined, GoodProp[]>(
    `/good/type?type=${type}&pageSize=${pageSize}&pageNum=${pageNum}&orderRule=${orderRule}&orderBY=${orderBY}`,
    undefined,
  );
}
