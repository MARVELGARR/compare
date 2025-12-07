"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, GitCompare } from "lucide-react"

const navItems = [
  {
    name: "overview",
    link: "/application",
    icon: LayoutDashboard,
  },
  {
    name: "compare",
    link: "/application/compare",
    icon: GitCompare,
  },
]

const DesktopNavbar = () => {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col items-center dark gap-4 w-20 absolute top-[50%] py-4">
      {navItems.map((item, index) => {
        const isActive = pathname.endsWith(item.link)
        const IconComponent = item.icon

        return (
          <Link
            key={index}
            href={item.link}
            className={`
              group h-10 w-10 flex items-center justify-center rounded-lg 
              transition-colors duration-200
              ${isActive ? "bg-sidebar-primary" : "bg-sidebar-accent hover:bg-sidebar-primary"}
            `}
            title={item.name}
          >
            <IconComponent
              className={`
                w-5 h-5
                transition-colors duration-200
                ${isActive ? "text-sidebar-primary-foreground" : "text-sidebar-accent-foreground group-hover:text-sidebar-primary-foreground"}
              `}
            />
          </Link>
        )
      })}
    </nav>
  )
}

export default DesktopNavbar
