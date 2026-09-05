import Image from "next/image";
import Sparkline from "./sparkline"

interface CardItemProps {
  avatar: string
  name: string
  // badge: string // Removed in favor of Sparkline
  trendData: number[]
  trendColor: "red" | "green"
}

export default function CardItem({ avatar, name, trendData, trendColor }: CardItemProps) {
  return (
    <div className="flex items-center gap-3 py-3">
      <Image src={avatar || "/placeholder.svg"} alt={name} width={40} height={40} className="w-10 h-10 rounded-lg object-cover" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{name}</p>
      </div>
      <div className="flex items-center gap-3">
        {/* Trend Graph */}
        <div className="w-[60px] h-[20px] flex items-center">
            <Sparkline data={trendData} color={trendColor} width={60} height={20} />
        </div>
        
        {/* Percentage Badge */}
        <div
            className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
            trendColor === "red" ? "bg-red-500/20 text-red-500" : "bg-emerald-500/20 text-emerald-500"
            }`}
        >
            {/* Calculate trend percentage from last two data points or mock it if data is random */}
            {trendData.length >= 2 ? (
                <>
                    {trendData[trendData.length - 1] >= trendData[trendData.length - 2] ? "+" : ""}
                    {Math.round(((trendData[trendData.length - 1] - trendData[trendData.length - 2]) / trendData[trendData.length - 2]) * 100)}%
                </>
            ) : "+0%"}
        </div>
      </div>
    </div>
  )
}
