"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Music, Play, Disc } from "lucide-react";
import Image from "next/image";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import { fetchArtistDetails, fetchArtistTopTracks } from "../../actions";

export default function ArtistProfilePage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const { data: artist, isLoading: isArtistLoading } = useQuery({
    queryKey: ["artist", id],
    queryFn: () => fetchArtistDetails(id),
  });

  const { data: topTracks, isLoading: isTracksLoading } = useQuery({
    queryKey: ["artist-tracks", id],
    queryFn: () => fetchArtistTopTracks(id),
  });

  if (isArtistLoading || isTracksLoading) {
    return <div className="text-white p-10 animate-pulse">Loading artist profile...</div>;
  }

  if (!artist) {
    return <div className="text-white p-10">Artist not found.</div>;
  }

  return (
    <div className="min-h-screen bg-background text-white p-6 md:p-10 font-sans">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Rankings
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8 items-end mb-12">
         <div className="w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-zinc-800 shadow-2xl flex-shrink-0 relative">
             {artist.images[0] ? (
                 <img src={artist.images[0].url} alt={artist.name} className="object-cover w-full h-full" />
             ) : (
                 <div className="w-full h-full bg-zinc-800 flex items-center justify-center"><p className="text-4xl font-bold">{artist.name[0]}</p></div>
             )}
         </div>
         <div className="flex-1 space-y-4">
             <div className="uppercase tracking-widest text-sm text-green-500 font-bold">Artist</div>
             <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">{artist.name}</h1>
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
                     <div className="text-2xl font-bold">{(artist as any).followers?.total ? Intl.NumberFormat('en-US').format((artist as any).followers.total) : 'N/A'}</div>
                     <div className="text-zinc-500 text-xs uppercase tracking-wide">Followers</div>
                 </div>
             </div>
         </div>
      </div>

      {/* Top Tracks */}
      <div className="max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Disc className="w-6 h-6"/> Top Tracks</h2>
        <div className="grid gap-2">
            {topTracks?.slice(0, 5).map((track: any, index: number) => (
                <div key={track.id} className="flex items-center gap-4 p-3 rounded-md hover:bg-zinc-900/60 transition-colors group">
                    <div className="w-8 text-center text-zinc-500 font-mono">{index + 1}</div>
                    <div className="relative w-12 h-12 bg-zinc-800 rounded flex-shrink-0 overflow-hidden">
                        {track.album.images[0] && <img src={track.album.images[0].url} className="w-full h-full object-cover"/>}
                        <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center">
                            <Play className="w-4 h-4 fill-white text-white"/>
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-bold truncate text-white">{track.name}</div>
                         <div className="text-xs text-zinc-500 truncate">{track.artists.map((a:any) => a.name).join(', ')}</div>
                    </div>
                    <div className="text-zinc-400 text-sm hidden md:block w-32 text-right">
                         {Math.floor(track.duration_ms / 60000)}:{((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}
                    </div>
                </div>
            ))}
            {!topTracks?.length && <div className="text-zinc-500 italic">No tracks available.</div>}
        </div>
      </div>

    </div>
  );
}
