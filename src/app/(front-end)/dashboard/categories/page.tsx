import { Suspense } from "react";

import DashboardLayout from "@/components/layout/dashboard/dashboard-layout";

import CategoriesSection from "./(components)/categories-section";

export default function CategoriesPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading category...</div>}>
        <CategoriesSection />
      </Suspense>
    </DashboardLayout>
  );
}
