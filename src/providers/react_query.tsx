"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { ReactNode, useEffect, useState } from 'react'

export const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const [persister, setPersister] = useState<
    ReturnType<typeof createAsyncStoragePersister> | undefined
  >(undefined);

  useEffect(() => {
    // Intentional client-only sync: localStorage is unavailable during SSR.
    // Render fallback first to avoid hydration mismatch, then upgrade to persisted cache.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPersister(
      createAsyncStoragePersister({
        storage: window.localStorage,
      })
    );
  }, []);

  // Render without persistence until the client-side persister is ready.
  // This avoids `window is not defined` during SSR and hydration mismatches.
  if (!persister) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister, maxAge: 1000 * 60 * 60 * 24 }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};

