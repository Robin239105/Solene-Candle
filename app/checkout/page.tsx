"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCartStore();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const subtotal = getSubtotal();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Mock checkout process
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
      toast.success("Order placed successfully!");
    }, 2000);
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen py-24 flex items-center justify-center bg-cream">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="font-heading text-4xl mb-4">Order Confirmed</h1>
          <p className="text-warm-gray mb-8">
            Thank you for your purchase. We've sent a confirmation email to you. Your luxury candles will be on their way soon!
          </p>
          <Button variant="primary" onClick={() => router.push("/shop")}>
            Continue Shopping
          </Button>
        </div>
      </main>
    );
  }

  if (items.length === 0 && !isSuccess) {
    router.push("/cart");
    return null;
  }

  return (
    <main className="min-h-screen py-12 md:py-24 bg-warm-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Checkout Form */}
          <div>
            <div className="mb-8">
              <Link href="/" className="font-heading text-3xl italic tracking-tight">
                Solène Candle
              </Link>
            </div>
            
            <form onSubmit={handleCheckout} className="flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-heading mb-4">Contact Information</h2>
                <Input type="email" placeholder="Email address" required className="bg-white" />
              </div>

              <div>
                <h2 className="text-xl font-heading mb-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="First name" required className="bg-white" />
                  <Input placeholder="Last name" required className="bg-white" />
                  <Input placeholder="Address line 1" required className="col-span-2 bg-white" />
                  <Input placeholder="City" required className="bg-white" />
                  <Input placeholder="Postal code" required className="bg-white" />
                </div>
              </div>
              
              {/* Mock Payment Section */}
              <div>
                <h2 className="text-xl font-heading mb-4">Payment (Mocked)</h2>
                <div className="bg-white p-4 border border-warm-gray/30 flex flex-col gap-4">
                  <p className="text-sm text-warm-gray mb-2">This is a demo store. No real payment will be taken.</p>
                  <Input placeholder="Card number (Mock)" required className="bg-transparent" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="MM/YY" required className="bg-transparent" />
                    <Input placeholder="CVC" required className="bg-transparent" />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                className="w-full uppercase tracking-widest h-14 text-lg mt-4"
                isLoading={isProcessing}
              >
                Pay {formatPrice(subtotal)}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-cream p-8 md:p-12 lg:border-l lg:border-warm-gray/10 sticky top-0 h-fit">
            <h2 className="text-2xl font-heading mb-6">Order Summary</h2>
            
            <div className="flex flex-col gap-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="relative w-16 h-20 bg-blush flex-shrink-0 border border-warm-gray/20 relative">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                    <span className="absolute -top-2 -right-2 bg-charcoal text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading text-lg">{item.name}</h4>
                    <p className="text-xs text-warm-gray">{item.size}</p>
                  </div>
                  <div className="font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-warm-gray/20 pt-6 flex flex-col gap-4">
              <div className="flex justify-between text-warm-gray">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-warm-gray">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-medium text-2xl pt-4 border-t border-warm-gray/20">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
