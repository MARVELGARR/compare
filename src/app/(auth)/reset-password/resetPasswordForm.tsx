'use client'
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { updatePasswordRecovery } from "./resetPassword.config";
import { useRouter } from "next/navigation";

const ResetPasswordForm = ({userId, secret}:{userId: string, secret: string}) => {
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)


    const router = useRouter()


    const onSubmit = () =>{

        if (!password || password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }

        setIsLoading(true)
      updatePasswordRecovery(userId, secret, password)
        .then(async () => {
            toast.success("Password reseted")
        })
        .catch(() => {
            toast.error("Failed to reset password")
        }).finally(()=>{
            setIsLoading(false)
            router.push("/login")
        })
        
    }
    return (
        <div className="flex flex-col gap-3 w-full pt-4">
            <FieldGroup>

            <Field>
                <FieldLabel>New Password</FieldLabel>
                <Input
                type="password"
                placeholder="******"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
            </Field>
            <Field>
                <Button disabled={isLoading} onClick={onSubmit} type="button">Submit</Button>
            </Field>
            </FieldGroup>
          </div>
    );
}
 
export default ResetPasswordForm;