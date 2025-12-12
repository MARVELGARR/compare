'use client';

import { SpotifyArtist } from '@/src/apis/spotify.api.types';
import { Users, TrendingUp, Music } from 'lucide-react';

interface ComparisonMetricsProps {
  artists: SpotifyArtist[];
}

export default function ComparisonMetrics({ artists }: ComparisonMetricsProps) {
  if (artists.length < 2) return null;

  // Calculate metrics
  const followers = artists.map(a => a.followers?.total || 0);
  const popularity = artists.map(a => a.popularity || 0);
  
  const maxFollowers = Math.max(...followers);
  const maxPopularity = Math.max(...popularity);

  // Genre analysis
  const allGenres = artists.flatMap(a => a.genres || []);
  const genreCounts = allGenres.reduce((acc, genre) => {
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const commonGenres = Object.entries(genreCounts)
    .filter(([_, count]) => count > 1)
    .map(([genre]) => genre);

  const uniqueGenres = artists.map(artist => ({
    artist: artist.name,
    genres: (artist.genres || []).filter(g => !commonGenres.includes(g))
  }));

  return (
    <div className="space-y-6">
      {/* Followers Comparison */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-green-500" />
          <h3 className="text-xl font-bold text-white">Followers</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {artists.map((artist, index) => {
            const followerCount = followers[index];
            const percentage = (followerCount / maxFollowers) * 100;
            const isMax = followerCount === maxFollowers;

            return (
              <div key={artist.id} className="space-y-2">
                <div className="text-sm text-zinc-500 truncate">{artist.name}</div>
                <div className={`text-2xl font-bold ${isMax ? 'text-green-500' : 'text-white'}`}>
                  {Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(followerCount)}
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${isMax ? 'bg-green-500' : 'bg-zinc-600'}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="text-xs text-zinc-500">{percentage.toFixed(0)}% of max</div>
              </div>
            );
          })}
        </div>

        {/* Difference */}
        {artists.length === 2 && (
          <div className="mt-4 pt-4 border-t border-zinc-800 text-sm text-zinc-400">
            Difference: <span className="font-semibold text-white">
              {Intl.NumberFormat('en-US', { notation: 'compact' }).format(Math.abs(followers[0] - followers[1]))}
            </span>
            {' '}({((Math.abs(followers[0] - followers[1]) / Math.max(...followers)) * 100).toFixed(1)}%)
          </div>
        )}
      </div>

      {/* Popularity Comparison */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-purple-500" />
          <h3 className="text-xl font-bold text-white">Popularity Score</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {artists.map((artist, index) => {
            const score = popularity[index];
            const isMax = score === maxPopularity;

            return (
              <div key={artist.id} className="space-y-2">
                <div className="text-sm text-zinc-500 truncate">{artist.name}</div>
                <div className={`text-3xl font-bold ${isMax ? 'text-purple-500' : 'text-white'}`}>
                  {score}%
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${isMax ? 'bg-purple-500' : 'bg-zinc-600'}`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {artists.length === 2 && (
          <div className="mt-4 pt-4 border-t border-zinc-800 text-sm text-zinc-400">
            Difference: <span className="font-semibold text-white">{Math.abs(popularity[0] - popularity[1])}%</span>
          </div>
        )}
      </div>

      {/* Genre Analysis */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Music className="w-5 h-5 text-blue-500" />
          <h3 className="text-xl font-bold text-white">Genre Analysis</h3>
        </div>

        {commonGenres.length > 0 && (
          <div className="mb-4">
            <div className="text-sm text-zinc-500 mb-2">Common Genres</div>
            <div className="flex flex-wrap gap-2">
              {commonGenres.map(genre => (
                <span key={genre} className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm capitalize border border-green-500/30">
                  {genre}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          {uniqueGenres.map(({ artist, genres }) => (
            genres.length > 0 && (
              <div key={artist}>
                <div className="text-sm text-zinc-500 mb-1">{artist} Only</div>
                <div className="flex flex-wrap gap-2">
                  {genres.map(genre => (
                    <span key={genre} className="px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full text-sm capitalize">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>

        {commonGenres.length > 0 && (
          <div className="mt-4 pt-4 border-t border-zinc-800 text-sm text-zinc-400">
            Genre Overlap: <span className="font-semibold text-white">
              {((commonGenres.length / new Set(allGenres).size) * 100).toFixed(0)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
