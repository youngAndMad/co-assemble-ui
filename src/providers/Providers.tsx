"use client";
import { ReactNode } from "react";
import ClientProvider from "./ClientProvider";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ClientProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </ClientProvider>
  );
}
