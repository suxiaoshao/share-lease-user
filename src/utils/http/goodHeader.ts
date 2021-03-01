import { httpGet } from '@/utils/http/main';
import { GoodProp } from '@/utils/http/goodList';

export async function getHeader(): Promise<GoodProp[]> {
  return await httpGet<undefined, GoodProp[]>('/good/header', undefined);
}
