import { Link } from 'react-router-dom';
import { FileText, FormInput, MapPin } from 'lucide-react';
import Button from '../components/shared/Button';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 py-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-light mb-6 text-white font-serif">
            Dashboard
          </h1>
          <p className="text-xl text-zinc-300 mb-12">
            Access forms and resources for Cleanerstein operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Form Link */}
          <Link to="/erik" className="block">
            <div className="p-8 border border-zinc-800 hover:border-blue-500 bg-black/40 transition-all group rounded-lg text-center">
              <FormInput className="w-16 h-16 text-blue-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-light mb-4 text-white font-serif">
                Form
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Access the owner questionnaire form for new business inquiries.
              </p>
              <Button variant="secondary" className="w-full">
                Open Form
              </Button>
            </div>
          </Link>

          {/* Pressure Washing Guide Link */}
          <Link to="/pressure-washing-guide" className="block">
            <div className="p-8 border border-zinc-800 hover:border-blue-500 bg-black/40 transition-all group rounded-lg text-center">
              <FileText className="w-16 h-16 text-blue-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-light mb-4 text-white font-serif">
                Pressure Washing Guide
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Comprehensive guide for pressure washing chemicals and operations in Beaufort, SC.
              </p>
              <Button variant="secondary" className="w-full">
                View Guide
              </Button>
            </div>
          </Link>

          {/* Landing Pages Dashboard Link */}
          <Link to="/landing-pages" className="block">
            <div className="p-8 border border-zinc-800 hover:border-blue-500 bg-black/40 transition-all group rounded-lg text-center">
              <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-light mb-4 text-white font-serif">
                Landing Pages
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                View all 15 targeted landing pages for affluent areas around Beaufort, SC.
              </p>
              <Button variant="secondary" className="w-full">
                View Pages
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
