import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "new" | "bestseller" | "sale";
}

export function Badge({ className, variant = "new", children, ...props }: BadgeProps) {
  const variants = {
    new: "bg-blush text-charcoal",
    bestseller: "bg-gold text-white",
    sale: "bg-red-500 text-white",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-none px-2.5 py-0.5 text-xs font-semibold font-body tracking-wider uppercase",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
