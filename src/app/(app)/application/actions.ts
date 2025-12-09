"use server";

import { getAfrobeatRankings, getArtist,  getArtistTopTracksByCountry } from "../../../apis/spotify";

export async function fetchAfrobeats(limit = 10, offset = 0, market = "NG", genre?: string | null) {
  return await getAfrobeatRankings(limit, offset, market, genre);
}

export async function fetchArtistDetails(id: string) {
  return await getArtist(id);
}

export async function fetchArtistTopTracks(id: string, market = "NG") {
  return await getArtistTopTracksByCountry(id, market);
}
