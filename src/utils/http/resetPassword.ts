import { httpGet } from '@/utils/http/main';

export async function resetPassword(email: string, password: string, code: string): Promise<undefined> {
  return await httpGet<{ email: string; password: string; code: string }, undefined>(`/user/resetPassword`, {
    email,
    password,
    code,
  });
}
