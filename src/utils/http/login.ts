import { httpPost } from '@/utils/http/main';
import { UserInfo } from '@/utils/http/getInfo';

export interface LoginRetMes extends UserInfo {
  status: number;
  message: string;
}

export async function login(email: string, password: string): Promise<LoginRetMes> {
  return await httpPost<{ email: string; password: string }, LoginRetMes>('/user/register', { email, password });
}
