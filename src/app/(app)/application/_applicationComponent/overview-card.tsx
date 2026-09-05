import type React from "react"
import CardItem from "./card-item"

interface CardData {
  avatar: string
  name: string
  trendData: number[]
  trendColor: "red" | "green"
}

interface OverviewCardProps {
  title: string
  icon: React.ReactNode
  items: CardData[]
  headerAction?: React.ReactNode
}

export default function OverviewCard({ title, icon, items }: OverviewCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {icon}
          <h3 className="text-sm font-semibold text-foreground truncate">{title}</h3>
        </div>
        
      </div>

      {/* Items */}
      <div className="space-y-1 flex-1">
        {items?.map((item, idx) => (
          <CardItem key={idx} {...item} />
        ))}
      </div>
    </div>
  )
}
