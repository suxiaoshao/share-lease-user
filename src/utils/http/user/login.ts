import { httpPost } from '@/utils/http/main';
import { UserInfo } from '@/utils/http/user/getInfo';

/**
 * @description 登陆
 * @param email 邮箱
 * @param password 密码
 * */
export async function login(email: string, password: string): Promise<UserInfo> {
  return await httpPost<{ email: string; password: string }, UserInfo>('/user/login', { email, password });
}
