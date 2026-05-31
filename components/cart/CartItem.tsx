import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

interface CartItemProps {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
}

export function CartItem({ id, name, image, price, size, quantity }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 py-4 border-b border-warm-gray/10">
      <div className="relative w-20 h-24 bg-blush flex-shrink-0">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="flex flex-col flex-grow justify-between py-1">
        <div>
          <div className="flex justify-between items-start">
            <h4 className="font-heading text-lg leading-none">{name}</h4>
            <button onClick={() => removeItem(id)} className="text-warm-gray hover:text-red-500 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-warm-gray mt-1">{size}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center border border-charcoal/20 rounded-none">
            <button 
              onClick={() => quantity > 1 && updateQuantity(id, quantity - 1)}
              className="p-1 hover:bg-black/5"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <button 
              onClick={() => updateQuantity(id, quantity + 1)}
              className="p-1 hover:bg-black/5"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <p className="font-medium text-sm">{formatPrice(price * quantity)}</p>
        </div>
      </div>
    </div>
  );
}
