import { httpPut } from '@/utils/http/main';

export async function modifyPassword(password: string, prePassword: string): Promise<undefined> {
  return await httpPut<{ password: string; prePassword: string }, undefined>('/user/modifyPassword', {
    password,
    prePassword,
  });
}
