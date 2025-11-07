import { Building2, Home, Droplets, CheckCircle, Phone, Sparkles } from 'lucide-react';
import { BRAND } from '../constants/brand';
import Button from '../components/shared/Button';

export default function ServicesPage() {
  const services = [
    {
      icon: Building2,
      title: 'Commercial Cleaning',
      description: 'Professional cleaning solutions for businesses throughout Beaufort and the Lowcountry.',
      features: [
        'Office Buildings & Corporate Spaces',
        'Retail Stores & Shopping Centers',
        'Medical Facilities & Clinics',
        'Restaurants & Food Service',
        'Schools & Educational Facilities',
        'Flexible Scheduling (After-Hours Available)'
      ],
      benefits: [
        'Customized cleaning plans',
        'Trained & background-checked staff',
        'Eco-friendly products',
        'Consistent quality assurance'
      ],
      color: 'blue'
    },
    {
      icon: Home,
      title: 'Residential Cleaning',
      description: 'Keep your home spotless with our thorough residential cleaning services.',
      features: [
        'Regular Maintenance Cleaning',
        'Deep Cleaning Services',
        'Move In / Move Out Cleaning',
        'Post-Construction Cleanup',
        'Special Event Preparation',
        'One-Time or Recurring Service'
      ],
      benefits: [
        'Same team each visit',
        'Safe for kids & pets',
        'Satisfaction guaranteed',
        'Recurring service discounts'
      ],
      color: 'green'
    },
    {
      icon: Droplets,
      title: 'Pressure Washing',
      description: 'Restore your property\'s exterior to like-new condition with professional pressure washing.',
      features: [
        'House Washing & Siding',
        'Driveways & Sidewalks',
        'Decks & Patios',
        'Fences & Gates',
        'Commercial Building Exteriors',
        'Soft Wash & Power Wash Options'
      ],
      benefits: [
        'Increase curb appeal',
        'Prevent damage & mold',
        'Extend surface life',
        'Boost property value'
      ],
      color: 'cyan'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-900 via-black to-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-6">
            <p className="text-sm tracking-widest text-zinc-500 uppercase mb-4">What We Offer</p>
            <h1 className="text-5xl md:text-6xl font-light mb-6 font-serif">Our Services</h1>
            <p className="text-xl text-zinc-400">8 years of professional house cleaning and pressure washing excellence in Port Royal & the Lowcountry</p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div 
                key={service.title}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Service Info */}
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="mb-6">
                    <service.icon 
                      size={56} 
                      className={`text-${service.color}-500`}
                    />
                  </div>
                  <h2 className="text-4xl font-light mb-4 font-serif">{service.title}</h2>
                  <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-light mb-4 text-white">What We Offer:</h3>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-zinc-300">
                          <CheckCircle size={20} className={`text-${service.color}-500 mt-1 flex-shrink-0`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg">
                    <h3 className="text-xl font-light mb-3 text-white">Why Choose Us:</h3>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-zinc-400">
                          <span className={`text-${service.color}-500`}>•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Service Image Placeholder */}
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <div className="aspect-square bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden relative group">
                    {/* IDEAL IMAGES BY SERVICE TYPE:
                        Commercial: Your team cleaning office, medical facility, or retail space in action
                        Residential: Beautiful before/after of home cleaning, focus on kitchen or living room
                        Pressure Washing: Dramatic before/after of driveway, deck, or house exterior */}
                    <img 
                      src={index === 0 ? 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80' : 
                           index === 1 ? 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80' : 
                           'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&q=80'}
                      alt={index === 0 ? 'Replace with: Your team cleaning modern office space or commercial facility' :
                           index === 1 ? 'Replace with: Sparkling clean home interior you completed - kitchen, living room, or bedroom' :
                           'Replace with: Before/after pressure washing transformation - driveway, deck, or house exterior'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                      <service.icon size={64} className={`text-${service.color}-400`} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20 border-t border-zinc-900 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-light mb-6 font-serif">Serving the Lowcountry</h2>
          <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
            {BRAND.name} proudly serves {BRAND.location.serviceArea}. Whether you need commercial cleaning, 
            residential services, or pressure washing, we're your local cleaning experts.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-black/40 border border-zinc-800 rounded-lg">
              <h3 className="text-2xl font-semibold mb-2 text-white">Same-Day</h3>
              <p className="text-zinc-400">Service Available</p>
            </div>
            <div className="p-6 bg-black/40 border border-zinc-800 rounded-lg">
              <h3 className="text-2xl font-semibold mb-2 text-white">Licensed</h3>
              <p className="text-zinc-400">& Fully Insured</p>
            </div>
            <div className="p-6 bg-black/40 border border-zinc-800 rounded-lg">
              <h3 className="text-2xl font-semibold mb-2 text-white">100%</h3>
              <p className="text-zinc-400">Satisfaction Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6 font-serif">
            Ready to Experience the {BRAND.name} Difference?
          </h2>
          <p className="text-xl text-zinc-400 mb-10">
            Get your free, no-obligation quote today. We'll customize a cleaning plan that fits your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="accent"
              className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-lg font-semibold"
              onClick={() => window.location.href = `tel:${BRAND.contact.phoneRaw}`}
            >
              <Phone size={24} className="mr-2" />
              Call {BRAND.contact.phone}
            </Button>
            <Button 
              variant="primary"
              className="px-10 py-5 text-lg font-semibold"
              onClick={() => window.location.href = `mailto:${BRAND.contact.email}`}
            >
              Email for Quote
            </Button>
          </div>
          <p className="text-sm text-zinc-500 mt-6">
            Or use our chatbot in the bottom right to get started →
          </p>
        </div>
      </section>
    </div>
  );
}
