import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login/Signup ",
  description: "Login into your account",
};

const AuthLayout = ({children}: {children: ReactNode}) => {

    return (
        <div className="">{children}</div>
    );
}
 
export default AuthLayout;