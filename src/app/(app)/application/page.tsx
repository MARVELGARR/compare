import ArtistTable from "../../../components/application/ArtistTable";

export default function Page() {
  return (
    <div className="p-8">
      <div className="mb-2 text-sm text-neutral-400">Welcome James!</div>
      <h2 className="mb-8 text-3xl font-semibold text-white">Dashboard Overview</h2>

      {/* Artist Rankings Table */}
      <ArtistTable />
    </div>
  );
}

