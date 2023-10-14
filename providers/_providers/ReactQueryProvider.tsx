"use client";
import { FunctionComponent, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

interface ReactQueryProviderProps {
  children: ReactNode;
}

const ReactQueryProvider: FunctionComponent<ReactQueryProviderProps> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
