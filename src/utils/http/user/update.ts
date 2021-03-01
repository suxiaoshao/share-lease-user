import { httpPost } from '@/utils/http/main';
import { UserInfo } from '@/utils/http/user/getInfo';

export interface UserUpdateInfo {
  username: string;
  phone: string;
  avatar: string;
}

/**
 * @description 更新用户信息
 * @param username 新用户名
 * @param phone 新电话
 * @param avatar 新头像
 * */
export async function update(username: string, phone: string, avatar: string): Promise<UserInfo> {
  return await httpPost<UserUpdateInfo, UserInfo>('/user/update', { username, phone, avatar });
}
