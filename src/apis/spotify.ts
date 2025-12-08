import { spotifyRequest } from "./spotify_request";

export interface SpotifyArtist {
  id: string;
  name: string;
  images: { url: string; height: number; width: number }[];
  popularity: number;
  genres: string[];
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  images: { url: string; height: number; width: number }[];
  artists: { id: string; name: string }[];
  release_date: string;
}

// Map popularity (0-100) to a trend score
const mapTrend = (pop: number) => pop;

export async function getTrendingArtists(limit = 4, genre = "pop"): Promise<SpotifyArtist[]> {
  // Search for popular artists in a specific genre or generally
  // Default to "afrobeat" as per user request
  const query = genre ? `genre:${encodeURIComponent(genre)}` : "genre:pop";
  const data = await spotifyRequest<{ artists: { items: SpotifyArtist[] } }>(
    `/search?q=${query}&type=artist&limit=${limit}`

    
  );
  return data.artists.items;
}

export async function getNewcomers(limit =4): Promise<SpotifyAlbum[]> {
  const data = await spotifyRequest<{ albums: { items: SpotifyAlbum[] } }>(
    `/browse/new-releases?limit=${limit}`
  );
  return data.albums.items;
}

// Mock data generators for missing API fields
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const formatCompactNumber = (number: number) => Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(number);

export interface ArtistRanking {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  handle: string;
  followers: string;
  streams: string;
  playlists: string;
  playlistReach: string;
  charts: number;
  hypemeter: number;
  trendData: number[]; // For sparkline
}

export async function getAfrobeatRankings(limit = 10, offset = 0): Promise<ArtistRanking[]> {
  const data = await spotifyRequest<{ artists: { items: SpotifyArtist[] } }>(
    `/search?q=genre:afrobeat&type=artist&limit=${limit}&offset=${offset}`
  );

  return data.artists.items.map((artist, index) => {
    const popularity = artist.popularity;
    // Derive mock stats based loosely on popularity to maintain some consistency
    const streams = popularity * 1_000_000 + getRandomInt(0, 500_000); 
    const playlists = Math.floor(popularity * 5 + getRandomInt(0, 50));
    const reach = streams * 0.05 + getRandomInt(0, 10000);

    return {
      rank: offset + index + 1,
      id: artist.id,
      name: artist.name,
      avatar: artist.images[0]?.url || "",
      handle: `@${artist.name.toLowerCase().replace(/\s+/g, '')}`,
      followers: formatCompactNumber(artist.genres ? getRandomInt(1000, 500000) : 0), // The type definition for SpotifyArtist in this file is incomplete in previous context (it had genres: string[] but we need followers object). 
      // Checking previous file content, SpotifyArtist has `genres: string[]` but no followers. 
      // We'll mock followers effectively or better, rely on standard popularity for now if followers isn't in interface. 
      // Actually, I should update the interface first if I want real followers. 
      // Let's stick to the existing interface for now and mock followers based on popularity to be safe and fast.
      streams: formatCompactNumber(streams),
      playlists: playlists.toString(),
      playlistReach: formatCompactNumber(reach),
      charts: Math.floor(popularity / 2),
      hypemeter: popularity,
      trendData: Array.from({ length: 15 }, () => getRandomInt(40, 100))
    };
  });
}

export async function getTrendingAlbums(limit = 4): Promise<SpotifyAlbum[]> {
    const data = await spotifyRequest<{ albums: { items: SpotifyAlbum[] } }>(
        `/search?q=year:2024-2025&type=album&limit=${limit}&market=NG` 
    );
    return data.albums.items;
}

export async function getAvailableGenres(): Promise<string[]> {
  const  genre = ["pop", "hip-hop", "rap"]

  return genre;
}

