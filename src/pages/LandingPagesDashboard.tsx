import { Link } from 'react-router-dom';
import { ExternalLink, MapPin, Droplets, Car, Home, Building2, Sparkles, ChevronRight, Globe, Shield, Star } from 'lucide-react';
import Button from '../components/shared/Button';
import { AFFLUENT_AREAS } from '../constants/affluentAreas';

export default function LandingPagesDashboard() {
  const serviceTypes = [
    {
      id: 'pressure-washing',
      title: 'Pressure Washing',
      description: 'Soft wash & high pressure services with containment systems',
      icon: <Droplets className="w-6 h-6" />,
      color: 'text-blue-500'
    },
    {
      id: 'mobile-detailing',
      title: 'Mobile Detailing',
      description: 'Luxury vehicle care with salt air protection',
      icon: <Car className="w-6 h-6" />,
      color: 'text-green-500'
    },
    {
      id: 'residential-cleaning',
      title: 'Residential Cleaning',
      description: 'High-end home care with privacy focus',
      icon: <Home className="w-6 h-6" />,
      color: 'text-purple-500'
    },
    {
      id: 'commercial-cleaning',
      title: 'Commercial Cleaning',
      description: 'Clubhouse, marina, and amenities maintenance',
      icon: <Building2 className="w-6 h-6" />,
      color: 'text-orange-500'
    },
    {
      id: 'epoxy-services',
      title: 'Epoxy Services',
      description: 'Garage floors, countertops, backsplashes with coastal formulations',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'text-pink-500'
    }
  ];

  const areaStats = {
    totalAreas: Object.keys(AFFLUENT_AREAS).length,
    totalServices: serviceTypes.length,
    totalLandingPages: Object.keys(AFFLUENT_AREAS).length * serviceTypes.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-light mb-6 text-white font-serif">
            Landing Pages Dashboard
          </h1>
          <p className="text-xl text-zinc-300 mb-8 max-w-3xl mx-auto">
            Complete overview of all targeted landing pages for affluent areas around Beaufort, SC.
            Each page is customized to address local pain points and showcase luxury service solutions.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-4xl font-light text-blue-500 mb-2">{areaStats.totalAreas}</div>
              <div className="text-sm text-zinc-500 uppercase tracking-wide">Target Areas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-green-500 mb-2">{areaStats.totalServices}</div>
              <div className="text-sm text-zinc-500 uppercase tracking-wide">Service Types</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-purple-500 mb-2">{areaStats.totalLandingPages}</div>
              <div className="text-sm text-zinc-500 uppercase tracking-wide">Total Pages</div>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mb-16">
          <h2 className="text-3xl font-light mb-8 text-white font-serif text-center">
            Quick Navigation
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/dashboard" className="block">
              <div className="p-6 border border-zinc-800 hover:border-blue-500 bg-black/40 transition-all group rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="w-5 h-5 text-blue-500" />
                  <h3 className="text-lg font-light text-white">Main Dashboard</h3>
                </div>
                <p className="text-zinc-400 text-sm">Return to main operations dashboard</p>
              </div>
            </Link>
            <Link to="/erik" className="block">
              <div className="p-6 border border-zinc-800 hover:border-blue-500 bg-black/40 transition-all group rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-light text-white">Owner Form</h3>
                </div>
                <p className="text-zinc-400 text-sm">Access business inquiry form</p>
              </div>
            </Link>
            <Link to="/pressure-washing-guide" className="block">
              <div className="p-6 border border-zinc-800 hover:border-blue-500 bg-black/40 transition-all group rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="w-5 h-5 text-purple-500" />
                  <h3 className="text-lg font-light text-white">Operations Guide</h3>
                </div>
                <p className="text-zinc-400 text-sm">View pressure washing operations guide</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Areas Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-light mb-8 text-white font-serif text-center">
            Target Areas Overview
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {Object.values(AFFLUENT_AREAS).map((area) => (
              <div key={area.id} className="p-8 border border-zinc-800 bg-black/40 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <h3 className="text-2xl font-light text-white font-serif">{area.name}</h3>
                </div>
                <p className="text-zinc-300 mb-6">{area.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-3">Key Characteristics</h4>
                  <ul className="space-y-2">
                    {area.characteristics.slice(0, 3).map((char, i) => (
                      <li key={i} className="text-zinc-400 text-sm flex items-center gap-2">
                        <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-2">Demographics</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-zinc-500">Home Value:</span>
                      <span className="text-white ml-2">{area.demographics.medianHomeValue}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500">Population:</span>
                      <span className="text-white ml-2">{area.demographics.population}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 text-sm">{serviceTypes.length} Services Available</span>
                    <ChevronRight className="w-4 h-4 text-zinc-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-light mb-8 text-white font-serif text-center">
            Service Types Overview
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceTypes.map((service) => (
              <div key={service.id} className="p-6 border border-zinc-800 bg-black/40 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className={service.color}>{service.icon}</div>
                  <h3 className="text-xl font-light text-white font-serif">{service.title}</h3>
                </div>
                <p className="text-zinc-400 text-sm mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 text-sm">{Object.keys(AFFLUENT_AREAS).length} Areas</span>
                  <span className="text-zinc-500 text-sm">{areaStats.totalLandingPages / serviceTypes.length} Pages</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Landing Pages Grid */}
        <div>
          <h2 className="text-3xl font-light mb-8 text-white font-serif text-center">
            All Landing Pages
          </h2>
          
          {Object.values(AFFLUENT_AREAS).map((area) => (
            <div key={area.id} className="mb-12">
              <h3 className="text-2xl font-light mb-6 text-blue-400 font-serif flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                {area.name} Landing Pages
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceTypes.map((service) => {
                  const url = `/${area.id.replace(/([A-Z])/g, '-$1').toLowerCase()}/${service.id}`;
                  return (
                    <Link key={`${area.id}-${service.id}`} to={url} className="block">
                      <div className="p-6 border border-zinc-800 hover:border-blue-500 bg-black/40 transition-all group rounded-lg">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`${service.color}`}>{service.icon}</div>
                          <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-blue-500 transition-colors" />
                        </div>
                        <h4 className="text-lg font-light text-white mb-2 font-serif">{service.title}</h4>
                        <p className="text-zinc-500 text-sm mb-4">{service.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-zinc-600 uppercase tracking-wide">{area.name}</span>
                          <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-blue-500 transition-colors" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-20 text-center border-t border-zinc-800 pt-12">
          <p className="text-zinc-400 mb-8">
            All landing pages are optimized for local SEO and include area-specific content, reviews, and pain point solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" onClick={() => window.open('/', '_blank')}>
              <Globe className="inline mr-2" size={20} />
              Visit Main Site
            </Button>
            <Button variant="secondary" onClick={() => window.location.href = 'mailto:erikesenaliev@gmail.com'}>
              Request Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
