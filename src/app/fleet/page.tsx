import { buildPageMeta, breadcrumbSchema, productSchema } from '@/lib/seo';
import { FleetShowcase } from '@/components/velox/sections/fleet-showcase';
import { JsonLd } from '@/components/velox/ui/json-ld';
import { cars } from '@/components/velox/data';

export const metadata = buildPageMeta({
  title: 'Fleet',
  description:
    "Discover B LEADER's exclusive collection: Ferrari California T (560HP), Ferrari California (460HP), Maserati Ghibli, Mercedes E220d Cabrio, and Cranchi Atlantique 50 Flybridge yacht. Specs, photos, and pricing.",
  path: '/fleet',
  keywords: [
    'Ferrari driving experience Salento Italy',
    'Ferrari rental Puglia',
    'supercar rental Italy',
    'Maserati Ghibli Salento',
    'luxury car rental Puglia',
    'Cranchi yacht Puglia',
  ],
});

export default function FleetPage() {
  return (
    <>
      {/* Breadcrumb contextual */}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Fleet', path: '/fleet' },
        ])}
      />
      {/* Product schemas por vehículo */}
      {cars.map((car) => (
        <JsonLd
          key={car.name}
          data={productSchema({
            name: `${car.name} — ${car.variant}`,
            brand: car.name.includes('Ferrari')
              ? 'Ferrari'
              : car.name.includes('Maserati')
                ? 'Maserati'
                : car.name.includes('Mercedes')
                  ? 'Mercedes-Benz'
                  : car.name.includes('Cranchi')
                    ? 'Cranchi'
                    : 'B LEADER',
            category: car.name.includes('Cranchi') ? 'Yacht' : 'Car',
            image: car.image,
            pricePerDay: car.price,
            currency: 'EUR',
            description: `${car.name} ${car.variant} — ${car.hp}HP. ${car.tagline}. ${car.keyFeatures}.`,
          })}
        />
      ))}
      <FleetShowcase />
    </>
  );
}
