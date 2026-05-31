import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { TrustBar } from "@/components/home/TrustBar";
import { CollectionBanner } from "@/components/home/CollectionBanner";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { BrandStory } from "@/components/home/BrandStory";
import { Testimonials } from "@/components/home/Testimonials";
import { JournalPreview } from "@/components/home/JournalPreview";
import { InstagramGrid } from "@/components/home/InstagramGrid";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { prisma } from "@/lib/prisma";
import { Product } from "@/types";

export const revalidate = 3600;

export default async function Home() {
  let featuredProducts: Product[] = [];
  try {
    const products = await prisma.product.findMany({
      where: { featured: true },
      take: 4,
    });
    featuredProducts = products.map((p: any) => ({ ...p })) as Product[];
  } catch (error) {
    console.error("Failed to fetch featured products:", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <TrustBar />
      <FeaturedProducts products={featuredProducts} />
      <CollectionBanner />
      <WhyChooseUs />
      <BrandStory />
      <Testimonials />
      <JournalPreview />
      <InstagramGrid />
      <NewsletterSection />
    </div>
  );
}
