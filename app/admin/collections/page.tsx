import { prisma } from "@/lib/prisma";
import { CollectionsClient } from "./CollectionsClient";

export const revalidate = 0; // Live revalidation for admin actions

export default async function AdminCollectionsPage() {
  const collections = await prisma.collection.findMany({
    include: {
      products: true
    }
  }) || [];

  return (
    <CollectionsClient collections={collections} />
  );
}
