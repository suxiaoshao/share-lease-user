import { httpPost } from '@/utils/http/main';

/**
 * 用户确认到货
 * @param oid 订单 id
 * */
export async function confirmReceipt(oid: number): Promise<undefined> {
  return await httpPost<undefined, undefined>(`/order/expressed/${oid}`, undefined);
}
