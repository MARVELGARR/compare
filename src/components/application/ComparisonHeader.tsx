'use client';

import { SpotifyArtist } from '@/src/apis/spotify.api.types';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ComparisonHeaderProps {
  artists: SpotifyArtist[];
  onRemoveArtist?: (artistId: string) => void;
}

export default function ComparisonHeader({ artists, onRemoveArtist }: ComparisonHeaderProps) {
  if (artists.length < 2) return null;

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="tit font-bold text-white mb-2">Artist Comparison</h2>
        <p className="text-zinc-500">Compare stats and metrics across {artists.length} artists</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
        {artists.map((artist, index) => (
          <div key={artist.id} className="relative">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-6 text-center hover:border-green-500/50 transition-all">
              {onRemoveArtist && (
                <button
                  onClick={() => onRemoveArtist(artist.id)}
                  className="absolute top-3 right-3 w-7 h-7 bg-zinc-800 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors z-10"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              )}

              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-zinc-800 shadow-xl">
                  {artist.images?.[0] ? (
                    <Image
                      src={artist.images[0].url}
                      alt={artist.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-3xl font-bold text-zinc-500">
                      {artist.name[0]}
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                  #{index + 1}
                </div>
              </div>

              <h3 className="font-bold text-white text-lg mb-1 truncate">{artist.name}</h3>

              <div className="flex flex-wrap gap-1 justify-center mb-3">
                {artist.genres?.slice(0, 2).map((genre: string) => (
                  <span
                    key={genre}
                    className="px-2 py-0.5 bg-zinc-800 rounded text-xs text-zinc-400 capitalize"
                  >
                    {genre}
                  </span>
                ))}
                {artist.genres && artist.genres.length > 2 && (
                  <span className="px-2 py-0.5 text-xs text-zinc-500">
                    +{artist.genres.length - 2}
                  </span>
                )}
              </div>

              <div className="space-y-1 text-sm">
                <div className="text-zinc-400">
                  <span className="font-semibold text-white">
                    {Intl.NumberFormat('en-US', { notation: 'compact' }).format(artist.followers?.total || 0)}
                  </span>{' '}
                  followers
                </div>
                <div className="text-zinc-400">
                  <span className="font-semibold text-green-500">{artist.popularity}%</span> popularity
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
