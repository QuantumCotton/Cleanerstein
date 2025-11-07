import { CheckCircle, Phone } from 'lucide-react';
import { BRAND } from '../constants/brand';

export default function ThanksPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-xl mx-auto text-center border border-blue-500 bg-zinc-900/60 rounded-xl p-10">
        <div className="mb-6">
          <CheckCircle size={64} className="text-blue-500 mx-auto" />
        </div>
        <h1 className="text-3xl md:text-4xl font-light text-white font-serif mb-3">
          Thank You! <span className="text-blue-400">We'll Be In Touch Soon</span>
        </h1>
        <p className="text-zinc-400 mb-6">
          We've received your quote request. A {BRAND.name} team member will contact you within 24 hours to discuss your cleaning needs and provide a free estimate.
        </p>
        <div className="mb-6 p-4 bg-zinc-800/50 rounded-lg">
          <p className="text-sm text-zinc-400 mb-2">Need immediate assistance?</p>
          <a
            href={`tel:${BRAND.contact.phoneRaw}`}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-lg"
          >
            <Phone size={20} />
            {BRAND.contact.phone}
          </a>
        </div>
        <a
          href="/"
          className="inline-block px-6 py-3 border border-blue-500 text-white bg-blue-600 font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
