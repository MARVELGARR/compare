"use server";

import { getArtistRankings, ArtistRanking } from "@/src/apis/spotify";

/**
 * Server action to fetch artist rankings from Spotify API
 * @param limit - Number of artists to fetch
 * @param offset - Offset for pagination
 * @param market - Market/country code (e.g., 'NG', 'US', 'GB')
 * @param genre - Optional genre filter (e.g., 'Afrobeat', 'Hip Hop')
 * @returns Promise of artist rankings array
 */
export async function fetchArtistRankings(
  limit: number,
  offset: number,
  market: string,
  genre?: string | null
): Promise<ArtistRanking[]> {
  try {
    const artists = await getArtistRankings(limit, offset, market, genre);
    return artists;
  } catch (error) {
    console.error("Error fetching artist rankings:", error);
    throw new Error("Failed to fetch artist rankings from Spotify");
  }
}
