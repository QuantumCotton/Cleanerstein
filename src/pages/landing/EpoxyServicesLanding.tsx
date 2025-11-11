import LandingPageTemplate from '../../templates/LandingPageTemplate';

export default function EpoxyServicesLanding({ areaId }: { areaId: string }) {
  const serviceDescription = "Premium epoxy services for luxury homes, including garage flooring, kitchen countertops, bathroom surfaces, and custom backsplashes. Our expert craftsmen create stunning, durable surfaces that enhance your property's value while withstanding the demands of coastal living and active lifestyles.";

  const features = [
    "Garage Floor Epoxy Coatings",
    "Custom Kitchen Countertops",
    "Bathroom Vanity & Shower Surfaces",
    "Matching Backsplashes & Accents",
    "Coastal-Resistant Formulations",
    "Custom Colors & Designer Finishes"
  ];

  const painPoints = [
    "Standard surfaces can't withstand coastal humidity",
    "Limited design options for luxury homes",
    "Poor installation leads to peeling and bubbling",
    "Long curing times disrupt home life",
    "Mismatched finishes between kitchen and bath",
    "Low-quality materials don't last in marine environments"
  ];

  const solutions = [
    "Marine-grade epoxy formulations designed for coastal conditions",
    "Unlimited custom colors, patterns, and designer finishes",
    "Professional installation with industry-leading warranties",
    "Fast-curing options to minimize disruption",
    "Perfectly matched surfaces throughout your home",
    "Premium materials proven to withstand humidity and salt air"
  ];

  const beforeAfterImages = [
    {
      before: "https://images.unsplash.com/photo-1584622650111-993a40125645?w=600&q=80",
      after: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80"
    },
    {
      before: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      after: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80"
    }
  ];

  const heroImages: Record<string, string> = {
    datawIsland: "https://images.unsplash.com/photo-1584622650111-993a40125645?w=1920&q=80",
    callawassieIsland: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
    braysIsland: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=80"
  };

  return (
    <LandingPageTemplate
      areaId={areaId}
      serviceType="epoxy-services"
      heroImage={heroImages[areaId] || heroImages.datawIsland}
      serviceDescription={serviceDescription}
      features={features}
      painPoints={painPoints}
      solutions={solutions}
      beforeAfterImages={beforeAfterImages}
    />
  );
}
