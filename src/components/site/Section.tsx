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
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <header className="mb-10">
          <h2 id={`${id}-title`} className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
          )}
        </header>
        <div className="motion-safe:animate-fade-in">{children}</div>
      </div>
    </section>
  );
};

export default Section;
