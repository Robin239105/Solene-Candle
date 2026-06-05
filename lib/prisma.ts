import { mockProducts, mockCollections } from "./mockData";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Detect if we have a valid PostgreSQL URL configured
const hasDbUrl = 
  process.env.DATABASE_URL && 
  (process.env.DATABASE_URL.startsWith("postgres://") || 
   process.env.DATABASE_URL.startsWith("postgresql://"));

// Setup in-memory stores for local mock fallback (so local mutations persist in-memory)
let localProducts = [...mockProducts];
let localCollections = [...mockCollections];
let localOrders: any[] = [
  // Mock pre-filled orders for presentation
  {
    id: "ord-1",
    email: "sarah.j@example.com",
    firstName: "Sarah",
    lastName: "Jenkins",
    address: "123 Oak Lane",
    city: "London",
    postcode: "SW1A 1AA",
    country: "United Kingdom",
    phone: "+44 7700 900077",
    total: 93.0,
    discount: 0,
    status: "PAID",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    items: [
      { id: "oi-1", productId: "1", productName: "Velvet Noir", size: "200ml", price: 45.0, quantity: 2 }
    ]
  },
  {
    id: "ord-2",
    email: "james.l@example.com",
    firstName: "James",
    lastName: "Lovelace",
    address: "45 Pine Street",
    city: "Manchester",
    postcode: "M1 1AE",
    country: "United Kingdom",
    phone: "+44 7700 900088",
    total: 48.0,
    discount: 0,
    status: "PENDING",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    items: [
      { id: "oi-2", productId: "4", productName: "Cashmere Woods", size: "200ml", price: 48.0, quantity: 1 }
    ]
  }
];
let localNewsletters: any[] = [];

let prismaInstance: any;

if (hasDbUrl) {
  if (globalForPrisma.prisma) {
    prismaInstance = globalForPrisma.prisma;
  } else {
    // Create a connection pool and adapter for Prisma 7
    const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    prismaInstance = new PrismaClient({ adapter });
    
    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = prismaInstance;
    }
  }
} else {
  // Graceful in-memory mock client fallback
  prismaInstance = {
    product: {
      findMany: async (args?: any) => {
        let result = [...localProducts];
        if (args?.where?.featured) result = result.filter(p => p.featured);
        if (args?.where?.collection?.name) {
          result = result.filter(p => localCollections.find(c => c.id === p.collectionId)?.name === args.where.collection.name);
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
        return localProducts.find(p => p.slug === args.where.slug || p.id === args.where.id) || null;
      },
      create: async (args: any) => {
        const newProduct = {
          id: `prod-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date(),
          stock: 100,
          comparePrice: null,
          featured: false,
          bestseller: false,
          isNew: true,
          ...args.data,
        };
        localProducts.push(newProduct);
        return newProduct;
      },
      update: async (args: any) => {
        const index = localProducts.findIndex(p => p.id === args.where.id || p.slug === args.where.slug);
        if (index !== -1) {
          localProducts[index] = { ...localProducts[index], ...args.data };
          return localProducts[index];
        }
        throw new Error(`Product not found with criteria: ${JSON.stringify(args.where)}`);
      },
      delete: async (args: any) => {
        const index = localProducts.findIndex(p => p.id === args.where.id || p.slug === args.where.slug);
        if (index !== -1) {
          const deleted = localProducts[index];
          localProducts = localProducts.filter(p => p.id !== deleted.id);
          return deleted;
        }
        throw new Error(`Product not found with criteria: ${JSON.stringify(args.where)}`);
      }
    },
    collection: {
      findMany: async () => localCollections,
      findUnique: async (args: any) => {
        return localCollections.find(c => c.slug === args.where.slug || c.id === args.where.id) || null;
      },
      create: async (args: any) => {
        const newCollection = {
          id: `col-${Math.random().toString(36).substr(2, 9)}`,
          products: [],
          ...args.data,
        };
        localCollections.push(newCollection);
        return newCollection;
      },
      update: async (args: any) => {
        const index = localCollections.findIndex(c => c.id === args.where.id || c.slug === args.where.slug);
        if (index !== -1) {
          localCollections[index] = { ...localCollections[index], ...args.data };
          return localCollections[index];
        }
        throw new Error("Collection not found");
      },
      delete: async (args: any) => {
        const index = localCollections.findIndex(c => c.id === args.where.id || c.slug === args.where.slug);
        if (index !== -1) {
          const deleted = localCollections[index];
          localCollections = localCollections.filter(c => c.id !== deleted.id);
          return deleted;
        }
        throw new Error("Collection not found");
      }
    },
    order: {
      findMany: async (args?: any) => {
        let result = [...localOrders];
        if (args?.orderBy?.createdAt) {
          result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        }
        return result;
      },
      findUnique: async (args: any) => {
        return localOrders.find(o => o.id === args.where.id) || null;
      },
      create: async (args: any) => {
        const { items, ...orderData } = args.data;
        const newOrder = {
          id: `ord-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date(),
          status: "PENDING",
          discount: 0,
          ...orderData,
          items: items?.create?.map((item: any) => ({
            id: `oi-${Math.random().toString(36).substr(2, 9)}`,
            productId: item.productId || item.product?.connect?.id,
            productName: item.productName || "Unknown Candle",
            size: item.size,
            price: item.price,
            quantity: item.quantity,
          })) || []
        };
        localOrders.push(newOrder);
        return newOrder;
      },
      update: async (args: any) => {
        const index = localOrders.findIndex(o => o.id === args.where.id);
        if (index !== -1) {
          localOrders[index] = { ...localOrders[index], ...args.data };
          return localOrders[index];
        }
        throw new Error("Order not found");
      }
    },
    newsletter: {
      findMany: async () => localNewsletters,
      create: async (args: any) => {
        const newSub = {
          id: `news-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date(),
          ...args.data
        };
        localNewsletters.push(newSub);
        return newSub;
      }
    }
  } as any;
}

export const prisma = prismaInstance;
