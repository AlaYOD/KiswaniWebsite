import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionExperience } from "../../../components/CollectionExperience";
import { categories, getCategory, getProductsByCategory } from "../../../lib/catalog";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  return {
    title: category.name,
    description: `${category.detail} Explore the complete Kiswani Lights ${category.name.toLowerCase()} collection.`,
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return <CollectionExperience category={category} collectionProducts={getProductsByCategory(slug)} />;
}
