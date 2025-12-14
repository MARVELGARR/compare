
"use client"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function Error({
    error,
    reset
}: {
    error: Error & {digest?: string}
    reset: ()=> void
}){
    useEffect(()=>{
        console.error(error)
    },[error])

    
    return (
        <div className="text-white flex flex-col gap-3 items-center justify-center h-full w-full">
            <h2> Something went wrong</h2>
            <Button onClick={ ()=> reset()} className="">Try Again</Button>
        </div>
    )
}