import { httpGet } from '@/utils/http/main';

export interface orderDtail{
    oid: number,
    gid: number,
    uid: number,
    money: number,
    pledge: number,
    time: number,
    expiredTime: number,
    createTime: string,
    status: string,
    express: string,
    revert: string,
    address:string
}

export async function getOrder(
    orderBy: 'status',
    pageSize: number,
    pageNum: number,
    orderRule: 'ASC' | 'DESC',
    status:'create'
    ):Promise<orderDtail[]>{
        return await httpGet<undefined,orderDtail[]>(
            `/order?orderBy=${orderBy}&pageSize=${pageSize}&pageNum=${pageNum}&orderRule=${orderRule}&status=${status}`,
            undefined
        )
    }

