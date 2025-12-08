"use server";

import { getAfrobeatRankings } from "../../../apis/spotify";

export async function fetchAfrobeats(limit = 10, offset = 0) {
  return await getAfrobeatRankings(limit, offset);
}
