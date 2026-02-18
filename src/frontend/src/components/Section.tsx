import { ReactNode, forwardRef } from 'react';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, children, className = '' }, ref) => {
    return (
      <section id={id} ref={ref} className={`py-20 lg:py-32 ${className}`}>
        <div className="container mx-auto px-4">
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = 'Section';
