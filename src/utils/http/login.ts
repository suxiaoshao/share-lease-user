import { httpPost } from '@/utils/http/main';
import { UserInfo } from '@/utils/http/getInfo';
export async function login(
    email:string,
    password:string
):Promise<UserInfo>{
    return await httpPost<{email:string,password:string},UserInfo>(
        'user/register',
        {email,password},
    );
}



// import { httpPost } from '@/utils/http/main';

// export async function register(username: string, password: string, email: string, code: string): Promise<undefined> {
//   return await httpPost<{ username: string; password: string; email: string; code: string }, undefined>(
//     '/user/register',
//     { username, password, email, code },
//   );
// }
