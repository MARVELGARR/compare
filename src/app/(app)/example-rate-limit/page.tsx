"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/src/components/ui/button";
import RateLimitError from "@/src/components/ui/rate-limit-error";
import { useRateLimit } from "@/src/hooks/useRateLimit";

// Example API function that might hit rate limits
async function fetchData() {
    const response = await fetch("/api/some-endpoint");

    if (!response.ok) {
        const error = new Error("API request failed") as Error & { status?: number; data?: unknown };
        error.status = response.status;

        if (response.status === 429) {
            error.data = await response.json();
        }

        throw error;
    }

    return response.json();
}

export default function ExampleRateLimitPage() {
    const { rateLimitInfo, handleRateLimitError, clearRateLimit } = useRateLimit();

    const { data, error, refetch, isLoading } = useQuery({
        queryKey: ["example-data"],
        queryFn: fetchData,
        retry: false,
    });

    useEffect(() => {
        if (error) {
            handleRateLimitError(error);
        }
    }, [error, handleRateLimitError]);

    // If rate limited, show the error UI
    if (rateLimitInfo.isRateLimited) {
        return (
            <RateLimitError
                resetTime={rateLimitInfo.resetTime}
                limit={rateLimitInfo.limit}
                onRetry={() => {
                    clearRateLimit();
                    refetch();
                }}
            />
        );
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Example: Rate Limit Handling</h1>

            {isLoading && <p>Loading...</p>}

            {error && !rateLimitInfo.isRateLimited && (
                <div className="text-red-500">
                    Error: {error instanceof Error ? error.message : "Unknown error"}
                </div>
            )}

            {data && (
                <div className="bg-zinc-900 p-4 rounded-lg">
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}

            <Button onClick={() => refetch()} className="mt-4">
                Refetch Data
            </Button>
        </div>
    );
}
