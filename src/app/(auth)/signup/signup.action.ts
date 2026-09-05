"use server"

import { account, ID } from "@/src/libs/appwrite"

export async function createUserAction({email, password}:{email: string, password: string, }) {
  try {
    const newUser = await account.create(ID.unique(), email, password)
    return { message:`Account ${email} was created successfully`, success: true, userId: newUser.$id }
  } catch (error: unknown) {
    console.error(error)
    const message = error instanceof Error ? error.message : "Failed to create account";
    return { success: false, message }
  }
}
