import type { Metadata } from "next";
import { InformationPageExperience } from "../../components/InformationPageExperience";

export const metadata: Metadata = { title: "Support", description: "Get product, specification, ordering, delivery, and project support from Kiswani Lights." };

export default function SupportPage() {
  return <InformationPageExperience kind="support" />;
}
