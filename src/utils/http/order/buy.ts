import { httpPost } from '@/utils/http/main'
import { orderDtail } from '@/utils/http/order/getOrder'

export async function buy(gid:number,address:string):Promise<orderDtail>{
    return await httpPost<{gid:number;address:string},orderDtail>
    (
        '/order/buy',
        {gid,address}
    )
}