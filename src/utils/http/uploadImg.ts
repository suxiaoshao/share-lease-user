import { httpPost } from '@/utils/http/main';

export async function upload(file: File): Promise<undefined> {
  return await httpPost<{ file: File }, undefined>('/upload', {
    file,
  });
}
