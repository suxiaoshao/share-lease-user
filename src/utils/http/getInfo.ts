import { httpGet } from '@/utils/http/main';

export interface UserInfo {
  uid: number;
  email: string;
  username: string;
  password: string;
  phone: string;
  level: number;
  avatar: string;
  accessToken: string;
}

export async function getInfo(uid: string): Promise<UserInfo> {
  return await httpGet<undefined, UserInfo>(`/user/getInfo?uid=${uid}`, undefined);
}
