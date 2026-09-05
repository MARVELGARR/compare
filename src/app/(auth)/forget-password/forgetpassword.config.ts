import { account } from "@/src/libs/appwrite";

export const forgetPassword = async (
  email: string,
) => {
      const redirectUrl =
    process.env.NEXT_PUBLIC_PASSWORD_RESET_REDIRECT_DEV ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000/reset-password"
      : (typeof window !== "undefined"
          ? `${window.location.origin}/reset-password`
          : "/reset-password"));

    const promise = await account.createRecovery({
        email,
        url: redirectUrl
    });
    return promise;  
};
