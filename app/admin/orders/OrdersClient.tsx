"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Eye, 
  X,
  Loader2 
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatPrice } from "@/lib/utils";
import { updateOrderStatus } from "@/app/actions/adminActions";
import toast from "react-hot-toast";

interface OrdersClientProps {
  orders: any[];
}

export function OrdersClient({ orders }: OrdersClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Modal states
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const orderStatuses = ["PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

  const openDetailsModal = (order: any) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleStatusChange = async (orderId: string, nextStatus: string) => {
    startTransition(async () => {
      try {
        const result = await updateOrderStatus(orderId, nextStatus);
        if (result.success) {
          toast.success(`Order status updated to ${nextStatus}`);
          
          // Sync local modal state if open
          if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder({ ...selectedOrder, status: nextStatus });
          }
          
          router.refresh();
        } else {
          toast.error("Failed to update status");
        }
      } catch (err) {
        toast.error("An error occurred while updating status");
      }
    });
  };

  // Filter orders locally
  const filteredOrders = orders.filter(order => {
    const fullName = `${order.firstName} ${order.lastName}`.toLowerCase();
    const email = order.email.toLowerCase();
    const orderId = order.id.toLowerCase();
    const matchQuery = fullName.includes(searchTerm.toLowerCase()) || 
                       email.includes(searchTerm.toLowerCase()) ||
                       orderId.includes(searchTerm.toLowerCase());
                       
    const matchStatus = statusFilter === "all" || order.status === statusFilter;

    return matchQuery && matchStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Title Header */}
      <div>
        <h1 className="text-3xl font-heading font-semibold text-charcoal">Orders</h1>
        <p className="text-sm text-warm-gray mt-1">Review checkout records, shipment tracking, and invoice statuses</p>
      </div>

      {/* Filters & Actions Bar */}
      <div className="bg-white border border-warm-gray/20 rounded-lg p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray/60" />
          <Input
            type="text"
            placeholder="Search by customer name, email or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-10 bg-transparent border-warm-gray/30 focus:border-gold"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-warm-gray uppercase tracking-wider whitespace-nowrap">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 border border-warm-gray/30 bg-transparent px-3 rounded-none focus:outline-none focus:ring-1 focus:ring-gold text-sm w-full md:w-48"
          >
            <option value="all">All Orders</option>
            {orderStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-warm-gray/20 rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-warm-gray/20 bg-cream/40 text-xs font-semibold uppercase tracking-wider text-warm-gray/80">
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Date</th>
              <th className="p-4">Items</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 w-24 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-warm-gray/10 text-sm text-charcoal">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-warm-gray">
                  No orders found matching the criteria.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => {
                // Sum quantities of items
                const totalItemsQty = order.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0;
                
                return (
                  <tr key={order.id} className="hover:bg-cream/20 transition-colors">
                    <td className="p-4 font-mono text-xs text-warm-gray select-all">{order.id}</td>
                    <td className="p-4 font-medium">
                      <div className="flex flex-col">
                        <span>{order.firstName} {order.lastName}</span>
                        <span className="text-xs text-warm-gray font-normal">{order.email}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </td>
                    <td className="p-4 font-semibold text-center w-16">{totalItemsQty}</td>
                    <td className="p-4 font-semibold">{formatPrice(order.total)}</td>
                    <td className="p-4">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        order.status === "PAID" || order.status === "SHIPPED" || order.status === "DELIVERED"
                          ? "bg-green-50 text-green-700 border border-green-150"
                          : order.status === "PENDING" || order.status === "PROCESSING"
                          ? "bg-amber-50 text-amber-700 border border-amber-150"
                          : "bg-red-50 text-red-700 border border-red-150"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <select
                          value={order.status}
                          disabled={isPending}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="h-8 border border-warm-gray/30 bg-transparent px-2 text-xs focus:outline-none focus:ring-1 focus:ring-gold"
                        >
                          {orderStatuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => openDetailsModal(order)}
                          className="p-2 text-warm-gray hover:text-charcoal hover:bg-blush/30 rounded-md transition-colors"
                          aria-label="View order details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} className="max-w-2xl rounded-lg">
        {selectedOrder && (
          <div className="p-6 md:p-8 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-warm-gray/10 pb-4 gap-4">
              <div>
                <h2 className="text-2xl font-heading font-semibold text-charcoal">
                  Order Details
                </h2>
                <p className="text-xs text-warm-gray font-mono mt-1">ID: {selectedOrder.id}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-warm-gray uppercase tracking-wider">Status:</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                  className="h-10 border border-warm-gray/30 bg-white px-3 focus:outline-none focus:ring-1 focus:ring-gold text-sm"
                >
                  {orderStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grid breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Details */}
              <div className="flex flex-col gap-3">
                <h4 className="font-heading text-lg font-semibold text-charcoal border-b border-warm-gray/10 pb-1.5">Customer Details</h4>
                <div className="flex flex-col text-sm gap-1">
                  <span className="font-medium">{selectedOrder.firstName} {selectedOrder.lastName}</span>
                  <span className="text-warm-gray">{selectedOrder.email}</span>
                  <span className="text-warm-gray">{selectedOrder.phone}</span>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="flex flex-col gap-3">
                <h4 className="font-heading text-lg font-semibold text-charcoal border-b border-warm-gray/10 pb-1.5">Shipping Address</h4>
                <div className="flex flex-col text-sm gap-1">
                  <span>{selectedOrder.address}</span>
                  <span>{selectedOrder.city}</span>
                  <span>{selectedOrder.postcode}</span>
                  <span className="text-warm-gray font-medium">{selectedOrder.country}</span>
                </div>
              </div>
            </div>

            {/* Items Ordered */}
            <div className="flex flex-col gap-3">
              <h4 className="font-heading text-lg font-semibold text-charcoal border-b border-warm-gray/10 pb-1.5">Items Ordered</h4>
              <div className="flex flex-col gap-3 max-h-[200px] overflow-y-auto pr-1 divide-y divide-warm-gray/10">
                {selectedOrder.items?.map((item: any) => {
                  const productName = item.productName || item.product?.name || "Premium Scented Candle";
                  return (
                    <div key={item.id} className="flex items-center justify-between text-sm pt-2 first:pt-0">
                      <div className="flex flex-col">
                        <span className="font-medium">{productName}</span>
                        <span className="text-xs text-warm-gray">Size: {item.size}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-warm-gray">{item.quantity} x </span>
                        <span className="font-semibold">{formatPrice(item.price)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total Section */}
            <div className="border-t border-warm-gray/10 pt-4 flex justify-between items-center text-charcoal mt-2">
              <span className="font-heading text-xl font-semibold">Total Paid</span>
              <span className="text-2xl font-bold tracking-tight text-gold">{formatPrice(selectedOrder.total)}</span>
            </div>

            {/* Close actions */}
            <div className="flex items-center justify-end mt-4">
              <button
                type="button"
                onClick={() => setIsDetailsOpen(false)}
                className="px-6 py-2.5 border border-warm-gray text-warm-gray hover:bg-blush/35 text-xs uppercase tracking-wider transition-colors h-11"
              >
                Close Details
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
