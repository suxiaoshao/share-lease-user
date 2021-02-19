import { httpGet } from '@/utils/http/main';

export interface MailRetMes {
  status: number;
  message: string;
}

export async function mail(email: string): Promise<MailRetMes> {
  return await httpGet<undefined, MailRetMes>(`/user/register/mail?email=${email}`, undefined);
}
