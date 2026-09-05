import { getSpotifyAccessToken } from "@/src/apis/spotifyToken";


export async function GET() {
  try {
    const token = await getSpotifyAccessToken();
    return Response.json({ access_token: token });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch Spotify token";
    return Response.json({ error: message }, { status: 500 });
  }
}
