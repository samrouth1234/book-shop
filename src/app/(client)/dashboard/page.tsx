import DashboardLayout from "@/components/layout/dashboard/dashboard-layout";

import OverviewSection from "./(components)/overview-section";
import ReportsSection from "./(components)/reports-section";

export default function page() {
  return (
    <DashboardLayout>
      <section>
        <h2 className="py-2 text-lg font-medium">Overview</h2>
        <OverviewSection />
      </section>
      <ReportsSection />
    </DashboardLayout>
  );
}
