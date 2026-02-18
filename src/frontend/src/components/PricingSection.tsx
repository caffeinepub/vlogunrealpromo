import { Section } from './Section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: '$299',
      description: 'Perfect for small businesses and startups',
      features: [
        '30-second promotional video',
        '1 revision included',
        'HD 1080p quality',
        '3-5 day delivery',
        'Social media formats',
        'Background music'
      ]
    },
    {
      name: 'Professional',
      price: '$599',
      description: 'Ideal for established brands',
      features: [
        '60-second promotional video',
        '3 revisions included',
        '4K quality',
        '48-hour delivery',
        'All formats (social, web, TV)',
        'Custom music & voiceover',
        'Brand integration',
        'Priority support'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large campaigns and multiple videos',
      features: [
        'Multiple videos',
        'Unlimited revisions',
        '4K+ quality',
        '24-hour rush available',
        'Full brand package',
        'Dedicated account manager',
        'Multi-language support',
        'Advanced analytics'
      ]
    }
  ];

  return (
    <Section id="pricing">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-display text-4xl sm:text-5xl font-bold">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include our AI-powered creation process.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${
                plan.popular
                  ? 'border-primary shadow-glow-sm scale-105'
                  : 'border-border/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <div className="text-4xl font-bold text-primary mb-2">{plan.price}</div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="text-primary flex-shrink-0 mt-0.5" size={20} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => {
                    const element = document.querySelector('#request');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
