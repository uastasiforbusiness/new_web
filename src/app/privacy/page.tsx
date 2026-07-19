import { buildPageMeta } from '@/lib/seo';
import Link from 'next/link';

export const metadata = buildPageMeta({
  title: 'Privacy Policy',
  description:
    'B LEADER privacy policy explains how we collect, use, and protect your personal data when you book luxury experiences in Salento, Puglia, Italy.',
  path: '/privacy',
  keywords: ['privacy policy B LEADER', 'data protection Salento', 'GDPR Puglia', 'privacy luxury travel Italy'],
});

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[10px] font-heading font-semibold tracking-[0.5em] text-[#c9a96e] mb-4">
            LEGAL
          </p>
          <h1 className="text-3xl sm:text-5xl font-elegant font-light text-white tracking-wide italic">
            Privacy Policy
          </h1>
          <p className="text-[#888] font-body text-sm mt-4">
            Last updated: July 2026
          </p>
        </div>

        <div className="space-y-8 text-[#999] font-body text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-white font-elegant text-xl sm:text-2xl mb-3">1. Who We Are</h2>
            <p>
              B LEADER (operated by B LEADER SRLS, based in Lecce, Puglia, Italy) is a luxury experience
              curator offering Ferrari driving experiences, private yacht charters, and premium concierge
              services in Salento, Southern Italy.
            </p>
            <p className="mt-3">
              For privacy-related inquiries, contact us at{' '}
              <a href="mailto:info@bleaderitaly.com" className="text-[#c9a96e] hover:underline">
                info@bleaderitaly.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-white font-elegant text-xl sm:text-2xl mb-3">2. Data We Collect</h2>
            <p>When you submit a reservation request or contact us, we collect:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Preferred experience dates</li>
              <li>Experience preferences and special requests (message content)</li>
            </ul>
            <p className="mt-3">
              We also collect technical data automatically: IP address, browser type, referring
              URLs, and page interaction data via Cloudflare and our hosting platform for
              analytics, security, and rate-limiting purposes.
            </p>
          </section>

          <section>
            <h2 className="text-white font-elegant text-xl sm:text-2xl mb-3">3. How We Use Your Data</h2>
            <p>We use your personal data exclusively for:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Processing and responding to reservation requests</li>
              <li>Sending booking confirmations and experience-related communications</li>
              <li>Customer support via email, WhatsApp, or phone</li>
              <li>Improving our services and website experience</li>
              <li>Legal compliance and fraud prevention</li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> sell, rent, or share your data with third parties for
              their own marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-white font-elegant text-xl sm:text-2xl mb-3">4. Legal Basis (GDPR)</h2>
            <p>
              Under the General Data Protection Regulation (GDPR), we process your data based on:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <strong>Consent:</strong> You explicitly agree when checking the consent box
                on our reservation form
              </li>
              <li>
                <strong>Contractual necessity:</strong> Processing is required to fulfill your
                booking request
              </li>
              <li>
                <strong>Legitimate interest:</strong> Fraud prevention, website security, and
                service improvement
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-elegant text-xl sm:text-2xl mb-3">5. Data Retention</h2>
            <p>
              We retain your reservation data for the duration necessary to fulfill your booking
              and for up to 24 months thereafter for legal and accounting obligations. Chat
              messages are retained for the duration of the conversation plus 12 months.
            </p>
          </section>

          <section>
            <h2 className="text-white font-elegant text-xl sm:text-2xl mb-3">6. Data Sharing</h2>
            <p>We may share your data with:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <strong>Service providers:</strong> Cloudflare (hosting, CDN, D1 database),
                Resend (email delivery), Meta / WhatsApp Cloud API (messaging)
              </li>
              <li>
                <strong>Legal authorities:</strong> When required by applicable law
              </li>
            </ul>
            <p className="mt-3">
              All processors are GDPR-compliant and bound by data processing agreements.
            </p>
          </section>

          <section>
            <h2 className="text-white font-elegant text-xl sm:text-2xl mb-3">7. Your Rights</h2>
            <p>Under GDPR, you have the right to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Access your personal data</li>
              <li>Rectify inaccurate data</li>
              <li>Erase your data (right to be forgotten)</li>
              <li>Restrict processing</li>
              <li>Data portability</li>
              <li>Object to processing</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, email{' '}
              <a href="mailto:info@bleaderitaly.com" className="text-[#c9a96e] hover:underline">
                info@bleaderitaly.com
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-white font-elegant text-xl sm:text-2xl mb-3">8. Cookies</h2>
            <p>
              This website uses essential cookies required for proper operation (session
              management, security, and load balancing). We do not use marketing or
              tracking cookies. Cloudflare may set performance cookies necessary for
              CDN functionality.
            </p>
          </section>

          <section>
            <h2 className="text-white font-elegant text-xl sm:text-2xl mb-3">9. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your
              data, including TLS encryption, rate limiting, CSRF protection, and access
              controls on our Cloudflare Workers infrastructure.
            </p>
          </section>

          <section>
            <h2 className="text-white font-elegant text-xl sm:text-2xl mb-3">10. International Transfers</h2>
            <p>
              Your data may be processed on servers located in the European Union and the
              United States. When data is transferred outside the EEA, we ensure adequate
              safeguards (Standard Contractual Clauses) are in place.
            </p>
          </section>

          <section>
            <h2 className="text-white font-elegant text-xl sm:text-2xl mb-3">11. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. Material changes will be
              communicated via email or a notice on our website. The &ldquo;Last updated&rdquo;
              date at the top reflects the latest revision.
            </p>
          </section>

          <section>
            <h2 className="text-white font-elegant text-xl sm:text-2xl mb-3">12. Contact &amp; Supervisory Authority</h2>
            <p>
              If you have concerns about our data practices, contact us at{' '}
              <a href="mailto:info@bleaderitaly.com" className="text-[#c9a96e] hover:underline">
                info@bleaderitaly.com
              </a>
              . You also have the right to lodge a complaint with the Italian Data Protection
              Authority (Garante per la Protezione dei Dati Personali).
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
