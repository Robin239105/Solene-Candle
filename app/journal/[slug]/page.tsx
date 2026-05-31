"use client";

import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { journalPosts } from "@/lib/journalData";

export default function JournalPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = journalPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const otherPosts = journalPosts.filter((p) => p.slug !== slug).slice(0, 2);

  // Simple markdown-to-HTML for ## headings, **bold**, *italic*, and ---
  const renderContent = (content: string) => {
    return content
      .trim()
      .split("\n\n")
      .map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={i} className="font-heading text-2xl md:text-3xl mt-12 mb-4">
              {trimmed.replace("## ", "")}
            </h2>
          );
        }
        if (trimmed === "---") {
          return <hr key={i} className="border-warm-gray/20 my-12" />;
        }

        // Parse inline bold and italic
        const parts = trimmed.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={j}>{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith("*") && part.endsWith("*")) {
            return <em key={j}>{part.slice(1, -1)}</em>;
          }
          return part;
        });

        return (
          <p key={i} className="text-warm-gray leading-[1.85] mb-6">
            {parts}
          </p>
        );
      });
  };

  return (
    <main className="min-h-screen">
      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden"
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </motion.div>

      {/* Article */}
      <article className="container mx-auto px-4 md:px-6 max-w-3xl -mt-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-warm-white p-8 md:p-12 lg:p-16"
        >
          <div className="flex items-center gap-4 mb-6 text-sm text-warm-gray">
            <span className="text-gold uppercase tracking-widest text-xs font-semibold">
              {post.category}
            </span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl leading-tight mb-8">
            {post.title}
          </h1>

          <div className="w-12 h-px bg-gold mb-10" />

          <div className="prose-custom">{renderContent(post.content)}</div>
        </motion.div>
      </article>

      {/* More Posts */}
      {otherPosts.length > 0 && (
        <section className="py-24 border-t border-warm-gray/10 mt-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-heading text-3xl text-center mb-16">Continue Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {otherPosts.map((p) => (
                <Link key={p.slug} href={`/journal/${p.slug}`} className="group block">
                  <div className="relative aspect-[3/2] overflow-hidden mb-6">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <span className="text-gold uppercase tracking-widest text-xs font-semibold">
                    {p.category}
                  </span>
                  <h3 className="font-heading text-xl mt-2 mb-2 group-hover:text-gold transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-warm-gray text-sm">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
