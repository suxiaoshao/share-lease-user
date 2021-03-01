import { httpPost } from '@/utils/http/main';

/**
 * @description 注册
 * @param username 用户名
 * @param password 密码
 * @param email 邮箱
 * @param code 验证码
 * */
export async function register(username: string, password: string, email: string, code: string): Promise<undefined> {
  return await httpPost<{ username: string; password: string; email: string; code: string }, undefined>(
    '/user/register',
    { username, password, email, code },
  );
}
