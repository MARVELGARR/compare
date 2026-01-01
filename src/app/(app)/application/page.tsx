
import { account } from "@/src/libs/appwrite";
import ArtistTable from "../../../components/application/ArtistTable";

export default async function Page() {


  // const user = await account.get()



  return (
    <div className="p-4 md:p-8 flex flex-col h-full min-w-0">
      <div className="mb-2 text-sm md:text-base text-neutral-400">Welcome {"Guest"}!</div>
      <h1 className="tit font-semibold text-white mb-8">Dashboard Overview</h1>

      {/* Artist Rankings Table */}
      <div className="flex-1 min-h-0">
        <ArtistTable />
      </div>
    </div>
  );
}

