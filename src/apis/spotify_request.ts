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

  const maxRetries = 3;
  let delay = 1000; // start with 1s delay

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${token}`
        },
        cache: "no-store"
      });

      if (res.ok) return res.json() as Promise<T>;

      // Transient errors that are worth retrying
      if (attempt < maxRetries && [429, 502, 503, 504].includes(res.status)) {
        console.warn(`Spotify API ${res.status} on attempt ${attempt}. Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // exponential backoff
        continue;
      }

      // Non-retryable HTTP error: fail immediately, do not fall into the
      // network-error retry path below.
      throw new Error(`Spotify API Error: ${res.status}`);
    } catch (err) {
      // If the error is an HTTP error we already decided not to retry, rethrow.
      if (err instanceof Error && err.message.startsWith("Spotify API Error:")) {
        throw err;
      }
      if (attempt === maxRetries) throw err;
      // For network-level errors (not HTTP status codes)
      console.warn(`Network error on attempt ${attempt}. Retrying in ${delay}ms...`, err);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  }

  throw new Error("Failed to fetch from Spotify after maximum retries");
}

