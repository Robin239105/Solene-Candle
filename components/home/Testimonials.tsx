"use client";

import { motion } from "framer-motion";
import { StarRating } from "@/components/ui/StarRating";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    location: "London",
    text: "The Velvet Noir candle completely transformed my living room. The scent throw is incredible even when not lit. Truly luxurious.",
    rating: 5,
  },
  {
    id: 2,
    name: "Emma Thompson",
    location: "Manchester",
    text: "I've tried many luxury candle brands, but Solène is now my absolute favorite. The burn is so clean and the scents are beautifully complex.",
    rating: 5,
  },
  {
    id: 3,
    name: "Lucy Davies",
    location: "Edinburgh",
    text: "Bought Coastal Sage for a friend's housewarming and had to buy one for myself immediately after. It smells like a high-end spa.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-warm-white border-y border-warm-gray/10 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-center mb-4">What our customers say</h2>
          <div className="w-12 h-px bg-gold" />
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-[85vw] md:w-[400px] snap-center bg-cream p-8 md:p-10 border border-warm-gray/10"
            >
              <StarRating rating={t.rating} className="mb-6" />
              <p className="text-charcoal mb-8 leading-relaxed italic text-lg">&ldquo;{t.text}&rdquo;</p>
              <div>
                <p className="font-heading text-xl">{t.name}</p>
                <p className="text-warm-gray text-sm uppercase tracking-widest mt-1">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
