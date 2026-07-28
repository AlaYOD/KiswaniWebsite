import type { Metadata } from "next";
import { ProjectsPageExperience } from "../../components/ProjectsPageExperience";

export const metadata: Metadata = {
  title: "Lighting Projects",
  description: "Explore Kiswani Lights residential, hospitality, and retail lighting projects across Palestine.",
};

export default function ProjectsPage() {
  return <ProjectsPageExperience />;
}
