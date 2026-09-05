
"use client";

import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { ReactNode, useMemo } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

export const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const persister = useMemo(
    () =>
      createAsyncStoragePersister({
        storage:
          typeof window === "undefined"
            ? {
                getItem: async () => null,
                setItem: async () => undefined,
                removeItem: async () => undefined,
              }
            : window.localStorage,
      }),
    [],
  );

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      {children}
    </PersistQueryClientProvider>
  );
};

