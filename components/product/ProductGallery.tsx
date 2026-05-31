"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function ProductGallery({ images }: { images: string[] }) {
  const [mainImage, setMainImage] = useState(images[0] || "/placeholder.jpg");

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible flex-shrink-0 md:w-24">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setMainImage(img)}
            className={`relative aspect-[3/4] w-20 md:w-full flex-shrink-0 border-2 transition-colors ${
              mainImage === img ? "border-gold" : "border-transparent hover:border-warm-gray/30"
            }`}
          >
            <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative aspect-square md:aspect-[4/5] flex-grow bg-blush overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={mainImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image src={mainImage} alt="Main product image" fill className="object-cover" priority />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
