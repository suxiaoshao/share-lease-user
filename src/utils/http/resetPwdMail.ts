import { httpGet } from '@/utils/http/main';

export interface ResetRetMes {
  status: number;
  message: string;
}

export async function resetPwdMail(email: string): Promise<ResetRetMes> {
  return await httpGet<undefined, ResetRetMes>(`/user/resetPassword/mail?email=${email}`, undefined);
}
