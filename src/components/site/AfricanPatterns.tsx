import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// African-inspired geometric pattern component
export const AfricanPattern = ({ className = "" }: { className?: string }) => {
  const patternRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (patternRef.current) {
      // Slow rotation animation
      gsap.to(patternRef.current, {
        rotation: 360,
        duration: 120,
        repeat: -1,
        ease: "none"
      });
    }
  }, []);

  return (
    <svg
      ref={patternRef}
      className={`absolute inset-0 w-full h-full opacity-10 ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="african-triangles" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <polygon points="5,0 0,8.66 10,8.66" fill="currentColor" opacity="0.3" />
          <polygon points="0,1.34 5,10 10,1.34" fill="currentColor" opacity="0.2" />
        </pattern>
        <pattern id="african-diamonds" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <polygon points="4,0 8,4 4,8 0,4" fill="currentColor" opacity="0.15" />
          <polygon points="2,0 6,4 2,8" fill="currentColor" opacity="0.1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#african-triangles)" />
      <rect width="100%" height="100%" fill="url(#african-diamonds)" transform="translate(5,5)" />
    </svg>
  );
};

// Horizontal divider with African patterns
export const AfricanDivider = () => {
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dividerRef.current) {
      gsap.fromTo(dividerRef.current, 
        { scaleX: 0, opacity: 0 },
        { 
          scaleX: 1, 
          opacity: 1, 
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <div ref={dividerRef} className="relative h-px w-full max-w-6xl mx-auto my-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent" />
      <svg 
        className="absolute inset-0 w-full h-8 -translate-y-1/2 top-1/2"
        viewBox="0 0 400 16"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <pattern id="divider-pattern" x="0" y="0" width="20" height="16" patternUnits="userSpaceOnUse">
            <polygon points="10,2 15,8 10,14 5,8" fill="hsl(var(--brand-start))" opacity="0.3" />
            <polygon points="2,8 8,4 14,8 8,12" fill="hsl(var(--brand-end))" opacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#divider-pattern)" />
      </svg>
    </div>
  );
};