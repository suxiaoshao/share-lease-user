import { httpGet } from '@/utils/http/main';
// import {  mailRetMes } from '@/utlis/http/mail';

export interface mailRetMes{
    status:string;
    message:string;
}

export async function resetPassword(
    email:string
):Promise<mailRetMes>{return await httpGet<undefined,mailRetMes>(
    `/user/resetPassword/mail?email=${email}`,
    undefined
);
}