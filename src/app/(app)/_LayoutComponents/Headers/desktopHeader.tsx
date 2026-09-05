'use client'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/src/providers/authContext"
import { useRouter } from "next/navigation"

export default function DesktopHeader() {

  const router = useRouter()
  const {User, logout, isAuthenticated} = useAuth()
  const moveToLogin = () => router.push("/login")
   const initials = User?.name.split(" ").map(n => n[0]).slice(0,2).join("");
  return (
    <header className="border-b dark border-border bg-card w-full">
      <div className="px-8 py-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-card text-sm font-bold">CI</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-muted-foreground">Compare</span>
            <span className="text-foreground">.Insights</span>
          </h1>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center gap-4">
          <Button variant="outline" className="rounded-full text-foreground text-sm bg-transparent">
            🚀 Contact
          </Button>

          <div className="flex items-center gap-2 pl-4 border-l border-border">
            <div className="text-right text-sm">
              <p className="text-foreground font-medium">{User?.name || "Guest"}</p>
              <Button onClick={isAuthenticated ? logout :  moveToLogin } className="text-muted-foreground text-xs p-0 h-0">{isAuthenticated ? "sign out" : "sign in" }</Button>
            </div>
            <Avatar className="w-10 h-10 text-foreground">
              <AvatarImage role="img" alt="profile pic" src="https://api.dicebear.com/7.x/avataaars/svg?seed=James" />
              <AvatarFallback>{initials|| "cn"}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}
