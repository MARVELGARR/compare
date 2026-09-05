import { account } from "@/src/libs/appwrite";

export const forgetPassword = async (
  email: string,
) => {
      const redirectUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/reset-password"
      : "https://your-domain.com/reset-password";

    const promise = await account.createRecovery({
        email,
        url: redirectUrl
    });
    return promise;  
};
