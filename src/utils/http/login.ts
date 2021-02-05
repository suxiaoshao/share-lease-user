import { httpPost } from '@/utils/http/main';
import { UserInfo } from '@/utils/http/getInfo';

export async function login(email: string, password: string): Promise<UserInfo> {
  return await httpPost<{ email: string; password: string }, UserInfo>('/user/register', { email, password });
}
