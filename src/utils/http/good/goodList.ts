import { httpGet } from '@/utils/http/main';

export interface GoodProp {
  /**
   * 商品 id
   * */
  gid: number;
  /**
   * 名字
   * */
  name: string;
  /**
   * 类别
   * */
  type: string;
  /**
   * 租金
   * */
  rent: number;
  /**
   * 购买价格
   * */
  price: number;
  /**
   * 图片
   * */
  picUrl: string;
  /**
   * 描述
   * */
  info: string;
  /**
   * 商店 id
   * */
  mid: number;
}

export interface GoodList extends GoodProp {
  total: number;
}

/**
 * @description 获取商品列表
 * @param pageSize 每页大小
 * @param pageNum 页码,从 0 开始
 * @param orderRule 正序反序
 * @param orderBy 排序规则
 * */
export async function getGoodList(
  pageSize: number,
  pageNum: number,
  orderRule: 'ASC' | 'DESC',
  orderBy: 'price' | 'gid' | 'rent',
): Promise<GoodList[]> {
  const data = await httpGet<undefined, [{ total: number }, ...GoodProp[]]>(
    `/good?pageSize=${pageSize}&pageNum=${pageNum}&orderRule=${orderRule}&orderBY=${orderBy}`,
    undefined,
  );
  const total = data[0].total;
  const goods: GoodList[] = [];
  for (let i = 1; i < data.length; i += 1) {
    goods.push({
      total,
      ...data[i],
    });
  }
  return goods;
}
