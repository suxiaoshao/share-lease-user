import { httpGet } from '@/utils/http/main';
import { GoodProp } from '@/utils/http/goodList';

export async function good(i: number): Promise<GoodProp> {
  return await httpGet<undefined, GoodProp>(`/good/${i}`, undefined);
}
