import { Metadata } from "next";
import { ReactNode } from "react";


export const metadata: Metadata ={
    title: "FavCompare",
    description: "Compare your fav progress",
}

const AppLayout = ({children}: {children: ReactNode}) => {
    return (
        <div className="">
            {children}
            </div>
    );
}
 
export default AppLayout;