

import { Flame, Star, Tag } from "lucide-react"
import OverviewCard from "./_applicationComponent/overview-card"

export default function Page() {
  const userName = "James"

  const trendingData = [
    {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna",
      name: "Anna Vissi",
      badge: "-80%",
      badgeColor: "red" as const,
      trend: 45,
    },
    {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Antonis",
      name: "Antonis Remos",
      badge: "-87%",
      badgeColor: "red" as const,
      trend: 41,
    },
    {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Demy",
      name: "Demy",
      badge: "-81%",
      badgeColor: "red" as const,
      trend: 46,
    },
  ]

  const newcomersData = [
    {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amaryllis",
      name: "Amaryllis",
      badge: "",
      badgeColor: "green" as const,
      trend: 45,
    },
    {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Afoditi",
      name: "Afoditi Chatzimina",
      badge: "",
      badgeColor: "green" as const,
      trend: 41,
    },
    {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Giannis",
      name: "Giannis Xanthopoulos",
      badge: "",
      badgeColor: "green" as const,
      trend: 42,
    },
  ]

  const sublabelsData = [
    {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Active",
      name: "Active Records",
      badge: "",
      badgeColor: "green" as const,
      trend: 45,
    },
    {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Panik1",
      name: "Panik Platinum",
      badge: "",
      badgeColor: "green" as const,
      trend: 41,
    },
    {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Panik2",
      name: "Panik Gold",
      badge: "",
      badgeColor: "green" as const,
      trend: 49,
    },
  ]

  return (
    <div className="min-h-screen bg-background pr-4">


          {/* Cards Grid */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            <OverviewCard title="Trending" icon={<Flame className="w-4 h-4 text-orange-400" />} items={trendingData} />
            <OverviewCard title="Newcomers" icon={<Star className="w-4 h-4 text-purple-400" />} items={newcomersData} />
            <OverviewCard title="Sublabels" icon={<Tag className="w-4 h-4 text-blue-400" />} items={sublabelsData} />
          </div>

    </div>
  )
}
