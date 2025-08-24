import { useRef, useState } from 'react';
import { Mail, Github, Linkedin, Twitter, MousePointer } from 'lucide-react';
import Section from '@/components/site/Section';

const FloatingContactBubbles = () => {
  const [hoveredBubble, setHoveredBubble] = useState(null);

  const contactData = [
    {
      id: 'email',
      icon: Mail,
      label: 'Email Bernard',
      href: 'mailto:bernard@example.com',
      color: '#f8fafc',
      position: { x: -2, y: 1, z: 0 }
    },
    {
      id: 'github',
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/bernardusername',
      color: '#e2e8f0',
      position: { x: 2, y: 1.5, z: -1 }
    },
    {
      id: 'linkedin',
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/bernardusername',
      color: '#cbd5e1',
      position: { x: -1.5, y: -1, z: 1 }
    },
    {
      id: 'twitter',
      icon: Twitter,
      label: 'Twitter/X',
      href: 'https://twitter.com/bernardusername',
      color: '#94a3b8',
      position: { x: 1.8, y: -0.5, z: 0.5 }
    }
  ];


  const handleBubbleClick = (href) => {
    window.open(href, '_blank');
  };

  return (
    <Section 
          id="contact" 
          title="Let's Connect" 
          description="Open to collaborations, mentorship, and building for Africa's future."
        >

      {/* UI Overlay */}
      <div className="relative z-10 flex flex-col p-8">

        {/* Interactive Bubble UI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl">
          {contactData.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <button
                key={contact.id}
                onClick={() => handleBubbleClick(contact.href)}
                onMouseEnter={() => setHoveredBubble(contact.id)}
                onMouseLeave={() => setHoveredBubble(null)}
                className="group relative"
                style={{
                  animationDelay: `${index * 200}ms`,
                  animation: 'bubble-appear 0.8s ease-out forwards'
                }}
              >
                <div 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full backdrop-blur-lg border border-gray-200/50 dark:border-white/20 flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 hover:backdrop-blur-xl bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30"
                  style={{
                    boxShadow: hoveredBubble === contact.id 
                      ? `0 0 30px rgba(148, 163, 184, 0.5), inset 0 0 20px rgba(148, 163, 184, 0.3)` 
                      : `0 8px 32px rgba(0,0,0,0.1) dark:rgba(255,255,255,0.1)`
                  }}
                >
                  <Icon 
                    size={24} 
                    className="text-gray-700 dark:text-white mb-2 transition-all duration-300 group-hover:scale-125"
                  />
                  <span className="text-xs text-gray-600 dark:text-white/80 font-medium text-center px-2 transition-colors duration-300">
                    {contact.label}
                  </span>
                </div>

                {/* Ripple effect */}
                <div 
                  className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle, rgba(148, 163, 184, 0.2) 0%, transparent 70%)`,
                    opacity: hoveredBubble === contact.id ? 1 : 0,
                    animation: hoveredBubble === contact.id ? 'pulse-ring 2s infinite' : 'none'
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Floating cursor indicator */}
        {hoveredBubble && (
          <div className="fixed top-4 left-4 z-20 flex items-center gap-2 text-gray-600 dark:text-white/80 animate-fade-in transition-colors duration-300">
            <MousePointer size={16} />
            <span className="text-sm">Click to connect</span>
          </div>
        )}
      </div>
    </Section>
  );
};

export default FloatingContactBubbles;