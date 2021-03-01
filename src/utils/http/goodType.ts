import { httpGet } from '@/utils/http/main';
import { GoodProp } from '@/utils/http/goodList';

export async function searchByType(
  type: string,
  pageSize: number,
  pageNum: number,
  orderRule: 'ASC' | 'DESC',
  orderBY: 'price',
): Promise<GoodProp[]> {
  return await httpGet<undefined, GoodProp[]>(
    `/good/type?type=${type}&pageSize=${pageSize}&pageNum=${pageNum}&orderRule=${orderRule}&orderBY=${orderBY}`,
    undefined,
  );
}
