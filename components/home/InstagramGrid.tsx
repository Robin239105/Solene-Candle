"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function InstagramGrid() {
  // Repeating some images for the grid
  const images = [
    "/images/dark_moody_candle.png",
    "/images/floral_candle.png",
    "/images/hero_banner.png",
    "/images/fresh_clean_candle.png",
    "/images/warm_cosy_candle.png",
    "/images/brand_story.png",
  ];

  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <a href="#" className="inline-block hover:text-gold transition-colors">
            <h2 className="font-heading text-4xl md:text-5xl mb-4">@solenecandle</h2>
          </a>
          <p className="text-warm-gray">Follow our journey on Instagram</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0">
          {images.map((src, index) => (
            <motion.a
              href="#"
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-square group block bg-blush overflow-hidden"
            >
              <Image
                src={src}
                alt="Instagram post"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
