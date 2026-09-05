"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sliders, ChevronRight } from "lucide-react"

const trendingArtists = [
  { name: "Anna Vissi", image: "/female-singer-1.jpg", score: 90, change: 45 },
  { name: "Antonis Remos", image: "/male-singer-1.jpg", score: 87, change: 41 },
  { name: "Demy", image: "/female-singer-2.jpg", score: 85, change: 45 },
]

const newcomers = [
  { name: "Amaryllis", image: "/artist-newcomer-1.jpg", change: 45 },
  { name: "Afroditi Chatzimina", image: "/artist-newcomer-2.jpg", change: 41 },
  { name: "Giannis Xanthopoulos", image: "/artist-newcomer-3.jpg", change: 42 },
]

const sublabels = [
  { name: "Aktive Records", image: "/record-label-1.jpg", change: 45 },
  { name: "Panik Platinum", image: "/placeholder.svg?height=32&width=32", change: 41 },
  { name: "Panik Gold", image: "/placeholder.svg?height=32&width=32", change: 42 },
]

const mockTableData = [
  {
    rank: 1,
    name: "Anna Vissi",
    handle: "@annavissofficial",
    image: "/female-singer-1.jpg",
    followers: "212K",
    followerChange: 0.46,
    popularity: 90,
    trend: "up",
  },
  {
    rank: 2,
    name: "Antonis Remos",
    handle: "@daremovic",
    image: "/male-singer-1.jpg",
    followers: "212K",
    followerChange: 0.46,
    popularity: 87,
    trend: "down",
  },
  {
    rank: 3,
    name: "Christos Mastoras",
    handle: "@xmastoras",
    image: "/male-singer-2.jpg",
    followers: "112K",
    followerChange: 0.46,
    popularity: 85,
    trend: "up",
  },
  {
    rank: 4,
    name: "Demy",
    handle: "@demy_official",
    image: "/female-singer-2.jpg",
    followers: "99K",
    followerChange: -0.18,
    popularity: 80,
    trend: "down",
  },
  {
    rank: 5,
    name: "Despoina Vandi",
    handle: "@despinavandi",
    image: "/female-singer-3.jpg",
    followers: "87K",
    followerChange: 0.46,
    popularity: 72,
    trend: "down",
  },
  {
    rank: 6,
    name: "Christos Santikal",
    handle: "@xristos.santikal",
    image: "/male-singer-3.jpg",
    followers: "76K",
    followerChange: 0.46,
    popularity: 69,
    trend: "up",
  },
  {
    rank: 7,
    name: "Dionisis Sxinas",
    handle: "@dionisis_sxoinas",
    image: "/male-singer-4.jpg",
    followers: "56K",
    followerChange: 0.46,
    popularity: 48,
    trend: "up",
  },
  {
    rank: 8,
    name: "Dj Pitsi",
    handle: "@djpitsi",
    image: "/dj-1.jpg",
    followers: "32K",
    followerChange: 0.46,
    popularity: 48,
    trend: "up",
  },
]

const platforms = ["Overview", "Spotify", "Instagram", "Youtube", "Soundcloud", "Apple Music", "Tik Tok", "Amazon"]

