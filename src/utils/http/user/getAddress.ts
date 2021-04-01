import { httpGet } from '@/utils/http/main';
import { UserAdress } from '@/utils/http/user/addNewAddress';

/**
 * @description 获取用户信息
 * @param uid 用户 id
 * */
export async function getUserAddress(): Promise<UserAdress[]> {
  return await httpGet<undefined, UserAdress[]>('/user/address/', undefined);
}
