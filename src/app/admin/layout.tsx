import SidebarLayout from "@/components/layout/sidebar/SidebarLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SidebarLayout pageTitle="Coassemble">{children}</SidebarLayout>;
}
