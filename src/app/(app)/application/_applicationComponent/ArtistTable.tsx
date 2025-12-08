"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, Music2, Search, Filter } from "lucide-react";
import Image from "next/image";
import { fetchAfrobeats } from "../actions";

export default function ArtistTable() {
  const { data: artists, isLoading, error } = useQuery({
    queryKey: ["afrobeat-rankings"],
    queryFn: () => fetchAfrobeats(10, 0),
  });

  if (isLoading) return <div className="text-white p-8">Loading rankings...</div>;
  if (error) return <div className="text-red-500 p-8">Error loading data.</div>;

  return (
    <div className="w-full text-white font-sans mt-4">
      {/* Filters mimicking the design */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
           <button className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
             <Filter className="w-3 h-3"/> Filters
           </button>
           <div className="bg-zinc-800 rounded-full p-1 flex items-center text-xs ml-2">
              <span className="px-3 py-1 bg-white text-black rounded-full shadow-sm cursor-pointer">1d</span>
              <span className="px-3 py-1 text-zinc-400 hover:text-white cursor-pointer">7d</span>
              <span className="px-3 py-1 text-zinc-400 hover:text-white cursor-pointer">1m</span>
              <span className="px-3 py-1 text-zinc-400 hover:text-white cursor-pointer">All</span>
           </div>
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <button className="px-4 py-1.5 rounded-full border border-zinc-700 text-zinc-300 text-sm hover:bg-zinc-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full border border-zinc-500"></span> Overview
            </button>
            <button className="px-4 py-1.5 rounded-full bg-white text-black text-sm font-medium flex items-center gap-2">
                <span className="text-green-500"><Music2 className="w-3 h-3 fill-current"/></span> Spotify
            </button>
            <button className="px-4 py-1.5 rounded-full border border-zinc-700 text-zinc-300 text-sm hover:bg-zinc-800">Instagram</button>
             <button className="px-4 py-1.5 rounded-full border border-zinc-700 text-zinc-300 text-sm hover:bg-zinc-800">Youtube</button>
             <button className="px-4 py-1.5 rounded-full border border-zinc-700 text-zinc-300 text-sm hover:bg-zinc-800">SoundCloud</button>
             <button className="px-4 py-1.5 rounded-full border border-zinc-700 text-zinc-300 text-sm hover:bg-zinc-800 whitespace-nowrap">Apple Music</button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="text-xs text-zinc-400 uppercase border-b border-zinc-800">
          <tr>
            <th className="py-4 px-2 font-medium w-12">#</th>
            <th className="py-4 px-2 font-medium">Artist</th>
            <th className="py-4 px-2 font-medium text-right">Followers</th>
            <th className="py-4 px-2 font-medium text-right">Streams</th>
            <th className="py-4 px-2 font-medium text-right">Playlists</th>
            <th className="py-4 px-2 font-medium text-right">Playlist Reach</th>
            <th className="py-4 px-2 font-medium text-right">Charts</th>
            <th className="py-4 px-2 font-medium text-right">Hypemeter</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {artists?.map((artist) => {
            const isUp = Math.random() > 0.4; // Mock trend direction
            return (
                <tr key={artist.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors group">
                <td className="py-4 px-2 text-zinc-500 font-mono text-xl md:text-2xl opacity-50 group-hover:opacity-100">{artist.rank}</td>
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
                    <div className="font-bold">{artist.followers}</div>
                    <div className={`text-xs flex items-center justify-end gap-1 ${isUp ? 'text-green-500' : 'text-red-500'}`}>
                        {isUp ? <ArrowUp className="w-3 h-3"/> : <ArrowDown className="w-3 h-3"/>}
                         {(Math.random() * 2).toFixed(2)}%
                    </div>
                </td>
                <td className="py-4 px-2 text-right">
                    <div className="font-bold">{artist.streams}</div>
                     <div className={`text-xs flex items-center justify-end gap-1 ${Math.random() > 0.5 ? 'text-green-500' : 'text-red-500'}`}>
                        {Math.random() > 0.5 ? <ArrowUp className="w-3 h-3"/> : <ArrowDown className="w-3 h-3"/>}
                         {(Math.random() * 2).toFixed(2)}%
                    </div>
                </td>
                <td className="py-4 px-2 text-right">
                     <div className="font-bold">{artist.playlists}</div>
                      <div className="text-xs text-green-500 flex items-center justify-end gap-1">
                        <ArrowUp className="w-3 h-3"/>
                        {(Math.random() * 20).toFixed(0)}%
                    </div>
                </td>
                <td className="py-4 px-2 text-right">
                    <div className="font-bold">{artist.playlistReach}</div>
                    <div className="text-xs text-green-500 flex items-center justify-end gap-1">
                         <ArrowUp className="w-3 h-3"/>
                         {(Math.random() * 3).toFixed(2)}%
                    </div>
                </td>
                <td className="py-4 px-2 text-right">
                    <div className="font-bold">{artist.charts}</div>
                    <div className="text-xs text-green-500 flex items-center justify-end gap-1">
                        <ArrowUp className="w-3 h-3"/>
                         2
                    </div>
                </td>
                <td className="py-4 px-2 text-right w-48">
                     <div className="flex items-center justify-end gap-2">
                        {/* Simple Sparkline Mock */}
                        <div className="h-8 w-24 flex items-end gap-[2px]">
                            {artist.trendData.map((val, i) => (
                                <div 
                                    key={i} 
                                    className={`w-full rounded-t-sm transition-all ${i === artist.trendData.length -1 ? 'bg-orange-500 animate-pulse' : 'bg-green-500/50'}`} 
                                    style={{height: `${val}%`}}
                                ></div>
                            ))}
                        </div>
                        <span className="font-bold text-lg text-orange-500">{artist.hypemeter}%</span>
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
            <div>Showing 1-10 of 100</div>
             <div className="flex gap-2">
                <button className="px-3 py-1 bg-zinc-800 rounded hover:bg-zinc-700 disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1 bg-zinc-800 rounded hover:bg-zinc-700">Next</button>
             </div>
        </div>

    </div>
  );
}
