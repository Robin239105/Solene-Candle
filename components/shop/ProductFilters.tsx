"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const filters = {
  collections: ["Floral", "Dark & Moody", "Fresh & Clean", "Warm & Cosy"],
  sizes: ["100ml", "200ml", "300ml"],
};

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openSection, setOpenSection] = useState<string | null>("collections");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get(key);
    
    if (current === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full">
      <div className="mb-6 hidden md:block">
        <h3 className="font-heading text-xl mb-4">Filters</h3>
      </div>
      
      <div className="border-t border-warm-gray/20">
        {/* Collections Filter */}
        <div className="py-4 border-b border-warm-gray/20">
          <button 
            className="flex items-center justify-between w-full text-left"
            onClick={() => toggleSection("collections")}
          >
            <span className="font-medium uppercase tracking-wider text-sm">Collection</span>
            {openSection === "collections" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {openSection === "collections" && (
            <div className="mt-4 flex flex-col gap-3">
              {filters.collections.map((collection) => {
                const isActive = searchParams.get("collection") === collection;
                return (
                  <label key={collection} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${isActive ? 'bg-gold border-gold' : 'border-warm-gray/50 group-hover:border-charcoal'}`}>
                      {isActive && <div className="w-2 h-2 bg-white" />}
                    </div>
                    <span className={`text-sm ${isActive ? 'text-charcoal font-medium' : 'text-warm-gray'}`}>
                      {collection}
                    </span>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={isActive}
                      onChange={() => handleFilter("collection", collection)} 
                    />
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Sizes Filter */}
        <div className="py-4 border-b border-warm-gray/20">
          <button 
            className="flex items-center justify-between w-full text-left"
            onClick={() => toggleSection("sizes")}
          >
            <span className="font-medium uppercase tracking-wider text-sm">Size</span>
            {openSection === "sizes" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {openSection === "sizes" && (
            <div className="mt-4 flex flex-col gap-3">
              {filters.sizes.map((size) => {
                const isActive = searchParams.get("size") === size;
                return (
                  <label key={size} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${isActive ? 'bg-gold border-gold' : 'border-warm-gray/50 group-hover:border-charcoal'}`}>
                      {isActive && <div className="w-2 h-2 bg-white" />}
                    </div>
                    <span className={`text-sm ${isActive ? 'text-charcoal font-medium' : 'text-warm-gray'}`}>
                      {size}
                    </span>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={isActive}
                      onChange={() => handleFilter("size", size)} 
                    />
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
