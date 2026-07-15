import { buildPageMeta, breadcrumbSchema } from '@/lib/seo';
import Link from 'next/link';
import { JsonLd } from '@/components/velox/ui/json-ld';

export const metadata = buildPageMeta({
  title: 'Salento, Puglia — Travel Guide & Experiences',
  description: 'Your complete guide to Salento, Puglia. Find information about local attractions, experiences, and how to get there for an unforgettable Italian vacation in Southern Italy.',
  path: '/locations/salento',
  keywords: [
    'Salento travel guide',
    'Puglia itinerary',
    'Southern Italy travel',
    'Salento attractions',
    ' Puglia vacation',
    'travel planning Puglia',
  ],
});

export default function SalentoLocationPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Salento', path: '/locations/salento' },
        ])}
      />
      <div className="py-20 bg-[#0a0a0a] min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-elegant font-light text-white mb-8">Salento, Puglia Travel Guide</h1>
          
          <div className="bg-gradient-to-r from-[#c9a96e]/10 to-transparent border border-[#c9a96e]/20 rounded-lg p-8 mb-12">
            <p className="text-[#c9a96e] font-heading text-sm uppercase tracking-wider mb-4">Travel Planning</p>
            <p className="text-[#888] leading-relaxed mb-4">
              Discover Salento (a.k.a. the <strong>heel of Italy</strong>) in Southern Puglia. This pristine coastline offers crystal-clear waters, dramatic cliffs, and authentic Italian culture with luxury experiences including private yacht charters and Ferrari driving tours along the Adriatic coast.
            </p>
            <p className="text-[#888] leading-relaxed">
              Located in the Taranto province of Apulia region, Salento offers a perfect blend of Mediterranean beauty and Italian authenticity.
            </p>
          </div>

          {/* Opening Section with Key Experiences */}
          <section className="mb-16">
            <h2 className="text-3xl font-elegant text-[#c9a96e] mb-8">Essential Experiences</h2>
            <div className="grid gap-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-[#c9a96e]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-[#c9a96e] font-bold text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-elegant text-white mb-2">🏖️ Luxury Beach & Coastal Experiences</h3>
                  <p className="text-[#888] leading-relaxed mb-2">
                    <strong>Crystal Waters & Pristine Beaches:</strong> Salento boasts some of Italy's most beautiful coastline, including <em>Fiordimare beach near Tricase</em>, the <em>white sand beaches of Gallipoli</em>, and the <em>crystalline waters of Porto Cesareo.</em>
                  </p>
                  <p className="text-[#888] leading-relaxed">
                    <strong>Luxury Yacht Charters Available:</strong> Book a private sailing experience or enjoy sunset cocktails on board our luxury Cranchi yacht fleet departing from Gallipoli and Porto Cesareo.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-[#c9a96e]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-[#c9a96e] font-bold text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-elegant text-white mb-2">🚗 Premium Ferrari Driving Tours</h3>
                  <p className="text-[#888] leading-relaxed mb-2">
                    <strong>Drive Ferrari along the Adriatic Coast:</strong> Experience the thrill of driving a Ferrari along Italy's most scenic coastal routes, with professional driver or license-included options.
                  </p>
                  <p className="text-[#888] leading-relaxed">
                    <strong>Itinerary Options:</strong> From Gallipoli to Otranto, covering spectacular cliff-side roads and historic towns along the Apulian coast.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-[#c9a96e]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-[#c9a96e] font-bold text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-elegant text-white mb-2">🏛️ Cultural & Historical Highlights</h3>
                  <p className="text-[#888] leading-relaxed mb-2">
                    <strong>Baroque Architecture & Heritage Sites:</strong> <em>Lecce</em> (known as "Florence of the South") features stunning Baroque architecture, while <em>Galipoli</em> offers medieval charm and coastal fortifications.
                  </p>
                  <p className="text-[#888] leading-relaxed">
                    <strong>Lost Landmarks to Explore:</strong> Various archaeological sites and hidden gems throughout the region waiting to be discovered.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-[#c9a96e]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-[#c9a96e] font-bold text-xl">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-elegant text-white mb-2">🌊 Transportation & Getting There</h3>
                  <p className="text-[#888] leading-relaxed mb-2">
                    <strong>Airport Access:</strong> Most convenient departure points for luxury experiences are from Brindisi Airport, just 45 minutes drive to Salento.
                  </p>
                  <p className="text-[#888] leading-relaxed">
                    <strong>Road Trip Routes:</strong> Scenic drives from Rome (8 hours) or Naples (6 hours) via the SS7 State Road along the Ionian and Adriatic coasts.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="bg-[#0d0d0d] border border-[#c9a96e]/20 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-elegant text-white mb-4">Ready to Experience Salento?</h3>
            <p className="text-[#888] mb-6">Your perfect luxury experience awaits - book your Ferrari driving tour or yacht charter today</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/fleet"
                className="bg-[#c9a96e] text-[#0a0a0a] px-8 py-3 font-heading font-semibold uppercase tracking-wider hover:bg-[#bd8a4d] transition-colors duration-300 rounded"
              >
                Book Ferrari Experience
              </Link>
              <Link 
                href="/yacht"
                className="border border-[#c9a96e] text-[#c9a96e] px-8 py-3 font-heading font-semibold uppercase tracking-wider hover:bg-[#c9a96e]/10 transition-colors duration-300 rounded"
              >
                Yacht Charter Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}