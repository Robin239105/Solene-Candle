"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Leaf, Heart, Sparkles, Globe } from "lucide-react";

const stats = [
  { value: "5,000+", label: "Candles Poured" },
  { value: "100%", label: "Natural Soy Wax" },
  { value: "45hrs", label: "Average Burn Time" },
  { value: "0", label: "Synthetic Additives" },
];

const values = [
  {
    icon: Leaf,
    title: "Sustainability First",
    description: "From our biodegradable packaging to our recyclable glass vessels, every decision is made with the planet in mind. We offset all shipping emissions and source locally wherever possible.",
  },
  {
    icon: Heart,
    title: "Made With Intention",
    description: "Every scent is developed through dozens of iterations. We test for hot throw, cold throw, and how each fragrance evolves over the candle's lifetime. Nothing leaves our studio until it's perfect.",
  },
  {
    icon: Sparkles,
    title: "Small Batch Quality",
    description: "We deliberately keep our batches small. Each candle passes through just a few pairs of hands, ensuring the attention to detail that mass production simply cannot achieve.",
  },
  {
    icon: Globe,
    title: "Ethically Sourced",
    description: "Our soy wax comes from sustainable US farms. Our fragrance oils are sourced from Grasse, France. Our wicks are unbleached cotton. We know exactly where every ingredient comes from.",
  },
];

const timeline = [
  { year: "2021", event: "Solène Candle founded in a tiny kitchen in East London." },
  { year: "2022", event: "Moved into our Shoreditch studio and launched our first four scents." },
  { year: "2023", event: "Reached 1,000 orders and introduced the Dark & Moody collection." },
  { year: "2024", event: "Partnered with Selfridges and expanded to international shipping." },
  { year: "2025", event: "Launched our refill programme and achieved carbon-neutral status." },
  { year: "2026", event: "Opened our studio for private scent workshops and custom blending." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] bg-black flex items-center justify-center overflow-hidden">
        <Image
          src="/images/journal_making.png"
          alt="Candle pouring in our studio"
          fill
          className="object-cover opacity-40"
          priority
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="font-heading text-5xl md:text-6xl text-white mb-4 drop-shadow-md">Our Story</h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Scent is a feeling. Make it yours.
          </p>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="bg-charcoal text-cream py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-heading text-3xl md:text-4xl text-gold mb-1">{stat.value}</div>
                <div className="text-warm-gray text-sm uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative aspect-[4/5] bg-blush"
            >
              <Image
                src="/images/brand_story.png"
                alt="Solène candle studio"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-4 block">How It Began</span>
              <h2 className="font-heading text-3xl md:text-4xl mb-6">Born From a Love of Slow Living</h2>
              <div className="flex flex-col gap-4 text-warm-gray leading-relaxed">
                <p>
                  Solène Candle was born in 2021 from a simple desire: to create something beautiful, sustainable, and entirely focused on the sensory experience of home.
                </p>
                <p>
                  Our founder began hand-pouring candles in a tiny East London kitchen, experimenting with natural soy wax and premium fragrance oils until every scent felt like a story waiting to be told.
                </p>
                <p>
                  Today, we've grown into a dedicated studio in Shoreditch, but our ethos remains unchanged. Every candle is still hand-poured, one at a time. We still refuse to use synthetic waxes or cheap fragrance. And we still believe that the right scent can transform not just a room, but a moment.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-24 bg-blush">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-2 md:order-1"
            >
              <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-4 block">Our Process</span>
              <h2 className="font-heading text-3xl md:text-4xl mb-6">The Art of Pouring</h2>
              <div className="flex flex-col gap-4 text-warm-gray leading-relaxed">
                <p>
                  Every Solène candle begins its life as raw soy wax flakes, carefully weighed and heated to exactly 85°C in a double boiler. Too hot and the wax scorches; too cool and the fragrance won't bind.
                </p>
                <p>
                  Our fragrance oils — sourced from the perfume houses of Grasse, France — are blended in at precisely 65°C. Each wick is hand-centred, each vessel pre-warmed to prevent adhesion issues, and each candle left to cool undisturbed overnight.
                </p>
                <p>
                  The following morning, every single candle is inspected by hand. We check for smooth tops, centred wicks, and consistent fragrance distribution. Any candle that doesn't meet our standard is melted down and re-poured.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative aspect-[4/5] order-1 md:order-2"
            >
              <Image
                src="/images/journal_styling.png"
                alt="Finished Solène candle"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl mb-4">What We Stand For</h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-5"
              >
                <div className="w-12 h-12 bg-blush flex items-center justify-center flex-shrink-0">
                  <value.icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-heading text-xl mb-2">{value.title}</h3>
                  <p className="text-warm-gray text-sm leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-charcoal text-cream">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl mb-4">Our Journey</h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </motion.div>

          <div className="flex flex-col gap-0">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex gap-6 items-start relative pb-8"
              >
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-gold rounded-full flex-shrink-0 mt-1" />
                  {index < timeline.length - 1 && (
                    <div className="w-px h-full bg-warm-gray/30 mt-1" />
                  )}
                </div>
                <div className="pb-4">
                  <span className="text-gold font-heading text-xl">{item.year}</span>
                  <p className="text-warm-gray mt-1">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl mb-6">Experience Solène</h2>
            <p className="text-warm-gray leading-relaxed mb-8 max-w-xl mx-auto">
              Every candle we make is an invitation to slow down, breathe deeply, and be present. We'd love for you to experience it yourself.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-charcoal text-cream px-10 py-4 text-sm uppercase tracking-widest hover:bg-gold transition-colors duration-300"
              >
                Shop Our Candles
              </Link>
              <Link
                href="/contact"
                className="border border-charcoal text-charcoal px-10 py-4 text-sm uppercase tracking-widest hover:bg-charcoal hover:text-cream transition-colors duration-300"
              >
                Visit Our Studio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
