"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <h1 className="font-heading text-4xl md:text-5xl mb-4">Privacy Policy</h1>
          <div className="w-12 h-px bg-gold mb-6" />
          <p className="text-warm-gray">Last updated: 1 June 2026</p>
        </motion.div>

        <div className="flex flex-col gap-10 text-warm-gray leading-[1.85]">
          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-4">1. Introduction</h2>
            <p>Solène Candle (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you visit our website or make a purchase.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-4">2. Information We Collect</h2>
            <p className="mb-4">We collect the following types of information:</p>
            <ul className="flex flex-col gap-2 pl-4">
              <li className="flex items-start gap-2"><span className="text-gold">•</span> <strong className="text-charcoal">Personal details:</strong> Name, email address, shipping address, and phone number when you place an order.</li>
              <li className="flex items-start gap-2"><span className="text-gold">•</span> <strong className="text-charcoal">Payment information:</strong> Processed securely through our payment provider. We never store full card details.</li>
              <li className="flex items-start gap-2"><span className="text-gold">•</span> <strong className="text-charcoal">Browsing data:</strong> Pages visited, time spent, and device information via cookies and analytics tools.</li>
              <li className="flex items-start gap-2"><span className="text-gold">•</span> <strong className="text-charcoal">Communication data:</strong> Any messages you send to us via email or our contact form.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-4">3. How We Use Your Information</h2>
            <ul className="flex flex-col gap-2 pl-4">
              <li className="flex items-start gap-2"><span className="text-gold">•</span> To process and fulfil your orders.</li>
              <li className="flex items-start gap-2"><span className="text-gold">•</span> To send order confirmations, shipping updates, and delivery notifications.</li>
              <li className="flex items-start gap-2"><span className="text-gold">•</span> To respond to enquiries and provide customer support.</li>
              <li className="flex items-start gap-2"><span className="text-gold">•</span> To send marketing emails (only with your explicit consent).</li>
              <li className="flex items-start gap-2"><span className="text-gold">•</span> To improve our website experience through anonymised analytics.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-4">4. Cookies</h2>
            <p>We use essential cookies to enable core website functionality (e.g., your shopping cart). We also use analytics cookies to understand how visitors use our site. You can manage your cookie preferences through your browser settings at any time.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-4">5. Data Sharing</h2>
            <p>We do not sell your personal data. We share information only with trusted third parties necessary to operate our business, including our payment processor, shipping provider, and email service. All partners are bound by data protection agreements.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-4">6. Data Retention</h2>
            <p>We retain your personal data for as long as necessary to provide our services and fulfil legal obligations. Order data is retained for 6 years for accounting purposes. You may request deletion of your data at any time.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-4">7. Your Rights</h2>
            <p className="mb-4">Under GDPR, you have the right to:</p>
            <ul className="flex flex-col gap-2 pl-4">
              <li className="flex items-start gap-2"><span className="text-gold">•</span> Access the personal data we hold about you.</li>
              <li className="flex items-start gap-2"><span className="text-gold">•</span> Request correction of inaccurate data.</li>
              <li className="flex items-start gap-2"><span className="text-gold">•</span> Request deletion of your data.</li>
              <li className="flex items-start gap-2"><span className="text-gold">•</span> Withdraw consent for marketing communications at any time.</li>
              <li className="flex items-start gap-2"><span className="text-gold">•</span> Lodge a complaint with the Information Commissioner&apos;s Office (ICO).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-4">8. Contact Us</h2>
            <p>If you have any questions about this policy, please contact us at <strong className="text-charcoal">hello@solenecandle.com</strong> or write to us at 42 Redchurch Street, Shoreditch, London E2 7DP.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
