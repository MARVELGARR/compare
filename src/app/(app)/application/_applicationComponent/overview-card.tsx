import type React from "react"
import { ArrowRight } from "lucide-react"
import CardItem from "./card-item"

interface CardData {
  avatar: string
  name: string
  badge: string
  badgeColor: "red" | "green"
  trend: number
}

interface OverviewCardProps {
  title: string
  icon: React.ReactNode
  items: CardData[]
}

export default function OverviewCard({ title, icon, items }: OverviewCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        </div>
        <button className="text-xs text-muted-foreground hover:text-foreground transition flex items-center gap-1">
          View more
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Items */}
      <div className="space-y-1 flex-1">
        {items.map((item, idx) => (
          <CardItem key={idx} {...item} />
        ))}
      </div>
    </div>
  )
}
