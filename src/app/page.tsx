"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Radio, TrendingUp, Sparkles, Tag, Users } from "lucide-react"
import { ArtistComparison } from "@/components/artist-comparison"
import { DashboardOverview } from "@/components/dashboard-overview"

export default function Page() {
  const [activeView, setActiveView] = useState<"overview" | "comparison">("overview")

  return (
    <div className="min-h-screen bg-[#a8cfc4] p-4 md:p-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="overflow-hidden rounded-3xl bg-[#0a0a0a] shadow-2xl">
          {/* Header */}
          <header className="flex items-center justify-between border-b border-neutral-800 px-8 py-6">
            <h1 className="text-2xl font-bold">
              <span className="text-neutral-500">driptt</span>
              <span className="text-white">.insights</span>
            </h1>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 rounded-full border-neutral-700 bg-neutral-800/50 text-white hover:bg-neutral-800"
              >
                <Radio className="h-4 w-4" />
                Signals
              </Button>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-white">James C.</div>
                  <button className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white">
                    Sign out
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-1">
                      <path
                        d="M2 10L10 2M10 2H4M10 2V8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/abstract-geometric-shapes.png" />
                  <AvatarFallback>JC</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* Sidebar + Content */}
          <div className="flex">
            {/* Sidebar */}
            <aside className="flex w-16 flex-col items-center gap-4 border-r border-neutral-800 py-8">
              <Button
                size="icon"
                variant={activeView === "overview" ? "default" : "ghost"}
                className={`rounded-full ${activeView === "overview" ? "bg-white text-black hover:bg-neutral-200" : "text-neutral-400 hover:bg-neutral-800 hover:text-white"}`}
                onClick={() => setActiveView("overview")}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <rect x="3" y="3" width="6" height="6" rx="1" />
                  <rect x="11" y="3" width="6" height="6" rx="1" />
                  <rect x="3" y="11" width="6" height="6" rx="1" />
                  <rect x="11" y="11" width="6" height="6" rx="1" />
                </svg>
              </Button>

              <Button
                size="icon"
                variant={activeView === "comparison" ? "default" : "ghost"}
                className={`rounded-full ${activeView === "comparison" ? "bg-white text-black hover:bg-neutral-200" : "text-neutral-400 hover:bg-neutral-800 hover:text-white"}`}
                onClick={() => setActiveView("comparison")}
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
            <main className="flex-1">{activeView === "overview" ? <DashboardOverview /> : <ArtistComparison />}</main>
          </div>
        </div>
      </div>
    </div>
  )
}
