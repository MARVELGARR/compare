import { getSpotifyAccessToken } from "@/src/apis/spotifyToken";


export async function GET() {
  const token = await getSpotifyAccessToken();
  return Response.json({ access_token: token });
}
