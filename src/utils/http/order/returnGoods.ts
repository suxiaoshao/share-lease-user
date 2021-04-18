import { httpPost } from '@/utils/http/main';

/**
 * 用户退货
 * @param oid 订单 id
 * */
export async function returnGood(revert: string, oid: number): Promise<undefined> {
  return await httpPost<{ revert: string }, undefined>(`/order/abandon/${oid}`, {
    revert,
  });
}
