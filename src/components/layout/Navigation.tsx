import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import Button from '../shared/Button';
import { BRAND } from '../../constants/brand';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '/#services' },
    { name: 'About', href: '/about' },
    { name: 'Service Areas', href: '/service-areas' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Contact', href: `mailto:${BRAND.contact.email}` },
  ];

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-300
        ${isScrolled ? 'bg-black/90 backdrop-blur-sm shadow-md' : 'bg-transparent'}
      `}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <h1 className="text-2xl font-bold text-white group-hover:text-blue-500 transition-colors">
              {BRAND.name}
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-base font-medium transition-all text-white hover:text-blue-500"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium transition-all text-white hover:text-blue-500"
                >
                  {link.name}
                </a>
              )
            ))}
            <Button 
              variant="secondary"
              className="px-6 py-3 text-xs bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              onClick={() => { window.location.href = `tel:${BRAND.contact.phoneRaw}`; }}
            >
              <Phone size={16} />
              {BRAND.contact.phone}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-zinc-800">
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                link.href.startsWith('/') ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-base font-medium text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-base font-medium text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              ))}
              <Button 
                variant="accent"
                className="w-full text-xs bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.location.href = `tel:${BRAND.contact.phoneRaw}`;
                }}
              >
                <Phone size={16} />
                Call {BRAND.contact.phone}
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
