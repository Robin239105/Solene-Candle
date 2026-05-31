"use client";

import { Drawer } from "@/components/ui/Drawer";
import { useCartStore } from "@/store/cartStore";
import { EmptyCart } from "./EmptyCart";
import { CartItem } from "./CartItem";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const { isOpen, closeDrawer, items, getSubtotal } = useCartStore();
  const router = useRouter();

  const handleCheckout = () => {
    closeDrawer();
    router.push("/checkout");
  };
  
  const handleViewCart = () => {
    closeDrawer();
    router.push("/cart");
  };

  return (
    <Drawer isOpen={isOpen} onClose={closeDrawer} title={`Your Bag (${items.length})`}>
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto px-6 py-2">
            {items.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>
          <div className="border-t border-charcoal/10 p-6 bg-cream">
            <div className="flex justify-between items-center mb-6">
              <span className="font-medium text-lg">Subtotal</span>
              <span className="font-medium text-lg">{formatPrice(getSubtotal())}</span>
            </div>
            <div className="flex flex-col gap-3">
              <Button variant="primary" onClick={handleCheckout} className="w-full">
                Checkout
              </Button>
              <Button variant="outline" onClick={handleViewCart} className="w-full">
                View Bag
              </Button>
            </div>
            <p className="text-xs text-warm-gray text-center mt-4">
              Shipping and taxes calculated at checkout.
            </p>
          </div>
        </div>
      )}
    </Drawer>
  );
}
