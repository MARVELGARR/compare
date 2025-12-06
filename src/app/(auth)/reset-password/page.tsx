import { Card } from "@/components/ui/card"
import { CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import ResetPasswordForm from "./resetPasswordForm"

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your password with a secure link",
}

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const userId = params.userId as string | undefined
  const secret = params.secret as string | undefined

  let status: "pending" | "error" = "error"
  let message = "Password reset failed."

  if (!userId || !secret) {
    message = "Missing or invalid reset link. Please request a new password reset."
  } else {
    status = "pending"
    message = "Enter your new password below."
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          {/* Icon */}
          {status === "pending" && <CheckCircle className="h-12 w-12 text-primary" />}
          {status === "error" && <AlertCircle className="h-12 w-12 text-destructive" />}

          {/* Title */}
          <h1 className="text-2xl font-bold text-center">{status === "pending" ? "Reset Password" : "Reset Failed"}</h1>

          {/* Message */}
          <p className="text-center text-muted-foreground text-sm leading-relaxed">{message}</p>

          {/* Form or Error Actions */}
          <div className="w-full space-y-3 pt-4">
            {status === "pending" && userId && secret ? (
              <ResetPasswordForm userId={userId} secret={secret} />
            ) : (
              <>
                <Link
                  href="/forget-password"
                  className="inline-flex w-full items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-opacity"
                >
                  Request New Link
                </Link>
                <Link
                  href="/login"
                  className="inline-flex w-full items-center justify-center px-4 py-2 bg-secondary text-secondary-foreground rounded-md font-medium hover:opacity-90 transition-opacity"
                >
                  Back to Login
                </Link>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
