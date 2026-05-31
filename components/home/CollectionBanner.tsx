"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const collections = [
  { name: "Dark & Moody", slug: "dark-moody", image: "/images/dark_moody_candle.png" },
  { name: "Floral", slug: "floral", image: "/images/floral_candle.png" },
  { name: "Fresh & Clean", slug: "fresh-clean", image: "/images/fresh_clean_candle.png" },
  { name: "Warm & Cosy", slug: "warm-cosy", image: "/images/warm_cosy_candle.png" },
];

export function CollectionBanner() {
  return (
    <section className="bg-charcoal text-cream py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-center mb-4">Shop by Collection</h2>
          <div className="w-12 h-px bg-gold" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-video md:aspect-[4/3] overflow-hidden bg-black"
            >
              <Link href={`/collections/${collection.slug}`} className="block w-full h-full">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                  <h3 className="font-heading text-3xl md:text-4xl text-white drop-shadow-md group-hover:text-gold transition-colors duration-500">
                    {collection.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
