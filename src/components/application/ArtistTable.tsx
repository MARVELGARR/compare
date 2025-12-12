"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchArtistRankings } from "@/src/app/(app)/application/actions";
import { ArrowDown, ArrowUp, Music2, Search, Filter, ChevronDown, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryState, parseAsString, parseAsStringLiteral } from "nuqs";
import { useState } from "react";

type SortField = 'rank' | 'followers' | 'popularity';
type SortOrder = 'asc' | 'desc';
type Market = 'NG' | 'US' | 'GB' | 'GH' | 'ZA';

const MARKETS: { code: Market; name: string }[] = [
    { code: 'NG', name: 'Nigeria' },
    { code: 'US', name: 'USA' },
    { code: 'GB', name: 'UK' },
    { code: 'GH', name: 'Ghana' },
    { code: 'ZA', name: 'South Africa' },
];

const GENRES = [
    "Afrobeat", "Afropop", "Amapiano", "Hip Hop", "R&B", "Rap", "Highlife", "Alte"
];

export default function ArtistTable() {
  const router = useRouter();
  
  // URL State with nuqs
  const [market, setMarket] = useQueryState<Market>('market', parseAsStringLiteral(['NG', 'US', 'GB', 'GH', 'ZA'] as const).withDefault('NG'));
  const [genre, setGenre] = useQueryState('genre', parseAsString.withDefault('')); // Empty string = "All/No Genre"
  const [sortField, setSortField] = useQueryState<SortField>('sortBy', parseAsStringLiteral(['rank', 'followers', 'popularity'] as const).withDefault('popularity')); // Default to popularity
  const [sortOrder, setSortOrder] = useQueryState<SortOrder>('order', parseAsStringLiteral(['asc', 'desc'] as const).withDefault('desc'));

  // Local state for UI
  const [isGenreOpen, setIsGenreOpen] = useState(false);

  const { data: artists, isLoading, error } = useQuery({
    queryKey: ["artist-rankings", market, genre],
    queryFn: () => fetchArtistRankings(50, 0, market, genre),
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc'); 
    }
  };

  const handlePlatformClick = (platform: string) => {
      if (platform === 'Spotify') return; 
      toast.info(`${platform} data is coming soon!`);
  };

  const sortedArtists = artists ? [...artists].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];

    // Numbers are used for all sortable fields now
    return sortOrder === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
  }) : [];

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <div className="w-3 h-3 opacity-20"><ArrowDown className="w-3 h-3"/></div>;
    return sortOrder === 'asc' ? <ArrowUp className="w-3 h-3 text-white"/> : <ArrowDown className="w-3 h-3 text-white"/>;
  };

  if (isLoading) return <div className="text-white p-8 animate-pulse">Loading rankings for {MARKETS.find(m => m.code === market)?.name}...</div>;
  if (error) return <div className="text-red-500 p-8">Error loading data.</div>;

  return (
    <div className="w-full text-white font-sans mt-4">
      {/* Filters */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2 flex-wrap">
           {/* Genre Dropdown */}
           <div className="relative">
                <button 
                    onClick={() => setIsGenreOpen(!isGenreOpen)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 transition-colors ${genre ? 'bg-green-500 text-black border-green-500' : 'bg-white text-black border-white'}`}
                >
                    <Filter className="w-3 h-3"/> {genre || "Genre"} <ChevronDown className="w-3 h-3"/>
                </button>
                
                {isGenreOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-md shadow-xl z-50 py-1 max-h-60 overflow-y-auto">
                        <button 
                            onClick={() => { setGenre(null); setIsGenreOpen(false); }}
                            className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center justify-between"
                        >
                            All Genres {genre === '' && <Check className="w-3 h-3 text-green-500"/>}
                        </button>
                        {GENRES.map(g => (
                            <button 
                                key={g}
                                onClick={() => { setGenre(g); setIsGenreOpen(false); }}
                                className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center justify-between"
                            >
                                {g} {genre === g && <Check className="w-3 h-3 text-green-500"/>}
                            </button>
                        ))}
                    </div>
                )}
           </div>

           {/* Generic Filters overlay (visually distinct) */}
           {/* Market Selector */}
           <div className="bg-zinc-800 rounded-full p-1 flex items-center text-xs overflow-hidden">
             {MARKETS.map((m) => (
               <span 
                key={m.code}
                onClick={() => setMarket(m.code)}
                className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${market === m.code ? 'bg-white text-black shadow-sm' : 'text-zinc-400 hover:text-white'}`}
               >
                 {m.name}
               </span>
             ))}
           </div>
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 xl:pb-0 scrollbar-hide">
            <button className="px-4 py-1.5 rounded-full bg-white text-black text-sm font-medium flex items-center gap-2" onClick={() => handlePlatformClick('Spotify')}>
                <span className="text-green-500"><Music2 className="w-3 h-3 fill-current"/></span> Spotify
            </button>
            {['Instagram', 'Youtube', 'SoundCloud', 'Apple Music'].map(platform => (
                 <button 
                    key={platform}
                    onClick={() => handlePlatformClick(platform)}
                    className="px-4 py-1.5 rounded-full border border-zinc-700 text-zinc-300 text-sm hover:bg-zinc-800 whitespace-nowrap"
                 >
                    {platform}
                </button>
            ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto min-h-[500px]">
      <table className="w-full text-left border-collapse">
        <thead className="text-xs text-zinc-400 uppercase border-b border-zinc-800">
          <tr>
            <th className="py-4 px-2 font-medium w-16 cursor-pointer hover:text-white" onClick={() => handleSort('rank')}>
                <div className="flex items-center gap-1"># <SortIcon field="rank"/></div>
            </th>
            <th className="py-4 px-2 font-medium">Artist</th>
            <th className="py-4 px-2 font-medium text-right cursor-pointer hover:text-white" onClick={() => handleSort('followers')}>
                <div className="flex items-center justify-end gap-1">Followers <SortIcon field="followers"/></div>
            </th>
            <th className="py-4 px-2 font-medium text-right cursor-pointer hover:text-white" onClick={() => handleSort('popularity')}>
                 <div className="flex items-center justify-end gap-1">Popularity <SortIcon field="popularity"/></div>
            </th>
            <th className="py-4 px-2 font-medium">Genres</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {sortedArtists.map((artist) => {
            const isUp = Math.random() > 0.4; // Mock trend direction (would ordinarily benefit from real persisted historical data)
            return (
                <tr 
                    key={artist.id} 
                    className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors group cursor-pointer"
                    onClick={() => router.push(`/application/artist/${artist.id}`)}
                >
                <td className="py-4 px-2 text-zinc-500 font-mono text-xl md:text-2xl opacity-50 group-hover:opacity-100 pl-4">{artist.rank}</td>
                <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 relative rounded-md overflow-hidden bg-zinc-800 flex-shrink-0">
                        {artist.avatar ? (
                             <img src={artist.avatar} alt={artist.name} className="object-cover w-full h-full" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs">?</div>
                        )}
                    </div>
                    <div>
                        <div className="font-bold text-white text-base">{artist.name}</div>
                        <div className="text-zinc-500 text-xs">{artist.handle}</div>
                    </div>
                    </div>
                </td>
                <td className="py-4 px-2 text-right">
                    <div className="font-bold">{artist.followersDisplay}</div>
                    <div className={`text-xs flex items-center justify-end gap-1 ${isUp ? 'text-green-500' : 'text-red-500'}`}>
                        {isUp ? <ArrowUp className="w-3 h-3"/> : <ArrowDown className="w-3 h-3"/>}
                         {(Math.random() * 2).toFixed(2)}%
                    </div>
                </td>
                <td className="py-4 px-2 text-right">
                     <div className="flex items-center justify-end gap-2">
                        {/* Sparkline visualization */}
                        <div className="h-8 w-20 flex items-end gap-[2px]">
                            {artist.trendData.map((val : any, i : any) => (
                                <div 
                                    key={i} 
                                    className={`w-full rounded-t-sm transition-all ${i === artist.trendData.length -1 ? 'bg-green-500 animate-pulse' : 'bg-green-500/50'}`} 
                                    style={{height: `${val}%`}}
                                ></div>
                            ))}
                        </div>
                        <span className="font-bold text-lg">{artist.popularityDisplay}</span>
                     </div>
                </td>
                <td className="py-4 px-2">
                    <div className="flex flex-wrap gap-1">
                        {artist.genres.slice(0, 3).map((genre) => (
                            <span key={genre} className="px-2 py-0.5 bg-zinc-800 rounded text-xs text-zinc-400 capitalize">
                                {genre}
                            </span>
                        ))}
                        {artist.genres.length > 3 && (
                            <span className="px-2 py-0.5 text-xs text-zinc-500">+{artist.genres.length - 3}</span>
                        )}
                    </div>
                </td>
                </tr>
            );
          })}
        </tbody>
      </table>
      </div>
        {/* Pagination mock */}
         <div className="flex justify-between items-center mt-6 text-sm text-zinc-500">
            <div>Showing {sortedArtists.length} artists</div>
             <div className="flex gap-2">
                <button className="px-3 py-1 bg-zinc-800 rounded hover:bg-zinc-700 disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1 bg-zinc-800 rounded hover:bg-zinc-700">Next</button>
             </div>
        </div>

    </div>
  );
}
