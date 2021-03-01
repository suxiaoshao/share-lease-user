import { httpPost } from '@/utils/http/main';

/**
 * @description 上传文件
 * */
export async function upload(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  return await httpPost<FormData, string>('/upload', formData);
}
