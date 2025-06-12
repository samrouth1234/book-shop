import DashboardLayout from "@/components/layout/dashboard/dashboard-layout";

import CategoriesSection from "./(components)/categories-section";
import { Suspense } from "react";

export default function page() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading category...</div>}>
        <CategoriesSection />
      </Suspense>
    </DashboardLayout>
  );
}
