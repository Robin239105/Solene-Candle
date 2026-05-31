import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

export function EmptyCart() {
  const { closeDrawer } = useCartStore();
  const router = useRouter();

  const handleShop = () => {
    closeDrawer();
    router.push("/shop");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 gap-6">
      <div className="w-20 h-20 bg-blush rounded-full flex items-center justify-center text-gold">
        <ShoppingBag className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <h3 className="font-heading text-2xl">Your cart is empty</h3>
        <p className="text-warm-gray text-sm">Looks like you haven&apos;t added anything to your cart yet.</p>
      </div>
      <Button variant="primary" onClick={handleShop} className="w-full">
        Start Shopping
      </Button>
    </div>
  );
}
