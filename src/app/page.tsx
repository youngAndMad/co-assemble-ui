"use client";

import SidebarLayout from "@/components/layout/sidebar/SidebarLayout";

export default function Home() {
  return (
    <>
      <SidebarLayout pageTitle="Coassemble">
        <h1 className="text-3xl font-bold">Welcome to Coassemble</h1>
        <p className="mt-4">This is the homepage of Coassemble.</p>
      </SidebarLayout>
    </>
  );
}
