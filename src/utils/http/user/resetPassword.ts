import { httpPut } from '@/utils/http/main';

/**
 * @description 忘记密码
 * @param email 邮箱
 * @param password 新密码
 * @param code 验证码
 * */
export async function resetPassword(email: string, password: string, code: string): Promise<undefined> {
  return await httpPut<{ email: string; password: string; code: string }, undefined>(`/user/resetPassword`, {
    email,
    password,
    code,
  });
}
