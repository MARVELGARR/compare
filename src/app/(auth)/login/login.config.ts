import { account } from "@/src/libs/appwrite";
import { OAuthProvider } from "appwrite";

export async function loginWithEmailPassword(email: string, password: string) {
    return await account.createEmailPasswordSession({ email, password });
}



export async function loginWithGoogle() {
   return account.createOAuth2Session({
    provider: OAuthProvider.Google,
    success: process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_OAUTH_SUCCESS_REDIRECT_DEV : process.env.NEXT_PUBLIC_OAUTH_FAILED_REDIRECT, // optional
    failure: process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_OAUTH_FAILED_REDIRECT_DEV : process.env.NEXT_PUBLIC_OAUTH_FAILED_REDIRECT, // optional
    scopes: ["email", "profile"] // optional
});
}