import { Suspense } from "react";

import DashboardLayout from "@/components/layout/dashboard/dashboard-layout";

import AuthorSection from "./(components)/author-section";

export default function AuthPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading authors...</div>}>
        <AuthorSection />
      </Suspense>
    </DashboardLayout>
  );
}
