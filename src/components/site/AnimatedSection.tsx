import { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
  animationType?: 'fadeUp' | 'staggerCards' | 'fadeIn';
}

const AnimatedSection = ({ 
  id, 
  title, 
  description, 
  children, 
  animationType = 'fadeUp' 
}: AnimatedSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Content animation based on type
      if (contentRef.current) {
        switch (animationType) {
          case 'fadeUp':
            gsap.fromTo(contentRef.current,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: contentRef.current,
                  start: "top 85%",
                  toggleActions: "play none none reverse"
                }
              }
            );
            break;

          case 'staggerCards':
            const cards = contentRef.current.children;
            gsap.fromTo(cards,
              { opacity: 0, y: 40, x: (index) => index % 2 === 0 ? -20 : 20 },
              {
                opacity: 1,
                y: 0,
                x: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: contentRef.current,
                  start: "top 85%",
                  toggleActions: "play none none reverse"
                }
              }
            );
            break;

          case 'fadeIn':
            gsap.fromTo(contentRef.current,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: contentRef.current,
                  start: "top 85%",
                  toggleActions: "play none none reverse"
                }
              }
            );
            break;
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [animationType]);

  return (
    <section 
      ref={sectionRef}
      id={id} 
      aria-labelledby={`${id}-title`} 
      className="scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <header ref={headerRef} className="mb-10">
          <h2 id={`${id}-title`} className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
          )}
        </header>
        <div ref={contentRef} className="will-change-transform">
          {children}
        </div>
      </div>
    </section>
  );
};

export default AnimatedSection;