'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Loader2 } from 'lucide-react';
import { fetchArtistRankings } from '@/src/app/(app)/application/actions';
import { SpotifyArtist } from '@/src/apis/spotify.api.types';
import { useQueryState } from 'nuqs';
import { useSearchParams } from 'next/navigation';

interface ArtistSearchPopoverProps {
  selectedArtists: SpotifyArtist[];
  onAddArtist: (artist: any) => void;
  maxArtists?: number;
}

export default function ArtistSearchPopover({ 
  selectedArtists, 
  onAddArtist,
  maxArtists = 4 
}: ArtistSearchPopoverProps) {
  const [open, setOpen] = useState(false);


  const urlQuery = useSearchParams()
  const defaultMarket = urlQuery.get("market")
  const defaultSearch = urlQuery.get("search")
  const [market] = useQueryState("market", {defaultValue: defaultMarket || "NG"})

  const [searchQuery, setSearch] = useQueryState("search", {defaultValue: defaultSearch || "" }, )


  // Fetch artists based on search
  const { data: artists, isLoading } = useQuery({
    queryKey: ['artist-search', market, searchQuery],
    queryFn: () => fetchArtistRankings(10, 0, market, searchQuery || null),
    enabled: open, // Only fetch when popover is open
  });

  const handleAddArtist = (artist: any) => {
    if (selectedArtists.length >= maxArtists) return;
    onAddArtist(artist);
  };

  const isArtistSelected = (artistId: string) => {
    return selectedArtists.some(a => a.id === artistId);
  };

  

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2  rounded-full border-neutral-700 bg-transparent text-white hover:bg-secondary"
          disabled={selectedArtists.length >= maxArtists}
        >
          <Plus className="h-4 w-4 group-hover:text-foreground" />
          Add Artists {selectedArtists.length > 0 && `(${selectedArtists.length}/${maxArtists})`}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[400px] p-0 bg-[#0d0d0d] border-neutral-800" 
        align="start"
      >
        <div className="p-4 space-y-4">
          {/* Search Header */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white">Search Artists  <strong>{market}</strong> </h4>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <Input
                placeholder="Search by name or genre..."
                value={searchQuery}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500"
              />
            </div>
          </div>

          {/* Market Filter */}
          <div className="flex gap-2">
            {/* {['NG', 'US', 'GB', 'GH', 'KE'].map((m) => (
              <Button
                key={m}
                variant={market === m ? 'default' : 'outline'}
                size="sm"
                className={`rounded-full text-xs ${
                  market === m
                    ? 'bg-white text-black'
                    : 'border-neutral-700 bg-transparent text-neutral-400 hover:bg-neutral-800'
                }`}
                onClick={() => setMarket(m)}
              >
                {m}
              </Button>
            ))} */}
          </div>

          {/* Artist List */}
          <div className="max-h-[400px] overflow-y-auto space-y-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-neutral-500" />
              </div>
            ) : artists && artists.length > 0 ? (
              artists.map((artist) => {
                const selected = isArtistSelected(artist.id);
                return (
                  <button
                    key={artist.id}
                    onClick={() => !selected && handleAddArtist(artist)}
                    disabled={selected}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      selected
                        ? 'bg-neutral-800/50 opacity-50 cursor-not-allowed'
                        : 'hover:bg-neutral-800/50 cursor-pointer'
                    }`}
                  >
                    <Avatar className="h-10 w-10">
                      {artist.avatar ? (
                        <AvatarImage src={artist.avatar} />
                      ) : (
                        <AvatarFallback>{artist.name[0]}</AvatarFallback>
                      )}
                    </Avatar>

                    <div className="flex-1 text-left">
                      <div className="font-medium text-white text-sm">{artist.name}</div>
                      <div className="text-xs text-neutral-500">{artist.followersDisplay} followers</div>
                    </div>

                    <Badge
                      className={`min-w-[50px] justify-center rounded-md border-0 font-bold text-xs ${
                        artist.popularity >= 80
                          ? 'bg-orange-600/20 text-orange-500'
                          : artist.popularity >= 60
                            ? 'bg-amber-600/20 text-amber-500'
                            : 'bg-green-600/20 text-green-500'
                      }`}
                    >
                      {artist.popularity}%
                    </Badge>

                    {selected && (
                      <Badge variant="outline" className="border-green-500 text-green-500 text-xs">
                        Added
                      </Badge>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="text-center py-8 text-neutral-500 text-sm">
                {searchQuery ? 'No artists found' : 'Start typing to search'}
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
