import type { Metadata } from "next";
import { InformationPageExperience } from "../../components/InformationPageExperience";

export const metadata: Metadata = { title: "About", description: "Discover Kiswani Lights, our lighting philosophy, approach, and project support in Ramallah." };

export default function AboutPage() {
  return <InformationPageExperience kind="about" />;
}
