/**
 * Bookable experiences for the reservation form + API validation.
 * Kept free of React/UI imports so Route Handlers can import safely.
 */

export interface BookableExperience {
  id: string;
  name: string;
  category: string;
  /** Optional short duration hint shown in the form dropdown */
  duration?: string;
}

export const bookableExperiences: BookableExperience[] = [
  {
    id: 'full-day',
    name: 'Full Day Charter',
    category: 'Yacht Charter',
    duration: '8 hours (10:00 AM - 6:00 PM)',
  },
  {
    id: 'half-day',
    name: 'Half Day Charter',
    category: 'Yacht Charter',
    duration: '4 hours (10:00 AM - 2:00 PM or 3:00 PM - 7:00 PM)',
  },
  {
    id: 'sunset-aperitivo',
    name: 'Sunset Cruise with Aperitif',
    category: 'Yacht Charter',
    duration: '2 hours',
  },
  {
    id: 'sunset-dinner',
    name: 'Sunset Cruise with Dinner',
    category: 'Yacht Charter',
    duration: '2 hours',
  },
  {
    id: 'wedding-car',
    name: 'Wedding Car Rental',
    category: 'Weddings & Ceremonies',
  },
  {
    id: 'luxury-car',
    name: 'Luxury Car',
    category: 'Corporate / Commercial',
  },
  {
    id: 'party-service',
    name: 'Party Service',
    category: 'Events & Celebrations',
  },
];

export const BOOKABLE_EXPERIENCE_NAMES = bookableExperiences.map((e) => e.name);
