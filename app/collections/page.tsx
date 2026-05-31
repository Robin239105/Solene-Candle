import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 3600;

export default async function CollectionsPage() {
  const collections = await prisma.collection.findMany({
    include: {
      products: {
        take: 1, // Just get one product to show an image if collection doesn't have one
      }
    }
  });

  return (
    <main className="min-h-screen py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl text-center mb-4">Our Collections</h1>
          <div className="w-12 h-px bg-gold" />
          <p className="text-warm-gray mt-6 max-w-2xl text-center">
            Explore our thoughtfully curated collections, each designed to evoke a specific mood and transform your space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection: any) => {
            // In a real app we'd have a specific collection image
            // Here we fall back to the first product's image or a placeholder
            const image = collection.name.includes("Dark") ? "/images/dark_moody_candle.png" 
              : collection.name.includes("Floral") ? "/images/floral_candle.png"
              : collection.name.includes("Fresh") ? "/images/fresh_clean_candle.png"
              : "/images/warm_cosy_candle.png";

            return (
              <Link 
                key={collection.id} 
                href={`/collections/${collection.slug}`}
                className="group relative aspect-video md:aspect-[4/3] overflow-hidden bg-black block"
              >
                <Image
                  src={image}
                  alt={collection.name}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h2 className="font-heading text-3xl md:text-5xl text-white drop-shadow-md group-hover:text-gold transition-colors duration-500 mb-4">
                    {collection.name}
                  </h2>
                  <p className="text-white/90 max-w-md hidden md:block">
                    {collection.description}
                  </p>
                  <span className="mt-6 border-b border-white text-white pb-1 uppercase tracking-widest text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Explore Collection
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  );
}
