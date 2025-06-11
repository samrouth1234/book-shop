import DashboardLayout from "@/components/layout/dashboard/dashboard-layout";
import CreateAuthorForm from "../(components)/create-author-form";

export default function page() {
  return (
    <DashboardLayout>
      <CreateAuthorForm />
    </DashboardLayout>
  );
}
