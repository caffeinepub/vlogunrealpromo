import { Section } from './Section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ExamplesGallery() {
  const examples = [
    {
      image: '/assets/generated/example-thumb-restaurant.dim_800x450.png',
      title: 'Fine Dining Experience',
      description: 'Elegant showcase of a premium restaurant\'s ambiance and signature dishes.'
    },
    {
      image: '/assets/generated/example-thumb-hotel.dim_800x450.png',
      title: 'Luxury Hotel Resort',
      description: 'Stunning tour of world-class accommodations and resort amenities.'
    },
    {
      image: '/assets/generated/example-thumb-cafe.dim_800x450.png',
      title: 'Artisan Coffee Shop',
      description: 'Warm, inviting atmosphere highlighting craft beverages and community vibe.'
    },
    {
      image: '/assets/generated/example-thumb-restaurant.dim_800x450.png',
      title: 'Fast Casual Dining',
      description: 'Energetic video showcasing fresh ingredients and quick service.'
    },
    {
      image: '/assets/generated/example-thumb-hotel.dim_800x450.png',
      title: 'Boutique Hotel',
      description: 'Intimate look at unique design and personalized guest experiences.'
    },
    {
      image: '/assets/generated/example-thumb-cafe.dim_800x450.png',
      title: 'Modern Bistro',
      description: 'Contemporary dining space with focus on culinary innovation.'
    }
  ];

  return (
    <Section id="examples" className="bg-muted/30">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-display text-4xl sm:text-5xl font-bold">Our Work</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how we've helped brands like yours stand out with stunning promotional videos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example, index) => (
            <Card
              key={index}
              className="overflow-hidden border-border/50 hover:border-primary/50 transition-all group cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={example.image}
                  alt={example.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{example.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{example.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
