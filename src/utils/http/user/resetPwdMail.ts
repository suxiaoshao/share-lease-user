import { httpGet } from '@/utils/http/main';

/**
 * @description 忘记密码发送验证码
 * @param email 注册邮箱
 * */
export async function resetPwdMail(email: string): Promise<undefined> {
  return await httpGet<undefined, undefined>(`/user/resetPassword/mail?email=${email}`, undefined);
}
