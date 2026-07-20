import type { Metadata } from "next";
import { KiswaniExperience } from "../components/KiswaniExperience";

export const metadata: Metadata = {
  title: "Kiswani Lights | Architectural lighting for memorable spaces",
  description: "Explore premium decorative and technical lighting systems from Kiswani Lights.",
};

export default function Home() {
  return <KiswaniExperience />;
}
