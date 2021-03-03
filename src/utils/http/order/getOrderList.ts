import { httpGet } from '@/utils/http/main';

export interface OrderDetail {
  /**
   * 订单号
   * */
  oid: number;
  /**
   * 商品号
   * */
  gid: number;
  /**
   * 用户号
   * */
  uid: number;
  /**
   * 价格
   * */
  money: number;
  /**
   * 保证金
   * */
  pledge: number;
  /**
   * 租借时长
   * */
  time: number;
  /**
   * 到期时间
   * */
  expiredTime: number;
  /**
   * 创建时间
   * */
  createTime: string;
  /**
   * 状态
   * */
  status: string;
  expired: string | null;
  revert: string | null;
  /**
   * 地址
   * */
  address: string;
}

/**
 * 获取自己订单列表
 * @param orderBy 排序规则
 * @param pageSize 页大小
 * @param pageNum 页码
 * @param orderRule 正序倒叙
 * @param status 状态,可以无，代表筛选所有
 * */
export async function getOrderList(
  orderBy: 'status' | 'createTime',
  pageSize: number,
  pageNum: number,
  orderRule: 'ASC' | 'DESC',
  status?: 'create',
): Promise<OrderDetail[]> {
  const url =
    status === undefined
      ? `/order?orderBy=${orderBy}&pageSize=${pageSize}&pageNum=${pageNum}&orderRule=${orderRule}`
      : `/order?orderBy=${orderBy}&pageSize=${pageSize}&pageNum=${pageNum}&orderRule=${orderRule}&status=${status}`;
  return await httpGet<undefined, OrderDetail[]>(url, undefined);
}
