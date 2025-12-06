"use client";
import { useState } from "react";
import { forgetPassword } from "./forgetpassword.config";
import { toast } from "sonner";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    forgetPassword(email)
      .then((res) => {
        toast.success("An email has been sent to you");
        router.push("/check-email");
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Failed to reset password");
        toast.error("Failed to reset password");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      {error && (
        <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
          {error}
        </div>
      )}

      <Field className="space-y-2">
        <FieldLabel htmlFor="email" className="text-sm font-medium">
          Email Address
        </FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="youremail@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </Field>

      <Button   type="submit" className="w-full" disabled={isLoading || !email}>
        {isLoading ? "Sending..." : "Send Reset Link"}
      </Button>
    </form>
  );
};

export default ForgetPasswordForm;
