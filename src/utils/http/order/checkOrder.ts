import { httpGet } from '@/utils/http/main'
import { orderDtail } from '@/utils/http/order/getOrder'

export async function checkOrder(
    ordernum:number
    ):Promise<orderDtail>{
        return await httpGet<undefined,orderDtail>(
            `/order/${ordernum}`,
            undefined
        )
    }