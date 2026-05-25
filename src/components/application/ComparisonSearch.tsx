'use client';

import { useState } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getArtistRankings } from '@/src/apis/spotify';
import { SpotifyArtist } from '@/src/apis/spotify.api.types';
import Image from 'next/image';

interface ComparisonSearchProps {
  onArtistsSelected: (artists: SpotifyArtist[]) => void;
  selectedArtists: SpotifyArtist[];
  maxArtists?: number;
}

export default function ComparisonSearch({
  onArtistsSelected,
  selectedArtists,
  maxArtists = 4
}: ComparisonSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['artist-search', searchQuery],
    queryFn: async () => {
      if (!searchQuery || searchQuery.length < 2) return [];
      const results = await getArtistRankings(10, 0, 'NG', searchQuery);
      return results;
    },
    enabled: searchQuery.length >= 2,
  });

  const handleAddArtist = async (artistId: string) => {
    if (selectedArtists.length >= maxArtists) return;

    // Fetch full artist details
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`);
    const artist = await response.json();

    if (!selectedArtists.find(a => a.id === artistId)) {
      onArtistsSelected([...selectedArtists, artist]);
      setSearchQuery('');
      setIsSearching(false);
    }
  };

  const handleRemoveArtist = (artistId: string) => {
    onArtistsSelected(selectedArtists.filter(a => a.id !== artistId));
  };

  return (
    <div className="w-full space-y-6">
      {/* Search Input */}
      <div className="relative">
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 focus-within:border-green-500 transition-colors">
          <Search className="w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search for artists to compare..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearching(true);
            }}
            onFocus={() => setIsSearching(true)}
            className="flex-1 bg-transparent outline-none text-white placeholder:text-zinc-500"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setIsSearching(false);
              }}
              className="text-zinc-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {isSearching && searchQuery.length >= 2 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto no-scrollbar">
            {isLoading ? (
              <div className="p-4 text-center text-zinc-500">Searching...</div>
            ) : searchResults && searchResults.length > 0 ? (
              <div className="py-2">
                {searchResults.map((artist) => (
                  <button
                    key={artist.id}
                    onClick={() => handleAddArtist(artist.id)}
                    disabled={selectedArtists.some(a => a.id === artist.id) || selectedArtists.length >= maxArtists}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800 shrink-0">
                      {artist.avatar ? (
                        <Image src={artist.avatar} alt={artist.name} width={48} height={48} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs">
                          {artist.name[0]}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-white">{artist.name}</div>
                      <div className="text-xs text-zinc-500">
                        {artist.followersDisplay} followers • {artist.popularityDisplay} popularity
                      </div>
                    </div>
                    {selectedArtists.some(a => a.id === artist.id) && (
                      <span className="text-xs text-green-500">Selected</span>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-zinc-500">No artists found</div>
            )}
          </div>
        )}
      </div>

      {/* Selected Artists */}
      {selectedArtists.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {selectedArtists.map((artist, index) => (
            <div
              key={artist.id}
              className="relative bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-colors"
            >
              <button
                onClick={() => handleRemoveArtist(artist.id)}
                className="absolute top-2 right-2 w-6 h-6 bg-zinc-800 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-3 h-3 text-white" />
              </button>

              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-zinc-800">
                  {artist.images?.[0] ? (
                    <Image
                      src={artist.images[0].url}
                      alt={artist.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-zinc-500">
                      {artist.name[0]}
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <div className="font-semibold text-white text-sm truncate w-full">
                    {artist.name}
                  </div>
                  <div className="text-xs text-zinc-500">Artist {index + 1}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Add More Placeholder */}
          {selectedArtists.length < maxArtists && (
            <button
              onClick={() => setIsSearching(true)}
              className="bg-zinc-900 border-2 border-dashed border-zinc-800 rounded-lg p-4 hover:border-green-500 transition-colors flex flex-col items-center justify-center gap-2 min-h-[140px]"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                <Search className="w-6 h-6 text-zinc-500" />
              </div>
              <div className="text-sm text-zinc-500">Add Artist</div>
            </button>
          )}
        </div>
      )}

      {/* Empty State */}
      {selectedArtists.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-zinc-800 rounded-lg">
          <TrendingUp className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Start Comparing Artists</h3>
          <p className="text-zinc-500 text-sm">
            Search and select 2-{maxArtists} artists to compare their stats
          </p>
        </div>
      )}
    </div>
  );
}
