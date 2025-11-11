import LandingPageTemplate from '../../templates/LandingPageTemplate';

export default function MobileDetailingLanding({ areaId }: { areaId: string }) {
  const serviceDescription = "Premium mobile auto detailing service that comes directly to your home in exclusive communities. We specialize in luxury vehicles, understanding that your cars deserve the same level of care as your property. From daily drivers to collector vehicles, we bring showroom quality to your driveway.";

  const features = [
    "Mobile Service - We Come to You",
    "Luxury Vehicle Specialization",
    "Paint Protection and Ceramic Coating",
    "Interior Deep Cleaning & Conditioning",
    "Salt Air Protection Treatments",
    "Flexible Scheduling for Busy Lifestyles"
  ];

  const painPoints = [
    "Driving to detailing shops wastes valuable time",
    "Salt air and humidity damage vehicle exteriors",
    "Inconsistent quality from different detailers",
    "Long wait times and poor communication",
    "Damage to luxury vehicle finishes",
    "Limited services for exotic and classic cars"
  ];

  const solutions = [
    "We bring professional detailing to your driveway",
    "Specialized coastal protection treatments for salt air",
    "Consistent, documented results every time",
    "Instant booking and real-time communication",
    "Trained technicians experienced with luxury vehicles",
    "Full range of services for all vehicle types"
  ];

  const beforeAfterImages = [
    {
      before: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80",
      after: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80"
    },
    {
      before: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80",
      after: "https://images.unsplash.com/photo-1606664535554-31160c27a1a1?w=600&q=80"
    }
  ];

  const heroImages: Record<string, string> = {
    datawIsland: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80",
    callawassieIsland: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&q=80",
    braysIsland: "https://images.unsplash.com/photo-1606664535554-31160c27a1a1?w=1920&q=80"
  };

  return (
    <LandingPageTemplate
      areaId={areaId}
      serviceType="mobile-detailing"
      heroImage={heroImages[areaId] || heroImages.datawIsland}
      serviceDescription={serviceDescription}
      features={features}
      painPoints={painPoints}
      solutions={solutions}
      beforeAfterImages={beforeAfterImages}
    />
  );
}
