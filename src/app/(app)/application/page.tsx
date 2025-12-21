
import { account } from "@/src/libs/appwrite";
import ArtistTable from "../../../components/application/ArtistTable";

export default async function Page() {


  // const user = await account.get()



  return (
    <div className="p-8 tit overflow-y-auto  h-[calc(100vh-200px)] no-scrollbar">



      <div className="mb-2  text-neutral-400">Welcome {"Guest"}!</div>
      <h2 className="mb-8  font-semibold text-white">Dashboard Overview</h2>

      {/* Artist Rankings Table */}
      <ArtistTable />
    </div>
  );
}

