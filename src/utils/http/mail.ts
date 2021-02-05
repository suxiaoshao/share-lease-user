import { httpGet } from '@/utils/http/main';

export interface mailRetMes{
    status:string;
    message:string;
}

export async function mail(
    email:string
):Promise<mailRetMes>{
    return await httpGet<undefined,mailRetMes>(
        `/user/register/mail?email=${email}`,
        undefined
    );
}
