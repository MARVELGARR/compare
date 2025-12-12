'use client'
import { getAvialableMarkets } from "@/src/apis/spotify"
import { useQuery } from "@tanstack/react-query"
import {useQueryState} from "nuqs"



export const MarketSelector = () =>{

    const [currentMarket, setCurrentMarket] = useQueryState("market", {defaultValue: "All"})

    const {data, isLoading} = useQuery({
        queryKey: ["markets"],
        queryFn: ()=>getAvialableMarkets()
    },)
    return (
        <div className=" text-foreground flex flex-col gap-2">
            <label className="" htmlFor="market">Country</label>
            <select 
            disabled={isLoading}
                id="market"
                defaultValue={currentMarket}
                onChange={(e)=>setCurrentMarket(e.target.value)}
                 className="bg-background border border-border text-xs rounded-md px-2 py-1 outline-none focus:ring-1 focus:ring-ring w-24"

            >
                <option  value={"NG"}>All</option>
                <option  value={"us"}>us</option>
                {data?.markets.map((item)=>{
                    return(
                        <option key={item} value={item}>{item.toUpperCase()}</option>
                    )
                })}
            </select>
        </div>
    )
}