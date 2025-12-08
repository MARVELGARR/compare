import { getSpotifyAccessToken } from "./spotifyToken";


export async function spotifyRequest<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<T> {
  const token = await getSpotifyAccessToken();

  const url = new URL(`https://api.spotify.com/v1${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`
    },
    cache: "force-cache"
  });

  if (!res.ok) throw new Error(`Spotify API Error: ${res.status}`);

  return res.json();
}

