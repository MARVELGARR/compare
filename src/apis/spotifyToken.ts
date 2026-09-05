
let cachedToken: string | null = null;
let expiresAt: number | null = null; // timestamp (ms)

export async function getSpotifyAccessToken() {
  const now = Date.now();

  // Still valid?
  if (cachedToken && expiresAt && now < expiresAt) {
    return cachedToken;
  }

  // Otherwise fetch new one
  const sanitize = (val: string | undefined) => {
    if (!val) return "";
    let s = val.trim();
    if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
      s = s.slice(1, -1);
    }
    return s;
  };

  const clientId = sanitize(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID_DEV);
  // Server-only secret. Supports both the documented _DEV name and legacy fallbacks.
  const clientSecret = sanitize(
    process.env.SPOTIFY_CLIENT_SECRET_DEV ||
      process.env.SPOTIFY_CLIENT_SECRET
  );

  if (!clientId || !clientSecret) {
    throw new Error(
      "Missing Spotify credentials: set NEXT_PUBLIC_SPOTIFY_CLIENT_ID_DEV and SPOTIFY_CLIENT_SECRET_DEV"
    );
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    cache: "no-store", // force fresh response
  });

  const data = await res.json();

  if (!res.ok || !data.access_token) {
    throw new Error(
      `Failed to acquire Spotify token: ${res.status} ${data.error_description || data.error || ""}`.trim()
    );
  }

  // Save to server memory cache (with 60s skew buffer)
  cachedToken = data.access_token;
  expiresAt = Date.now() + data.expires_in * 1000 - 60_000;

  return cachedToken;
}


const getSpotifyToken = async () => {
  const res = await fetch("/api/spotify-token");
  const data = await res.json();
  return data.access_token;
};

export default getSpotifyToken;
