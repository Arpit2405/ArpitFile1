import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StorySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image slide in from left
      gsap.fromTo(imgRef.current, 
        { x: -50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 1.5, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );

      // Text slide in from right with stagger
      const textElements = textRef.current?.children;
      if (textElements) {
          gsap.fromTo(textElements,
            { x: 50, opacity: 0 },
            { 
              x: 0, 
              opacity: 1, 
              duration: 1.5, 
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
              }
            }
          );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 md:px-20 relative overflow-hidden bg-navy-900">
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-24 items-center relative z-10">
        
        {/* Left Side: Image with Frames */}
        <div ref={imgRef} className="relative group perspective-1000 order-2 md:order-1">
          <div className="absolute -top-4 -left-4 w-full h-full border border-gold-400/20 rounded-t-full pointer-events-none z-0 transition-transform duration-700 group-hover:-translate-x-2 group-hover:-translate-y-2"></div>
          <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold-400/20 rounded-b-full pointer-events-none z-0 transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2"></div>
          
          <div className="relative z-10 rounded-t-full rounded-b-full overflow-hidden shadow-2xl bg-navy-950 border-4 border-navy-800">
            <img 
              src="https://images.unsplash.com/photo-1595814433015-e6f5cd696144?q=80&w=1200&auto=format&fit=crop" 
              alt="The Couple" 
              className="w-full h-[500px] object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-60"></div>
          </div>
        </div>
        
        {/* Right Side: Content */}
        <div ref={textRef} className="space-y-10 text-center md:text-left order-1 md:order-2">
          <div className="space-y-4">
            <h2 className="font-cinzel text-5xl md:text-6xl text-gold-200 tracking-[0.1em] font-light uppercase">
              Our Journey
            </h2>
            <div className="w-24 h-[1px] bg-gold-400/40 mx-auto md:mx-0"></div>
          </div>
          
          <div className="space-y-6 font-garamond text-xl md:text-2xl text-gold-100/80 leading-relaxed">
            <p>
              <span className="text-5xl float-left mr-2 font-script text-gold-400">"</span>
              In the middle of an ordinary life, love gives us a fairy tale. Across distance and time, destiny brought us together.
            </p>
            <p>
              What started as a simple conversation blossomed into a 
              beautiful promise of forever. We invite you to be part of our
              happiest moment as we turn the page to a new chapter.
            </p>
          </div>

          <div className="pt-8 flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-6">
               <span className="font-script text-6xl text-gold-400 drop-shadow-md">Arpit</span>
               <div className="w-12 h-12 rounded-full border border-gold-400/30 flex items-center justify-center">
                   <span className="font-cinzel text-sm text-gold-200">&</span>
               </div>
               <span className="font-script text-6xl text-gold-400 drop-shadow-md">Jyoti</span>
            </div>
            <p className="font-cinzel text-xs tracking-[0.4em] text-gold-400/60 uppercase mt-2">Forever Begins Now</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;