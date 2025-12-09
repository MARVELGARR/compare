export interface SpotifyExternalUrls {
  spotify: string;
}

export interface SpotifyFollowers {
  href: string | null;
  total: number;
}

export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyArtist {
  external_urls: SpotifyExternalUrls;
  followers: SpotifyFollowers;
  genres: string[]; // e.g. ["Prog rock", "Grunge"]
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  popularity: number;
  type: "artist" | string;
  uri: string;
}

export interface SpotifySimpleArtist {
  external_urls: SpotifyExternalUrls
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
}


export type RelatedArtist = SpotifyArtist[]

export interface SpotifyAlbumItem {
  album_group?: "album" | "single" | "compilation" | "appears_on";
  album_type: "album" | "single" | "compilation";
  artists: SpotifySimpleArtist[];
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  total_tracks: number;
  type: "album";
  uri: string;
}

export interface SpotifyArtistAlbumsResponse {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: SpotifyAlbumItem[];
}

export interface SpotifyTracksResponse {
  tracks: SpotifyTrack[];
}

export interface SpotifyTrack {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: SpotifyExternalIds;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from?: Record<string, unknown>;
  restrictions?: SpotifyRestrictions;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: "track";
  uri: string;
  is_local: boolean;
}

export interface SpotifyAlbum {
  album_type: "album" | "single" | "compilation";
  total_tracks: number;
  available_markets: string[];
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  restrictions?: SpotifyRestrictions;
  type: "album";
  uri: string;
  artists: SpotifyArtist[];
}

export interface SpotifyExternalIds {
  isrc?: string;
  ean?: string;
  upc?: string;
}

export interface SpotifyRestrictions {
  reason: string;
}

export type Market = {
    markets: string[]
}


