"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, Sparkles } from "lucide-react";

const perks = [
  { icon: Truck, text: "Free UK shipping over £50" },
  { icon: ShieldCheck, text: "30-day hassle-free returns" },
  { icon: Sparkles, text: "Hand-poured with love in London" },
];

export function TrustBar() {
  return (
    <section className="py-8 border-y border-warm-gray/10 bg-warm-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          {perks.map((perk, index) => (
            <motion.div
              key={perk.text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <perk.icon className="w-4 h-4 text-gold" />
              <span className="text-sm text-warm-gray tracking-wide">{perk.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
