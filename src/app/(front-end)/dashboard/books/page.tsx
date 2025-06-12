import DashboardLayout from "@/components/layout/dashboard/dashboard-layout";

import BookSection from "./(components)/book-section";
import { Suspense } from "react";

export default function page() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading book...</div>}>
        <BookSection />
      </Suspense>
    </DashboardLayout>
  );
}
