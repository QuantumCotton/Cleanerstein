import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { BRAND } from '../constants/brand';
import Button from '../components/shared/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    propertyType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/.netlify/functions/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          'form-name': 'contact-quote-request',
          submittedAt: new Date().toISOString()
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('There was an error submitting your request. Please call us directly.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your request. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle size={80} className="text-green-500" />
          </div>
          <h1 className="text-5xl font-light mb-6 font-serif">Thank You!</h1>
          <p className="text-xl text-zinc-400 mb-8">
            We've received your quote request and will get back to you within 24 hours.
          </p>
          <p className="text-zinc-500 mb-10">
            Need immediate assistance? Call us at <a href={`tel:${BRAND.contact.phoneRaw}`} className="text-blue-500 hover:underline">{BRAND.contact.phone}</a>
          </p>
          <Button 
            variant="primary" 
            onClick={() => window.location.href = '/'}
          >
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative py-32 border-b border-zinc-900 overflow-hidden">
        {/* IDEAL IMAGE: Your company vehicle, office storefront, or team ready to work */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80" 
            alt="Replace with: Cleanerstein office/headquarters in Beaufort, SC or branded company vehicle"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-light mb-6 font-serif">Get in Touch</h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Ready for high standards and exceeding expectations? Request your free quote or call us for 1-day turnaround service.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-light mb-8 font-serif">Contact Information</h2>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <Phone className="text-blue-500 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-white">Phone</h3>
                    <a 
                      href={`tel:${BRAND.contact.phoneRaw}`}
                      className="text-zinc-400 hover:text-blue-500 transition-colors"
                    >
                      {BRAND.contact.phone}
                    </a>
                    <p className="text-sm text-zinc-500 mt-1">Mon-Fri 8am-6pm, Sat 9am-3pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="text-blue-500 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-white">Email</h3>
                    <a 
                      href={`mailto:${BRAND.contact.email}`}
                      className="text-zinc-400 hover:text-blue-500 transition-colors"
                    >
                      {BRAND.contact.email}
                    </a>
                    <p className="text-sm text-zinc-500 mt-1">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="text-blue-500 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-white">Service Area</h3>
                    <p className="text-zinc-400">
                      {BRAND.location.serviceArea}
                    </p>
                    <p className="text-sm text-zinc-500 mt-1">
                      {BRAND.location.city}, {BRAND.location.stateAbbr} and surrounding areas
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-blue-500 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-white">Business Hours</h3>
                    <div className="text-zinc-400 space-y-1 text-sm">
                      <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 3:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-blue-900/20 border border-blue-800/50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-white">Same-Day Service Available!</h3>
                <p className="text-zinc-400">
                  Need urgent cleaning? Call us directly and we'll do our best to accommodate your schedule.
                </p>
              </div>
            </div>

            {/* Quote Request Form */}
            <div>
              <h2 className="text-4xl font-light mb-8 font-serif">Request a Free Quote</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-zinc-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="(843) 555-0123"
                  />
                </div>

                <div>
                  <label htmlFor="serviceType" className="block text-sm font-medium text-zinc-300 mb-2">
                    Service Type *
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    required
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select a service...</option>
                    <option value="commercial-cleaning">Commercial Cleaning</option>
                    <option value="residential-cleaning">Residential Cleaning</option>
                    <option value="pressure-washing">Pressure Washing</option>
                    <option value="multiple-services">Multiple Services</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-zinc-300 mb-2">
                    Property Type
                  </label>
                  <input
                    type="text"
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Office, House, Apartment, etc."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
                    Additional Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Tell us about your cleaning needs, square footage, preferred schedule, or any special requirements..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Request Free Quote
                    </>
                  )}
                </Button>

                <p className="text-sm text-zinc-500 text-center">
                  By submitting this form, you agree to be contacted by {BRAND.name} regarding your quote request.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-zinc-900 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light mb-4 font-serif">Prefer to Chat?</h2>
          <p className="text-xl text-zinc-400 mb-6">
            Use our AI assistant in the bottom right corner for instant answers and quote requests!
          </p>
        </div>
      </section>
    </div>
  );
}
