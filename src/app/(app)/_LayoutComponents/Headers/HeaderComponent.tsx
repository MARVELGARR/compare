"use client"

import { MenuIcon, X } from "lucide-react"
import DesktopHeader from "./desktopHeader"
import { createContext, ReactNode, useContext, useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"





type NavContext = {
    isOpen: boolean
    setIsOpen?: () => void
    handleIsOpen: () => void
}

const NavContext = createContext<NavContext>({ isOpen: true, handleIsOpen: () => { } })


export const NavContextProvider = ({ children }: { children: ReactNode }) => {


    const [isOpen, setIsOpen] = useState(false)


    const handleIsOpen = () => {
        console.log("lklknkds")
        setIsOpen((prev) => !prev)
    }



    return (
        <NavContext.Provider value={{ isOpen, handleIsOpen }}>

            {isOpen && <div className="w-full h-full rounded-xl z-10 absolute left-0 top-0 bottom-0 right-0 bg-black opacity-50"></div>}

            {children}
        </NavContext.Provider>
    )
}


const useNav = () => {

    const navContext = useContext(NavContext)

    if (!navContext) {
        throw new Error("Cannotuse nav context out side of nav")
    }
    return navContext
}

export const HeaderContainer = () => {

    const { handleIsOpen, isOpen } = useNav()

    return (
        <div className="w-full flex item-center justify-between ">
            <div className="w-full hidden lg:block">

                <DesktopHeader />
            </div>
            <MenuIcon onClick={handleIsOpen} className="absolute lg:hidden right-8 top-14 w-6 h-6 text-secondary" />

            <div className="">
                {isOpen && (<MobileHader className=" bg-gray-300  text-primary transition animate ease-in 5s " />)}
            </div>
        </div>
    )
}


type NavItemType = {
    name: string,
    link?: string,

}


export const MobileHader = ({ className }: { className?: string }) => {

    const navItem: NavItemType[] = [{
        name: "Login",
        link: "/login"
    },
    {
        name: "contact",
    }]

    const { handleIsOpen } = useNav()
    return (
        <div className={cn("h-full w-[50%] z-100 bg-inherit absolute absolute right-0 top-0 bottom-0", className)}>

            <X className="absolute top-7 right-8" onClick={handleIsOpen} />

            <div className="flex text-lg flex-col w-full items-center justify-center gap-6 h-full">
                {navItem.map((items, index) => {
                    return (
                        <Link key={index} href={items.link ?? ""} className="hover:bg-gray-200 hover:text-xl">{items.name}</Link>
                    )
                })}
            </div>

        </div>
    )
}



