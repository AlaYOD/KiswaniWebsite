import type { Metadata } from "next";
import { InformationPageExperience } from "../../components/InformationPageExperience";

export const metadata: Metadata = { title: "Privacy", description: "Learn how Kiswani Lights handles information submitted through its website." };

export default function PrivacyPage() {
  return <InformationPageExperience kind="privacy" />;
}
