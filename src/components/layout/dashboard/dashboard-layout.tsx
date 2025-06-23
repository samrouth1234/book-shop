// app/dashboard/overview/layout.tsx
import { Toaster } from "@/components/ui/sonner";

import { SidebarInset, SidebarProvider } from "../../ui/sidebar";
import AppSideBarBook from "./components/app-sidebar";
import AppSideBarHeader from "./components/app-sidebar-header";

export default function DashboardLayout({
  children,
  bar_stats,
  sales,
  pie_stats,
  area_stats,
}: {
  children: React.ReactNode;
  bar_stats: React.ReactNode;
  sales: React.ReactNode;
  pie_stats: React.ReactNode;
  area_stats: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSideBarBook />
      <SidebarInset>
        <AppSideBarHeader />

        <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
          {children}

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-1 md:col-span-2 lg:col-span-4">
              {bar_stats}
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              {sales}
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-4">
              {area_stats}
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              {pie_stats}
            </div>
          </div>
        </div>

        <Toaster richColors position="top-right" />
      </SidebarInset>
    </SidebarProvider>
  );
}
