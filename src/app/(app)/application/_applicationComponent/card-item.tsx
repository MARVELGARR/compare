interface CardItemProps {
  avatar: string
  name: string
  badge: string
  badgeColor: "red" | "green"
  trend: number
}

export default function CardItem({ avatar, name, badge, badgeColor, trend }: CardItemProps) {
  return (
    <div className="flex items-center gap-3 py-3">
      <img src={avatar || "/placeholder.svg"} alt={name} className="w-10 h-10 rounded-lg object-cover" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{name}</p>
      </div>
      <div className="flex items-center gap-2">
        <div
          className={`px-2 py-1 rounded text-xs font-semibold ${
            badgeColor === "red" ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
          }`}
        >
          {badge}
        </div>
        <span className="text-xs text-emerald-400 font-medium">+ {trend}%</span>
      </div>
    </div>
  )
}
