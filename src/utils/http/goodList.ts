import { httpGet } from '@/utils/http/main';

export interface GoodProp {
  gid: number;
  name: string;
  type: string;
  rent: number;
  price: number;
  picUrl: string;
  info: string;
  mig: number;
}

export async function getGoodList(
  pageSize: number,
  pageNum: number,
  orderRule: 'ASC' | 'DESC',
  orderBy: 'price',
): Promise<GoodProp[]> {
  return await httpGet<undefined, GoodProp[]>(
    `/good?pageSize=${pageSize}&pageNum=${pageNum}&orderRule=${orderRule}&orderBY=${orderBy}`,
    undefined,
  );
}
