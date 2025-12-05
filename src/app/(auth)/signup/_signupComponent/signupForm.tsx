
import { useForm } from "react-hook-form";
import { z } from "zod";


const signUpSchema = z.object({
    email: z.email().min(2, {
        error: "Email cannot be less than 2 characters"
    }),
    password: z.string().min(5,{
        error: "Password cannot be less that 5 characters"
    })
})

type SignupFormType = z.output<typeof signUpSchema>

const SignupForm = () => {

    const form = useForm<SignupFormType>({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    return (
        <div className=""></div>
    );
}
 
export default SignupForm;