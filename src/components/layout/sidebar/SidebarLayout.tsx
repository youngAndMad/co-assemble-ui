"use client";
import { useState } from "react";
import Head from "next/head";
import MenuBarMobile from "./MenuBarMobilie";
import Sidebar from "./Sidebar";

type SidebarLayoutProps = {
  children: React.ReactNode;
  pageTitle: string;
};

export default function SidebarLayout({
  children,
  pageTitle,
}: SidebarLayoutProps) {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="min-h-screen">
        <div className="flex">
          <MenuBarMobile onClick={setShowSidebar} />
          <Sidebar show={showSidebar} onClick={setShowSidebar} />
          <div className="flex flex-col flex-grow w-screen md:w-full min-h-screen">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
