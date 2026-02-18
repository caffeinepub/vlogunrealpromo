import { Section } from './Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UtensilsCrossed, Hotel, Coffee, ShoppingBag, Dumbbell, Sparkles } from 'lucide-react';

export function IndustriesSection() {
  const industries = [
    {
      icon: UtensilsCrossed,
      title: 'Restaurants',
      description: 'Showcase your culinary creations and dining atmosphere with mouth-watering visuals.'
    },
    {
      icon: Hotel,
      title: 'Hotels & Resorts',
      description: 'Highlight your accommodations, amenities, and guest experiences in stunning detail.'
    },
    {
      icon: Coffee,
      title: 'Cafes & Bars',
      description: 'Capture the vibe and energy of your establishment with engaging video content.'
    },
    {
      icon: ShoppingBag,
      title: 'Retail & E-commerce',
      description: 'Present your products and brand story in a way that converts viewers to customers.'
    },
    {
      icon: Dumbbell,
      title: 'Fitness & Wellness',
      description: 'Inspire potential clients with dynamic videos of your facilities and services.'
    },
    {
      icon: Sparkles,
      title: 'Events & Entertainment',
      description: 'Promote your events and venues with captivating promotional content.'
    }
  ];

  return (
    <Section id="industries">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-display text-4xl sm:text-5xl font-bold">Industries We Serve</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Specialized promotional videos for diverse business sectors
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <Card key={index} className="border-border/50 hover:shadow-glow-sm transition-all">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                  <industry.icon className="text-primary" size={28} />
                </div>
                <CardTitle className="text-xl">{industry.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{industry.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
