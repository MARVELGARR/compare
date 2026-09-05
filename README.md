# Compare — Spotify Artist Intelligence & Comparison Platform

<p align="center">
  <strong>Search any artist. Compare up to 4 side by side. See who really runs the scene.</strong>
</p>

<p align="center">
  <a href="https://compare-opal.vercel.app/"><strong>Live Demo</strong></a>
  ·
  <a href="https://github.com/MARVELGARR/compare">GitHub</a>
  ·
  <a href="https://github.com/MARVELGARR/compare/issues">Report a bug</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript 5" />
  <img src="https://img.shields.io/badge/Spotify-Web_API-1DB954?style=flat-square&logo=spotify&logoColor=white" alt="Spotify Web API" />
  <img src="https://img.shields.io/badge/Appwrite-Auth-FD366E?style=flat-square&logo=appwrite&logoColor=white" alt="Appwrite" />
</p>

---

## What is Compare?

**Compare** is a web app that turns raw Spotify data into clear, visual answers to questions music lovers actually argue about:

- *Who has more real reach — Wizkid or Asake right now?*
- *Do these two artists actually share a sound, or just a fanbase?*
- *Does this artist hit different in Nigeria vs. the UK vs. the US?*

Pick up to **4 artists**, and Compare shows you follower reach, Spotify popularity scores (0–100), genre overlap, and top-track trends — side by side, with charts you can read at a glance.

### Who is it for?

| Audience | What they get |
|---|---|
| **Fans** | Settle the debate with live numbers, not vibes |
| **Curators & playlist makers** | Spot genre overlap and rising artists by market |
| **Artists & managers** | Benchmark reach and popularity against peers, per country |

---

## Features

### Dashboard (`/application`)
- **Artist rankings table** — sortable by rank, followers, and popularity, with trend sparklines
- **Genre filter** — afrobeat, afropop, amapiano, hip-hop, R&B, rap, highlife, alte, or all genres
- **Market switcher** — Nigeria (NG), USA (US), UK (GB), Ghana (GH), South Africa (ZA)
- **Paginated results** — URL-synced (`?market=&genre=&page=`) so any view is shareable
- **Click through** to any artist's profile page

### Artist comparison (`/application/compare`)
- **Compare up to 4 artists** side by side via the searchable popover or the ranked list
- **Follower analysis** — compact numbers, progress bars, % of max, and pairwise difference
- **Popularity scores** — Spotify's 0–100 rating with visual bars
- **Genre analysis** — shared genres vs. each artist's unique signature, plus overlap %
- **Top-tracks chart** — release year vs. popularity across artists
- **Radar charts** — multi-artist attribute distribution
- Fully responsive: ranked list collapses gracefully on mobile

### Artist profile (`/application/artist/[id]`)
- Header with avatar, genres, popularity score, and follower count
- Top tracks list with artwork, duration, and hover-to-play affordance

### Auth (powered by Appwrite)
- Email/password **signup** with email verification (`/signup` → `/check-email` → `/email-verify`)
- **Login**, including Google OAuth (`/login`)
- **Forgot / reset password** flow (`/forget-password` → `/reset-password`)
- Protected `/application/*` routes via middleware (`src/proxy.ts`) + rate limiting

---

## How to use it

1. Open the **live demo**: https://compare-opal.vercel.app/
2. **Sign up** (or log in) — verification email confirms your address.
3. Land on the **Dashboard**: pick a market and genre, browse the rankings.
4. Hit **Comparison** in the sidebar, add 2–4 artists, and read the metrics + charts.
5. Click any artist row to open their **profile** with top tracks.
6. Copy the URL at any point — market, genre, and page are encoded in it, so what you see is what you share.

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router, Turbopack) | Server + client components, route groups for `(app)` / `(auth)` |
| Language | **TypeScript 5** (`strict`) | End-to-end type safety |
| Styling | **Tailwind CSS 4** + `tailwind-merge` / `clsx` | Utility-first, conflict-free classes |
| UI kit | **shadcn/ui** + **Radix UI** primitives | Accessible dialog, popover, select, avatar, table, etc. |
| Icons | **Lucide React** | Lightweight, consistent icon set |
| Charts | **Recharts** | Radar + top-tracks area charts |
| Data fetching | **TanStack Query v5** (+ persist client) | Caching, retries, background refetch, `keepPreviousData` pagination |
| Tables & sorting | **TanStack Table v8** | Headless, sortable rankings table |
| Forms | **React Hook Form** + **Zod** + `@hookform/resolvers` | Validated genre/market/auth forms |
| URL state | **nuqs** | Market/genre/page/search live in the query string |
| Auth backend | **Appwrite** (`appwrite@21`) | Sessions, OAuth2, email verification, password recovery |
| Music data | **Spotify Web API** (Client Credentials flow) | Artists, top tracks, markets; token cached server-side via `/api/spotify-token` |
| Toasts | **Sonner** | Auth + action feedback |
| Theming | **next-themes** | Dark-first aesthetic |

---

## Project structure

