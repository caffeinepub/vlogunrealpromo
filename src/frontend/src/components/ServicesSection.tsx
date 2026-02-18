import { Section } from './Section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, Wand2, Zap, Target, Palette, Globe } from 'lucide-react';

export function ServicesSection() {
  const services = [
    {
      icon: Video,
      title: 'Professional Video Production',
      description: 'High-quality promotional videos tailored to your brand identity and marketing goals.'
    },
    {
      icon: Wand2,
      title: 'AI-Powered Creation',
      description: 'Cutting-edge AI technology combined with creative expertise for stunning results.'
    },
    {
      icon: Zap,
      title: 'Fast Turnaround',
      description: 'Get your promotional video in as little as 48 hours without compromising quality.'
    },
    {
      icon: Target,
      title: 'Brand-Focused',
      description: 'Every video is crafted to highlight your unique selling points and brand story.'
    },
    {
      icon: Palette,
      title: 'Custom Styles',
      description: 'Choose from cinematic, modern, elegant, or energetic styles to match your vision.'
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Reach global audiences with videos in multiple languages and cultural contexts.'
    }
  ];

  return (
    <Section id="services" className="bg-muted/30">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-display text-4xl sm:text-5xl font-bold">What You Get</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create compelling promotional videos that drive results
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="text-primary" size={24} />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
