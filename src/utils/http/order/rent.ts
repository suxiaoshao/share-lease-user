import { httpPost } from '@/utils/http/main'
import { orderDtail } from '@/utils/http/order/getOrder'

export async function rent(gid:number,rid:number,address:string):Promise<orderDtail>{
    return await httpPost<{gid:number;rid:number;address:string},orderDtail>
    (
        '/order/rent',
        {gid,rid,address}
    )
}