```bash
compare/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Landing page
│   │   ├── layout.tsx                # Root layout (query, auth, theme, toaster)
│   │   ├── globals.css
│   │   ├── proxy.ts                  # Auth guard + rate limiting (middleware)
│   │   ├── (app)/                    # Protected app area
│   │   │   ├── application/
│   │   │   │   ├── page.tsx          # Dashboard (rankings table)
│   │   │   │   ├── compare/          # 4-artist comparison + charts
│   │   │   │   ├── artist/[id]/      # Artist profile + top tracks
│   │   │   │   ├── actions.ts        # Server actions for artist fetching
│   │   │   │   └── _applicationComponent/  # Market/genre selectors, cards
│   │   │   └── api/spotify-token/    # Server-side Spotify token endpoint
│   │   └── (auth)/                   # Login, signup, verify, password reset
│   ├── apis/                         # Spotify client (token, requests, queries)
│   ├── components/
│   │   ├── application/              # Search, metrics, tables, headers
│   │   ├── landing/                  # Marketing header/hero/features
│   │   └── ui/                       # shadcn/ui primitives
│   ├── hooks/                        # e.g. useRateLimit
│   ├── lib/                          # Rate limiter, utils
│   ├── libs/                         # Appwrite client init
│   ├── providers/                    # Auth + React Query providers
│   └── utils/                        # Generic API client
├── components/                       # Root shadcn/ui registry components
├── lib/                              # Root `cn()` utility
├── public/                           # Static assets
└── package.json
```

Path alias: `@/*` resolves to `./*` and `./src/*` (see `tsconfig.json`), so both `@/components/ui/button` and `@/src/apis/spotify` work.

---

## Getting started

### Prerequisites

- **Node.js 18+** and npm
- A **Spotify Developer** app ([dashboard](https://developer.spotify.com/dashboard)) → Client ID + Client Secret
- An **Appwrite** project ([cloud](https://cloud.appwrite.io)) → Endpoint + Project ID, with Email/Password auth (and Google OAuth if you want social login) enabled

### 1. Clone & install

```bash
git clone https://github.com/MARVELGARR/compare.git
cd compare
npm install
```

### 2. Configure environment

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

```env
# --- Development (used when NODE_ENV=development) ---
NEXT_PUBLIC_APPWRITE_PROJECT_ID_DEV="your-appwrite-project-id"
NEXT_PUBLIC_APPWRITE_PROJECT_NAME="Compare"
NEXT_PUBLIC_APPWRITE_ENDPOINT_DEV="https://fra.cloud.appwrite.io/v1"
NEXT_PUBLIC_EMAIL_VERIFY_REDIRECT_DEV="http://localhost:3000/email-verify"
NEXT_PUBLIC_PASSWORD_RESET_REDIRECT_DEV="http://localhost:3000/reset-password"
NEXT_PUBLIC_OAUTH_SUCCESS_REDIRECT_DEV="http://localhost:3000/application"
NEXT_PUBLIC_OAUTH_FAILED_REDIRECT_DEV="http://localhost:3000/login"
NEXT_PUBLIC_SPOTIFY_CLIENT_ID_DEV="your-spotify-client-id"
# Server-only — do NOT prefix with NEXT_PUBLIC_
SPOTIFY_CLIENT_SECRET_DEV="your-spotify-client-secret"

# --- Production fallbacks (used when NODE_ENV=production) ---
NEXT_PUBLIC_APPWRITE_ENDPOINT="https://fra.cloud.appwrite.io/v1"
NEXT_PUBLIC_APPWRITE_PROJECT_ID="your-appwrite-project-id"
NEXT_PUBLIC_OAUTH_SUCCESS_REDIRECT="https://your-domain.com/application"
NEXT_PUBLIC_OAUTH_FAILED_REDIRECT="https://your-domain.com/login"
```

> Never commit real secrets. `.env*` files are git-ignored. The Spotify secret stays server-side (used only in `src/apis/spotifyToken.ts` via `/api/spotify-token`).

### 3. Run it

```bash
npm run dev      # start dev server → http://localhost:3000
npm run build    # production build (typecheck + static generation)
npm start        # serve the production build
npm run lint     # eslint
```

---

## Key implementation notes

- **Spotify auth**: Client Credentials flow in `src/apis/spotifyToken.ts`, cached in server memory with a 60s expiry buffer; browsers never see the secret — they call the internal `/api/spotify-token` route.
- **Resilient fetching**: `src/apis/spotify_request.ts` retries transient `429/502/503/504` with exponential backoff and fails fast on other HTTP errors.
- **Shareable state**: market/genre/page/search are nuqs query-state, so filtered views are plain links.
- **Charts**: `compare/_chart/` builds top-tracks-over-time (best track per year per artist) and radar views from live Spotify payloads.
- **Rate limiting**: lightweight in-memory limiter in `src/lib/rate-limit.ts`, surfaced with a countdown + retry UI (`rate-limit-error.tsx`).

---

## Roadmap ideas

- More markets + market-trend history (not just snapshots)
- Playlist / audio-feature (danceability, energy) comparisons
- Saved comparisons per user (Appwrite database)
- Export comparison as image / share card

Contributions welcome — open an issue or PR at https://github.com/MARVELGARR/compare.

---

Built for the music community. Numbers don't lie — but they do need a good chart.
