import type { Metadata } from "next";
import { InformationPageExperience } from "../../components/InformationPageExperience";

export const metadata: Metadata = { title: "Terms of Use", description: "Terms governing the use of the Kiswani Lights website and its product inquiry tools." };

export default function TermsPage() {
  return <InformationPageExperience kind="terms" />;
}
