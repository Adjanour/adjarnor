import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { AfricanPattern } from "./AfricanPatterns";

const AnimatedHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background gradient animation
      if (backgroundRef.current) {
        gsap.fromTo(
          backgroundRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 2, ease: "power2.out" },
        );
      }

      // Headline staggered letter animation
      if (headlineRef.current) {
        const chars = headlineRef.current.textContent!.split("");
        headlineRef.current.innerHTML = chars
          .map((char) =>
            char === " " ? " " : `<span class="inline-block">${char}</span>`,
          )
          .join("");

        gsap.fromTo(
          headlineRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: "power2.out",
            delay: 0.5,
          },
        );
      }

      // Subtitle fade in with delay
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 1.2,
          },
        );
      }

      // Buttons fade in
      if (buttonsRef.current) {
        gsap.fromTo(
          buttonsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            delay: 1.8,
          },
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Button hover animations
  useEffect(() => {
    const heroButton = document.querySelector('[data-hero-button="true"]');
    const connectButton = document.querySelector(
      '[data-connect-button="true"]',
    );

    if (heroButton) {
      const handleMouseEnter = () => {
        gsap.to(heroButton, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
        const brandStart = getComputedStyle(document.documentElement)
          .getPropertyValue("--brand-start")
          .trim();

        gsap.to(heroButton, {
          boxShadow: `0 0 30px hsl(${brandStart} / 0.4)`,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(heroButton, {
          scale: 1,
          boxShadow: "0 0 0px hsl(var(--brand-start) / 0)",
          duration: 0.3,
          ease: "power2.out",
        });
      };

      heroButton.addEventListener("mouseenter", handleMouseEnter);
      heroButton.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        heroButton.removeEventListener("mouseenter", handleMouseEnter);
        heroButton.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    if (connectButton) {
      const handleMouseEnter = () => {
        gsap.to(connectButton, {
          borderColor: "hsl(var(--brand-start))",
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(connectButton, {
          borderColor: "hsl(var(--border))",
          duration: 0.3,
          ease: "power2.out",
        });
      };

      connectButton.addEventListener("mouseenter", handleMouseEnter);
      connectButton.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        connectButton.removeEventListener("mouseenter", handleMouseEnter);
        connectButton.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative pt-28 md:pt-32 mb-0 lg:mb-32 overflow-hidden"
    >
      {/* Animated background */}

      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-[hsl(30,60%,97%)] via-[hsl(20,65%,87%)] to-[hsl(10,70%,78%)/0.08]"
        style={{
          background:
            "linear-gradient(135deg, hsl(30,60%,97%), hsl(20,65%,87%), hsl(10,70%,78% / 0.08))",
        }}
      />

      {/* African pattern overlay */}
      {/* <div className="absolute inset-0 text-foreground">
        <AfricanPattern />
      </div> */}

      <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="max-w-3xl">
          <h1
            ref={headlineRef}
            className="font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl"
          >
            Building Africa's Future, One Line of Code at a Time
          </h1>
          <p
            ref={subtitleRef}
            className="mt-4 text-lg text-muted-foreground md:text-xl"
          >
            Computer Scientist • Engineering Craftsman • Pan-African Visionary
          </p>
          <div ref={buttonsRef} className="mt-8 flex flex-wrap gap-3">
            <a href="#projects">
              <Button
                variant="secondary"
                className="h-11 px-6 transition-transform will-change-transform"
                data-hero-button="true"
              >
                View My Work
              </Button>
            </a>
            <a href="#contact">
              <Button
                variant="outline"
                className="h-11 px-6 transition-colors will-change-transform"
                data-connect-button="true"
              >
                Let's Connect
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedHero;
