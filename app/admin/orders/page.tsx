import { prisma } from "@/lib/prisma";
import { OrdersClient } from "./OrdersClient";

export const revalidate = 0; // Disable page caching to load real-time order entries

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  }) || [];

  return (
    <OrdersClient orders={orders} />
  );
}
