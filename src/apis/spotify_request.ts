import { getSpotifyAccessToken } from "./spotifyToken";


let clientCachedToken: string | null = null;
let clientTokenExpiresAt: number | null = null;

export async function spotifyRequest<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<T> {
  let token: string;

  if (typeof window === "undefined") {
    // Server-side: call the logic directly to avoid relative URL issues
    const { getSpotifyAccessToken } = await import("./spotifyToken");
    const accessToken = await getSpotifyAccessToken();
    if (!accessToken) throw new Error("Failed to acquire Spotify access token on server");
    token = accessToken;
  } else {
    // Client-side: fetch from our internal API to avoid CORS and hide secrets
    const now = Date.now();
    if (clientCachedToken && clientTokenExpiresAt && now < clientTokenExpiresAt) {
      token = clientCachedToken;
    } else {
      const tokenRes = await fetch("/api/spotify-token");
      if (!tokenRes.ok) throw new Error("Failed to fetch Spotify token from client");
      const data = await tokenRes.json();
      token = data.access_token;
      clientCachedToken = token;
      // Tokens usually last 1 hour, let's play it safe with 50 mins
      clientTokenExpiresAt = now + 50 * 60 * 1000;
    }
  }

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

