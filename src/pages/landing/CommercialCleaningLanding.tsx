import LandingPageTemplate from '../../templates/LandingPageTemplate';

export default function CommercialCleaningLanding({ areaId }: { areaId: string }) {
  const serviceDescription = "Professional commercial cleaning services for businesses in exclusive communities. We understand the high standards required for clubhouses, amenities, marinas, and commercial spaces in luxury environments. Our services maintain the pristine appearance that residents and guests expect while respecting the unique atmosphere of your community.";

  const features = [
    "Clubhouse & Amenities Cleaning",
    "Marina & Waterfront Facility Care",
    "Office & Retail Space Maintenance",
    "Health & Safety Compliance",
    "Flexible Off-Hours Scheduling",
    "Community-Specific Cleaning Protocols"
  ];

  const painPoints = [
    "Standard commercial cleaning doesn't meet luxury standards",
    "Poor communication from large cleaning companies",
    "Inconsistent quality between different cleaners",
    "Damage to high-end fixtures and finishes",
    "Cleaning during business hours disrupts operations",
    "Lack of understanding of community-specific needs"
  ];

  const solutions = [
    "Luxury-level cleaning protocols for exclusive communities",
    "Dedicated account manager with instant chat support",
    "Consistent quality with detailed standards and supervision",
    "Trained professionals experienced with high-end facilities",
    "Flexible scheduling including after-hours and weekend service",
    "Customized cleaning plans for your specific community requirements"
  ];

  const beforeAfterImages = [
    {
      before: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
      after: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80"
    },
    {
      before: "https://images.unsplash.com/photo-1580689212442-28c5f6edd3b8?w=600&q=80",
      after: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=600&q=80"
    }
  ];

  const heroImages: Record<string, string> = {
    datawIsland: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80",
    callawassieIsland: "https://images.unsplash.com/photo-1580689212442-28c5f6edd3b8?w=1920&q=80",
    braysIsland: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=1920&q=80"
  };

  return (
    <LandingPageTemplate
      areaId={areaId}
      serviceType="commercial-cleaning"
      heroImage={heroImages[areaId] || heroImages.datawIsland}
      serviceDescription={serviceDescription}
      features={features}
      painPoints={painPoints}
      solutions={solutions}
      beforeAfterImages={beforeAfterImages}
    />
  );
}
