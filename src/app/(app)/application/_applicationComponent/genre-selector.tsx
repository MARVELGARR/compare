"use client"

import { useRouter, useSearchParams } from "next/navigation"

interface GenreSelectorProps {
  genres: any
}

export default function GenreSelector({ genres }: GenreSelectorProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentGenre = searchParams.get("genre") || "afrobeat"

  const handleGenreChange = (genre: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("genre", genre)
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex gap-2">
      <select
        value={currentGenre}
        onChange={(e) => handleGenreChange(e.target.value)}
        className="bg-background border border-border text-xs rounded-md px-2 py-1 outline-none focus:ring-1 focus:ring-ring w-24"
      >
        <option value="afrobeat">Afrobeat (Default)</option>
        {genres.map((g: any) => (
          <option key={g} value={g}>
            {g.charAt(0).toUpperCase() + g.slice(1)}
          </option>
        ))}
      </select>
    </div>
  )
}
