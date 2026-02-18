import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface MarketingHeaderProps {
  onRequestClick: () => void;
}

export function MarketingHeader({ onRequestClick }: MarketingHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Services', href: '#services' },
    { label: 'Industries', href: '#industries' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Examples', href: '#examples' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'FAQ', href: '#faq' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <img
              src="/assets/generated/vlogunrealpromo-logo.dim_512x512.png"
              alt="VlogunrealPromo"
              className="h-10 w-10"
            />
            <img
              src="/assets/generated/vlogunrealpromo-wordmark.dim_1200x300.png"
              alt="VlogunrealPromo"
              className="h-8 hidden sm:block"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <Button
              onClick={onRequestClick}
              className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-sm"
            >
              Request a Promo Video
            </Button>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {item.label}
                </a>
              ))}
              <Button
                onClick={() => {
                  onRequestClick();
                  setIsMobileMenuOpen(false);
                }}
                className="sm:hidden bg-primary hover:bg-primary/90 text-primary-foreground w-full"
              >
                Request a Promo Video
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
