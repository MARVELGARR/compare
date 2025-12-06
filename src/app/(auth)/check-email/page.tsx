import { Mail, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Check Your Email",
  description: "Verify your email address to complete your account setup",
}

export default function CheckEmail() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-primary/10 rounded-full p-3">
              <Mail className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="space-y-2">
            <CardTitle className="text-2xl">Check your email</CardTitle>
            <CardDescription className="text-base">
              We've sent you a confirmation link to verify your email address.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">Check your inbox</p>
                <p className="text-muted-foreground">Look for an email from us</p>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">Click the confirmation link</p>
                <p className="text-muted-foreground">Open the link to activate your account</p>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">Don't see the email?</p>
                <p className="text-muted-foreground">Check your spam or junk folder</p>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">
              The link will expire in 24 hours. If you don't receive an email, please try signing up again.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
