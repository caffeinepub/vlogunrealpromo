import { useEffect, useRef, useState } from 'react';
import { MarketingHeader } from './components/MarketingHeader';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { IndustriesSection } from './components/IndustriesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { PricingSection } from './components/PricingSection';
import { ExamplesGallery } from './components/ExamplesGallery';
import { FAQSection } from './components/FAQSection';
import { RequestSection } from './components/RequestSection';
import { Footer } from './components/Footer';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

function App() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [referenceId, setReferenceId] = useState<string>('');
  const requestSectionRef = useRef<HTMLElement>(null);

  const scrollToRequest = () => {
    requestSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleRequestSuccess = (refId: string) => {
    setReferenceId(refId);
    setShowConfirmation(true);
  };

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-background">
        <MarketingHeader onRequestClick={scrollToRequest} />
        <main>
          <HeroSection onRequestClick={scrollToRequest} />
          <ServicesSection />
          <IndustriesSection />
          <HowItWorksSection />
          <PricingSection />
          <ExamplesGallery />
          <FAQSection />
          <RequestSection 
            ref={requestSectionRef}
            showConfirmation={showConfirmation}
            referenceId={referenceId}
            onRequestSuccess={handleRequestSuccess}
          />
        </main>
        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
