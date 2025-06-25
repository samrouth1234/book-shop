import { Suspense } from "react";

import DashboardLayout from "@/components/layout/dashboard/page-container";

import AuthorSection from "./(components)/author-section";

export default function AuthPage() {
  return (
    <div className="mx-5">
      <AuthorSection />
    </div>
  );
}
