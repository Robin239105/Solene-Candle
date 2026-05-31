"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "How long does shipping take?",
        a: "Standard UK delivery takes 2–3 working days. Next-day delivery is available on orders placed before 2pm. International shipping typically takes 5–10 working days depending on your location.",
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes! We offer free standard shipping on all UK orders over £50. International orders over £100 also qualify for free shipping.",
      },
      {
        q: "Can I track my order?",
        a: "Absolutely. Once your order is dispatched, you'll receive an email with a tracking number. You can use this to follow your package every step of the way.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by destination and will be calculated at checkout.",
      },
    ],
  },
  {
    category: "Products & Care",
    questions: [
      {
        q: "What wax do you use?",
        a: "All of our candles are made with 100% natural soy wax. Soy wax burns cleaner and slower than paraffin, and it holds fragrance beautifully. It's also vegan and biodegradable.",
      },
      {
        q: "How long do your candles burn?",
        a: "Our 200ml candles provide approximately 45–50 hours of burn time when cared for properly. The 100ml size burns for around 25 hours, and the 300ml for around 65 hours.",
      },
      {
        q: "Are your candles vegan and cruelty-free?",
        a: "Yes. Every Solène candle is 100% vegan and cruelty-free. We never test on animals and none of our ingredients are derived from animal sources.",
      },
      {
        q: "How should I care for my candle?",
        a: "Trim the wick to 5mm before each burn. Allow the wax to melt to the edges on the first burn. Never burn for more than 4 hours at a time. Store away from direct sunlight. Visit our Journal for a detailed candle care guide.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        q: "What is your return policy?",
        a: "If you're not completely satisfied, you may return unused items in their original packaging within 30 days for a full refund. Please contact us to initiate a return.",
      },
      {
        q: "Can I exchange a product?",
        a: "Yes. If you'd like to exchange for a different scent or size, please get in touch within 30 days of receiving your order. The item must be unused and in original packaging.",
      },
      {
        q: "What if my candle arrives damaged?",
        a: "We take great care in packaging, but if your candle arrives damaged, please contact us within 48 hours with a photo and we'll send a replacement immediately — no need to return the damaged item.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-warm-gray/15">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-6 text-left group"
      >
        <span className="font-medium text-charcoal group-hover:text-gold transition-colors pr-4">
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-warm-gray flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-warm-gray leading-relaxed pb-6 pr-12">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  return (
    <main className="min-h-screen py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            Frequently Asked Questions
          </h1>
          <div className="w-12 h-px bg-gold mb-6" />
          <p className="text-warm-gray text-lg">
            Everything you need to know about our candles, shipping, and care.
          </p>
        </motion.div>

        <div className="flex flex-col gap-16">
          {faqs.map((section, sIndex) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: sIndex * 0.1 }}
            >
              <h2 className="font-heading text-2xl mb-6 text-gold">
                {section.category}
              </h2>
              <div>
                {section.questions.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-24 bg-blush p-8 md:p-12 text-center"
        >
          <h3 className="font-heading text-2xl mb-4">Still Have Questions?</h3>
          <p className="text-warm-gray mb-6">
            We'd love to hear from you. Our team typically responds within 24
            hours.
          </p>
          <a
            href="/contact"
            className="inline-block bg-charcoal text-cream px-8 py-3 text-sm uppercase tracking-widest hover:bg-gold transition-colors duration-300"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </main>
  );
}
