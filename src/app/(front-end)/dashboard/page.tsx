import DashboardLayout from "@/components/layout/dashboard/dashboard-layout";
import OverviewSection from "./(components)/overview-section";
import BookCartBar from "./(components)/chart-bar";
import AuthorChartLineDosts from "./(components)/chart-line-dosts";
import ReportsSection from "./(components)/reports-section";

export default function page() {
  return (
    <DashboardLayout>
      <section>
        <h2 className="text-lg py-2 font-medium">Overview</h2>
        <OverviewSection />
      </section>
      <ReportsSection />
    </DashboardLayout>
  );
}
