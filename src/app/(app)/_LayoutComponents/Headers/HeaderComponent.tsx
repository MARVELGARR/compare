"use client"

import { MenuIcon, X } from "lucide-react"
import DesktopHeader from "./desktopHeader"
import { createContext, ReactNode, useContext, useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/src/components/ui/button"





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

            {isOpen && <div className="w-full lg:hidden h-full rounded-xl z-10 absolute left-0 top-0 bottom-0 right-0 bg-black opacity-50"></div>}

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
        <div className="w-full flex item-center justify-between  relative ">
            <div className="w-full hidden lg:block">

                <DesktopHeader />
            </div>
            <MenuIcon onClick={handleIsOpen} className="absolute lg:hidden right-8 top-14 w-6 h-6 text-secondary" />

            <div className="">
                {isOpen && (<MobileHeader className="  bg-zinc-900 border-l border-zinc-800 text-white transition-all shadow-2xl " />)}
            </div>
        </div>
    )
}


type NavItemType = {
    name: string,
    link?: string,

}


export const MobileHeader = ({ className }: { className?: string }) => {
    const pathname = usePathname();

    const navItems: NavItemType[] = [
        {
            name: "Overview",
            link: "/application"
        },
        {
            name: "Comparison",
            link: "/application/compare"
        },
        {
            name: "Contact",
            link: "#"
        },
    ]

    const { handleIsOpen } = useNav()
    return (
        <div className={cn("h-full w-[280px] sm:w-[350px] z-[100] fixed lg:hidden right-0 top-0 bottom-0", className)}>

            <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-10">
                    <span className="font-bold text-xl">Menu</span>
                    <Button variant="ghost" size="icon" onClick={handleIsOpen} className="rounded-full">
                        <X className="w-6 h-6" />
                    </Button>
                </div>

                <nav className="flex flex-col gap-2">
                    {navItems.map((item, index) => {
                        const isActive = pathname === item.link;
                        return (
                            <Link
                                key={index}
                                href={item.link ?? ""}
                                onClick={handleIsOpen}
                                className={cn(
                                    "px-4 py-3 rounded-xl text-lg transition-colors",
                                    isActive ? "bg-white text-black font-semibold" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                                )}
                            >
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                <div className="mt-auto pt-6 border-t border-zinc-800">
                    <p className="text-zinc-500 text-sm">© 2025 Compare.Insights</p>
                </div>
            </div>

        </div>
    )
}



