import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/shop/ProductCard";
import { Product } from "@/types";

export const revalidate = 3600;

export default async function CollectionDetailPage({ params }: { params: { slug: string } }) {
  const collection = await prisma.collection.findUnique({
    where: { slug: params.slug },
    include: {
      products: true,
    },
  });

  if (!collection) {
    notFound();
  }

  const products = (collection.products || []).map((p: any) => ({ ...p })) as Product[];

  const heroImage = collection.name.includes("Dark") ? "/images/dark_moody_candle.png" 
    : collection.name.includes("Floral") ? "/images/floral_candle.png"
    : collection.name.includes("Fresh") ? "/images/fresh_clean_candle.png"
    : "/images/warm_cosy_candle.png";

  return (
    <main className="min-h-screen">
      {/* Collection Hero */}
      <div className="relative w-full h-[50vh] min-h-[400px] bg-black flex items-center justify-center overflow-hidden">
        <Image
          src={heroImage}
          alt={collection.name}
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="font-heading text-5xl md:text-6xl text-white mb-6 drop-shadow-md">
            {collection.name}
          </h1>
          <p className="text-white/90 text-lg md:text-xl drop-shadow-md">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 md:px-6 py-24">
        <div className="flex justify-between items-end mb-12 border-b border-warm-gray/10 pb-6">
          <h2 className="font-heading text-3xl">Products in this collection</h2>
          <span className="text-warm-gray uppercase tracking-widest text-sm">{products.length} Items</span>
        </div>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-warm-gray text-lg">No products available in this collection yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}
