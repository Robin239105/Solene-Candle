"use client";

import { useState } from "react";
import { Product } from "@/types";

export function ProductTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="mt-16 border-t border-warm-gray/20 pt-16">
      <div className="flex gap-8 mb-8 border-b border-warm-gray/20">
        <button
          onClick={() => setActiveTab("details")}
          className={`pb-4 text-sm font-semibold uppercase tracking-widest transition-colors relative ${
            activeTab === "details" ? "text-charcoal" : "text-warm-gray hover:text-charcoal"
          }`}
        >
          Details
          {activeTab === "details" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("shipping")}
          className={`pb-4 text-sm font-semibold uppercase tracking-widest transition-colors relative ${
            activeTab === "shipping" ? "text-charcoal" : "text-warm-gray hover:text-charcoal"
          }`}
        >
          Shipping & Returns
          {activeTab === "shipping" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
          )}
        </button>
      </div>

      <div className="text-warm-gray leading-relaxed max-w-3xl">
        {activeTab === "details" && (
          <div className="animate-in fade-in duration-500 flex flex-col gap-4">
            <p>{product.description || "A luxurious handcrafted candle made with natural soy wax and premium botanical oils."}</p>
            <p><strong>Burn Time:</strong> Approx. 45-50 hours for 200ml.</p>
            <p><strong>Ingredients:</strong> 100% natural soy wax, premium fragrance oils, cotton wick.</p>
            <p><strong>Care:</strong> For the best burn, trim the wick to 5mm before lighting. Never leave a burning candle unattended.</p>
          </div>
        )}
        {activeTab === "shipping" && (
          <div className="animate-in fade-in duration-500 flex flex-col gap-4">
            <p>We offer free standard shipping on all UK orders over £50.</p>
            <p><strong>Standard Delivery (2-3 working days):</strong> £3.95</p>
            <p><strong>Next Day Delivery (Order before 2pm):</strong> £6.95</p>
            <p>If you are not completely satisfied with your purchase, you may return it within 30 days for a full refund or exchange. Items must be unused and in original packaging.</p>
          </div>
        )}
      </div>
    </div>
  );
}
