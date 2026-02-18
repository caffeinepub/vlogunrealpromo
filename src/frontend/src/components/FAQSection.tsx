import { Section } from './Section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQSection() {
  const faqs = [
    {
      question: 'How long does it take to create a promotional video?',
      answer: 'Our standard turnaround time is 3-5 business days. For Professional plans, we offer 48-hour delivery, and Enterprise clients can request 24-hour rush service for urgent projects.'
    },
    {
      question: 'What information do you need from me?',
      answer: 'We need basic information about your business, your target audience, desired video style, any specific footage or images you want included, and your brand guidelines. Our request form makes it easy to provide all necessary details.'
    },
    {
      question: 'Can I request revisions?',
      answer: 'Yes! All plans include revisions. Starter plans include 1 revision, Professional plans include 3 revisions, and Enterprise plans include unlimited revisions until you\'re completely satisfied.'
    },
    {
      question: 'What video formats will I receive?',
      answer: 'You\'ll receive your video in multiple formats optimized for different platforms: square (1:1) for Instagram, vertical (9:16) for Stories and TikTok, and landscape (16:9) for YouTube and websites. All videos are delivered in HD or 4K quality.'
    },
    {
      question: 'Do you provide voiceover and music?',
      answer: 'Yes! Professional and Enterprise plans include custom music selection and professional voiceover in your choice of language. We have access to extensive royalty-free music libraries and professional voice talent.'
    },
    {
      question: 'Can you create videos in multiple languages?',
      answer: 'Absolutely! We support video creation in multiple languages with native voiceover talent. This is especially useful for brands targeting international markets or multilingual audiences.'
    },
    {
      question: 'What makes your AI videos different?',
      answer: 'Our AI technology analyzes your brand, industry trends, and target audience to create videos that are not just visually stunning but strategically designed to convert. We combine AI efficiency with human creative oversight to ensure every video meets professional standards.'
    },
    {
      question: 'Do I own the rights to the video?',
      answer: 'Yes! Once you receive your final video, you have full commercial rights to use it across all your marketing channels without any additional fees or restrictions.'
    }
  ];

  return (
    <Section id="faq">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-display text-4xl sm:text-5xl font-bold">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about our AI promotional video service
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
