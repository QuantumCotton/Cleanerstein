/**
 * Cleanerstein Brand Constants
 * Central configuration for all branding, contact info, and business details
 */

export const BRAND = {
  name: 'Cleanerstein',
  tagline: 'High Standards. Exceeding Expectations.',
  uniqueValue: 'Professional Cleaning & Pressure Washing - Inside and Outside - All While You Work',
  established: '2017', // 8 years in business
  differentiator: 'We set high standards for ourselves as a challenge and as the reflection of our work ethic. We strive to meet customer\'s needs and exceed expectations.',
  businessName: 'Cleanerstein LLC',
  
  location: {
    city: 'Port Royal',
    state: 'South Carolina',
    stateAbbr: 'SC',
    zip: '29935',
    serviceArea: 'Port Royal and surrounding Lowcountry',
    radiusMiles: 35,
    coverage: 'Port Royal, Beaufort, Lady\'s Island, Hilton Head, Bluffton, and all areas within 35 miles',
    fullAddress: '648A Fort Frederick Circle, Port Royal, SC 29935'
  },
  
  contact: {
    phone: '(843) 986-7677',
    phoneRaw: '8439867677',
    email: 'erikesenaliev@gmail.com',
    emailDisplay: 'info@cleanerstein.com', // Show this publicly
    website: 'https://cleanerstein.com'
  },
  
  services: {
    primary: ['Commercial Cleaning', 'Residential Cleaning', 'Pressure Washing'],
    
    commercial: {
      title: 'Commercial Cleaning',
      description: 'Professional cleaning services for businesses',
      types: [
        'Office Buildings',
        'Retail Spaces',
        'Medical Facilities',
        'Restaurants & Food Service',
        'Warehouses',
        'Educational Facilities'
      ]
    },
    
    residential: {
      title: 'Residential Cleaning',
      description: 'Trusted home cleaning services',
      types: [
        'Regular Maintenance Cleaning',
        'Deep Cleaning',
        'Move In/Move Out Cleaning',
        'Post-Construction Cleaning',
        'Spring Cleaning',
        'Vacation Rental Turnover'
      ]
    },
    
    pressureWashing: {
      title: 'Pressure Washing',
      description: 'Expert exterior cleaning solutions',
      types: [
        'House Washing & Siding',
        'Driveway & Sidewalk Cleaning',
        'Deck & Patio Restoration',
        'Fence Cleaning',
        'Commercial Building Exteriors',
        'Roof Soft Washing'
      ]
    }
  },
  
  colors: {
    primary: '#2563EB',         // Professional Blue
    primaryDark: '#1E40AF',
    secondary: '#10B981',       // Fresh Green
    secondaryDark: '#059669',
    accent: '#F59E0B',          // Amber accent
    accentDark: '#D97706',
    dark: '#1F2937',
    light: '#F9FAFB',
    white: '#FFFFFF'
  },
  
  features: [
    'Licensed & Insured',
    'Eco-Friendly Products',
    'Satisfaction Guaranteed',
    'Same-Day Service Available',
    'Recurring Service Discounts',
    'Free Estimates'
  ],
  
  socialMedia: {
    facebook: 'https://facebook.com/cleanerstein', // TODO: Update with real URLs
    instagram: 'https://instagram.com/cleanerstein',
    twitter: 'https://twitter.com/cleanerstein'
  },
  
  businessHours: {
    weekday: { open: '8:00 AM', close: '6:00 PM' },
    saturday: { open: '9:00 AM', close: '4:00 PM' },
    sunday: 'Closed'
  },
  
  seo: {
    title: 'Cleanerstein - Professional Cleaning & Pressure Washing | Beaufort, SC',
    description: 'Beaufort\'s premier cleaning service. Commercial cleaning, residential cleaning, and pressure washing. Licensed, insured, and eco-friendly. Call (772) 777-0622 for a free quote.',
    keywords: [
      'cleaning services beaufort sc',
      'pressure washing beaufort',
      'commercial cleaning beaufort',
      'residential cleaning beaufort',
      'house cleaning beaufort',
      'office cleaning beaufort',
      'cleanerstein',
      'beaufort cleaning company'
    ]
  }
} as const;

// Service type definitions for TypeScript
export type ServiceType = 'commercial_cleaning' | 'residential_cleaning' | 'pressure_washing';

export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  commercial_cleaning: 'Commercial Cleaning',
  residential_cleaning: 'Residential Cleaning',
  pressure_washing: 'Pressure Washing'
};

// Property type definitions
export type PropertyType = 
  | 'office' 
  | 'retail' 
  | 'medical' 
  | 'restaurant' 
  | 'house' 
  | 'apartment' 
  | 'condo'
  | 'warehouse'
  | 'other';

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  office: 'Office Building',
  retail: 'Retail Space',
  medical: 'Medical Facility',
  restaurant: 'Restaurant',
  house: 'House',
  apartment: 'Apartment',
  condo: 'Condo',
  warehouse: 'Warehouse',
  other: 'Other'
};

// Service frequency options
export type ServiceFrequency = 'one-time' | 'weekly' | 'bi-weekly' | 'monthly' | 'custom';

export const FREQUENCY_LABELS: Record<ServiceFrequency, string> = {
  'one-time': 'One-Time Service',
  'weekly': 'Weekly',
  'bi-weekly': 'Bi-Weekly',
  'monthly': 'Monthly',
  'custom': 'Custom Schedule'
};
