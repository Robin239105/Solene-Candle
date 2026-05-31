"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function BrandStory() {
  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] bg-blush overflow-hidden w-full max-w-lg mx-auto"
          >
            <Image
              src="/images/brand_story.png"
              alt="Pouring candle wax"
              fill
              className="object-cover"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center md:items-start md:text-left"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6">
              Made with <span className="italic font-light">intention.</span>
            </h2>
            <p className="text-warm-gray text-lg mb-8 leading-relaxed max-w-md">
              Every Solène candle is hand-poured in our London studio using 
              sustainable soy wax and premium fragrance oils. We believe in the power 
              of scent to transform a space and elevate the everyday into something extraordinary.
            </p>
            <Link href="/about">
              <Button variant="outline" size="lg" className="uppercase tracking-widest">
                Our Story
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
