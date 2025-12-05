import { Card } from "@/components/ui/card"
import { CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { account } from "@/src/libs/appwrite"

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const userId = searchParams.userId as string
  const secret = searchParams.secret as string

  let status: "success" | "error" = "error"
  let message = "Verification failed."

  if (!userId || !secret) {
    message = "Missing verification parameters."
  } else {
    try {
      const res = await account.updateVerification({ userId, secret })
      console.log("Verification success:", res)

      status = "success"
      message = "Your email has been successfully verified."
    } catch (error: any) {
      console.log("Verification error:", error)
      message = error?.message || "The verification link is invalid or expired."
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          
          {status === "success" && (
            <CheckCircle className="h-12 w-12 text-green-500" />
          )}
          
          {status === "error" && (
            <AlertCircle className="h-12 w-12 text-destructive" />
          )}

          <h1 className="text-2xl font-bold text-center">
            {status === "success" ? "Email Verified" : "Verification Failed"}
          </h1>

          <p className="text-center text-muted-foreground text-sm leading-relaxed">
            {message}
          </p>

          <div className="flex flex-col gap-3 w-full pt-4">
            {status === "success" ? (
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-opacity"
              >
                Go to Login
              </Link>
            ) : (
              <Link
                href="/"
                className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-opacity"
              >
                Return Home
              </Link>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
