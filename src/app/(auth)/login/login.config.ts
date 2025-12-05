import { account } from "@/src/libs/appwrite";

export async function loginWithEmailPassword(email: string, password: string) {
    return await account.createEmailPasswordSession({ email, password });
}
