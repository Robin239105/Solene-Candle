"use client";

import { motion } from "framer-motion";
import { Leaf, Flame, Droplets, Recycle } from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "Pure soy wax sourced from sustainable farms. No paraffin, no synthetic additives, no compromises.",
  },
  {
    icon: Flame,
    title: "Hand-Poured",
    description: "Every candle is individually crafted in our London studio. No factory lines, no mass production.",
  },
  {
    icon: Droplets,
    title: "Premium Scents",
    description: "Fragrance oils sourced from Grasse, France — the perfume capital of the world.",
  },
  {
    icon: Recycle,
    title: "Eco-Conscious",
    description: "Recyclable glass vessels, biodegradable packaging, and carbon-neutral shipping.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-charcoal text-cream">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <h2 className="font-heading text-3xl md:text-4xl mb-4">Why Solène</h2>
          <div className="w-12 h-px bg-gold" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 border border-warm-gray/30 flex items-center justify-center mb-6">
                <value.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-heading text-xl mb-3">{value.title}</h3>
              <p className="text-warm-gray text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
