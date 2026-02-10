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

      // Subtle fade out on scroll
      gsap.to(textRef.current, {
        opacity: 0,
        y: -30,
        scale: 0.95,
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
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-navy-900">
      
      {/* Background Image Parallax Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          ref={imageRef}
          className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        {/* Gradient Overlays for readability and mood */}
        <div className="absolute inset-0 bg-navy-900/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-navy-900/30"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      </div>

      {/* Main Content */}
      <div ref={textRef} className="relative z-10 text-center px-6 transform perspective-1000 w-full max-w-4xl">
        <div className="mb-4">
            <div className="hero-text-line inline-block border-b border-gold-400/40 pb-2">
                <p className="font-cinzel text-gold-300 tracking-[0.4em] text-xs md:text-sm uppercase">
                    Together with their families
                </p>
            </div>
        </div>

        <div className="py-2">
            <h1 className="hero-text-line font-cinzel text-5xl md:text-8xl lg:text-9xl text-gold-100 font-bold mb-2 tracking-widest drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
            Arpit <span className="text-gold-400 font-script font-normal text-6xl md:text-8xl lg:text-9xl mx-4 align-middle">&</span> Jyoti
            </h1>
        </div>

        <div className="mb-8 flex items-center justify-center gap-4 opacity-80">
             <div className="hero-text-line h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-gold-400"></div>
             <div className="hero-text-line w-2 h-2 rotate-45 border border-gold-400 bg-gold-400/20"></div>
             <div className="hero-text-line h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-gold-400"></div>
        </div>

        <div>
            <p className="hero-text-line font-garamond text-xl md:text-3xl text-gold-200 italic tracking-wide leading-relaxed">
            Invite you to share in their joy <br/> and celebration of love
            </p>
        </div>
        
        <div className="mt-12">
            <p className="hero-text-line font-cinzel text-gold-100 text-sm md:text-lg tracking-[0.3em] uppercase inline-flex items-center gap-4 border border-gold-400/30 px-8 py-4 rounded-sm backdrop-blur-sm bg-navy-950/30">
                <span>Dec 14, 2024</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                <span>Udaipur</span>
            </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce">
         <span className="text-[10px] uppercase tracking-widest text-gold-300 font-cinzel">Scroll</span>
         <svg className="w-6 h-6 text-gold-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </div>
    </section>
  );
};

export default HeroSection;