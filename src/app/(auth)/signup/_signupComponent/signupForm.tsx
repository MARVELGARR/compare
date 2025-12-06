"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createUserAction } from "../signup.action";
import { toast } from "sonner";
import { account } from "@/src/libs/appwrite";
import { useRouter } from "next/navigation";

const signUpSchema = z.object({
  email: z.email().min(2, {
    error: "Email cannot be less than 2 characters",
  }),
  password: z.string().min(5, {
    error: "Password cannot be less that 5 characters",
  }),
});

type SignupFormType = z.output<typeof signUpSchema>;

const SignupForm = ({ className }: { className?: string }) => {
  const router = useRouter()
    const form = useForm<SignupFormType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignupFormType) => {
    try{
        const result = await createUserAction({...values})
        
        if (!result.success) {
           toast.success(result.message)
            return
        }
        else{
            toast.error(result.message)
        }
        
        const LoginResult = await account.createEmailPasswordSession(values.email, values.password)

        if(!LoginResult){
            toast.error("Failed to login user")
        }

        await account.createEmailVerification({
            url: "http://localhost:3000/email-verify"
         }).then(()=>{
            toast.success("An email has be sent to you ")
            router.push('/check-email')
         }).catch(()=>{
            toast.error("something went wrong")
         })

         
    }
    catch(error){
        toast.error("something went wrong")
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sign up</CardTitle>
          <CardDescription>
            Sign up using your email and password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Email</FieldLabel>
                <Input
                  id="username"
                  type="email"
                  placeholder="marvel@example.com"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <FieldDescription className="text-destructive">
                    {form.formState.errors.email.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Input
                  id="password"
                  type="password"
                  {...form.register("password")}
                />
                {form.formState.errors.password && (
                  <FieldDescription className="text-destructive">
                    {form.formState.errors.password.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Button type="submit">Sign up</Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/login">Login</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
};

export default SignupForm;
