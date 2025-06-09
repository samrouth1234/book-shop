import React from "react";

import { Navbar } from "@/app/(front-end)/(components)/Navbar";

interface BookShopLayoutProps {
  children: React.ReactNode;
}
export default function BookShopLayout({ children }: BookShopLayoutProps) {
  return (
    <main className="container max-w-7xl m-auto">
      <Navbar />
      {children}
    </main>
  );
}
