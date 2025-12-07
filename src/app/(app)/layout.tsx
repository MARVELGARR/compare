import { Metadata } from "next";
import { ReactNode } from "react";
import { HeaderContainer } from "./_LayoutComponents/Headers/HeaderComponent";
import DesktopNavbar from "./_LayoutComponents/sidebar/desktopNavbar";


export const metadata: Metadata ={
    title: "FavCompare",
    description: "Compare your fav progress",
}

const AppLayout = ({children}: {children: ReactNode}) => {
    return (
        <div className=" bg-background dark mx-auto h-full max-w-6xl  ">
            <HeaderContainer/>

            <div className="">
                <DesktopNavbar/>
            </div>
            {children}
            </div>
    );
}
 
export default AppLayout;