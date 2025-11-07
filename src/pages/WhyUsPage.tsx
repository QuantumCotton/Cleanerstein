import { Clock, Home, Sparkles, CheckCircle, DollarSign, Droplets } from 'lucide-react';
import { BRAND } from '../constants/brand';
import Button from '../components/shared/Button';

export default function WhyUsPage() {
  const painPoints = [
    {
      icon: Clock,
      title: "No Time to Clean Everything",
      problem: "You're juggling work, family, and life - who has time to clean the house, pressure wash the exterior, AND detail the car?",
      solution: "We handle all three in ONE appointment while you're at work. Come home to a completely refreshed property - inside, outside, and vehicle."
    },
    {
      icon: DollarSign,
      title: "Paying Multiple Companies is Expensive",
      problem: "Hiring separate companies for house cleaning, pressure washing, and car detailing means multiple bills, scheduling headaches, and wasted time.",
      solution: "ONE company, ONE visit, ONE invoice. Save time and money with our bundled complete property care packages."
    },
    {
      icon: Home,
      title: "Unreliable Service Providers",
      problem: "Cleaners who don't show up, miss details, or do inconsistent work. You never know what you're getting.",
      solution: "Same professional team every time. Licensed, insured, background-checked. 100% satisfaction guarantee or we re-clean for free."
    },
    {
      icon: Sparkles,
      title: "Same Crew Every Time",
      problem: "Tired of different cleaners each visit? Never knowing who's coming into your home or what quality to expect?",
      solution: "No revolving door of new hires. You get the same trusted, professional crew every single visit. Consistency you can count on."
    },
    {
      icon: Sparkles,
      title: "Property Appearance Declining",
      problem: "Exterior grime buildup, dirty siding, stained driveway - it all makes your property look neglected and reduces curb appeal.",
      solution: "Professional pressure washing restores your home's exterior to like-new condition. Increase property value and neighborhood pride."
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative py-32 border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-light mb-6 font-serif">
            Why {BRAND.name}?
          </h1>
          <p className="text-2xl text-zinc-400 max-w-3xl mx-auto mb-8">
            Professional cleaning and pressure washing for your entire property - inside and outside - all in one visit
          </p>
          <div className="inline-block bg-blue-600/20 border border-blue-500/50 rounded-full px-8 py-4">
            <p className="text-xl text-blue-300 font-semibold">
              8 Years of High Standards & Exceeding Expectations
            </p>
          </div>
        </div>
      </section>

      {/* Competitive Advantage */}
      <section className="py-20 border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-light mb-12 text-center font-serif">Our Unique All-in-One Solution</h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16 max-w-4xl mx-auto">
            <div className="bg-zinc-900 border border-zinc-800 p-10 text-center">
              <Home size={64} className="mx-auto mb-6 text-blue-500" />
              <h3 className="text-3xl font-light mb-4">House Cleaning</h3>
              <p className="text-zinc-400 text-lg">Complete interior deep clean - every room, every surface, every detail. Regular maintenance or one-time deep cleaning.</p>
            </div>
            
            <div className="bg-zinc-900 border border-zinc-800 p-10 text-center">
              <Droplets size={64} className="mx-auto mb-6 text-green-500" />
              <h3 className="text-3xl font-light mb-4">Pressure Washing</h3>
              <p className="text-zinc-400 text-lg">Exterior washing for house siding, driveways, walkways, decks, patios, and more. Restore your property's curb appeal.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600/20 to-green-600/20 border border-blue-500/30 rounded-lg p-10 text-center">
            <h3 className="text-3xl font-light mb-4 font-serif">The Cleanerstein Advantage</h3>
            <p className="text-xl text-zinc-300 mb-6 max-w-3xl mx-auto">
              Leave for work with your property as-is. Come home to:
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={28} />
                <span className="text-zinc-300 text-lg">Sparkling clean home interior - every room, every surface</span>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={28} />
                <span className="text-zinc-300 text-lg">Fresh, clean exterior - house, driveway, deck, patio</span>
              </div>
            </div>
            <p className="text-sm text-zinc-500 mt-8">
              All done professionally, insured, and guaranteed - without you lifting a finger
            </p>
          </div>
        </div>
      </section>

      {/* Pain Points & Solutions */}
      <section className="py-20 border-b border-zinc-900 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-light mb-4 text-center font-serif">We Solve Real Problems</h2>
          <p className="text-xl text-zinc-400 text-center mb-16 max-w-2xl mx-auto">
            Stop juggling multiple service providers. Here's how we make your life easier:
          </p>

          <div className="space-y-12">
            {painPoints.map((point, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-8 items-center">
                <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="flex items-start gap-4 mb-4">
                    <point.icon size={32} className="text-blue-500 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-light mb-2">{point.title}</h3>
                      <p className="text-red-400 italic">&quot;{point.problem}&quot;</p>
                    </div>
                  </div>
                </div>
                <div className={`bg-black border border-green-600/30 p-6 rounded-lg ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <p className="text-lg font-semibold text-green-500 mb-2">✓ Cleanerstein Solution:</p>
                  <p className="text-zinc-300">{point.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20 border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-light mb-12 text-center font-serif">Serving the Entire Lowcountry</h2>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-10 mb-12">
            <div className="text-center mb-8">
              <div className="text-6xl font-light text-blue-500 mb-4">35 Miles</div>
              <p className="text-xl text-zinc-400">Service Radius from Beaufort, SC</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                'Beaufort', 'Lady\'s Island', 'Port Royal', 
                'Hilton Head Island', 'Bluffton', 'Okatie',
                'Seabrook', 'Fripp Island', 'Parris Island',
                'St. Helena Island', 'Dale', 'Laurel Bay'
              ].map((area) => (
                <div key={area} className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-zinc-400 mb-6">
              Not sure if we service your area? <span className="text-blue-500 font-semibold">We cover all of Beaufort County and surrounding areas within 35 miles.</span>
            </p>
            <Button 
              variant="accent"
              className="px-10 py-4 bg-blue-600 hover:bg-blue-700"
              onClick={() => window.location.href = `tel:${BRAND.contact.phoneRaw}`}
            >
              Call to Confirm Your Location
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6 font-serif">
            Ready for Complete Property Care?
          </h2>
          <p className="text-xl text-zinc-400 mb-10">
            One call. One company. Complete transformation - inside, outside, and vehicle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="accent"
              className="px-12 py-5 bg-blue-600 hover:bg-blue-700 text-lg"
              onClick={() => window.location.href = `tel:${BRAND.contact.phoneRaw}`}
            >
              Call {BRAND.contact.phone}
            </Button>
            <Button 
              variant="primary"
              className="px-12 py-5 text-lg"
              onClick={() => window.location.href = '/contact'}
            >
              Request Free Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
