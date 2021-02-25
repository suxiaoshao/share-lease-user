import { httpGet } from '@/utils/http/main';

export interface UserInfo {
  /**
   * 用户 id
   * */
  uid: number;
  /**
   * 邮件
   * */
  email: string;
  /**
   * 用户名
   * */
  username: string;
  /**
   * 加密后密码
   * */
  password: string;
  /**
   * 电话号码
   * */
  phone: string | null;
  /**
   * 权限级别
   * */
  level: number;
  /**
   * 头像
   * */
  avatar: string | null;
  /**
   * accessToken
   * */
  accessToken: string;
}

/**
 * 获取用户信息
 * */
export async function getInfo(uid: string): Promise<UserInfo> {
  return await httpGet<undefined, UserInfo>(`/user/getInfo?uid=${uid}`, undefined);
}
