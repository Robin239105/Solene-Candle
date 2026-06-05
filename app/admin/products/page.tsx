import { prisma } from "@/lib/prisma";
import { ProductsClient } from "./ProductsClient";

export const revalidate = 0; // Live revalidation for admin actions

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" }
  }) || [];

  const collections = await prisma.collection.findMany() || [];

  return (
    <ProductsClient products={products} collections={collections} />
  );
}
