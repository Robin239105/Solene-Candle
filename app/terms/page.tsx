"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <main className="min-h-screen py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <h1 className="font-heading text-4xl md:text-5xl mb-4">Terms & Conditions</h1>
          <div className="w-12 h-px bg-gold mb-6" />
          <p className="text-warm-gray">Last updated: 1 June 2026</p>
        </motion.div>

        <div className="flex flex-col gap-10 text-warm-gray leading-[1.85]">
          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-4">1. General</h2>
            <p>These terms and conditions govern your use of the Solène Candle website (solenecandle.com) and any purchases made through it. By placing an order, you agree to be bound by these terms. We reserve the right to update these terms at any time. Changes take effect immediately upon publication.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-4">2. Products & Pricing</h2>
            <p className="mb-4">All product descriptions, images, and prices are as accurate as possible. However:</p>
            <ul className="flex flex-col gap-2 pl-4">
              <li className="flex items-start gap-2"><span className="text-gold">•</span> Colours may vary slightly due to screen settings and photography.</li>
              <li className="flex items-start gap-2"><span className="text-gold">•</span> As each candle is hand-poured, minor variations in appearance are natural and part of the artisanal process.</li>
              <li className="flex items-start gap-2"><span className="text-gold">•</span> Prices are listed in GBP and include VAT where applicable.</li>
              <li className="flex items-start gap-2"><span className="text-gold">•</span> We reserve the right to amend prices without prior notice. Orders placed before a price change will be honoured at the original price.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-4">3. Orders & Payment</h2>
            <p className="mb-4">By placing an order, you warrant that you are at least 18 years of age and that the information you provide is accurate.</p>
            <p className="mb-4">We accept Visa, Mastercard, American Express, and Apple Pay. Payment is taken at the point of order.</p>
            <p>We reserve the right to refuse or cancel any order at our discretion, including suspected fraudulent orders. In such cases, a full refund will be issued.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-4">4. Shipping & Delivery</h2>
            <p>Delivery times are estimates and not guaranteed. We are not liable for delays caused by third-party carriers, customs, or circumstances beyond our control. Please see our <a href="/shipping-returns" className="text-gold hover:underline">Shipping & Returns</a> page for full details.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-4">5. Returns & Refunds</h2>
            <p>We offer a 30-day return policy for unused items in their original packaging. For complete details on how to initiate a return, please visit our <a href="/shipping-returns" className="text-gold hover:underline">Shipping & Returns</a> page.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-4">6. Candle Safety</h2>
            <div className="bg-blush p-6">
              <p className="text-sm mb-4 text-charcoal font-medium">Please observe the following safety guidelines:</p>
              <ul className="flex flex-col gap-2 text-sm pl-4">
                <li className="flex items-start gap-2"><span className="text-gold">•</span> Never leave a burning candle unattended.</li>
                <li className="flex items-start gap-2"><span className="text-gold">•</span> Keep away from children, pets, and flammable materials.</li>
                <li className="flex items-start gap-2"><span className="text-gold">•</span> Place on a stable, heat-resistant surface.</li>
                <li className="flex items-start gap-2"><span className="text-gold">•</span> Trim the wick to 5mm before each use.</li>
                <li className="flex items-start gap-2"><span className="text-gold">•</span> Do not burn for more than 4 hours at a time.</li>
                <li className="flex items-start gap-2"><span className="text-gold">•</span> Stop use when 10mm of wax remains at the bottom.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-4">7. Intellectual Property</h2>
            <p>All content on this website — including text, images, logos, and product designs — is the property of Solène Candle and is protected by copyright law. Reproduction without written permission is prohibited.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-4">8. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, Solène Candle shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our maximum liability shall not exceed the purchase price of the product in question.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-4">9. Governing Law</h2>
            <p>These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the English courts.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-4">10. Contact</h2>
            <p>For any questions regarding these terms, please contact us at <strong className="text-charcoal">hello@solenecandle.com</strong>.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
