"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Truck, RotateCcw, Package, Clock, ShieldCheck, Globe } from "lucide-react";

export default function ShippingReturnsPage() {
  return (
    <main className="min-h-screen py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-20 text-center"
        >
          <h1 className="font-heading text-4xl md:text-5xl mb-4">Shipping & Returns</h1>
          <div className="w-12 h-px bg-gold mb-6" />
          <p className="text-warm-gray text-lg max-w-2xl">
            We want every Solène experience to be exceptional — from the moment you order to the moment you light your candle.
          </p>
        </motion.div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
          {[
            { icon: Truck, title: "Free Over £50", desc: "Complimentary UK shipping on orders over £50" },
            { icon: Clock, title: "2-3 Days", desc: "Standard UK delivery in 2-3 working days" },
            { icon: RotateCcw, title: "30-Day Returns", desc: "Hassle-free returns within 30 days" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-blush p-8 text-center flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-gold/10 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-heading text-xl mb-2">{item.title}</h3>
              <p className="text-warm-gray text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Shipping Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <Package className="w-5 h-5 text-gold" />
            <h2 className="font-heading text-3xl">Shipping Information</h2>
          </div>

          <div className="bg-blush p-1 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-charcoal text-cream">
                  <th className="text-left py-3 px-4 font-medium uppercase tracking-widest text-xs">Method</th>
                  <th className="text-left py-3 px-4 font-medium uppercase tracking-widest text-xs">Time</th>
                  <th className="text-left py-3 px-4 font-medium uppercase tracking-widest text-xs">Cost</th>
                </tr>
              </thead>
              <tbody className="bg-warm-white">
                <tr className="border-b border-warm-gray/10">
                  <td className="py-4 px-4 font-medium">Standard UK</td>
                  <td className="py-4 px-4 text-warm-gray">2–3 working days</td>
                  <td className="py-4 px-4 text-warm-gray">£3.95 (Free over £50)</td>
                </tr>
                <tr className="border-b border-warm-gray/10">
                  <td className="py-4 px-4 font-medium">Next Day UK</td>
                  <td className="py-4 px-4 text-warm-gray">Next working day (order by 2pm)</td>
                  <td className="py-4 px-4 text-warm-gray">£6.95</td>
                </tr>
                <tr className="border-b border-warm-gray/10">
                  <td className="py-4 px-4 font-medium">Europe</td>
                  <td className="py-4 px-4 text-warm-gray">5–7 working days</td>
                  <td className="py-4 px-4 text-warm-gray">£9.95 (Free over £100)</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Rest of World</td>
                  <td className="py-4 px-4 text-warm-gray">7–14 working days</td>
                  <td className="py-4 px-4 text-warm-gray">£14.95 (Free over £150)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 text-warm-gray leading-relaxed">
            <p>All orders are processed within 1–2 working days. You&apos;ll receive a confirmation email with tracking information once your order has been dispatched.</p>
            <p>During peak periods (such as holiday seasons), delivery times may be slightly longer. We always recommend ordering early for gifts.</p>
            <p className="flex items-start gap-2">
              <Globe className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
              <span>Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the recipient.</span>
            </p>
          </div>
        </motion.section>

        {/* Returns Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <RotateCcw className="w-5 h-5 text-gold" />
            <h2 className="font-heading text-3xl">Returns & Exchanges</h2>
          </div>

          <div className="flex flex-col gap-6 text-warm-gray leading-relaxed">
            <p>We want you to love every Solène product. If for any reason you&apos;re not completely satisfied, we&apos;re here to help.</p>

            <div className="bg-blush p-6">
              <h4 className="font-medium text-charcoal mb-3">30-Day Return Policy</h4>
              <ul className="flex flex-col gap-2 text-sm">
                <li className="flex items-start gap-2"><span className="text-gold mt-0.5">•</span> Items must be unused, in their original packaging, and returned within 30 days of delivery.</li>
                <li className="flex items-start gap-2"><span className="text-gold mt-0.5">•</span> Personalised or engraved items cannot be returned unless faulty.</li>
                <li className="flex items-start gap-2"><span className="text-gold mt-0.5">•</span> Return shipping costs are the responsibility of the customer unless the item is defective.</li>
                <li className="flex items-start gap-2"><span className="text-gold mt-0.5">•</span> Refunds are processed within 5–7 working days of receiving the returned item.</li>
              </ul>
            </div>

            <div className="bg-blush p-6">
              <h4 className="font-medium text-charcoal mb-3">Damaged or Defective Items</h4>
              <p className="text-sm">If your order arrives damaged or defective, please contact us within 48 hours at <strong className="text-charcoal">hello@solenecandle.com</strong> with a photograph. We&apos;ll arrange a replacement immediately — no need to return the damaged item.</p>
            </div>

            <div className="bg-blush p-6">
              <h4 className="font-medium text-charcoal mb-3">How to Initiate a Return</h4>
              <ol className="flex flex-col gap-2 text-sm list-decimal pl-4">
                <li>Email us at <strong className="text-charcoal">hello@solenecandle.com</strong> with your order number.</li>
                <li>We&apos;ll send you a return authorisation and shipping label.</li>
                <li>Pack the item securely in its original packaging.</li>
                <li>Drop it off at your nearest post office.</li>
              </ol>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-charcoal text-cream p-12"
        >
          <ShieldCheck className="w-8 h-8 mx-auto mb-4 text-gold" />
          <h3 className="font-heading text-2xl mb-3">Need Help?</h3>
          <p className="text-warm-gray mb-6 max-w-md mx-auto">Our team is here Monday–Friday, 9am–6pm. We typically respond within a few hours.</p>
          <Link href="/contact" className="inline-block bg-gold text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-gold-light transition-colors">
            Contact Us
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
