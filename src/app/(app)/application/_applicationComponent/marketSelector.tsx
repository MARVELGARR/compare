'use client'
import { getAvialableMarkets } from "@/src/apis/spotify"
import { useQuery } from "@tanstack/react-query"
import {useQueryState} from "nuqs"



export const MarketSelector = () =>{

    const [currentMarket, setCurrentMarket] = useQueryState("market", {defaultValue: "ALL", clearOnDefault: true})

    const {data, isLoading} = useQuery({
        queryKey: ["markets"],
        queryFn: ()=>getAvialableMarkets()
    },)


    return (
        <div className=" text-primary flex flex-col gap-2">
            <label className="" htmlFor="market">Country</label>
            <select 
            disabled={isLoading}
                id="market"
                defaultValue={currentMarket}
                onChange={(e)=>setCurrentMarket(e.target.value)}
                 className="bg-background border border-border text-xs rounded-md px-2 py-1 outline-none focus:ring-1 focus:ring-ring w-28"

            >
                {isLoading && <option disabled>Loading...</option>}
                <option  value={"ALL"}>All</option>
                {data?.markets.map((item)=>{
                    return(
                        <option key={item} value={item}>{item.toUpperCase()}</option>
                    )
                })}
            </select>
        </div>
    )
}