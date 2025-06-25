import { cookies } from "next/headers";

import ClientCommandProvider from "@/components/context/client-command-provider";
import { CommandProvider } from "@/components/context/command-context";
import AppSidebar from "@/components/layout/dashboard/components/app-sidebar";
import Header from "@/components/layout/dashboard/components/app-sidebar-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

import { ClerkProvider } from "@clerk/nextjs";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sidebarState = cookieStore.get("sidebar_state")?.value;
  const defaultOpen = sidebarState === "true";

  return (
    <ClerkProvider>
      <CommandProvider>
        <ClientCommandProvider />
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          <SidebarInset>
            <Header />
            {/* page main content */}
            {children}
            {/* page main content ends */}
            <Toaster richColors position="top-right" />
          </SidebarInset>
        </SidebarProvider>
      </CommandProvider>
    </ClerkProvider>
  );
}
