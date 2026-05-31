import { ProductFilters } from "@/components/shop/ProductFilters";
import { ProductSort } from "@/components/shop/ProductSort";
import { ProductCard } from "@/components/shop/ProductCard";
import { prisma } from "@/lib/prisma";
import { Product } from "@/types";

export const revalidate = 3600;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : "featured";
  const collectionFilter = typeof searchParams.collection === "string" ? searchParams.collection : undefined;
  const sizeFilter = typeof searchParams.size === "string" ? searchParams.size : undefined;

  // Build prisma where clause
  const where: any = {};
  if (collectionFilter) {
    where.collection = { name: collectionFilter };
  }
  if (sizeFilter) {
    where.size = { has: sizeFilter };
  }

  // Build prisma orderBy clause
  let orderBy: any = {};
  switch (sort) {
    case "price-asc":
      orderBy = { price: "asc" };
      break;
    case "price-desc":
      orderBy = { price: "desc" };
      break;
    case "newest":
      orderBy = { createdAt: "desc" };
      break;
    case "bestseller":
      orderBy = { bestseller: "desc" };
      break;
    case "featured":
    default:
      orderBy = { featured: "desc" };
      break;
  }

  let products: Product[] = [];
  try {
    const rawProducts = await prisma.product.findMany({
      where,
      orderBy,
    });
    products = rawProducts.map((p: any) => ({ ...p })) as Product[];
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 flex flex-col md:flex-row gap-10">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <ProductFilters />
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-warm-gray/10 pb-4">
          <h1 className="font-heading text-3xl">All Candles</h1>
          <div className="flex items-center gap-6">
            <span className="text-sm text-warm-gray">{products.length} products</span>
            <ProductSort />
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-warm-gray text-lg">No products found matching your filters.</p>
          </div>
        )}
      </main>
    </div>
  );
}
