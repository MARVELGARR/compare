"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Play, Disc } from "lucide-react";
import Image from "next/image";
import { getArtist, getArtistTopTracksByCountry } from "@/src/apis/spotify";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import type { SpotifyTrack } from "@/src/apis/spotify.api.types";


export default function ArtistProfilePage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const { data: artist, isLoading: isArtistLoading } = useQuery({
    queryKey: ["artist", id],
    queryFn: () => getArtist(id),
    enabled: !!id,
  });

  const { data: topTracks, isLoading: isTracksLoading } = useQuery({
    queryKey: ["artist-tracks", id],
    queryFn: () => getArtistTopTracksByCountry(id),
    enabled: !!id,
  });




  if (isArtistLoading || isTracksLoading) {
    return <div className="text-white p-10 animate-pulse">Loading artist profile...</div>;
  }

  if (!artist) {
    return <div className="text-white p-10">Artist not found.</div>;
  }

  return (
    <div className=" h-screen overflow-hidden flex flex-col bg-background text-white px-6 md:px-10 font-sans">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2  text-zinc-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Rankings
      </button>

      {/* Header */}
      <div className="flex mt-10 flex-col md:flex-row gap-8 items-end mb-12">
        <div className="w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-zinc-800 shadow-2xl flex-shrink-0 relative">
          {artist.images[0] ? (
            <Image
              src={artist.images[0].url}
              alt={artist.name}
              width={240}
              height={240}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center"><p className="text-4xl font-bold">{artist.name[0]}</p></div>
          )}
        </div>
        <div className="flex-1 space-y-4">
          <div className="uppercase tracking-widest text-sm text-green-500 font-bold">Artist</div>
          <h1 className="tit font-extrabold tracking-tight" style={{ lineHeight: 1.1 }}>{artist.name}</h1>
          <div className="flex flex-wrap gap-2">
            {artist.genres.map((g: string) => (
              <span key={g} className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-300 capitalize border border-zinc-700">{g}</span>
            ))}
          </div>
          <div className="flex gap-8 pt-4">
            <div>
              <div className="text-2xl font-bold">{Intl.NumberFormat('en-US', { notation: "compact" }).format(artist.popularity)}%</div>
              <div className="text-zinc-500 text-xs uppercase tracking-wide">Popularity Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{artist.followers?.total ? Intl.NumberFormat('en-US').format(artist.followers.total) : 'N/A'}</div>
              <div className="text-zinc-500 text-xs uppercase tracking-wide">Followers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Tracks */}
      <div className="max-w-4xl border-4 min-h-0 flex-1 flex flex-col">
        <h2 className="text-2xl  font-bold mb-6 flex items-center gap-2"><Disc className="w-6 h-6" /> Top Tracks</h2>
        <ScrollArea className=" flex flex-col flex-1 overflow-y-auto no-scrollbar">
          {topTracks?.tracks.slice(0, 5).map((track: SpotifyTrack, index: number) => (
            <div key={track.id} className="flex items-center gap-4 p-3 rounded-md hover:bg-zinc-900/60 transition-colors group">
              <div className="w-8 text-center text-zinc-500 font-mono">{index + 1}</div>
              <div className="relative w-12 h-12 bg-zinc-800 rounded flex-shrink-0 overflow-hidden">
                {track.album.images[0] && <Image src={track.album.images[0].url} width={48} height={48} className="w-full h-full object-cover" alt={"Track image"} />}
                <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center">
                  <Play className="w-4 h-4 fill-white text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold truncate text-white">{track.name}</div>
                <div className="text-xs text-zinc-500 truncate">{track.artists.map((a) => a.name).join(', ')}</div>
              </div>
              <div className="text-zinc-400 text-sm hidden md:block w-32 text-right">
                {Math.floor(track.duration_ms / 60000)}:{((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}
              </div>
            </div>
          ))}
          {!topTracks?.tracks.length && <div className="text-zinc-500 italic">No tracks available.</div>}
        </ScrollArea>
      </div>
    </div>
  );
}
