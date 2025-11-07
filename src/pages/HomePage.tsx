import { ArrowRight, Sparkles, Building2, Home, Droplets } from 'lucide-react';
import Button from '../components/shared/Button';
import { BRAND } from '../constants/brand';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Background Image - IDEAL: Professional cleaner in action, bright modern space, or sparkling clean room */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80" 
            alt="Professional cleaning service - Replace with: Your team cleaning a modern office or home, bright and inviting"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/70 via-black/60 to-black/70"></div>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 100px,
                rgba(255,255,255,0.03) 100px,
                rgba(255,255,255,0.03) 200px
              )`
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold mb-4 tracking-tight">
              {BRAND.name}
            </h1>
            <div className="flex items-center justify-center gap-2 text-xl text-zinc-400">
              <Sparkles className="w-5 h-5" />
              <span>{BRAND.tagline}</span>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 tracking-wide font-serif">
            High Standards.<br />
            <span className="text-blue-500">Exceeding Expectations.</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-zinc-300 font-light tracking-wider mb-8 max-w-3xl mx-auto">
            Professional house cleaning and pressure washing services - inside and outside - all while you're at work.
          </p>
          
          <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-6 max-w-2xl mx-auto mb-12">
            <p className="text-lg text-blue-300">
              <span className="font-semibold">8 Years Serving the Lowcountry:</span> Same trusted crew. 1-day turnaround. We set high standards as a reflection of our work ethic - meeting your needs and exceeding expectations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              variant="secondary" 
              className="px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => window.location.href = `tel:${BRAND.contact.phoneRaw}`}
            >
              Call {BRAND.contact.phone}
            </Button>
            <Button 
              variant="secondary" 
              className="px-12 py-5"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Services
              <ArrowRight className="inline ml-2" size={20} />
            </Button>
          </div>

          {/* Trust Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-zinc-800 pt-12">
            <div>
              <div className="text-4xl font-light text-blue-500 mb-2">8yrs</div>
              <div className="text-sm text-zinc-500 uppercase tracking-wide">In Business</div>
            </div>
            <div>
              <div className="text-4xl font-light text-blue-500 mb-2">1-Day</div>
              <div className="text-sm text-zinc-500 uppercase tracking-wide">Turnaround Time</div>
            </div>
            <div>
              <div className="text-4xl font-light text-blue-500 mb-2">4.9★</div>
              <div className="text-sm text-zinc-500 uppercase tracking-wide">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-light text-blue-500 mb-2">35mi</div>
              <div className="text-sm text-zinc-500 uppercase tracking-wide">Service Radius</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-sm tracking-widest text-zinc-500 uppercase mb-4">
              Our Services
            </p>
            <h2 className="text-5xl md:text-6xl font-light mb-6 font-serif">
              Complete Cleaning Solutions
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Commercial Cleaning */}
            <div className="p-8 border border-zinc-800 hover:border-blue-500 bg-black/40 transition-all group overflow-hidden relative">
              {/* IDEAL IMAGE: Clean modern office space, conference room, or retail store */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80" 
                  alt="Replace with: Your team's commercial cleaning work - office building or retail space"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mb-6 text-blue-500 relative z-10">
                <Building2 size={48} className="group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-light mb-4 tracking-wide font-serif">
                {BRAND.services.commercial.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                {BRAND.services.commercial.description}. Professional, reliable service for offices, retail, medical facilities, and more.
              </p>
              <ul className="space-y-3 text-zinc-500">
                {BRAND.services.commercial.types.slice(0, 4).map((type, i) => (
                  <li key={i}>✓ {type}</li>
                ))}
              </ul>
            </div>

            {/* Residential Cleaning */}
            <div className="p-8 border border-zinc-800 hover:border-blue-500 bg-black/40 transition-all group overflow-hidden relative">
              {/* IDEAL IMAGE: Beautiful clean home interior, living room, or kitchen */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=400&q=80" 
                  alt="Replace with: Spotless home you've cleaned - bright, welcoming living space"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mb-6 text-blue-500 relative z-10">
                <Home size={48} className="group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-light mb-4 tracking-wide font-serif">
                {BRAND.services.residential.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                {BRAND.services.residential.description}. From regular maintenance to deep cleaning, we keep your home spotless.
              </p>
              <ul className="space-y-3 text-zinc-500">
                {BRAND.services.residential.types.slice(0, 4).map((type, i) => (
                  <li key={i}>✓ {type}</li>
                ))}
              </ul>
            </div>

            {/* Pressure Washing */}
            <div className="p-8 border border-zinc-800 hover:border-blue-500 bg-black/40 transition-all group overflow-hidden relative">
              {/* IDEAL IMAGE: Before/after pressure washing driveway, deck, or house exterior */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80" 
                  alt="Replace with: Your pressure washing equipment in action or dramatic before/after"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mb-6 text-blue-500 relative z-10">
                <Droplets size={48} className="group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-light mb-4 tracking-wide font-serif">
                {BRAND.services.pressureWashing.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                {BRAND.services.pressureWashing.description}. Restore your property's curb appeal with our expert pressure washing.
              </p>
              <ul className="space-y-3 text-zinc-500">
                {BRAND.services.pressureWashing.types.slice(0, 4).map((type, i) => (
                  <li key={i}>✓ {type}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative p-16 text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-white font-serif">
              Ready for a Cleaner Space?
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Join hundreds of satisfied clients in Beaufort and the Lowcountry. 
              Professional service. Eco-friendly products. Guaranteed satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                className="px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => window.location.href = `tel:${BRAND.contact.phoneRaw}`}
              >
                Call {BRAND.contact.phone}
              </Button>
              <Button 
                variant="secondary" 
                className="px-12 py-5"
                onClick={() => window.location.href = `mailto:${BRAND.contact.email}`}
              >
                Request a Quote
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
