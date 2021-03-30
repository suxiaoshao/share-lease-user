import { httpPost } from '@/utils/http/main';

export interface UserAdress {
  province: '';
  city: '';
  district: '';
  town: '';
  address: '';
  phone: '';
  name: '';
  [key: string]: string;
}

/**
 * @description 获取用户信息
 * @param uid 用户 id
 * */
export async function addNewAddress(address: UserAdress): Promise<undefined> {
  return await httpPost<UserAdress, undefined>('/user/address/', { ...address });
}
