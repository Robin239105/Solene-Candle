import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full">
        <input
          ref={ref}
          className={cn(
            "flex h-11 w-full border border-warm-gray bg-transparent px-3 py-2 text-sm placeholder:text-warm-gray/70 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
