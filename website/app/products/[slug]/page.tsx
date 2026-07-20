import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductExperience } from "../../../components/ProductExperience";
import { getProductBySlug, getProductSlug, products } from "../../../lib/catalog";

export function generateStaticParams() {
  return products.map((product) => ({ slug: getProductSlug(product) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} - ${product.code}`,
    description: `${product.description} View specifications, imagery, related products, and download the Kiswani Lights datasheet.`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <ProductExperience product={product} />;
}
