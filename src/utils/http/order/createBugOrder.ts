import { httpPost } from '@/utils/http/main';
import { OrderDetail } from '@/utils/http/order/getOrderList';

/**
 * 创建购买订单
 * @param gid 商品 id
 * @param address 地址
 * */
export async function createBugOrder(gid: number, num: number, aid: number): Promise<OrderDetail> {
  return await httpPost<{ gid: number; num: number; aid: number }, OrderDetail>('/order/buy', {
    gid,
    num,
    aid,
  });
}
