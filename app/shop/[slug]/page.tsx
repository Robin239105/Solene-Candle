import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Product } from "@/types";

export const revalidate = 3600;

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  if (!product) {
    notFound();
  }

  // Fetch related products (same collection, excluding current)
  const relatedProductsRaw = await prisma.product.findMany({
    where: {
      collectionId: product.collectionId,
      NOT: { id: product.id },
    },
    take: 4,
  });

  // Map for serialization
  const serializedProduct = { ...product } as Product;
  const serializedRelated = relatedProductsRaw.map((p: any) => ({ ...p })) as Product[];

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          <ProductGallery images={serializedProduct.images} />
          <ProductInfo product={serializedProduct} />
        </div>
        
        <ProductTabs product={serializedProduct} />
      </div>

      <RelatedProducts products={serializedRelated} />
    </main>
  );
}
