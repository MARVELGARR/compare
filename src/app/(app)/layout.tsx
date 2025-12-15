"use client"

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp, Sparkles, Tag, Users, LayoutGrid } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { HeaderContainer } from "./_LayoutComponents/Headers/HeaderComponent";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const isOverview = pathname === "/application" || pathname === "/application/";
  const isComparison = pathname?.includes("/compare");

  return (
    <div className="h-screen bg-[#a8cfc4] p-4 md:p-8">
      <div className="mx-auto max-w-[1400px] h-full">
        <div className="overflow-hidden rounded-3xl bg-[#0a0a0a] shadow-2xl h-full">
          {/* Header - Using your original auth header */}
          <HeaderContainer />

          {/* Sidebar + Content */}
          <div className="flex h-full">
            {/* Sidebar */}
            <aside className="flex w-16 flex-col items-center gap-4 border-r border-neutral-800 py-8">
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

              <Button
                size="icon"
                variant="ghost"
                className="rounded-full text-neutral-400 hover:bg-neutral-800 hover:text-white"
              >
                <Sparkles className="h-5 w-5" />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className="rounded-full text-neutral-400 hover:bg-neutral-800 hover:text-white"
              >
                <Tag className="h-5 w-5" />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className="rounded-full text-neutral-400 hover:bg-neutral-800 hover:text-white"
              >
                <Users className="h-5 w-5" />
              </Button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 h-full ">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
