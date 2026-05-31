"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, getSubtotal, updateQuantity, removeItem } = useCartStore();
  const router = useRouter();
  const subtotal = getSubtotal();

  if (items.length === 0) {
    return (
      <main className="min-h-screen py-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl mb-6">Your Cart is Empty</h1>
          <p className="text-warm-gray mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Button variant="primary" onClick={() => router.push("/shop")}>
            Start Shopping
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="font-heading text-4xl md:text-5xl mb-12">Your Shopping Bag</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="hidden md:grid grid-cols-6 gap-4 border-b border-warm-gray/20 pb-4 mb-6 text-sm font-semibold uppercase tracking-widest text-warm-gray">
              <div className="col-span-3">Product</div>
              <div className="col-span-1 text-center">Price</div>
              <div className="col-span-1 text-center">Quantity</div>
              <div className="col-span-1 text-right">Total</div>
            </div>
            
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col md:grid md:grid-cols-6 gap-4 items-center border-b border-warm-gray/10 pb-6">
                  <div className="col-span-3 flex w-full gap-4 items-center">
                    <div className="relative w-24 h-32 bg-blush flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <Link href={`/shop/${item.slug}`} className="font-heading text-xl hover:text-gold transition-colors">
                        {item.name}
                      </Link>
                      <p className="text-warm-gray text-sm mt-1">Size: {item.size}</p>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 text-sm mt-2 flex items-center gap-1 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-1 text-center hidden md:block">
                    {formatPrice(item.price)}
                  </div>
                  
                  <div className="col-span-1 flex justify-center w-full md:w-auto">
                    <div className="flex items-center border border-charcoal/20">
                      <button 
                        onClick={() => item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-black/5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-black/5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-1 text-right font-medium text-lg w-full md:w-auto flex justify-between md:block">
                    <span className="md:hidden text-warm-gray text-sm">Total:</span>
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-cream p-8 border border-warm-gray/10 sticky top-24">
              <h3 className="font-heading text-2xl mb-6">Order Summary</h3>
              
              <div className="flex justify-between mb-4 text-warm-gray">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              
              <div className="flex justify-between mb-6 text-warm-gray pb-6 border-b border-warm-gray/20">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              
              <div className="flex justify-between mb-8 font-medium text-xl">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full uppercase tracking-widest"
                onClick={() => router.push("/checkout")}
              >
                Proceed to Checkout
              </Button>
              
              <div className="mt-6 flex justify-center gap-2 text-warm-gray text-sm">
                <span>We accept:</span>
                <span className="font-semibold text-charcoal">Card, Apple Pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
