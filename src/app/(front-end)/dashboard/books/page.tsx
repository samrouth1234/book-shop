import { Suspense } from "react";

import DashboardLayout from "@/components/layout/dashboard/dashboard-layout";

import BookSection from "./(components)/book-section";

export default function BookPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading book...</div>}>
        <BookSection />
      </Suspense>
    </DashboardLayout>
  );
}
