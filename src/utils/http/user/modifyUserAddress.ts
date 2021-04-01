import { httpPut } from '@/utils/http/main';
import { UserAdress } from '@/utils/http/user/addNewAddress';

/**
 * @description 修改地址
 * */
export async function modifyUserAddress(address: UserAdress): Promise<undefined> {
  return await httpPut<UserAdress, undefined>('/user/address', { ...address });
}
