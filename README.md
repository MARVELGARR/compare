# COMPARE - Spotify Artist Intelligence & Comparison Platform 🎵

![Hero Image](public/favicon.ico) <!-- You might want to update this with a real screenshot/hero image later -->

**COMPARE** is a sophisticated, data-driven web application designed for music enthusiasts, industry professionals, and fans to analyze and compare Spotify artists in real-time. Built with a modern tech stack, it provides deep insights into artist popularity, follower trends, and genre distributions through interactive visualizations.

---

## 🎯 Aim & Objectives

### The Aim
To provide a seamless, intuitive, and visually stunning interface for comparing musical artists using live data from the Spotify Web API, enabling users to make data-backed observations about artist performance and reach.

### Key Objectives
- **Data Visualization**: Transform raw Spotify metrics into meaningful charts (Radar, Line, and Progress bars).
- **Comparative Analysis**: Allow side-by-side comparison of up to 4 artists across various dimensions.
- **Regional Insights**: Support market-specific data fetching (e.g., Nigeria, USA, UK) to understand regional popularity.
- **Genre Exploration**: Help users discover commonalities and unique genre signatures between artists.
- **User Personalization**: Provide a secure authentication system for users to manage their experience.

---

## ✨ Key Features

- **🚀 Artist Search & Selection**: High-performance search interface to quickly find and select artists for comparison.
- **📊 Comparative Metrics**: 
  - **Follower Analysis**: Visual comparison of total follower counts with percentage-of-max indicators.
  - **Popularity Score**: Real-time popularity ratings (0-100) directly from Spotify's algorithms.
  - **Genre Analysis**: Automatic detection of common genres and unique individual genre traits.
- **📈 Advanced Visualizations**:
  - **Radar Charts**: Attribute distribution across multiple artists.
  - **Line Charts**: Top track performance and popularity trends.
  - **Market Selectors**: Switch between global markets to see how artists perform in different regions.
- **🔐 Secure Authentication**: Complete auth flow including Login, Signup, Password Reset, and Email Verification powered by Appwrite.
- **📱 Fully Responsive**: A premium, "app-like" experience that works flawlessly on mobile, tablet, and desktop.
- **🌓 Dark Mode Aesthetic**: A sleek, modern dark-themed UI designed for the music industry's "vibe."

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Shadcn/UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

### State & Data Management
- **Data Fetching**: [TanStack Query (React Query) v5](https://tanstack.com/query/latest)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)
- **URL State**: [nuqs](https://nuqs.47ng.com/) (Query string state management)

### Backend & Infrastructure
- **Backend as a Service**: [Appwrite](https://appwrite.io/) (Auth & Project Management)
- **External API**: [Spotify Web API](https://developer.spotify.com/documentation/web-api)

---

## 📂 Project Structure

```bash
compare/
├── src/
│   ├── app/                    # Next.js App Router (Layouts & Pages)
│   │   ├── (app)/              # Main application routes (Comparison, Search)
│   │   └── (auth)/             # Authentication routes (Login, Signup)
│   ├── components/
│   │   ├── application/        # Feature-specific components (Charts, Metrics)
│   │   ├── landing/            # Landing page marketing components
│   │   └── ui/                 # Reusable Base UI components (Buttons, Inputs)
│   ├── apis/                   # Spotify API integration logic
│   ├── libs/                   # Third-party library initializations (Appwrite)
│   ├── providers/              # React Context Providers (Auth, Query)
│   └── utils/                  # Helper functions and constants
├── public/                     # Static assets (Images, Icons)
└── package.json                # Project dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- NPM / PNPM / Yarn
- Spotify Developer Account (for API credentials)
- Appwrite Project ID & Endpoint

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/compare.git
   cd compare
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   # Spotify Credentials
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

   # Appwrite Configuration
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📜 Dependencies

Major dependencies included in this project:
- `next`: Latest App Router framework
- `appwrite`: Backend for authentication
- `@tanstack/react-query`: For efficient data fetching and caching
- `recharts`: For rendering comparison charts
- `lucide-react`: For modern, lightweight icons
- `clsx` & `tailwind-merge`: For dynamic CSS class management

---


Built with ❤️ for the music community.
