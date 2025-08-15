import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useLenis = () => {
  useEffect(() => {
    // Handle reduced motion preference first
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      infinite: false,
    });

    // Add lenis class to html
    document.documentElement.classList.add('lenis');

    // Connect GSAP ScrollTrigger to Lenis
    lenis.on('scroll', ScrollTrigger.update);

    // Create animation function
    function raf(time: number) {
      lenis.raf(time);
    }

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      document.documentElement.classList.remove('lenis');
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
};