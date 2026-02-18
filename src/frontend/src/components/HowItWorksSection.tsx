import { Section } from './Section';
import { MessageSquare, Wand2, Video, CheckCircle } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      icon: MessageSquare,
      title: 'Share Your Vision',
      description: 'Fill out our simple request form with details about your business, desired style, and goals.'
    },
    {
      icon: Wand2,
      title: 'AI Magic Happens',
      description: 'Our AI analyzes your requirements and generates a custom video concept tailored to your brand.'
    },
    {
      icon: Video,
      title: 'Review & Refine',
      description: 'We send you a preview and work with you to perfect every detail until you\'re satisfied.'
    },
    {
      icon: CheckCircle,
      title: 'Launch & Promote',
      description: 'Receive your final video in multiple formats, ready to share across all your marketing channels.'
    }
  ];

  return (
    <Section id="how-it-works" className="bg-muted/30">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-display text-4xl sm:text-5xl font-bold">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From concept to completion in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                    <step.icon className="text-primary" size={28} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
