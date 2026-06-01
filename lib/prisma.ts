import { mockProducts, mockCollections } from "./mockData";
import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Detect if we have a valid PostgreSQL URL configured
const hasDbUrl = 
  process.env.DATABASE_URL && 
  (process.env.DATABASE_URL.startsWith("postgres://") || 
   process.env.DATABASE_URL.startsWith("postgresql://"));

export const prisma = hasDbUrl
  ? (globalForPrisma.prisma || new PrismaClient())
  : ({
      product: {
        findMany: async (args?: any) => {
          let result = [...mockProducts];
          if (args?.where?.featured) result = result.filter(p => p.featured);
          if (args?.where?.collection?.name) {
            result = result.filter(p => mockCollections.find(c => c.id === p.collectionId)?.name === args.where.collection.name);
          }
          if (args?.where?.collectionId) {
            result = result.filter(p => p.collectionId === args.where.collectionId);
          }
          if (args?.where?.NOT?.id) {
            result = result.filter(p => p.id !== args.where.NOT.id);
          }
          return result;
        },
        findUnique: async (args: any) => {
          return mockProducts.find(p => p.slug === args.where.slug) || null;
        }
      },
      collection: {
        findMany: async () => mockCollections,
        findUnique: async (args: any) => {
          return mockCollections.find(c => c.slug === args.where.slug) || null;
        }
      }
    } as any);

if (hasDbUrl && process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
