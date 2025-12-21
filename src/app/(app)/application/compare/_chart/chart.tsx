"use client"

import { useMemo } from "react"

import { TrendingUp } from "lucide-react"
import { Cell, Pie, PieChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, Sector } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { SpotifyArtist } from "@/src/apis/spotify.api.types"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

interface ComparisonMetricsProps {
  artists: SpotifyArtist[];
}

const chartConfig = {
  popularity: {
    label: "Popularity",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartRadarDots({ artists }: ComparisonMetricsProps) {
    const chartData = artists.map((artist) => ({
      name: artist.name,
      popularity: artist.popularity,
    }))
    
  return (
    <Card className="bg-zinc-900 border-zinc-900 text-zinc-500">
      <CardHeader className="items-center ">
        <CardTitle>Popularity Comparison</CardTitle>
        <CardDescription>
          Comparing popularity scores (0-100)
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0  ">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="name" />
            <PolarGrid />
            <Radar
              dataKey="popularity"
              fill="var(--color-popularity)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Popularity metrics from Spotify <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          Real-time data
        </div>
      </CardFooter>
    </Card>
  )
}


export function ChartRadar({ artists }: ComparisonMetricsProps) {
    const chartData = useMemo(() => artists
      .map((artist, index) => ({
        name: artist.name,
        popularity: artist.popularity,
        fill: `var(--chart-${(index % 5) + 1})`,
      }))
      .sort((a, b) => b.popularity - a.popularity), [artists]);

    // Calculate the index of the most popular artist to highlight it
    const activeIndex = useMemo(() => 
      chartData.findIndex((item) => item.popularity === (chartData[0]?.popularity ?? 0))
    , [chartData]);
    
  return (
   <Card className="flex flex-col bg-zinc-900 border-zinc-800 text-zinc-500">
      <CardHeader className="items-center pb-0">
        <CardTitle>Popularity Distribution</CardTitle>
        <CardDescription>Relative popularity share</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="popularity"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Popularity Share <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Comparison of selected artists
        </div>
      </CardFooter>
    </Card>
  )
}