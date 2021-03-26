import { httpPost } from '@/utils/http/main';
import { OrderDetail } from '@/utils/http/order/getOrderList';

/**
 * 创建购买订单
 * @param gid 商品 id
 * @param address 地址
 * */
export async function createBugOrder(gid: number, num: number, address: string): Promise<OrderDetail> {
  return await httpPost<{ gid: number; num: number; address: string }, OrderDetail>('/order/buy', {
    gid,
    num,
    address,
  });
}
