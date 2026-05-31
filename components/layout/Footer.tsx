"use client";

import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="bg-black text-cream pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="font-heading text-2xl italic tracking-tight">
              Solène Candle
            </Link>
            <p className="text-warm-gray text-sm leading-relaxed">
              Scent is a feeling. Make it yours. Hand-poured luxury candles crafted for the moments that matter.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold uppercase tracking-widest text-sm text-white">Shop</h4>
            <Link href="/shop" className="text-warm-gray hover:text-gold transition-colors text-sm">All Products</Link>
            <Link href="/collections" className="text-warm-gray hover:text-gold transition-colors text-sm">Collections</Link>
            <Link href="/shop?sort=bestseller" className="text-warm-gray hover:text-gold transition-colors text-sm">Bestsellers</Link>
            <Link href="/journal" className="text-warm-gray hover:text-gold transition-colors text-sm">Journal</Link>
            <Link href="/about" className="text-warm-gray hover:text-gold transition-colors text-sm">Our Story</Link>
          </div>

          {/* Help */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold uppercase tracking-widest text-sm text-white">Help</h4>
            <Link href="/faq" className="text-warm-gray hover:text-gold transition-colors text-sm">FAQ</Link>
            <Link href="/contact" className="text-warm-gray hover:text-gold transition-colors text-sm">Contact Us</Link>
            <Link href="/shipping-returns" className="text-warm-gray hover:text-gold transition-colors text-sm">Shipping & Returns</Link>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold uppercase tracking-widest text-sm text-white">Newsletter</h4>
            <p className="text-warm-gray text-sm">Subscribe to receive 10% off your first order.</p>
            <form className="flex mt-2" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent border-warm-gray/30 text-cream rounded-r-none focus:border-gold h-10"
              />
              <Button variant="primary" className="rounded-l-none h-10 px-4">
                Join
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-warm-gray/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-warm-gray text-xs">
            © {new Date().getFullYear()} Solène Candle. All rights reserved. Made with love in London.
          </p>
          <div className="flex gap-4 text-warm-gray text-xs">
            <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
