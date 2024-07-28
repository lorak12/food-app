import DashboardLayout from "@/components/layouts/DashboardLayout";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

export default function DashboardLayoutServer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!checkRole("admin")) {
    redirect("/");
  }
  return <DashboardLayout>{children}</DashboardLayout>;
}
