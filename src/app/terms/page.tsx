import { buildPageMeta } from '@/lib/seo';
import Link from 'next/link';

export const metadata = buildPageMeta({
  title: 'Terms & Conditions',
  description:
    'B LEADER terms and conditions for luxury Ferrari driving experiences, private yacht charters, and concierge services in Salento, Puglia, Italy.',
  path: '/terms',
  keywords: ['terms and conditions B LEADER', 'booking terms Salento', 'luxury experience Italy terms', 'Ferrari rental conditions'],
});

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[10px] font-heading font-semibold tracking-[0.5em] text-[#c9a96e] mb-4">
            LEGAL
          </p>
          <h1 className="text-3xl sm:text-5xl font-elegant font-light text-white tracking-wide italic">
            Terms &amp; Conditions
          </h1>
          <p className="text-[#888] font-body text-sm mt-4">
            Last updated: July 2026
          </p>
        </div>

        <div className="space-y-8 text-[#999] font-body text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-white font-elegant text-xl sm:text-2xl mb-3">1. Booking &amp; Reservation</h2>
            <p>
              Submitting a reservation request through our website constitutes an inquiry,
              not a confirmed booking. B LEADER will confirm availability and send a
              formal quote via email within 48 hours.
            </p>
            <p className="mt-3">
              A booking is confirmed only after we have received a deposit or full payment
              (as specified in the quote) and issued a confirmation notice.
            </p>
          </section>

          <section>
            <h2 className="text-white font-elegant text-xl sm:text-2xl mb-3">2. Pricing &amp; Payment</h2>
            <p>
              All prices are quoted in euros (EUR) and include applicable taxes (IVA/VAT)
              unless otherwise stated. Payment methods include credit card (Visa,
              Mastercard, American Express) and bank transfer.
            </p>
            <p className="mt-3">
              Prices are subject to seasonal variation as noted on our website. Final
              pricing is confirmed at the time of booking confirmation.
            </p>
          </section>

          <section>
            <h2 className="text-white font-elegant text-xl sm:text-2xl mb-3">3. Cancellation Policy</h2>
            <p>
              Cancellation terms vary by experience type and are communicated at the time
              of quote. As a general guideline:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>More than 14 days before the experience: full refund less processing fees</li>
              <li>7&ndash;14 days before: 50% refund</li>
              <li>Less than 7 days before: no refund</li>
            </ul>
            <p className="mt-3">
              Weather-related cancellations (for yacht experiences) are handled at the
              captain&apos;s discretion and may be rescheduled at no additional cost.
            </p>
          </section>

          <section>
            <h2 className="text-white font-elegant text-xl sm:text-2xl mb-3">4. Driver Requirements</h2>
            <p>
              To drive a Ferrari or any vehicle in our fleet, you must:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Hold a valid full driving license (international driving permit recommended for non-EU license holders)</li>
              <li>Be at least 25 years of age (exceptions may apply with prior approval)</li>
              <li>Not be under the influence of alcohol or drugs</li>
            </ul>
            <p className="mt-3">
              B LEADER reserves the right to refuse the keys to any driver who appears
              unfit, without refund.
            </p>
          </section>

          <section>
            <h2 className="text-white font-elegant text-xl sm:text-2xl mb-3">5. Insurance &amp; Liability</h2>
            <p>
              Each vehicle is insured for third-party liability as required by Italian law.
              Comprehensive insurance with a deductible is included; the deductible amount
              is communicated at booking. Damage caused by negligence or violation of
              Italian traffic laws is the driver&apos;s financial responsibility.
            </p>
            <p className="mt-3">
              Yacht experiences include skipper services; the captain is fully insured and
              licensed. Guests assume normal maritime risks.
            </p>
          </section>

          <section>
            <h2 className="text-white font-elegant text-xl sm:text-2xl mb-3">6. Conduct</h2>
            <p>
              Guests are expected to behave respectfully toward staff, vehicles, and the
              environment. B LEADER reserves the right to terminate any experience without
              refund if a guest&apos;s behavior is deemed unsafe, disrespectful, or
              damaging to our reputation.
            </p>
          </section>

          <section>
            <h2 className="text-white font-elegant text-xl sm:text-2xl mb-3">7. Force Majeure</h2>
            <p>
              B LEADER is not liable for delays or cancellations caused by events beyond
              our reasonable control, including but not limited to: extreme weather,
              natural disasters, strikes, road closures, government restrictions, or
              mechanical failures. In such cases, we will make every effort to reschedule
              or provide a fair partial refund.
            </p>
          </section>

          <section>
            <h2 className="text-white font-elegant text-xl sm:text-2xl mb-3">8. Intellectual Property</h2>
            <p>
              All content on this website&mdash;text, images, logos, videos&mdash;is the
              property of B LEADER unless otherwise credited. You may not reproduce,
              distribute, or use our content without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-white font-elegant text-xl sm:text-2xl mb-3">9. Governing Law</h2>
            <p>
              These terms are governed by Italian law. Any disputes shall be subject to
              the exclusive jurisdiction of the courts of Lecce, Italy.
            </p>
          </section>

          <section>
            <h2 className="text-white font-elegant text-xl sm:text-2xl mb-3">10. Contact</h2>
            <p>
              For questions about these terms, please contact us at{' '}
              <a href="mailto:info@bleaderitaly.com" className="text-[#c9a96e] hover:underline">
                info@bleaderitaly.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-[#222]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] font-heading tracking-[0.25em] text-[#c9a96e] hover:text-[#d4af37] transition-colors duration-300"
          >
            ← BACK TO HOME
          </Link>
        </div>
      </div>
    </main>
  );
}
