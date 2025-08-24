import { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}

const Section = ({ id, title, description, children }: SectionProps) => {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <header className="mb-12 text-center">
          <h2 id={`${id}-title`} className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">{description}</p>
          )}
        </header>
        <div className="motion-safe:animate-fade-in max-w-4xl mx-auto">{children}</div>
      </div>
    </section>
  );
};

export default Section;
