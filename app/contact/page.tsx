"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";
import { Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Message sent! We'll get back to you soon.");
    }, 1500);
  };

  return (
    <main className="min-h-screen py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-20 max-w-3xl mx-auto text-center"
        >
          <h1 className="font-heading text-4xl md:text-5xl mb-4">Get in Touch</h1>
          <div className="w-12 h-px bg-gold mb-6" />
          <p className="text-warm-gray text-lg leading-relaxed">
            Whether you have a question about our candles, need help with an order, or simply want to say hello — we'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-10"
          >
            <div>
              <h2 className="font-heading text-2xl mb-6">Visit Our Studio</h2>
              <p className="text-warm-gray leading-relaxed mb-8">
                Our studio is open by appointment for those who'd like to experience our scents in person.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blush flex items-center justify-center flex-shrink-0 mt-1">
                <MapPin className="w-4 h-4 text-gold" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Address</h4>
                <p className="text-warm-gray text-sm leading-relaxed">
                  42 Redchurch Street<br />
                  Shoreditch, London E2 7DP<br />
                  United Kingdom
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blush flex items-center justify-center flex-shrink-0 mt-1">
                <Mail className="w-4 h-4 text-gold" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Email</h4>
                <p className="text-warm-gray text-sm">hello@solenecandle.com</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blush flex items-center justify-center flex-shrink-0 mt-1">
                <Clock className="w-4 h-4 text-gold" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Hours</h4>
                <p className="text-warm-gray text-sm leading-relaxed">
                  Monday – Friday: 9am – 6pm<br />
                  Saturday: 10am – 4pm<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            {isSubmitted ? (
              <div className="bg-blush p-8 md:p-12 text-center h-full flex flex-col justify-center items-center">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mb-6">
                  <Mail className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-heading text-2xl mb-4">Message Sent</h3>
                <p className="text-warm-gray max-w-md">
                  Thank you for reaching out. Our team typically responds within 24 hours during working days.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-blush p-8 md:p-12 flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium uppercase tracking-widest mb-2 block">
                      First Name
                    </label>
                    <Input
                      required
                      placeholder="Your first name"
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium uppercase tracking-widest mb-2 block">
                      Last Name
                    </label>
                    <Input
                      required
                      placeholder="Your last name"
                      className="bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium uppercase tracking-widest mb-2 block">
                    Email
                  </label>
                  <Input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="bg-white"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium uppercase tracking-widest mb-2 block">
                    Subject
                  </label>
                  <Input
                    required
                    placeholder="What is this regarding?"
                    className="bg-white"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium uppercase tracking-widest mb-2 block">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us more..."
                    className="flex w-full border border-warm-gray bg-white px-3 py-2 text-sm placeholder:text-warm-gray/70 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full uppercase tracking-widest mt-2"
                  isLoading={isSubmitting}
                >
                  Send Message
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
