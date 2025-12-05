import { account } from "@/src/libs/appwrite";

export async function createUser(userId: string, email: string, password: string) {
    try {
        const user = await account.create({
            userId,
            email,
            password
        });
        return user;
    } catch (e) {
        console.error(e);
        throw e;
    }
}