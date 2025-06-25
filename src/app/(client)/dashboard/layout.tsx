import { cookies } from "next/headers";

import KBar from "@/components/kbar";
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
  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <ClerkProvider>
      <KBar>
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
      </KBar>
    </ClerkProvider>
  );
}
