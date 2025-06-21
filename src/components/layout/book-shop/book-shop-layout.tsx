import React from "react";

import { Navbar } from "@/app/(client)/(components)/main-navbar";
import { Toaster } from "@/components/ui/sonner";

interface BookShopLayoutProps {
  children: React.ReactNode;
}
export default function BookShopLayout({ children }: BookShopLayoutProps) {
  return (
    <main className="container m-auto max-w-7xl">
      <Navbar />
      {children}
      <Toaster richColors position="top-right" />
    </main>
  );
}
