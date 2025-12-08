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

// Mock data generators for missing API fields
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const formatCompactNumber = (number: number) => Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(number);

export interface ArtistRanking {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  handle: string;
  followers: number;
  followersDisplay: string;
  streams: number;
  streamsDisplay: string;
  playlists: number;
  playlistsDisplay: string;
  playlistReach: number;
  playlistReachDisplay: string;
  charts: number;
  hypemeter: number;
  trendData: number[]; // For sparkline
}

export async function getTrendingArtists(limit = 4, genre = "pop"): Promise<SpotifyArtist[]> {
  const query = genre ? `genre:${encodeURIComponent(genre)}` : "genre:pop";
  const data = await spotifyRequest<{ artists: { items: SpotifyArtist[] } }>(
    `/search?q=${query}&type=artist&limit=${limit}`
  );
  return data.artists.items;
}

export async function getAfrobeatRankings(limit = 50, offset = 0, market = "NG", genre?: string | null): Promise<ArtistRanking[]> {
  // If no genre is selected, we search for artists in the specific market with a broad query (e.g., year range or just broadly popular in market)
  // However, Spotify search requires a query. "genre:pop" is a safe fallback for general popularity if no specific genre.
  // "genre:afrobeat" was the previous hardcode.
  
  let query = '';
  if (genre) {
      query = `genre:${encodeURIComponent(genre)}`;
  } else {
      // If no genre, we try to get top artists for the market. 
      // Searching by year is a decent proxy for "active artists" or just "genre:pop" which covers most mainstream.
      // Let's use "year:2020-2025" to get active artists if market is specified, or default to "genre:pop"
      query = `year:2020-2025`; 
  }

  const data = await spotifyRequest<{ artists: { items: SpotifyArtist[] } }>(
    `/search?q=${query}&type=artist&limit=${limit}&offset=${offset}&market=${market}`
  );

  return data.artists.items.map((artist, index) => {
    const popularity = artist.popularity;
    
    // "Real Maths" for Stream Index estimation
    // Since we don't have real stream counts, we model it:
    // Popularity is logarithmic-ish. 
    // Let's assume Stream Index = (Popularity ^ 2.5) * (Market Weight) * Randomness Factor
    // This creates a wider spread than just linear popularity.
    
    const baseStreams = Math.pow(popularity, 2.8) * 100;
    const volatility = getRandomInt(90, 110) / 100; // +/- 10%
    const streams = Math.floor(baseStreams * volatility);

    // Playlist Reach estimation
    const playlistReach = Math.floor(streams * 0.45);

    // Playlists count estimation
    const playlists = Math.floor(popularity * 1.5 + getRandomInt(5, 20));
    
    // REAL Followers
    // The API provides `followers` object inside artist.
    // However, our interface definition above simplified `followers` to just number on the return type in some places, 
    // but the `SpotifyArtist` interface needs to reflect the API structure first to access it safely.
    // The previously defined SpotifyArtist interface was: images, popularity, genres. It was missing `followers` object.
    
    // We need to cast or fix the interface. The `artist` object from API definitely has `followers: { total: number }`.
    const realFollowers = (artist as any).followers?.total || 0;

    return {
      rank: offset + index + 1,
      id: artist.id,
      name: artist.name,
      avatar: artist.images[0]?.url || "",
      handle: `@${artist.name.toLowerCase().replace(/\s+/g, '')}`,
      followers: realFollowers,
      followersDisplay: formatCompactNumber(realFollowers),
      streams: streams,
      streamsDisplay: formatCompactNumber(streams),
      playlists: playlists,
      playlistsDisplay: playlists.toString(),
      playlistReach: playlistReach,
      playlistReachDisplay: formatCompactNumber(playlistReach),
      charts: Math.floor(popularity / 2.5),
      hypemeter: popularity,
      trendData: Array.from({ length: 15 }, () => getRandomInt(40, 100))
    };
  });
}

export async function getArtist(id: string): Promise<SpotifyArtist> {
  return await spotifyRequest<SpotifyArtist>(`/artists/${id}`);
}

export async function getArtistTopTracks(id: string, market = "NG"): Promise<any[]> {
    const data = await spotifyRequest<{ tracks: any[] }>(`/artists/${id}/top-tracks?market=${market}`);
    return data.tracks;
}

export async function getTrendingAlbums(limit = 4): Promise<SpotifyAlbum[]> {
    const data = await spotifyRequest<{ albums: { items: SpotifyAlbum[] } }>(
        `/search?q=year:2024-2025&type=album&limit=${limit}&market=NG` 
    );
    return data.albums.items;
}
