"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  return (
    <section className="relative w-full h-[calc(100vh-80px)] min-h-[600px] max-h-[900px] bg-cream flex items-center overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center h-full">
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="show" 
          className="flex flex-col items-center md:items-start text-center md:text-left z-10"
        >
          <motion.h1 variants={itemVariants} className="font-heading text-5xl md:text-7xl lg:text-8xl leading-none mb-6">
            Scent is a <br />
            <span className="italic font-light">feeling.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-warm-gray text-lg md:text-xl max-w-md mb-10 leading-relaxed">
            Hand-poured luxury candles, crafted for the moments that matter.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/shop">
              <Button variant="primary" size="lg" className="w-full sm:w-auto uppercase tracking-widest">
                Shop Now
              </Button>
            </Link>
            <Link href="/collections">
              <Button variant="outline" size="lg" className="w-full sm:w-auto uppercase tracking-widest">
                Explore Collections
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" as const }}
            className="relative w-full h-full"
          >
            <Image
              src="/images/hero_banner.png"
              alt="Luxury lit candles"
              fill
              className="object-cover object-left"
              priority
            />
            {/* Gradient overlay for text legibility if needed */}
            <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/50 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