export function DashboardOverview() {
  const [selectedPlatform, setSelectedPlatform] = useState("Overview")
  const [timeFilter, setTimeFilter] = useState("All")

  return (
    <div className="p-8">
      <div className="mb-2 text-sm text-neutral-400">Welcome James!</div>
      <h2 className="mb-8 text-3xl font-semibold text-white">Dashboard Overview</h2>

      {/* Cards Grid */}
      <div className="mb-8 grid grid-cols-3 gap-6">
        {/* Trending Card */}
        <div className="rounded-2xl border border-neutral-800 bg-[#0d0d0d] p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">🔥 Trending</div>
            <Button variant="ghost" size="sm" className="gap-1 text-xs text-neutral-400 hover:text-white">
              View more
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>

          <div className="space-y-3">
            {trendingArtists.map((artist, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={artist.image || "/placeholder.svg"} />
                  <AvatarFallback>{artist.name[0]}</AvatarFallback>
                </Avatar>
                <span className="flex-1 text-sm text-white">{artist.name}</span>
                <Badge className="rounded-md border-0 bg-orange-600/20 text-orange-500">{artist.score}s</Badge>
                <span className="text-xs text-green-500">↑ {artist.change}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Newcomers Card */}
        <div className="rounded-2xl border border-neutral-800 bg-[#0d0d0d] p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">⚡ Newcomers</div>
            <Button variant="ghost" size="sm" className="gap-1 text-xs text-neutral-400 hover:text-white">
              View more
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>

          <div className="space-y-3">
            {newcomers.map((artist, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={artist.image || "/placeholder.svg"} />
                  <AvatarFallback>{artist.name[0]}</AvatarFallback>
                </Avatar>
                <span className="flex-1 text-sm text-white">{artist.name}</span>
                <svg width="60" height="24" className="opacity-70">
                  <path d="M 0 12 Q 10 8, 20 10 T 40 8 T 60 12" fill="none" stroke="#4ade80" strokeWidth="2" />
                </svg>
                <span className="text-xs text-green-500">↑ {artist.change}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sublabels Card */}
        <div className="rounded-2xl border border-neutral-800 bg-[#0d0d0d] p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">⚪ Sublabels</div>
            <Button variant="ghost" size="sm" className="gap-1 text-xs text-neutral-400 hover:text-white">
              View more
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>

          <div className="space-y-3">
            {sublabels.map((label, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={label.image || "/placeholder.svg"} />
                  <AvatarFallback>{label.name[0]}</AvatarFallback>
                </Avatar>
                <span className="flex-1 text-sm text-white">{label.name}</span>
                <svg width="60" height="24" className="opacity-70">
                  <path d="M 0 12 Q 10 8, 20 10 T 40 8 T 60 12" fill="none" stroke="#4ade80" strokeWidth="2" />
                </svg>
                <span className="text-xs text-green-500">↑ {label.change}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 rounded-full border-neutral-700 bg-white text-black hover:bg-neutral-100"
        >
          <Sliders className="h-4 w-4" />
          Filters
        </Button>

        {["1d", "7d", "1m", "All"].map((filter) => (
          <Button
            key={filter}
            variant={timeFilter === filter ? "default" : "outline"}
            size="sm"
            className={`rounded-full ${
              timeFilter === filter
                ? "bg-white text-black hover:bg-neutral-100"
                : "border-neutral-700 bg-transparent text-neutral-400 hover:bg-neutral-800 hover:text-white"
            }`}
            onClick={() => setTimeFilter(filter)}
          >
            {filter}
          </Button>
        ))}

        <div className="mx-4 h-6 w-px bg-neutral-700" />

        {platforms.map((platform) => (
          <Button
            key={platform}
            variant={selectedPlatform === platform ? "default" : "outline"}
            size="sm"
            className={`rounded-full ${
              selectedPlatform === platform
                ? "bg-white text-black hover:bg-neutral-100"
                : "border-neutral-700 bg-transparent text-neutral-400 hover:bg-neutral-800 hover:text-white"
            }`}
            onClick={() => setSelectedPlatform(platform)}
          >
            {platform === "Overview" && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="mr-1.5">
                <rect width="6" height="6" rx="1" />
              </svg>
            )}
            {platform}
          </Button>
        ))}
      </div>

      {/* Data Table */}
      <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-[#0d0d0d]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-800 text-left text-xs text-neutral-500">
                <th className="p-4 font-medium">#</th>
                <th className="p-4 font-medium">Artist</th>
                <th className="p-4 font-medium">
                  <div className="flex items-center gap-1">
                    🟢 Followers
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M6 3L9 6H3L6 3Z" />
                    </svg>
                  </div>
                </th>
                <th className="p-4 font-medium">Popularity</th>
              </tr>
            </thead>
            <tbody>
              {mockTableData.map((artist) => (
                <tr
                  key={artist.rank}
                  className="border-b border-neutral-800/50 transition-colors hover:bg-neutral-800/30"
                >
                  <td className="p-4">
                    <span className="text-2xl font-bold text-neutral-700">{artist.rank}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={artist.image || "/placeholder.svg"} />
                        <AvatarFallback>{artist.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-white">{artist.name}</div>
                        <div className="text-xs text-neutral-500">{artist.handle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-white">{artist.followers}</div>
                    <div className={`text-xs ${artist.followerChange > 0 ? "text-green-500" : "text-red-500"}`}>
                      {artist.followerChange > 0 ? "↑" : "↓"} {Math.abs(artist.followerChange * 1000).toFixed(0)} (
                      {(artist.followerChange * 100).toFixed(2)}%)
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <svg width="60" height="30" className="opacity-70">
                        <path
                          d={
                            artist.trend === "up"
                              ? "M 0 25 Q 10 20, 20 15 T 40 10 T 60 5"
                              : "M 0 5 Q 10 10, 20 15 T 40 20 T 60 25"
                          }
                          fill="none"
                          stroke={artist.trend === "up" ? "#4ade80" : "#ef4444"}
                          strokeWidth="2"
                        />
                      </svg>
                      <Badge
                        className={`min-w-[50px] justify-center rounded-md border-0 font-bold ${
                          artist.popularity >= 80
                            ? "bg-orange-600/20 text-orange-500"
                            : artist.popularity >= 60
                              ? "bg-amber-600/20 text-amber-500"
                              : "bg-green-600/20 text-green-500"
                        }`}
                      >
                        {artist.popularity}%
                      </Badge>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
