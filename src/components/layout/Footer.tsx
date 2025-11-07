import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { BRAND } from '../../constants/brand';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Services', href: '/#services' },
      { name: 'Service Areas', href: '/service-areas' },
      { name: 'Contact', href: `mailto:${BRAND.contact.email}` },
    ],
    services: [
      { name: 'Commercial Cleaning', href: '/services/commercial' },
      { name: 'Residential Cleaning', href: '/services/residential' },
      { name: 'Pressure Washing', href: '/services/pressure-washing' },
      { name: 'Request Quote', href: `mailto:${BRAND.contact.email}` },
    ],
    resources: [
      { name: 'Free Estimate', href: `tel:${BRAND.contact.phoneRaw}` },
      { name: 'FAQ', href: '/faq' },
      { name: 'Testimonials', href: '/testimonials' },
      { name: 'Blog', href: '/blog' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: BRAND.socialMedia.facebook, label: 'Facebook' },
    { icon: Instagram, href: BRAND.socialMedia.instagram, label: 'Instagram' },
    { icon: Twitter, href: BRAND.socialMedia.twitter, label: 'Twitter' },
  ];

  return (
    <footer className="bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/">
              <h2 className="text-2xl font-bold text-white mb-2">{BRAND.name}</h2>
              <p className="text-zinc-500 text-xs uppercase tracking-wider">{BRAND.tagline}</p>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6 mt-6">
              Professional cleaning and pressure washing services for homes and businesses in {BRAND.location.city}, {BRAND.location.stateAbbr}.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-zinc-600 hover:text-blue-500 transition-colors"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className="text-zinc-500 hover:text-blue-500 transition-colors text-sm">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-zinc-500 hover:text-blue-500 transition-colors text-sm">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className="text-zinc-500 hover:text-blue-500 transition-colors text-sm">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-zinc-500 hover:text-blue-500 transition-colors text-sm">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className="text-zinc-500 hover:text-blue-500 transition-colors text-sm">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-zinc-500 hover:text-blue-500 transition-colors text-sm">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-zinc-500 text-sm">
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <div className="flex flex-col">
                  <a href={`tel:${BRAND.contact.phoneRaw}`} className="text-white font-medium hover:text-blue-500 transition-colors">
                    {BRAND.contact.phone}
                  </a>
                  <span className="text-xs">Call for free quote</span>
                </div>
              </li>
              <li className="flex items-start gap-2 text-zinc-500 text-sm">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <a href={`mailto:${BRAND.contact.email}`} className="hover:text-blue-500 transition-colors">
                  {BRAND.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-zinc-500 text-sm">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <div className="flex flex-col">
                  <span>{BRAND.location.city}, {BRAND.location.stateAbbr}</span>
                  <span className="text-xs">{BRAND.location.serviceArea}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-600 text-sm">
              © {currentYear} {BRAND.businessName}. All rights reserved.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-zinc-600 hover:text-blue-500 transition-colors text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
