import { account } from "@/src/libs/appwrite";




export const updatePasswordRecovery = async (
    userId: string,
    secret: string,
    password: string
) =>{

    return account.updateRecovery({
        userId,
        secret,
        password,
    });
}