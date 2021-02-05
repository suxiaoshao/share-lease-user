import { httpGet } from '@/utils/http/main';
import { GoodProp } from '@/utils/http/goodList';

export async function search(
    keyword:string,
    pageSize:number,
    pageNum:number,
    oderRule:'ASC' | 'DESC',
    orderBY:'price',
    min:number,
    max:number,
):Promise<GoodProp>{
    return await httpGet<undefined,GoodProp>(//requesturl returndata
        `/good/search?keyword=${keyword}&pageSize=${pageSize}&pageNum=${pageNum}&orderRule=${oderRule}&orderBY=${orderBY}&min=${min}&max=${max}`,
        undefined,
    );
}

