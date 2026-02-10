import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for the background image
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

    gsap.to(textRef.current, {
  opacity: 0.7,
  y: -10,
  scale: 0.98,
  scrollTrigger: {
    trigger: containerRef.current,
    start: "top top",
    end: "40% top",
    scrub: true
  }
});

      // Initial reveal animation 
      const tl = gsap.timeline({ delay: 0.5 });
      tl.fromTo(".hero-text-line", 
        { y: 80, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.8, stagger: 0.25, ease: "power4.out" }
      );
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

 return (
  <section
    ref={containerRef}
    className="relative min-h-screen w-full bg-navy-900 flex items-center justify-center p-4 md:p-10"
  >
    {/* Frame Container */}
    <div className="relative w-full max-w-6xl  h-[100vh] md:h-[100vh] rounded-3xl overflow-hidden border border-gold-400/30 shadow-2xl">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          ref={imageRef}
          className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/a.png')`,
          }}
        />

      <div className="absolute inset-0 bg-navy-900/20 mix-blend-multiply"></div>
<div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/30 to-transparent"></div>

        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>

        {/* Extra frame glow */}
        <div className="absolute inset-0 ring-1 ring-gold-400/20 rounded-3xl"></div>
      </div>

      {/* Main Content */}
      <div
        ref={textRef}
        className="relative z-10 h-full flex items-center justify-center text-center px-6 md:px-12"
      >
        <div className="w-full max-w-4xl">
          {/* same content as your code */}
          ...
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce z-20">
        <span className="text-[10px] uppercase tracking-widest text-gold-300 font-cinzel">
          Scroll
        </span>
        <svg
          className="w-6 h-6 text-gold-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  </section>
);

};

export default HeroSection;