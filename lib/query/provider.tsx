import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { queryClient } from './queryClient';

interface QueryProviderProps {
  children: React.ReactNode;
}

function DevTools() {
  useReactQueryDevTools(queryClient);
  return null;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* React Query Devtools - only in development */}
      {__DEV__ && <DevTools />}
    </QueryClientProvider>
  );
}