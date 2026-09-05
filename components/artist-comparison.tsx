"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Sliders } from "lucide-react"

const mockArtists = [
  {
    id: 1,
    name: "Anna Vissi",
    handle: "@annavissofficial",
    score: 90,
    image: "/female-singer-1.jpg",
    color: "#4ade80",
  },
  {
    id: 2,
    name: "Antonis Remos",
    handle: "@daremovic",
    score: 87,
    image: "/male-singer-1.jpg",
    color: "#ef4444",
  },
  {
    id: 3,
    name: "Christos Mastoras",
    handle: "@xmastoras",
    score: 85,
    image: "/male-singer-2.jpg",
    color: "#eab308",
  },
  { id: 4, name: "Demy", handle: "@demy_official", score: 80, image: "/female-singer-2.jpg", color: "#ef4444" },
  {
    id: 5,
    name: "Despoina Vandi",
    handle: "@despinavandi",
    score: 72,
    image: "/female-singer-3.jpg",
    color: "#eab308",
  },
  {
    id: 6,
    name: "Christos Santikal",
    handle: "@xristos.santikal",
    score: 69,
    image: "/male-singer-3.jpg",
    color: "#eab308",
  },
  {
    id: 7,
    name: "Dionisis Sxinas",
    handle: "@dionisis_sxoinas",
    score: 48,
    image: "/male-singer-4.jpg",
    color: "#ef4444",
  },
  { id: 8, name: "Dj Pitsi", handle: "@djpitsi", score: 44, image: "/dj-1.jpg", color: "#eab308" },
  {
    id: 9,
    name: "Diapley",
    handle: "@diapleysleepy",
    score: 40,
    image: "/artist-1.jpg",
    color: "#eab308",
  },
  {
    id: 10,
    name: "Aggelos Tsigas",
    handle: "@aggelos_tsigas",
    score: 38,
    image: "/male-singer-5.jpg",
    color: "#eab308",
  },
  {
    id: 11,
    name: "Andromacho",
    handle: "@andromacho_dem",
    score: 36,
    image: "/female-singer-4.jpg",
    color: "#eab308",
  },
]

