import DashboardLayout from "@/components/layout/dashboard/dashboard-layout";
import CreateCategoryForm from "../(components)/create-categories-form";

export default function page() {
  return (
    <DashboardLayout>
      <CreateCategoryForm />
    </DashboardLayout>
  );
}
