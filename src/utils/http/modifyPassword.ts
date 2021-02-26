import { httpPut } from '@/utils/http/main';

/**
 * @description 修改密码
 * @param password {string} 新密码
 * @param prePassword {string} 旧密码
 * */
export async function modifyPassword(password: string, prePassword: string): Promise<undefined> {
  return await httpPut<{ password: string; prePassword: string }, undefined>('/user/modifyPassword', {
    password,
    prePassword,
  });
}
