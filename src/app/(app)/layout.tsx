"use client"

import { ReactNode, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp, LayoutGrid } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { HeaderContainer } from "./_LayoutComponents/Headers/HeaderComponent";
import { useAuth } from "@/providers/authContext";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  const isOverview = pathname === "/application" || pathname === "/application/";
  const isComparison = pathname?.includes("/compare");

  // Route guard: the middleware (proxy.ts) can't verify Appwrite browser-SDK
  // sessions (localStorage, no cookie), so unauthenticated users are bounced
  // here instead — after the real `account.get()` check settles.
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="h-screen bg-[#a8cfc4] p-2">
        <div className="h-full overflow-hidden rounded-3xl bg-[#0a0a0a] shadow-2xl flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#a8cfc4] p-2  ">
      <div className=" h-full ">

        <div className="overflow-hidden  rounded-3xl bg-[#0a0a0a] shadow-2xl h-full  ">
          {/* Header - Using your original auth header */}




          <HeaderContainer />

          {/* Sidebar + Content */}
          <div className="flex h-full overflow-hidden">
            {/* Sidebar */}
            <aside className="hidden lg:flex w-16 flex-col items-center gap-4 border-r border-neutral-800 py-8 flex-shrink-0">
              <Button
                size="icon"
                variant={isOverview ? "default" : "ghost"}
                className={`rounded-full ${isOverview ? "bg-white text-black hover:bg-neutral-200" : "text-neutral-400 hover:bg-neutral-800 hover:text-white"}`}
                onClick={() => router.push("/application")}
              >
                <LayoutGrid className="h-5 w-5" />
              </Button>

              <Button
                size="icon"
                variant={isComparison ? "default" : "ghost"}
                className={`rounded-full ${isComparison ? "bg-white text-black hover:bg-neutral-200" : "text-neutral-400 hover:bg-neutral-800 hover:text-white"}`}
                onClick={() => router.push("/application/compare")}
              >
                <TrendingUp className="h-5 w-5" />
              </Button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 h-full min-w-0 overflow-y-auto no-scrollbar">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
