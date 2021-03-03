import { httpPost } from '@/utils/http/main';
import { OrderDetail } from '@/utils/http/order/getOrderList';

/**
 * 创建租订单
 * @param gid 商品id
 * @param rid 租金 id
 * @param address 地址
 * */
export async function createRentOrder(gid: number, rid: number, address: string): Promise<OrderDetail> {
  return await httpPost<{ gid: number; rid: number; address: string }, OrderDetail>('/order/createRentOrder', {
    gid,
    rid,
    address,
  });
}
