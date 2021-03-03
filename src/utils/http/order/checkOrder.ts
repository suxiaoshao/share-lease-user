import { httpGet } from '@/utils/http/main';
import { OrderDetail } from '@/utils/http/order/getOrderList';

/**
 * @description 查看某个订单
 * @param orderId 订单 id
 * */
export async function checkOrder(orderId: number): Promise<OrderDetail> {
  return await httpGet<undefined, OrderDetail>(`/order/${orderId}`, undefined);
}
