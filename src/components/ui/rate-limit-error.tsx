"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Clock } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";
import { Button } from "@/src/components/ui/button";

interface RateLimitErrorProps {
    resetTime?: number;
    limit?: number;
    onRetry?: () => void;
}

export default function RateLimitError({ resetTime, limit = 50, onRetry }: RateLimitErrorProps) {
    const [timeRemaining, setTimeRemaining] = useState<number>(0);

    useEffect(() => {
        if (!resetTime) return;

        const calculateTimeRemaining = () => {
            const now = Date.now();
            const remaining = Math.max(0, Math.ceil((resetTime - now) / 1000));
            setTimeRemaining(remaining);
        };

        calculateTimeRemaining();
        const interval = setInterval(calculateTimeRemaining, 1000);

        return () => clearInterval(interval);
    }, [resetTime]);

    const formatTime = (seconds: number) => {
        if (seconds < 60) return `${seconds}s`;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    return (
        <div className="flex items-center justify-center min-h-[400px] p-4">
            <Alert className="max-w-md border-destructive/50 bg-destructive/10">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <AlertTitle className="text-lg font-semibold text-destructive">
                    Rate Limit Exceeded
                </AlertTitle>
                <AlertDescription className="mt-2 space-y-3">
                    <p className="text-sm text-muted-foreground">
                        You&apos;ve made too many requests. Please slow down and try again in a moment.
                    </p>

                    <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">
                            {timeRemaining > 0 ? (
                                <>Reset in: <span className="font-mono font-semibold">{formatTime(timeRemaining)}</span></>
                            ) : (
                                "You can try again now"
                            )}
                        </span>
                    </div>

                    <div className="pt-2 text-xs text-muted-foreground">
                        <p>Rate limit: <span className="font-semibold">{limit} requests per 10 seconds</span></p>
                    </div>

                    {onRetry && timeRemaining === 0 && (
                        <Button
                            onClick={onRetry}
                            className="w-full mt-4"
                            variant="outline"
                        >
                            Try Again
                        </Button>
                    )}
                </AlertDescription>
            </Alert>
        </div>
    );
}
