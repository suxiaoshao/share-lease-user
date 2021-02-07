import { httpPost } from '@/utils/http/main';

export interface RegisterRetMes {
  status: number;
  message: string;
}

export async function register(
  username: string,
  password: string,
  email: string,
  code: string,
): Promise<RegisterRetMes> {
  return await httpPost<{ username: string; password: string; email: string; code: string }, RegisterRetMes>(
    '/user/register',
    { username, password, email, code },
  );
}
