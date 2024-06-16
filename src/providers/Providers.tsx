"use client";
import { ReactNode } from "react";
import ClientProvider from "./ClientProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ClientProvider>
      {children}
    </ClientProvider>
  );
}
