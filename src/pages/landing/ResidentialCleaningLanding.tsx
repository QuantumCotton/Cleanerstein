import LandingPageTemplate from '../../templates/LandingPageTemplate';

export default function ResidentialCleaningLanding({ areaId }: { areaId: string }) {
  const serviceDescription = "Exclusive residential cleaning services tailored for luxury homes in prestigious communities. We understand the unique needs of high-end properties, from delicate surfaces and fine furnishings to the importance of privacy and discretion. Our team provides meticulous cleaning while you work or enjoy your lifestyle.";

  const features = [
    "Trained & Background-Checked Professionals",
    "Eco-Friendly Luxury Cleaning Products",
    "Fine Furnishings & Surface Care",
    "Flexible Scheduling Around Your Lifestyle",
    "Complete Privacy & Discretion",
    "Detailed Cleaning Checklists & Quality Assurance"
  ];

  const painPoints = [
    "Standard cleaning services damage expensive finishes",
    "Unreliable cleaners with inconsistent quality",
    "Poor communication and scheduling issues",
    "Security concerns with unknown personnel",
    "One-size-fits-all approach doesn't work for luxury homes",
    "Chemical sensitivities and environmental concerns"
  ];

  const solutions = [
    "Specialized training for luxury home care and delicate surfaces",
    "Consistent quality with detailed checklists and supervision",
    "Real-time communication and flexible scheduling system",
    "Fully vetted, insured, and background-checked professionals",
    "Custom cleaning plans tailored to your specific home and needs",
    "Premium eco-friendly products safe for families and pets"
  ];

  const beforeAfterImages = [
    {
      before: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
      after: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&q=80"
    },
    {
      before: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
      after: "https://images.unsplash.com/photo-1618221195611-5b367cc58a5f?w=600&q=80"
    }
  ];

  const heroImages: Record<string, string> = {
    datawIsland: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1920&q=80",
    callawassieIsland: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80",
    braysIsland: "https://images.unsplash.com/photo-1618221195611-5b367cc58a5f?w=1920&q=80"
  };

  return (
    <LandingPageTemplate
      areaId={areaId}
      serviceType="residential-cleaning"
      heroImage={heroImages[areaId] || heroImages.datawIsland}
      serviceDescription={serviceDescription}
      features={features}
      painPoints={painPoints}
      solutions={solutions}
      beforeAfterImages={beforeAfterImages}
    />
  );
}
