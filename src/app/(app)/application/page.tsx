import ArtistTable from "./_applicationComponent/ArtistTable";

export default function Page() {
  return (
    <div className="min-h-screen bg-background pr-4">
          <h1 className="text-2xl font-bold text-white mb-2">Dashboard Overview</h1>
          <ArtistTable />
    </div>
  )
}

