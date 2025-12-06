
import { Card } from "@/components/ui/card";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ForgetPasswordForm from "./forgetPasswordFrom";

export default function ForgetPasswordPage() {



  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          {/* Icon */}
          <Mail className="h-12 w-12 text-primary" />

          {/* Title */}
          <h1 className="text-2xl font-bold text-center">
            "Forgot Password?
          </h1>

          {/* Description */}
          <p className="text-center text-muted-foreground text-sm leading-relaxed">
   Enter your email address and we'll send you a link to reset your password.
          </p>

          {/* Form or Success Message */}
          <ForgetPasswordForm/>

          {/* Back Link */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href="/login"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
