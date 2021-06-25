import { httpGet } from '@/utils/http/main';
import { GoodProp } from '@/utils/http/good/goodList';

export type StatusType =
  | 'create'
  | 'expressed'
  | 'expressing'
  | 'paying'
  | 'finish'
  | 'abandon'
  | 'abandoned'
  | 'payed'
  | 'overtime'
  | 'expired'
  | 'revert'
  | 'waiting';

export interface Merchant {
  /**
   * 商家id
   */
  mid: 1;
  /**
   * 店铺名
   */
  name: string;
  /**
   * 店铺简介
   */
  info: string;
  /**
   * 店主id
   */
  uid: number;
}

export interface OrderProp {
  /**
   * 地址
   * */
  address: string;
  /**
   * 创建时间
   * */
  createTime: string;
  /**
   * 到期时间
   * */
  expiredTime: number;
  /**
   * 快递
   */
  express: string;
  /**
   * 商品
   */
  good: GoodProp;
  /**
   * 金额
   */
  money: number;
  /**
   * 收件人姓名
   */
  name: string;
  /**
   * 数量
   */
  num: number;
  /**
   * 订单号
   */
  oid: number;
  /**
   * 状态
   * */
  status: StatusType;
  revert: string | null;
  /**
   * 商家信息
   */
  merchant: Merchant;
  /**
   * 收件人手机号
   */
  phone: string;
  /**
   * 订单号
   */
  pid: string;
  /**
   * 保证金
   * */
  pledge: number;
  /**
   * 租借时长
   * */
  time: number;
  /**
   * 购买用户的id
   */
  uid: number;
}

export interface OrderDetail {
  /**
   * 有无下一页
   */
  hasNextPage: boolean;
  /**
   * 有无前一页
   */
  hasPreviousPage: boolean;
  /**
   * 是否是第一页
   */
  isFirstPage: boolean;
  /**
   * 是否是最后一页
   */
  isLastPage: boolean;
  /**
   * 总数
   */
  total: number;
  /**
   * 页的大小
   */
  pageSize: number;
  /**
   * 订单列表
   */
  list: OrderProp[];
}

/**
 * 获取自己订单列表
 * @param orderBy 排序规则
 * @param pageSize 页大小
 * @param pageNum 页码
 * @param orderRule 正序倒叙
 * @param status 状态,可以无，代表筛选所有
 * @param type 状态,可以无，代表筛选所有
 * */
export async function getOrderList(
  orderBy: 'status' | 'createTime',
  pageSize: number,
  pageNum: number,
  orderRule: 'ASC' | 'DESC',
  type: 'rent' | 'buy',
  status?: 'create',
): Promise<OrderDetail> {
  const url =
    status === undefined
      ? `/order?orderBy=${orderBy}&pageSize=${pageSize}&pageNum=${pageNum}&orderRule=${orderRule}&type=${type}`
      : `/order?orderBy=${orderBy}&pageSize=${pageSize}&pageNum=${pageNum}&orderRule=${orderRule}&status=${status}&type=${type}`;
  return await httpGet<undefined, OrderDetail>(url, undefined);
}
