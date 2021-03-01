import { httpGet } from '@/utils/http/main';

/**
 * @description 发送注册验证码
 * @author sushao
 * @param email 注册的邮箱
 * */
export async function sendMailCode(email: string): Promise<undefined> {
  return await httpGet<undefined, undefined>(`/user/register/mail?email=${email}`, undefined);
}
