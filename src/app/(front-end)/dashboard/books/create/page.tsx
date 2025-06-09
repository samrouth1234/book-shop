import DashboardLayout from "@/components/layout/dashboard/dashboard-layout";
import CreateBookForm from "./(components)/create-book-form";

export default function page() {
  return (
    <DashboardLayout>
      <CreateBookForm />
    </DashboardLayout>
  );
}
