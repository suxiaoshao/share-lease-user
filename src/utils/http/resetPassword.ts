import { httpGet } from '@/utils/http/main';

export interface ResetRetMes {
  status: number;
  message: string;
}

export async function resetPassword(email: string, password: string, code: string): Promise<ResetRetMes> {
  return await httpGet<{ email: string; password: string; code: string }, ResetRetMes>(`/user/resetPassword`, {
    email,
    password,
    code,
  });
}
