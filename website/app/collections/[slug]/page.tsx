import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionExperience } from "../../../components/CollectionExperience";
import { categories, getCategory, getProductsByCategory, products } from "../../../lib/catalog";
import { productMapGroups } from "../../../lib/product-map";

function getProductMapGroup(slug: string) {
  return productMapGroups.find((group) => group.id === slug);
}

export function generateStaticParams() {
  return [
    ...categories.map((category) => ({ slug: category.slug })),
    ...productMapGroups.map((group) => ({ slug: group.id })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const productMapGroup = getProductMapGroup(slug);
  if (productMapGroup) {
    return {
      title: productMapGroup.label.en,
      description: productMapGroup.description.en,
    };
  }

  const category = getCategory(slug);
  if (!category) return {};

  return {
    title: category.name,
    description: `${category.detail} Explore the complete Kiswani Lights ${category.name.toLowerCase()} collection.`,
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ category?: string; subcategory?: string }>;
}) {
  const { slug } = await params;
  const query = searchParams ? await searchParams : {};
  const productMapGroup = getProductMapGroup(slug);
  if (productMapGroup) {
    return (
      <CollectionExperience
        productMapGroup={productMapGroup}
        collectionProducts={products}
        initialCategory={query.category}
        initialSubcategory={query.subcategory}
      />
    );
  }

  const category = getCategory(slug);
  if (!category) notFound();

  return <CollectionExperience category={category} collectionProducts={getProductsByCategory(slug)} />;
}
