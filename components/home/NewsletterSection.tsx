"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <section className="py-24 bg-blush">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-4xl md:text-5xl mb-6">Join the inner circle</h2>
          <p className="text-warm-gray text-lg mb-10 max-w-xl mx-auto">
            Get 10% off your first order when you sign up. Plus, be the first to know about new collections and exclusive offers.
          </p>
          
          {status === "success" ? (
            <div className="bg-cream p-6 border border-gold/30">
              <p className="font-heading text-2xl text-gold">Thank you for subscribing!</p>
              <p className="text-warm-gray mt-2 text-sm">Check your inbox for your 10% off code.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-cream border-warm-gray/30 h-12"
                required
              />
              <Button 
                type="submit" 
                variant="primary" 
                className="h-12 w-full sm:w-auto px-8"
                isLoading={status === "loading"}
              >
                Subscribe
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
