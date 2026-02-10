import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set target date to Dec 14, 2024
    const targetDate = new Date("2024-12-14T18:00:00").getTime();
    
    const calculateTime = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        
        return {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
        };
    };

    setTimeLeft(calculateTime()); 

    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    // Animation
    const ctx = gsap.context(() => {
        gsap.from(".timer-block", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%"
            }
        });

        gsap.from(".rsvp-box", {
            scale: 0.9,
            opacity: 0,
            duration: 1,
            delay: 0.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%"
            }
        });
    }, sectionRef);

    return () => {
        clearInterval(timer);
        ctx.revert();
    }
  }, []);

  const TimerUnit = ({ value, label }: any) => (
    <div className="timer-block flex flex-col items-center p-6 md:p-8 bg-gradient-to-br from-navy-950 to-navy-900 border border-gold-400/20 shadow-xl min-w-[100px] md:min-w-[150px] relative overflow-hidden group rounded-sm">
      <div className="absolute inset-0 bg-gold-400/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
      <span className="relative font-cinzel text-3xl md:text-6xl text-gold-100 font-bold drop-shadow-md tabular-nums">{value.toString().padStart(2, '0')}</span>
      <span className="relative font-cinzel text-[8px] md:text-[10px] tracking-[0.4em] text-gold-400 uppercase mt-2 md:mt-4 opacity-70">{label}</span>
    </div>
  );

  return (
    <section ref={sectionRef} className="py-32 bg-navy-900 relative text-center px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        <div className="space-y-4">
          <p className="font-garamond text-gold-200 tracking-[0.4em] uppercase text-xs animate-pulse">Save The Date</p>
          <h3 className="font-cinzel text-4xl md:text-5xl text-gold-400">December 14th, 2024</h3>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          <TimerUnit value={timeLeft.days} label="Days" />
          <TimerUnit value={timeLeft.hours} label="Hours" />
          <TimerUnit value={timeLeft.minutes} label="Mins" />
          <TimerUnit value={timeLeft.seconds} label="Secs" />
        </div>

        <div className="rsvp-box mt-24 max-w-2xl mx-auto p-10 md:p-16 bg-navy-950/80 backdrop-blur-sm border-double border-4 border-gold-400/20 relative shadow-2xl">
          {/* Decorative Corners */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold-400/60"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold-400/60"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold-400/60"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold-400/60"></div>
          
          <h4 className="font-script text-5xl text-gold-100 mb-6">Will You Join Us?</h4>
          <p className="font-garamond text-gold-200/60 italic mb-10 text-lg leading-relaxed">
            We would be honored by your presence as we begin this new chapter of our lives together.
          </p>
          
          <button className="relative px-12 py-4 bg-transparent border border-gold-400/40 text-gold-400 font-cinzel font-bold text-xs tracking-[0.4em] uppercase overflow-hidden group transition-all hover:border-gold-400 hover:text-navy-950 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
             <div className="absolute inset-0 w-0 bg-gold-400 transition-all duration-[400ms] ease-out group-hover:w-full"></div>
             <span className="relative z-10">R.S.V.P. Now</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;