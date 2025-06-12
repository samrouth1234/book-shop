import DashboardLayout from "@/components/layout/dashboard/dashboard-layout";

import CategoriesSection from "./(components)/categories-section";

export default function page() {
  return (
    <DashboardLayout>
      <CategoriesSection />
    </DashboardLayout>
  );
}
