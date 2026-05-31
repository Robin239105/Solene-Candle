"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function JournalPreview() {
  const posts = [
    {
      slug: "art-of-candle-care",
      title: "The Art of Candle Care",
      excerpt: "A few simple rituals to make every burn count.",
      image: "/images/journal_styling.png",
      category: "Candle Care",
    },
    {
      slug: "behind-the-pour",
      title: "Behind the Pour",
      excerpt: "A day in our East London studio.",
      image: "/images/journal_making.png",
      category: "Behind the Scenes",
    },
    {
      slug: "creating-sanctuary-at-home",
      title: "Creating a Sanctuary at Home",
      excerpt: "How scent shapes your space.",
      image: "/images/journal_cozy.png",
      category: "Lifestyle",
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16"
        >
          <div>
            <h2 className="font-heading text-3xl md:text-4xl mb-4">From the Journal</h2>
            <div className="w-12 h-px bg-gold" />
          </div>
          <Link
            href="/journal"
            className="mt-4 md:mt-0 text-sm uppercase tracking-widest text-warm-gray hover:text-charcoal transition-colors border-b border-warm-gray/30 pb-1"
          >
            Read All Articles
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Link href={`/journal/${post.slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden mb-5">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <span className="text-gold uppercase tracking-widest text-xs font-semibold">
                  {post.category}
                </span>
                <h3 className="font-heading text-xl mt-2 mb-2 group-hover:text-gold transition-colors">
                  {post.title}
                </h3>
                <p className="text-warm-gray text-sm">{post.excerpt}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
