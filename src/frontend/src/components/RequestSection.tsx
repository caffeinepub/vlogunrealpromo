import { forwardRef } from 'react';
import { Section } from './Section';
import { RequestPromoVideoForm } from './RequestPromoVideoForm';
import { RequestConfirmation } from './RequestConfirmation';

interface RequestSectionProps {
  showConfirmation: boolean;
  referenceId: string;
  onRequestSuccess: (refId: string) => void;
}

export const RequestSection = forwardRef<HTMLElement, RequestSectionProps>(
  ({ showConfirmation, referenceId, onRequestSuccess }, ref) => {
    return (
      <Section id="request" ref={ref}>
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-display text-4xl sm:text-5xl font-bold">
              Request Your Promo Video
            </h2>
            <p className="text-xl text-muted-foreground">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          {showConfirmation ? (
            <RequestConfirmation referenceId={referenceId} />
          ) : (
            <RequestPromoVideoForm onSuccess={onRequestSuccess} />
          )}
        </div>
      </Section>
    );
  }
);

RequestSection.displayName = 'RequestSection';