export function ArtistComparison() {
  const [selectedArtists, setSelectedArtists] = useState([mockArtists[0], mockArtists[1], mockArtists[2]])
  const [timeFilter, setTimeFilter] = useState("All")

  const removeArtist = (id: number) => {
    setSelectedArtists(selectedArtists.filter((a) => a.id !== id))
  }

  return (
    <div className="p-8">
      <h2 className="mb-6 text-3xl font-semibold text-white">Artist Comparison</h2>

      {/* Filters */}
      <div className="mb-6 flex items-center gap-3">
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
      </div>

      <div className="flex gap-6">
        {/* Artist List */}
        <div className="w-[400px] space-y-2 rounded-2xl border border-neutral-800 bg-[#0d0d0d] p-4">
          <div className="mb-4 flex items-center justify-between text-xs text-neutral-500">
            <span>#</span>
            <span>Artist</span>
            <span className="mr-4">Hypemeter</span>
          </div>

          {mockArtists.map((artist, index) => (
            <div
              key={artist.id}
              className="group flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-neutral-800/50"
            >
              <span className="w-6 text-center text-2xl font-bold text-neutral-700">{index + 1}</span>

              <Avatar className="h-10 w-10">
                <AvatarImage src={artist.image || "/placeholder.svg"} />
                <AvatarFallback>{artist.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="font-medium text-white">{artist.name}</div>
                <div className="text-xs text-neutral-500">{artist.handle}</div>
              </div>

              <Badge
                className={`min-w-[50px] justify-center rounded-md border-0 font-bold ${
                  artist.score >= 80
                    ? "bg-orange-600/20 text-orange-500"
                    : artist.score >= 60
                      ? "bg-amber-600/20 text-amber-500"
                      : "bg-green-600/20 text-green-500"
                }`}
              >
                {artist.score}%
              </Badge>
            </div>
          ))}
        </div>

        {/* Chart Area */}
        <div className="flex-1 rounded-2xl border border-neutral-800 bg-[#0d0d0d] p-6">
          {/* Selected Artists */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 rounded-full border-neutral-700 bg-transparent text-white hover:bg-neutral-800"
            >
              <Plus className="h-4 w-4" />
              Add Artists
            </Button>

            {selectedArtists.map((artist) => (
              <Badge
                key={artist.id}
                variant="outline"
                className="gap-2 rounded-full border-neutral-700 bg-neutral-800/50 px-3 py-1.5 text-white"
              >
                <Avatar className="h-5 w-5">
                  <AvatarImage src={artist.image || "/placeholder.svg"} />
                  <AvatarFallback>{artist.name[0]}</AvatarFallback>
                </Avatar>
                {artist.name}
                <button onClick={() => removeArtist(artist.id)} className="ml-1 hover:text-red-500">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}

            <span className="ml-auto text-sm text-neutral-400">100%</span>
          </div>

          {/* Chart */}
          <div className="relative h-[450px]">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 flex h-full flex-col justify-between text-xs text-neutral-500">
              <span>100%</span>
              <span>80%</span>
              <span>60%</span>
              <span>50%</span>
              <span>30%</span>
              <span>10%</span>
              <span>0%</span>
            </div>

            {/* Chart area */}
            <div className="ml-12 h-full">
              <svg width="100%" height="100%" className="overflow-visible">
                {/* Grid lines */}
                {[0, 20, 40, 60, 80, 100].map((percent) => (
                  <line
                    key={percent}
                    x1="0"
                    y1={`${100 - percent}%`}
                    x2="100%"
                    y2={`${100 - percent}%`}
                    stroke="#262626"
                    strokeWidth="1"
                  />
                ))}

                {/* Anna Vissi - Green line */}
                <path
                  d="M 5 50 Q 15 35, 25 40 T 45 25 T 65 35 T 85 30 T 95 35"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="2.5"
                  className="drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]"
                />

                {/* Antonis Remos - Red line */}
                <path
                  d="M 5 75 Q 15 70, 25 65 T 45 60 T 65 58 T 85 62 T 95 70"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  className="drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                />

                {/* Christos Mastoras - Yellow line */}
                <path
                  d="M 5 65 Q 15 55, 25 50 T 45 45 T 65 40 T 85 50 T 95 45"
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="2.5"
                  className="drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]"
                />

                {/* Data points */}
                <circle cx="25%" cy="40%" r="5" fill="#4ade80" stroke="#0d0d0d" strokeWidth="2" />
                <circle cx="65%" cy="35%" r="5" fill="#4ade80" stroke="#0d0d0d" strokeWidth="2" />

                <circle cx="25%" cy="65%" r="5" fill="#ef4444" stroke="#0d0d0d" strokeWidth="2" />
                <circle cx="65%" cy="58%" r="5" fill="#ef4444" stroke="#0d0d0d" strokeWidth="2" />

                <circle cx="25%" cy="50%" r="5" fill="#eab308" stroke="#0d0d0d" strokeWidth="2" />
                <circle cx="65%" cy="40%" r="5" fill="#eab308" stroke="#0d0d0d" strokeWidth="2" />

                {/* Vertical line at 25% */}
                <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#737373" strokeWidth="1.5" strokeDasharray="5,5" />

                {/* Vertical line at 65% */}
                <line x1="65%" y1="0" x2="65%" y2="100%" stroke="#737373" strokeWidth="1.5" strokeDasharray="5,5" />

                {/* Labels */}
                <text x="20%" y="32%" fill="white" fontSize="11" className="font-medium">
                  Adlenovola Minimata
                </text>
                <text x="20%" y="35%" fill="#737373" fontSize="9">
                  17th Feb
                </text>

                <text x="60%" y="27%" fill="white" fontSize="11" className="font-medium">
                  TikTok
                </text>
                <text x="60%" y="30%" fill="#737373" fontSize="9">
                  20th Feb
                </text>
              </svg>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
            <span>02 Tue</span>
            <span>03 Wed</span>
            <span>04 Thu</span>
            <span>05 Fri</span>
            <span>06 Sat</span>
            <span>07 Sun</span>
            <span>08 Mon</span>
            <span>09 Tue</span>
            <span>10 Wed</span>
            <span>11 Thu</span>
            <span>12 Fri</span>
            <span>13 Sat</span>
            <span>14 Sun</span>
            <span>15 Mon</span>
            <span>16 Tue</span>
            <span>17 Wed</span>
            <span>18 Thu</span>
            <span>19 Fri</span>
            <span>20 Sat</span>
            <span>21 Sun</span>
          </div>

          {/* Year selector */}
          <div className="mt-6 flex items-center justify-center gap-8">
            {[2021, 2022, 2023, 2024].map((year) => (
              <button
                key={year}
                className={`text-sm ${
                  year === 2023 ? "font-semibold text-white" : "text-neutral-600 hover:text-neutral-400"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Mini chart */}
          <div className="mt-4 h-20">
            <svg width="100%" height="100%">
              <path
                d="M 0 40 Q 10 45, 20 35 T 40 30 T 60 40 T 80 35 T 100 40"
                fill="none"
                stroke="#4ade80"
                strokeWidth="1.5"
                opacity="0.5"
              />
              <path
                d="M 0 60 Q 10 55, 20 50 T 40 45 T 60 50 T 80 55 T 100 60"
                fill="none"
                stroke="#ef4444"
                strokeWidth="1.5"
                opacity="0.5"
              />

              {/* Highlight region */}
              <rect
                x="35%"
                y="0"
                width="30%"
                height="100%"
                fill="rgba(239, 68, 68, 0.1)"
                stroke="#ef4444"
                strokeWidth="1"
                rx="4"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
