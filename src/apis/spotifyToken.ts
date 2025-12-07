
let cachedToken: string | null = null;
let expiresAt: number | null = null; // timestamp (ms)

export async function getSpotifyAccessToken() {
  const now = Date.now();

  // Still valid?
  if (cachedToken && expiresAt && now < expiresAt) {
    return cachedToken;
  }

  // Otherwise fetch new one
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
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

  // Save to server memory cache
  cachedToken = data.access_token;
  expiresAt = Date.now() + data.expires_in * 1000;

  return cachedToken;
}


const getSpotifyToken = async () => {
  const res = await fetch("/api/spotify-token");
  const data = await res.json();
  return data.access_token;
};

export default getSpotifyToken;
