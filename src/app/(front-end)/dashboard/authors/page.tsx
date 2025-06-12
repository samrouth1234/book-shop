import DashboardLayout from "@/components/layout/dashboard/dashboard-layout";

import AuthorSection from "./(components)/author-section";
import { Suspense } from "react";

export default function AuthPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading authors...</div>}>
        <AuthorSection />
      </Suspense>
    </DashboardLayout>
  );
}
