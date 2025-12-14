'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SpotifyArtist } from '@/src/apis/spotify.api.types';
import { fetchArtistRankings } from '@/src/app/(app)/application/actions';
import { ArtistRanking } from '@/src/apis/spotify';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Sliders, X } from 'lucide-react';
import ComparisonMetrics from '@/src/components/application/ComparisonMetrics';
import ArtistSearchPopover from '@/src/components/application/ArtistSearchPopover';
import { MarketSelector } from '../_applicationComponent/marketSelector';


export default function ComparePage() {
  const [selectedArtists, setSelectedArtists] = useState<SpotifyArtist[]>([]);
  const [timeFilter, setTimeFilter] = useState("All");

  // Fetch default artist rankings for the list
  const { data: artists, isLoading } = useQuery({
    queryKey: ["artist-rankings", "NG"],
    queryFn: () => fetchArtistRankings(20, 0, "NG", null),
  });

  const handleAddArtist = (artist: any) => {
    if (selectedArtists.length >= 4) return;
    
    // Convert to SpotifyArtist format
    const spotifyArtist: SpotifyArtist = {
      id: artist.id,
      name: artist.name,
      images: artist.avatar ? [{ url: artist.avatar, height: 640, width: 640 }] : [],
      popularity: artist.popularity,
      followers: { total: artist.followers, href: null },
      genres: artist.genres || [],
      external_urls: { spotify: `https://open.spotify.com/artist/${artist.id}` },
      href: `https://api.spotify.com/v1/artists/${artist.id}`,
      type: "artist",
      uri: `spotify:artist:${artist.id}`,
    };
    
    if (!selectedArtists.find(a => a.id === artist.id)) {
      setSelectedArtists([...selectedArtists, spotifyArtist]);
    }
  };

  const handleRemoveArtist = (artistId: string) => {
    setSelectedArtists(prev => prev.filter(a => a.id !== artistId));
  };

  return (
    <div className="p-4 md:p-8 relative">
                      {/* Market selector */}
      <div className=" absolute right-3 ">
        
        <MarketSelector/>
      </div>

      <h2 className="mb-4 md:mb-6 text-2xl md:text-3xl font-semibold text-white">Artist Comparison</h2>


        {/* Filters */}
        <div className="mb-4 md:mb-6 flex flex-wrap items-center gap-2 md:gap-3">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-full border-neutral-700 bg-white text-black hover:bg-neutral-100"
          >
            <Sliders className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </Button>

          {["1d", "7d", "1m", "All"].map((filter) => (
            <Button
              key={filter}
              variant={timeFilter === filter ? "default" : "outline"}
              size="sm"
              className={`rounded-full ${
                timeFilter === filter
                  ? "bg-white text-black hover:bg-neutral-100"
                  : "border-neutral-700 bg-transparent text-neutral-400 hover:bg-neutral-800 hover:text-white"
              }`}
              onClick={() => setTimeFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>



      {/* Responsive Layout */}
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        
        
        {/* Artist List - Hidden on mobile when artists selected, shown on tablet+ */}
        <div className={`${selectedArtists.length >= 2 ? 'hidden lg:block' : 'block'} w-full lg:w-[400px] space-y-2 rounded-2xl border border-neutral-800 bg-[#0d0d0d] p-3 md:p-4`}>
          <div className="mb-3 md:mb-4 flex items-center justify-between text-xs text-neutral-500">
            <span>#</span>
            <span>Artist</span>
            <span className="mr-2 md:mr-4">Popularity</span>
          </div>

          <div className="max-h-[400px] md:max-h-[600px] overflow-y-auto space-y-1">
            {isLoading ? (
              <div className="text-center py-8 text-neutral-500">Loading artists...</div>
            ) : (
              artists?.slice(0, 15).map((artist: ArtistRanking, index: number) => (
                <div
                  key={artist.id}
                  className="group flex items-center gap-2 md:gap-4 rounded-lg p-2 md:p-3 transition-colors hover:bg-neutral-800/50 cursor-pointer"
                  onClick={() => handleAddArtist(artist)}
                >
                  <span className="w-4 md:w-6 text-center text-lg md:text-2xl font-bold text-neutral-700">{index + 1}</span>

                  <Avatar className="h-8 w-8 md:h-10 md:w-10">
                    {artist.avatar ? (
                      <AvatarImage src={artist.avatar} />
                    ) : (
                      <AvatarFallback>{artist.name[0]}</AvatarFallback>
                    )}
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white text-sm md:text-base truncate">{artist.name}</div>
                    <div className="text-xs text-neutral-500 truncate hidden sm:block">{artist.handle}</div>
                  </div>

                  <Badge
                    className={`min-w-[40px] md:min-w-[50px] justify-center rounded-md border-0 font-bold text-xs ${
                      artist.popularity >= 80
                        ? "bg-orange-600/20 text-orange-500"
                        : artist.popularity >= 60
                          ? "bg-amber-600/20 text-amber-500"
                          : "bg-green-600/20 text-green-500"
                    }`}
                  >
                    {artist.popularity}%
                  </Badge>
                </div>
              ))
            )}
          </div>
        </div>
            
        {/* Comparison Area */}
        <div className="flex-1 rounded-2xl border border-neutral-800 bg-[#0d0d0d] p-4 md:p-6">
          
          {/* Selected Artists */}
          <div className="mb-4 md:mb-6 flex flex-wrap items-center gap-2 md:gap-3">
            <ArtistSearchPopover
              selectedArtists={selectedArtists}
              onAddArtist={handleAddArtist}
              maxArtists={4}
            />

            {selectedArtists.map((artist) => (
              <Badge
                key={artist.id}
                variant="outline"
                className="gap-2 rounded-full border-neutral-700 bg-neutral-800/50 px-2 md:px-3 py-1.5 text-white text-xs md:text-sm"
              >
                <Avatar className="h-4 w-4 md:h-5 md:w-5">
                  {artist.images?.[0] ? (
                    <AvatarImage src={artist.images[0].url} />
                  ) : (
                    <AvatarFallback>{artist.name[0]}</AvatarFallback>
                  )}
                </Avatar>
                <span className="max-w-[100px] md:max-w-none truncate">{artist.name}</span>
                <button onClick={() => handleRemoveArtist(artist.id)} className="ml-1 hover:text-red-500">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}

            {selectedArtists.length > 0 && (
              <span className="ml-auto text-xs md:text-sm text-neutral-400 hidden sm:inline">
                {selectedArtists.length} artist{selectedArtists.length > 1 ? 's' : ''} selected
              </span>
            )}
          </div>

          {/* Comparison Content */}
          {selectedArtists.length >= 2 ? (
            <ComparisonMetrics artists={selectedArtists} />
          ) : selectedArtists.length === 1 ? (
            <div className="text-center py-16 md:py-24">
              <div className="text-neutral-500 mb-2 text-sm md:text-base">Add at least one more artist to start comparing</div>
              <div className="text-xs md:text-sm text-neutral-600">
                <span className="hidden lg:inline">Click on artists from the list on the left or </span>
                Use the "Add Artists" button to search
              </div>
            </div>
          ) : (
            <div className="text-center py-16 md:py-24">
              <div className="text-neutral-500 mb-2 text-sm md:text-base">Select artists to compare</div>
              <div className="text-xs md:text-sm text-neutral-600">
                <span className="hidden lg:inline">Click on artists from the list on the left or </span>
                Use the "Add Artists" button to search
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
