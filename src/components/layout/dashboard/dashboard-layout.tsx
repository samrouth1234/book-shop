import { Toaster } from "@/components/ui/sonner";

import { SidebarInset, SidebarProvider } from "../../ui/sidebar";
import AppSideBarBook from "./components/app-sidebar";
import AppSideBarHeader from "./components/app-sidebar-header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
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
        <div className="flex flex-1 flex-col gap-4 p-4 pt-4">{children}</div>
        <Toaster richColors position="top-right" />
      </SidebarInset>
    </SidebarProvider>
  );
}
