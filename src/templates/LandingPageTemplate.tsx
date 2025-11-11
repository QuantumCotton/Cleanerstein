import { ArrowRight, Phone, Mail, MapPin, Star, CheckCircle, Shield, Clock, Sparkles } from 'lucide-react';
import Button from '../components/shared/Button';
import LandingPageForm from '../components/LandingPageForm';
import { BRAND } from '../constants/brand';
import { AFFLUENT_AREAS } from '../constants/affluentAreas';

interface LandingPageTemplateProps {
  areaId: string;
  serviceType: 'pressure-washing' | 'mobile-detailing' | 'residential-cleaning' | 'commercial-cleaning' | 'epoxy-services';
  heroImage: string;
  serviceDescription: string;
  features: string[];
  painPoints: string[];
  solutions: string[];
  beforeAfterImages?: { before: string; after: string }[];
}

export default function LandingPageTemplate({
  areaId,
  serviceType,
  heroImage,
  serviceDescription,
  features,
  painPoints,
  solutions,
  beforeAfterImages = []
}: LandingPageTemplateProps) {
  const area = AFFLUENT_AREAS[areaId as keyof typeof AFFLUENT_AREAS];
  
  if (!area) {
    return <div>Area not found</div>;
  }

  const serviceTitles = {
    'pressure-washing': 'Pressure Washing & Soft Washing',
    'mobile-detailing': 'Mobile Auto Detailing',
    'residential-cleaning': 'Residential Cleaning',
    'commercial-cleaning': 'Commercial Cleaning',
    'epoxy-services': 'Epoxy Flooring & Surfaces'
  };

  const serviceIcons = {
    'pressure-washing': <Sparkles className="w-6 h-6" />,
    'mobile-detailing': <Shield className="w-6 h-6" />,
    'residential-cleaning': <CheckCircle className="w-6 h-6" />,
    'commercial-cleaning': <Clock className="w-6 h-6" />,
    'epoxy-services': <Star className="w-6 h-6" />
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={heroImage}
            alt={`${serviceTitles[serviceType]} in ${area.name}`}
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
            <div className="flex items-center justify-center gap-2 text-xl text-zinc-400 mb-4">
              <MapPin className="w-5 h-5" />
              <span>{area.name}</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-4 tracking-tight">
              {BRAND.name}
            </h1>
            <div className="flex items-center justify-center gap-2 text-xl text-zinc-400">
              {serviceIcons[serviceType]}
              <span>{serviceTitles[serviceType]}</span>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 tracking-wide font-serif">
            Exclusive Service<br />
            <span className="text-blue-500">For {area.name} Residents</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-zinc-300 font-light tracking-wider mb-8 max-w-3xl mx-auto">
            {serviceDescription}
          </p>
          
          <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-6 max-w-2xl mx-auto mb-12">
            <p className="text-lg text-blue-300">
              <span className="font-semibold">Serving {area.name}:</span> We understand the unique needs of {area.name}'s luxury properties and provide services that match your high standards.
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
              onClick={() => window.location.href = `mailto:${BRAND.contact.email}`}
            >
              Request Quote
              <ArrowRight className="inline ml-2" size={20} />
            </Button>
          </div>

          {/* Area Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-zinc-800 pt-12">
            <div>
              <div className="text-4xl font-light text-blue-500 mb-2">8yrs</div>
              <div className="text-sm text-zinc-500 uppercase tracking-wide">In Business</div>
            </div>
            <div>
              <div className="text-4xl font-light text-blue-500 mb-2">Local</div>
              <div className="text-sm text-zinc-500 uppercase tracking-wide">{area.name} Focus</div>
            </div>
            <div>
              <div className="text-4xl font-light text-blue-500 mb-2">4.9★</div>
              <div className="text-sm text-zinc-500 uppercase tracking-wide">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-light text-blue-500 mb-2">{area.demographics.medianHomeValue.split('-')[0].replace('$', '')}</div>
              <div className="text-sm text-zinc-500 uppercase tracking-wide">Avg Home Value</div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Reviews Section */}
      <section className="py-20 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm tracking-widest text-zinc-500 uppercase mb-4">
              {area.name} Residents Love Us
            </p>
            <h2 className="text-4xl md:text-5xl font-light mb-6 font-serif">
              Trusted By Your Neighbors
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {area.reviews.map((review, index) => (
              <div key={index} className="p-6 border border-zinc-800 bg-black/40">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-zinc-600'}`} />
                  ))}
                </div>
                <p className="text-zinc-300 mb-4 italic">"{review.comment}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold">{review.name}</p>
                    <p className="text-zinc-500 text-sm capitalize">{review.service.replace('-', ' ')}</p>
                  </div>
                  <div className="text-blue-500 text-sm">
                    {area.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points & Solutions Section */}
      <section className="py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm tracking-widest text-zinc-500 uppercase mb-4">
              Common Issues in {area.name}
            </p>
            <h2 className="text-4xl md:text-5xl font-light mb-6 font-serif">
              We Solve Your Problems
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-light mb-6 text-red-400 font-serif">Common Pain Points</h3>
              <div className="space-y-4">
                {painPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <p className="text-zinc-300">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-light mb-6 text-green-400 font-serif">Our Solutions</h3>
              <div className="space-y-4">
                {solutions.map((solution, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <p className="text-zinc-300">{solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm tracking-widest text-zinc-500 uppercase mb-4">
              Why Choose {BRAND.name}
            </p>
            <h2 className="text-4xl md:text-5xl font-light mb-6 font-serif">
              Exclusive Features for {area.name}
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 border border-zinc-800 hover:border-blue-500 bg-black/40 transition-all">
                <div className="mb-4 text-blue-500">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-light mb-3 font-serif">{feature}</h3>
                <p className="text-zinc-400">Tailored specifically for {area.name}'s unique property requirements and high standards.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      {beforeAfterImages.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-black to-zinc-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-sm tracking-widest text-zinc-500 uppercase mb-4">
                Recent Work in {area.name}
              </p>
              <h2 className="text-4xl md:text-5xl font-light mb-6 font-serif">
                Incredible Transformations
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {beforeAfterImages.map((image, index) => (
                <div key={index} className="relative group">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <img src={image.before} alt="Before" className="w-full h-64 object-cover rounded-lg" />
                      <p className="text-center text-zinc-500 mt-2">Before</p>
                    </div>
                    <div>
                      <img src={image.after} alt="After" className="w-full h-64 object-cover rounded-lg" />
                      <p className="text-center text-green-500 mt-2">After</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section with Form */}
      <section className="py-20 bg-zinc-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-white font-serif">
              Ready for Premium Service in {area.name}?
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Join your neighbors in {area.name} who trust {BRAND.name} for exceptional {serviceTitles[serviceType].toLowerCase()}. 
              Professional results. Local expertise. Guaranteed satisfaction.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <LandingPageForm 
              serviceType={serviceTitles[serviceType]}
              areaName={area.name}
            />

            {/* Quick Contact Info */}
            <div className="space-y-8">
              <div className="bg-black/40 border border-zinc-800 rounded-lg p-8">
                <h3 className="text-2xl font-light mb-6 text-white font-serif">
                  Why Choose {BRAND.name}?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium mb-1">Local Expertise</h4>
                      <p className="text-zinc-400 text-sm">Serving {area.name} for 8+ years with specialized knowledge of luxury properties</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium mb-1">Quick Response</h4>
                      <p className="text-zinc-400 text-sm">We respond to all inquiries within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium mb-1">Satisfaction Guaranteed</h4>
                      <p className="text-zinc-400 text-sm">Professional service that exceeds your high standards</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-6">
                <h4 className="text-lg font-medium mb-3 text-white">Need Immediate Assistance?</h4>
                <p className="text-zinc-300 mb-4">
                  For urgent service needs, call us directly for same-day availability.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="secondary" 
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => window.location.href = `tel:${BRAND.contact.phoneRaw}`}
                  >
                    <Phone className="inline mr-2" size={16} />
                    Call {BRAND.contact.phone}
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="px-6 py-3"
                    onClick={() => window.location.href = `mailto:${BRAND.contact.email}`}
                  >
                    <Mail className="inline mr-2" size={16} />
                    Email Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
