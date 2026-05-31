"use client";

import { useState } from "react";
import Image from "next/image";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export function QuickViewModal({ isOpen, onClose, product }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { addItem } = useCartStore();

  // Initialize selected size when product changes
  if (product && !selectedSize && product.size.length > 0) {
    setSelectedSize(product.size[0]);
  }

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) return;

    addItem({
      id: `${product.id}-${selectedSize}`,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0] || "",
      price: product.price,
      size: selectedSize,
      quantity: 1,
    });

    onClose();
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="grid grid-cols-1 md:grid-cols-2 bg-cream h-full">
        <div className="relative aspect-square md:aspect-auto md:h-[600px] bg-blush">
          <Image
            src={product.images[0] || "/placeholder.jpg"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="p-8 md:p-12 flex flex-col justify-center h-full">
          <h2 className="font-heading text-3xl mb-2">{product.name}</h2>
          <p className="text-warm-gray mb-6">{product.scent}</p>
          
          <div className="text-xl font-medium mb-8">
            {formatPrice(product.price)}
          </div>

          <div className="mb-8">
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-4">Size</h4>
            <div className="flex gap-3">
              {product.size.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-4 py-2 border transition-colors ${
                    selectedSize === s
                      ? "border-gold text-gold"
                      : "border-warm-gray/30 text-warm-gray hover:border-charcoal"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <Button 
            variant="primary" 
            size="lg" 
            className="w-full mb-4"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>

          <p className="text-sm text-warm-gray text-center mt-4">
            Free UK delivery over £50
          </p>
        </div>
      </div>
    </Modal>
  );
}
