import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { DynamicElements } from "./DynamicElements";
import { useState, useEffect } from "react";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#writing", label: "Writing" },
  { href: "#speaking", label: "Speaking" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav className={`mx-auto max-w-6xl transition-all duration-500 ease-out ${
        isScrolled 
          ? 'backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl shadow-2xl shadow-black/10 px-6 py-3' 
          : 'backdrop-blur-md bg-background/60 border border-border/30 rounded-full px-8 py-4'
      }`}>
        <div className="flex items-center justify-between">
          <a href="#home" className="font-display text-lg font-semibold tracking-tight hover:text-primary transition-colors">
            Bernard Kirk
          </a>
          
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href} 
                className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <DynamicElements />
            <ThemeToggle />
            <a href="#contact">
              <Button variant="glass" className="h-9 px-5">Let's Connect</Button>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
