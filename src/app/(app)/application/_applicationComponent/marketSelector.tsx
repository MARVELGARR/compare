'use client'
import { getAvialableMarkets } from "@/src/apis/spotify"
import { useQuery } from "@tanstack/react-query"
import { useQueryState, parseAsStringLiteral } from "nuqs"

const MARKETS = ['NG', 'US', 'GB', 'GH', 'ZA', 'KE'] as const;

export const MarketSelector = () => {

    const [currentMarket, setCurrentMarket] = useQueryState("market", parseAsStringLiteral(MARKETS).withDefault("NG"))

    const { data, isLoading } = useQuery({
        queryKey: ["markets"],
        queryFn: () => getAvialableMarkets()
    },)


    return (
        <div className=" text-primary flex flex-col gap-2">
            <label className="" htmlFor="market">Country</label>
            <select
                disabled={isLoading}
                id="market"
                defaultValue={currentMarket}
                onChange={(e) => setCurrentMarket(e.target.value as (typeof MARKETS)[number])}
                className="bg-background border border-border text-xs rounded-md px-2 py-1 outline-none focus:ring-1 focus:ring-ring w-28"

            >
                {isLoading && <option disabled>Loading...</option>}
                {data?.markets.map((item: string) => {
                    return (
                        <option key={item} value={item}>{item.toUpperCase()}</option>
                    )
                })}
            </select>
        </div>
    )
}