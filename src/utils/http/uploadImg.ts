import { httpPost } from '@/utils/http/main';

export async function upload(formData: FormData): Promise<string> {
  return await httpPost<FormData, string>('/upload', formData);
}
