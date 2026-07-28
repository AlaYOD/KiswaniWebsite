import type { Metadata } from "next";
import { AdminOrdersDashboard } from "../../../components/AdminOrdersDashboard";

export const metadata: Metadata = {
  title: "Admin Orders",
  description: "Manage Kiswani Lights checkout orders.",
};

export default function AdminOrdersPage() {
  return <AdminOrdersDashboard />;
}
