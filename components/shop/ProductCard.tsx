"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const mainImage = product.images[0] || "/placeholder.jpg";
  const hoverImage = product.images[1] || mainImage;

  return (
    <div 
      className="group relative flex flex-col gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] bg-blush overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.isNew && <Badge variant="new">New</Badge>}
          {product.bestseller && <Badge variant="bestseller">Bestseller</Badge>}
          {product.comparePrice && <Badge variant="sale">Sale</Badge>}
        </div>
        
        {/* Images */}
        <Link href={`/shop/${product.slug}`} className="block w-full h-full">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className={`object-cover transition-opacity duration-700 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Image
            src={hoverImage}
            alt={`${product.name} alternate view`}
            fill
            className={`object-cover transition-opacity duration-700 ${isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        
        {/* Quick View Button */}
        {onQuickView && (
          <div className="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
            <button
              onClick={() => onQuickView(product)}
              className="w-full bg-cream/90 backdrop-blur-sm text-charcoal py-3 font-medium text-sm hover:bg-gold hover:text-white transition-colors uppercase tracking-widest shadow-lg"
            >
              Quick View
            </button>
          </div>
        )}
      </div>

      <Link href={`/shop/${product.slug}`} className="flex flex-col gap-1">
        <h3 className="font-heading text-xl group-hover:text-gold transition-colors">{product.name}</h3>
        <p className="text-sm text-warm-gray">{product.scent}</p>
        <div className="flex items-center gap-2 mt-1">
          {product.comparePrice ? (
            <>
              <span className="text-red-500 font-medium">{formatPrice(product.price)}</span>
              <span className="text-warm-gray line-through text-sm">{formatPrice(product.comparePrice)}</span>
            </>
          ) : (
            <span className="font-medium">{formatPrice(product.price)}</span>
          )}
        </div>
      </Link>
    </div>
  );
}
