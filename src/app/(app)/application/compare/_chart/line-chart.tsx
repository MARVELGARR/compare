"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, Dot, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { SpotifyArtist, SpotifyTrack } from "@/src/apis/spotify.api.types"
import { useQueries } from "@tanstack/react-query"
import { getArtistTopTracksByCountry } from "@/src/apis/spotify"

interface ChartLineTopTracksProps {
  artists: SpotifyArtist[];
  market?: string;
}

export function ChartLineTopTracks({ artists, market = "NG" }: ChartLineTopTracksProps) {
  // Memoize queries configuration
  const queries = React.useMemo(() => {
    return artists.map(artist => ({
      queryKey: ['artist-top-tracks', artist.id, market],
      queryFn: () => getArtistTopTracksByCountry(artist.id, market),
      staleTime: 1000 * 60 * 60, // 1 hour
    }))
  }, [artists, market])

  const results = useQueries({ queries })

  const isLoading = results.some(r => r.isLoading)
  
  const chartData = React.useMemo(() => {
    if (isLoading) return [];

    interface ChartPoint {
      artistName: string;
      trackName: string;
      year: number;
      popularity: number;
      payload: SpotifyTrack;
    }

    // Collect all tracks from all artists
    let allPoints: ChartPoint[] = [];
    
    results.forEach((result, index) => {
        if (!result.data) return;
        const artist = artists[index];
        
        let artistPoints = result.data.tracks.map(track => {
            const year = parseInt(track.album.release_date.split('-')[0]);
            return {
                artistName: artist.name,
                trackName: track.name,
                year: year,
                popularity: track.popularity,
                payload: track // For tooltip
            }
        });

        // Filter: Keep only the best track (highest popularity) per year for this artist
        const bestTracksPerYear = new Map<number, ChartPoint>();
        
        artistPoints.forEach(point => {
            const existing = bestTracksPerYear.get(point.year);
            if (!existing || point.popularity > existing.popularity) {
                bestTracksPerYear.set(point.year, point);
            }
        });
        
        artistPoints = Array.from(bestTracksPerYear.values());
        allPoints = [...allPoints, ...artistPoints];
    });

    // Sort by year
    return allPoints.sort((a, b) => a.year - b.year);

  }, [results, artists, isLoading]);
  
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {};
    artists.forEach((artist, index) => {
        config[artist.name] = {
            label: artist.name,
            color: `var(--chart-${(index % 5) + 1})`,
        }
    });
    return config;
  }, [artists]);


  return (
    <Card className="bg-zinc-900 border-zinc-900 text-zinc-500">
      <CardHeader>
        <CardTitle className="text-zinc-100">Top Tracks Comparison</CardTitle>
        <CardDescription>
          Release Year vs. Popularity (Plays)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}  className="aspect-auto h-[350px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
           <defs>
              {artists.map((artist, index) => (
                <linearGradient key={artist.id} id={`fill${artist.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={`var(--chart-${(index % 5) + 1})`}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={`var(--chart-${(index % 5) + 1})`}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="4 4" />
            <XAxis
              dataKey="year"
              type="number"
              domain={['auto', 'auto']}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={5}
             
            />
             <YAxis
              dataKey="popularity"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[0, 100]}
              />

            <ChartTooltip
              cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
              content={
                <ChartTooltipContent 
                    className="w-[200px]"
                    labelFormatter={(value, payload) => {
                        // Custom tooltip to show track name
                        if(payload && payload[0] && payload[0].payload) {
                             return payload[0].payload.year;
                        }
                        return value;
                    }}
                    formatter={(value, name, item) => {
                        return (
                          <>
                            <div
                              className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                              style={
                                {
                                  "--color-bg": `var(--chart-${(artists.findIndex(a => a.name === name) % 5) + 1})`,
                                } as React.CSSProperties
                              }
                            />
                            <div className="flex min-w-[130px] gap-2 text-xs text-muted-foreground items-center">
                                <span className="text-foreground">{item.payload.trackName}</span>
                                <span className="ml-auto font-mono text-foreground tabular-nums">
                                    {value}
                                </span>
                            </div>
                          </>
                        )
                      }}
                />
              }
            />
            {artists.map((artist, index) => (
                <Area
                    key={artist.id}
                    dataKey="popularity"
                    data={chartData.filter(d => d.artistName === artist.name)}
                    name={artist.name}
                    type="natural"
                    fill={`url(#fill${artist.id})`}
                    stroke={`var(--chart-${(index % 5) + 1})`}
                    strokeWidth={2}
                    dot={({ cx, cy, payload }) => {
                        return (
                          <Dot
                            key={payload.payload.id}
                            r={4}
                            cx={cx}
                            cy={cy}
                            fill={`var(--chart-${(index % 5) + 1})`}
                            stroke={`var(--chart-${(index % 5) + 1})`}
                          />
                        )
                      }}
                    activeDot={{
                        r: 6,
                    }}
                >
                </Area>
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium text-zinc-100">
              Comparing top tracks popularity over time
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Based on Spotify Top Tracks data
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
