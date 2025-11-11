import LandingPageTemplate from '../../templates/LandingPageTemplate';

export default function PressureWashingLanding({ areaId }: { areaId: string }) {
  const serviceDescription = "Professional pressure washing and soft washing services designed specifically for luxury properties. Our expert team understands the delicate balance between powerful cleaning and protecting your valuable surfaces, from historic exteriors to modern waterfront homes.";

  const features = [
    "Soft Wash Technology for Delicate Surfaces",
    "High-Pressure Cleaning for Tough Stains",
    "Eco-Friendly Cleaning Solutions",
    "Containment Systems for Waterfront Properties",
    "Specialized Equipment for Luxury Homes",
    "Protection for Landscaping and Hardscapes"
  ];

  const painPoints = [
    "Traditional pressure washing damages delicate siding and paint",
    "Salt air and humidity cause rapid mold and mildew growth",
    "Water runoff restrictions in waterfront communities",
    "Slow communication from unreliable contractors",
    "Inconsistent results between different service providers",
    "Damage to expensive landscaping and hardscaping"
  ];

  const solutions = [
    "Advanced soft wash technology cleans gently without damage",
    "Specialized solutions for coastal climate challenges",
    "Containment systems protect waterways and comply with regulations",
    "Instant chat bot and responsive local team communication",
    "Consistent, documented results with before/after photos",
    "Experienced crew trained to protect luxury property investments"
  ];

  const beforeAfterImages = [
    {
      before: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
      after: "https://images.unsplash.com/photo-1600607687936-cea388dcf9c7?w=600&q=80"
    },
    {
      before: "https://images.unsplash.com/photo-1578940533329-98df812cdf4b?w=600&q=80",
      after: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80"
    }
  ];

  const heroImages: Record<string, string> = {
    datawIsland: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    callawassieIsland: "https://images.unsplash.com/photo-1578940533329-98df812cdf4b?w=1920&q=80",
    braysIsland: "https://images.unsplash.com/photo-1600607687936-cea388dcf9c7?w=1920&q=80"
  };

  return (
    <LandingPageTemplate
      areaId={areaId}
      serviceType="pressure-washing"
      heroImage={heroImages[areaId] || heroImages.datawIsland}
      serviceDescription={serviceDescription}
      features={features}
      painPoints={painPoints}
      solutions={solutions}
      beforeAfterImages={beforeAfterImages}
    />
  );
}
