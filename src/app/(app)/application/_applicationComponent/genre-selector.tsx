"use client"

import { useRouter, useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface GenreSelectorProps {
  genres: string[]
}

export default function GenreSelector({ genres }: GenreSelectorProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentGenre = searchParams.get("genre") || "afrobeat"

  const handleGenreChange = (genre: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("genre", genre)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <Select value={currentGenre} onValueChange={handleGenreChange}>
      <SelectTrigger className="w-40 h-8 text-xs font-medium bg-zinc-950 text-zinc-50 border-zinc-800 hover:bg-zinc-900 focus:ring-zinc-700 transition-colors">
        <SelectValue placeholder="Select genre" />
      </SelectTrigger>
      <SelectContent className="bg-zinc-950 text-zinc-50 border-zinc-800">
        <SelectItem value="afrobeat" className="focus:bg-zinc-900 focus:text-zinc-50">
          Afrobeat (Default)
        </SelectItem>
        {genres?.map((genre) => (
          <SelectItem
            key={genre}
            value={genre}
            className="capitalize focus:bg-zinc-900 focus:text-zinc-50"
          >
            {genre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
