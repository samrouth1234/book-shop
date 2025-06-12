import DashboardLayout from "@/components/layout/dashboard/dashboard-layout";

import AuthorSection from "./(components)/author-section";

export default function page() {
  return (
    <DashboardLayout>
      <AuthorSection />
    </DashboardLayout>
  );
}
