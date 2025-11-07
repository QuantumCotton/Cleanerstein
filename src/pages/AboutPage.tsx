import { Sparkles, Heart, Shield, Award, Users } from 'lucide-react';
import Button from '../components/shared/Button';
import { BRAND } from '../constants/brand';

export default function AboutPage() {

  const values = [
    {
      icon: Sparkles,
      title: 'Spotless Results',
      description: 'We don\'t cut corners. Every surface, every corner, every detail receives our meticulous attention.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We listen, we adapt, and we deliver exactly what you need.'
    },
    {
      icon: Shield,
      title: 'Eco-Friendly',
      description: 'Safe for your family, pets, and the environment. We use only green, non-toxic cleaning products.'
    },
    {
      icon: Award,
      title: 'Professional Team',
      description: 'Licensed, insured, and thoroughly trained. Our team brings expertise to every job.'
    },
    {
      icon: Users,
      title: 'Local & Trusted',
      description: 'Beaufort is our home. We\'re your neighbors, committed to serving our community with integrity.'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-black"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm tracking-widest text-zinc-500 uppercase mb-4">Our Story</p>
          <h1 className="text-5xl md:text-6xl font-light mb-6 font-serif">About {BRAND.name}</h1>
          <p className="text-xl text-zinc-400">8 years of excellence serving Port Royal and the Lowcountry</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-light mb-6 font-serif">Our Story</h2>
              <p className="text-lg text-zinc-400 leading-relaxed">
                Since 2017, Cleanerstein has been setting high standards for professional cleaning and pressure washing in Port Royal and the Lowcountry. We set high standards for ourselves as a challenge and as the reflection of our work ethic - striving to meet customer needs and exceed expectations on every job.
              </p>
            </div>
            {/* IDEAL IMAGE: Your team photo in front of company vehicle or at the office */}
            <div className="relative h-80 rounded-lg overflow-hidden border border-zinc-800">
              <img 
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80" 
                alt="Replace with: Cleanerstein team photo - your actual staff in uniform, smiling and professional"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </div>

          <h2 className="text-3xl font-light mb-12 font-serif text-center">Our Journey</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* IDEAL IMAGES: Action shots of your team at work, before/afters, or equipment */}
            <div className="group">
              <div className="relative h-64 rounded-lg overflow-hidden border border-zinc-800 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80" 
                  alt="Replace with: Your team member actively cleaning - shows professionalism and equipment"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <h3 className="text-xl text-white font-light">Same Trusted Crew</h3>
                </div>
              </div>
              <p className="text-zinc-400">
                No revolving door of new hires. You get the same professional crew every visit - trained, background-checked, and committed to excellence.
              </p>
            </div>

            <div className="group">
              <div className="relative h-64 rounded-lg overflow-hidden border border-zinc-800 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&q=80" 
                  alt="Replace with: Happy client in their clean space or testimonial photo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <h3 className="text-xl text-white font-light">Customer Satisfaction</h3>
                </div>
              </div>
              <p className="text-zinc-400">
                With 1-day turnaround time and 8 years of experience, our clients choose us for reliability, thoroughness, and consistent quality. We show up on time, every time.
              </p>
            </div>

            <div className="group">
              <div className="relative h-64 rounded-lg overflow-hidden border border-zinc-800 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80" 
                  alt="Replace with: Beaufort, SC landmark or local community photo showing your roots"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <h3 className="text-xl text-white font-light">Local & Trusted</h3>
                </div>
              </div>
              <p className="text-zinc-400">
                Port Royal is our home base. Family-owned and operated, we're your neighbors committed to serving the Lowcountry with integrity for over 8 years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 border-t border-zinc-900 bg-blue-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-light mb-6 text-white font-serif">Our Mission</h2>
          <p className="text-2xl font-light text-white/90 leading-relaxed">
            To provide exceptional cleaning and pressure washing services that create healthier, more beautiful spaces for homes and businesses in Beaufort and the surrounding Lowcountry.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 font-serif">Our Values</h2>
            <p className="text-xl text-zinc-400">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="p-8 border border-zinc-800 bg-black/40 hover:border-blue-500 transition-colors">
                <value.icon size={40} className="text-blue-500 mb-4" />
                <h3 className="text-2xl font-light mb-4 font-serif">{value.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Guarantee */}
      <section className="py-20 border-t border-zinc-900 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4 font-serif">Our Guarantee</h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="p-8 border border-blue-500 bg-black/60">
              <p className="text-zinc-300 leading-relaxed mb-6 text-lg">
                We stand behind every job we do. If you're not completely satisfied with our cleaning service, we'll return and make it right—at no additional cost to you.
              </p>
              <ul className="space-y-4 text-zinc-400">
                <li className="flex items-start gap-3">
                  <Sparkles size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                  <span><strong className="text-white">100% Satisfaction Guarantee</strong> - If it's not spotless, we'll come back</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                  <span><strong className="text-white">Fully Licensed & Insured</strong> - Your property is protected</span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                  <span><strong className="text-white">Background-Checked Team</strong> - Trustworthy professionals in your space</span>
                </li>
              </ul>
              <div className="mt-8 pt-6 border-t border-zinc-800">
                <p className="text-zinc-400 text-center">
                  Questions? Call us at <a href={`tel:${BRAND.contact.phoneRaw}`} className="text-blue-400 hover:underline font-semibold">{BRAND.contact.phone}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-light mb-6 font-serif">Ready for a Cleaner Space?</h2>
          <p className="text-xl text-zinc-400 mb-8">
            Experience the {BRAND.name} difference. Get your free quote today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="accent" 
              className="px-12 py-5 bg-blue-600 hover:bg-blue-700"
              onClick={() => window.location.href = `tel:${BRAND.contact.phoneRaw}`}
            >
              Call {BRAND.contact.phone}
            </Button>
            <Button 
              variant="primary" 
              className="px-12 py-5"
              onClick={() => window.location.href = `mailto:${BRAND.contact.email}`}
            >
              Email for Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
