import { httpDelete } from '@/utils/http/main';

/**
 * 删除现有地址
 * @param aid 地址id
 * */
export async function deleteUserAddress(aid: string): Promise<undefined> {
  return await httpDelete<undefined, undefined>(`/user/address/${aid}`, undefined);
}
