"use client";

import { useState } from "react";
import { Product } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Minus, Plus, Heart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

export function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.size[0] || "");
  const { addItem } = useCartStore();

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
      quantity,
    });
    
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 mb-4">
        {product.isNew && <Badge variant="new">New</Badge>}
        {product.bestseller && <Badge variant="bestseller">Bestseller</Badge>}
      </div>

      <h1 className="font-heading text-4xl md:text-5xl mb-2">{product.name}</h1>
      
      <div className="flex items-center gap-4 mb-6">
        <StarRating rating={5} />
        <a href="#reviews" className="text-sm text-warm-gray hover:text-charcoal underline">
          Read reviews
        </a>
      </div>

      <div className="flex items-center gap-3 mb-6">
        {product.comparePrice ? (
          <>
            <span className="text-2xl font-medium text-red-500">{formatPrice(product.price)}</span>
            <span className="text-xl text-warm-gray line-through">{formatPrice(product.comparePrice)}</span>
          </>
        ) : (
          <span className="text-2xl font-medium">{formatPrice(product.price)}</span>
        )}
      </div>

      <p className="text-warm-gray leading-relaxed mb-8">{product.scent}</p>

      {/* Size Selector */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold uppercase tracking-widest mb-4">Size</h4>
        <div className="flex flex-wrap gap-3">
          {product.size.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSize(s)}
              className={`px-6 py-3 border transition-colors text-sm ${
                selectedSize === s
                  ? "border-gold text-gold bg-gold/5"
                  : "border-warm-gray/30 text-warm-gray hover:border-charcoal hover:text-charcoal"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Add to Cart Group */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex items-center border border-warm-gray/30 h-14">
          <button 
            onClick={() => quantity > 1 && setQuantity(q => q - 1)}
            className="w-12 h-full flex items-center justify-center hover:bg-black/5"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button 
            onClick={() => setQuantity(q => q + 1)}
            className="w-12 h-full flex items-center justify-center hover:bg-black/5"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <Button variant="primary" size="lg" className="flex-1 uppercase tracking-widest" onClick={handleAddToCart}>
          Add to Cart - {formatPrice(product.price * quantity)}
        </Button>
        
        <Button variant="outline" size="lg" className="w-14 px-0">
          <Heart className="w-5 h-5" />
        </Button>
      </div>

      <div className="bg-blush p-6 text-sm text-charcoal/80 flex flex-col gap-2">
        <p>✨ Free UK delivery over £50</p>
        <p>📦 Ships in 2-3 business days</p>
        <p>🌱 100% Vegan & Cruelty Free</p>
      </div>
    </div>
  );
}
