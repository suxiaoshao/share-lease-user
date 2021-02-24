import { httpPost } from '@/utils/http/main';
import { UserInfo } from '@/utils/http/getInfo';

export async function update(updateItem: string, updateInfo: string): Promise<UserInfo> {
  const sendObj = {};
  sendObj[updateItem] = updateInfo;
  return await httpPost<{ updateItem: string; updateInfo: string }, UserInfo>('/user/update', sendObj);
}
