import { account } from "@/src/libs/appwrite";
import { OAuthProvider } from "appwrite";

export async function loginWithEmailPassword(email: string, password: string) {
    return await account.createEmailPasswordSession({ email, password });
}



export async function loginWithGoogle() {
   const isDev = process.env.NODE_ENV === "development";
   return account.createOAuth2Session({
    provider: OAuthProvider.Google,
    success: isDev ? (process.env.NEXT_PUBLIC_OAUTH_SUCCESS_REDIRECT_DEV || "http://localhost:3000/application") : (process.env.NEXT_PUBLIC_OAUTH_SUCCESS_REDIRECT || `${typeof window !== "undefined" ? window.location.origin : ""}/application`), // optional
    failure: isDev ? (process.env.NEXT_PUBLIC_OAUTH_FAILED_REDIRECT_DEV || "http://localhost:3000/login") : (process.env.NEXT_PUBLIC_OAUTH_FAILED_REDIRECT || `${typeof window !== "undefined" ? window.location.origin : ""}/login`), // optional
    scopes: ["openid", "email", "profile"] // optional
});
}