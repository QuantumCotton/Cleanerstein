import { useState } from 'react';
import { Send, CheckCircle, Phone } from 'lucide-react';
import { BRAND } from '../constants/brand';
import Button from './shared/Button';

interface LandingPageFormProps {
  serviceType: string;
  areaName: string;
}

export default function LandingPageForm({ serviceType, areaName }: LandingPageFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    serviceType: serviceType,
    areaName: areaName
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to Netlify function
      const response = await fetch('/.netlify/functions/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          'form-name': 'landing-page-quote-request',
          submittedAt: new Date().toISOString(),
          source: `${areaName} - ${serviceType} Landing Page`
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        // Fallback to email
        window.location.href = `mailto:${BRAND.contact.email}?subject=Quote Request - ${serviceType} in ${areaName}&body=Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0A%0AMessage: ${formData.message}`;
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Fallback to email
      window.location.href = `mailto:${BRAND.contact.email}?subject=Quote Request - ${serviceType} in ${areaName}&body=Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0A%0AMessage: ${formData.message}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-black/40 border border-green-500/30 rounded-lg p-8 text-center">
        <div className="mb-4 flex justify-center">
          <CheckCircle size={60} className="text-green-500" />
        </div>
        <h3 className="text-2xl font-light mb-4 text-white font-serif">Thank You!</h3>
        <p className="text-zinc-300 mb-6">
          We've received your quote request for {serviceType} in {areaName} and will contact you within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="secondary" 
            onClick={() => window.location.href = `tel:${BRAND.contact.phoneRaw}`}
          >
            <Phone className="inline mr-2" size={16} />
            Call Now
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => setIsSubmitted(false)}
          >
            Send Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/40 border border-zinc-800 rounded-lg p-8">
      <h3 className="text-2xl font-light mb-6 text-white font-serif">
        Request a Free Quote
      </h3>
      <p className="text-zinc-400 mb-6">
        Get your personalized {serviceType} quote for {areaName}. We'll respond within 24 hours.
      </p>
      
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
            placeholder="Your name"
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
            placeholder="your@email.com"
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
          <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
            Tell us about your project
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
            placeholder="Describe your {serviceType.toLowerCase()} needs and any specific requirements..."
          />
        </div>

        <div className="pt-4">
          <Button 
            type="submit"
            variant="secondary"
            disabled={isSubmitting}
            className="w-full px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              'Sending...'
            ) : (
              <>
                <Send className="inline mr-2" size={20} />
                Get Free Quote
              </>
            )}
          </Button>
        </div>

        <div className="text-center">
          <p className="text-zinc-500 text-sm mb-2">Or call us directly</p>
          <a 
            href={`tel:${BRAND.contact.phoneRaw}`}
            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            {BRAND.contact.phone}
          </a>
        </div>
      </form>
    </div>
  );
}
