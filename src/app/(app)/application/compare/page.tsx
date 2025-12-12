
'use client';

import { useState } from 'react';
import { SpotifyArtist } from '@/src/apis/spotify.api.types';
import ComparisonSearch from '@/src/components/application/ComparisonSearch';
import ComparisonHeader from '@/src/components/application/ComparisonHeader';
import ComparisonMetrics from '@/src/components/application/ComparisonMetrics';

export default function ComparePage() {
  const [selectedArtists, setSelectedArtists] = useState<SpotifyArtist[]>([]);

  const handleRemoveArtist = (artistId: string) => {
    setSelectedArtists(prev => prev.filter(a => a.id !== artistId));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Search Section */}
        <ComparisonSearch
          selectedArtists={selectedArtists}
          onArtistsSelected={setSelectedArtists}
          maxArtists={4}
        />

        {/* Comparison Content */}
        {selectedArtists.length >= 2 ? (
          <>
            <ComparisonHeader 
              artists={selectedArtists}
              onRemoveArtist={handleRemoveArtist}
            />
            <ComparisonMetrics artists={selectedArtists} />
          </>
        ) : selectedArtists.length === 1 ? (
          <div className="text-center py-12 border-2 border-dashed border-zinc-800 rounded-lg">
            <p className="text-zinc-500">Add at least one more artist to start comparing</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
