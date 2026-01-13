import { useState, useCallback } from 'react';

export interface RateLimitInfo {
  isRateLimited: boolean;
  resetTime?: number;
  limit?: number;
  retryAfter?: number;
}

export function useRateLimit() {
  const [rateLimitInfo, setRateLimitInfo] = useState<RateLimitInfo>({
    isRateLimited: false,
  });

  const handleRateLimitError = useCallback((error: any) => {
    // Check if it's a rate limit error (429 status)
    if (error?.status === 429 || error?.response?.status === 429) {
      const data = error?.data || error?.response?.data || {};
      
      setRateLimitInfo({
        isRateLimited: true,
        resetTime: data.reset,
        limit: data.limit,
        retryAfter: data.retryAfter,
      });
      
      return true;
    }
    return false;
  }, []);

  const clearRateLimit = useCallback(() => {
    setRateLimitInfo({
      isRateLimited: false,
    });
  }, []);

  const checkResponse = useCallback((response: Response) => {
    if (response.status === 429) {
      response.json().then((data) => {
        setRateLimitInfo({
          isRateLimited: true,
          resetTime: data.reset,
          limit: data.limit,
          retryAfter: data.retryAfter,
        });
      }).catch(() => {
        // Fallback if JSON parsing fails
        setRateLimitInfo({
          isRateLimited: true,
        });
      });
      return true;
    }
    return false;
  }, []);

  return {
    rateLimitInfo,
    handleRateLimitError,
    clearRateLimit,
    checkResponse,
  };
}
