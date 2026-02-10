import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Replaces standard particles with twinkling sparkles
export const Sparkles: React.FC<{ count?: number }> = ({ count = 20 }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gold-200"
          style={{
            width: Math.random() * 2 + 1 + 'px',
            height: Math.random() * 2 + 1 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            opacity: 0,
            animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            boxShadow: '0 0 5px 1px rgba(255, 249, 196, 0.4)'
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
};

// New: Floating Hearts and Lotus Icons
export const FloatingIcons: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const elements = containerRef.current.children;
        
        // Random floating animation using GSAP
        Array.from(elements).forEach((el) => {
            gsap.to(el, {
                y: `-=${Math.random() * 300 + 200}`, // Float up 200-500px
                x: `+=${Math.random() * 100 - 50}`, // Sway left/right
                rotation: Math.random() * 360,
                duration: Math.random() * 10 + 15, // 15-25 seconds duration
                repeat: -1,
                ease: "none",
                yoyo: true, // Go back down? No, let's make it loop seamlessly by resetting
                modifiers: {
                    y: (y) => {
                        const val = parseFloat(y as string);
                        return `${val % (window.innerHeight + 100)}px`;
                    }
                }
            });
            // Separate fade animation
            gsap.to(el, {
                opacity: Math.random() * 0.3 + 0.1,
                duration: Math.random() * 2 + 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            })
        });
    }, []);

    const icons = [
        // Heart Path
        "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
        // Simple Flower/Star
        "M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z",
        // Outline Heart
        "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
    ];

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute text-gold-400/20"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100 + 10}%`, // Start slightly below top
                        fontSize: `${Math.random() * 20 + 20}px`,
                    }}
                >
                    <svg 
                        width="1em" 
                        height="1em" 
                        viewBox="0 0 24 24" 
                        fill={i % 3 === 2 ? "none" : "currentColor"} 
                        stroke="currentColor" 
                        strokeWidth={i % 3 === 2 ? "1.5" : "0"}
                    >
                        <path d={icons[i % 3]} />
                    </svg>
                </div>
            ))}
        </div>
    )
}

export const MandalaPattern: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`absolute pointer-events-none ${className}`} viewBox="0 0 100 100" fill="none" stroke="currentColor">
    <circle cx="50" cy="50" r="40" strokeWidth="0.5" />
    <path d="M50 10 Q60 10 60 20 T70 30 T80 40 T90 50 T80 60 T70 70 T60 80 T50 90 T40 80 T30 70 T20 60 T10 50 T20 40 T30 30 T40 20 T50 10 Z" strokeWidth="0.5" />
    <circle cx="50" cy="50" r="20" strokeWidth="0.5" />
    <path d="M50 30 L55 45 L70 50 L55 55 L50 70 L45 55 L30 50 L45 45 Z" fill="currentColor" opacity="0.5" />
    <circle cx="50" cy="50" r="5" fill="currentColor" opacity="0.8" />
  </svg>
);

export const DecorativeCorner: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br' }> = ({ position }) => {
  const rotation = {
    tl: 'rotate(0deg)',
    tr: 'rotate(90deg)',
    br: 'rotate(180deg)',
    bl: 'rotate(270deg)',
  };
  
  const styles = {
    tl: { top: 20, left: 20 },
    tr: { top: 20, right: 20 },
    br: { bottom: 20, right: 20 },
    bl: { bottom: 20, left: 20 },
  };

  return (
    <div 
      className="absolute w-24 h-24 md:w-32 md:h-32 pointer-events-none z-30 opacity-60 mix-blend-screen"
      style={{ ...styles[position] }}
    >
      <svg viewBox="0 0 100 100" fill="none" stroke="#d4af37" style={{ transform: rotation[position] }}>
        <path d="M5 5 L95 5 L95 20 L20 20 L20 95 L5 95 Z" strokeWidth="1" fill="none" />
        <path d="M10 10 L80 10 L80 15 L15 15 L15 80 L10 80 Z" strokeWidth="0.5" fill="none" />
        <path d="M25 25 Q 50 5 75 25 T 100 50" strokeWidth="0.2" fill="none" opacity="0.5" />
        <circle cx="10" cy="10" r="2" fill="#d4af37" />
        <circle cx="90" cy="10" r="1.5" fill="#d4af37" />
        <circle cx="10" cy="90" r="1.5" fill="#d4af37" />
      </svg>
    </div>
  );
};

export const FloatingMandalas: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.05]">
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-float"
        style={{
          top: `${i * 30}%`,
          left: i % 2 === 0 ? '-15%' : '85%',
          width: '600px',
          height: '600px',
          animation: `spin-slow ${40 + i * 10}s linear infinite`,
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-gold-400" fill="none" strokeWidth="0.2">
           <circle cx="50" cy="50" r="45" strokeDasharray="2 1" />
           <path d="M50 5 L60 40 L95 50 L60 60 L50 95 L40 60 L5 50 L40 40 Z" />
           <circle cx="50" cy="50" r="25" />
           <path d="M50 25 A 25 25 0 0 1 75 50 A 25 25 0 0 1 50 75 A 25 25 0 0 1 25 50 A 25 25 0 0 1 50 25 Z" strokeWidth="0.1" />
        </svg>
      </div>
    ))}
  </div>
);