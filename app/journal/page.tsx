"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { journalPosts } from "@/lib/journalData";

export default function JournalPage() {
  return (
    <main className="min-h-screen py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-20 max-w-3xl mx-auto text-center"
        >
          <h1 className="font-heading text-4xl md:text-5xl mb-4">The Journal</h1>
          <div className="w-12 h-px bg-gold mb-6" />
          <p className="text-warm-gray text-lg leading-relaxed">
            Stories from behind the pour. Candle care guides, styling inspiration, and reflections on slow living.
          </p>
        </motion.div>

        {/* Featured Post (First) */}
        {journalPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-24"
          >
            <Link href={`/journal/${journalPosts[0].slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-0">
              <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                <Image
                  src={journalPosts[0].image}
                  alt={journalPosts[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
              <div className="bg-blush flex flex-col justify-center p-8 md:p-12 lg:p-16">
                <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-4">
                  {journalPosts[0].category}
                </span>
                <h2 className="font-heading text-3xl md:text-4xl mb-4 group-hover:text-gold transition-colors duration-300">
                  {journalPosts[0].title}
                </h2>
                <p className="text-warm-gray leading-relaxed mb-6">
                  {journalPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-warm-gray">
                  <span>{journalPosts[0].date}</span>
                  <span>·</span>
                  <span>{journalPosts[0].readTime}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Remaining Posts Grid */}
        {journalPosts.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {journalPosts.slice(1).map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Link href={`/journal/${post.slug}`} className="group block">
                  <div className="relative aspect-[3/2] overflow-hidden mb-6">
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
                  <h3 className="font-heading text-2xl mt-2 mb-3 group-hover:text-gold transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-warm-gray text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-warm-gray">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
