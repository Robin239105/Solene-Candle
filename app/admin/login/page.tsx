"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAdmin } from "@/app/actions/adminActions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    try {
      const result = await loginAdmin(formData);
      if (result.success) {
        toast.success("Welcome back, Administrator!");
        router.push("/admin");
        router.refresh();
      } else {
        setError(result.error || "Invalid credentials");
        toast.error(result.error || "Invalid credentials");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      toast.error("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md bg-white border border-warm-gray/20 rounded-lg p-8 md:p-10 shadow-sm flex flex-col gap-8">
        {/* Brand Header */}
        <div className="text-center flex flex-col gap-2">
          <Link href="/" className="font-heading text-3xl italic tracking-tight hover:opacity-80 transition-opacity">
            Solène Candle
          </Link>
          <h1 className="text-xl font-medium text-charcoal mt-2">Admin Portal</h1>
          <p className="text-xs text-warm-gray">
            Authenticate to manage products, orders, and collections
          </p>
        </div>

        {/* Error Callout */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-md p-3 text-sm text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider">
              Email Address
            </label>
            <Input
              type="email"
              name="email"
              placeholder="admin@solenecandle.com"
              required
              className="bg-white border-warm-gray/30 h-12"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider">
              Password
            </label>
            <Input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="bg-white border-warm-gray/30 h-12"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full h-12 mt-4 uppercase tracking-widest text-sm"
            isLoading={isPending}
          >
            Sign In
          </Button>
        </form>
      </div>
    </main>
  );
}
