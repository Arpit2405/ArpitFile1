import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EventCard = ({ title, date, time, venue, description, icon, imageUrl }: any) => (
  <div className="event-card group relative bg-navy-950 border border-gold-400/10 p-8 md:p-10 overflow-hidden shadow-2xl flex flex-col items-center hover:border-gold-400/40 transition-colors duration-500 rounded-sm h-full">
    {/* Background Image with Overlay */}
    {imageUrl && (
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 ease-in-out">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover grayscale scale-110 group-hover:scale-100 transition-transform duration-[2000ms]" />
        <div className="absolute inset-0 bg-navy-900/50 mix-blend-multiply"></div>
      </div>
    )}
    
    {/* Ornamental Corner */}
    <div className="absolute top-0 right-0 w-20 h-20 bg-gold-400/5 -rotate-45 translate-x-10 -translate-y-10 group-hover:bg-gold-400/10 transition-colors"></div>

    <div className="relative z-10 text-center flex flex-col items-center w-full h-full">
      <div className="mb-6 transform group-hover:-translate-y-2 transition-transform duration-500">
        <div className="w-16 h-16 rounded-full border border-gold-400/30 flex items-center justify-center mb-4 mx-auto bg-navy-900 group-hover:scale-110 transition-transform duration-500 shadow-lg text-gold-400">
           {icon}
        </div>
        <h3 className="font-cinzel text-xl text-gold-100 tracking-[0.2em] uppercase font-bold">
          {title}
        </h3>
      </div>

      <div className="w-full border-y border-gold-400/10 py-4 mb-6 group-hover:border-gold-400/30 transition-colors">
        <p className="font-garamond text-3xl text-gold-400 italic font-semibold">{date}</p>
        <p className="font-cinzel text-[10px] text-white/50 tracking-[0.3em] uppercase mt-1">{time}</p>
      </div>

      <div className="mb-8 flex-grow">
        <p className="font-garamond text-gold-100/70 text-lg leading-relaxed max-w-[280px] mx-auto">
          {description}
        </p>
      </div>

      <div className="mt-auto">
        <div className="flex items-center justify-center gap-2 mb-6 opacity-70">
            <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            <span className="font-cinzel text-xs text-gold-200 tracking-widest">{venue}</span>
        </div>
        
        <button className="px-8 py-2 border border-gold-400/30 text-[10px] font-cinzel text-gold-300 uppercase tracking-[0.4em] hover:bg-gold-400 hover:text-navy-950 transition-all duration-300">
            View Map
        </button>
      </div>
    </div>
  </div>
);

const EventsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.fromTo(".event-card", 
            { y: 80, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                }
            }
        );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const events = [
    {
      title: "Haldi Ceremony",
      date: "Dec 12th",
      time: "10:30 AM",
      venue: "The City Palace",
      description: "A vibrant morning of colors, blessings, and traditional folk music to begin the festivities.",
      imageUrl: "https://images.unsplash.com/photo-1605218457336-9274474744d0?q=80&w=800&auto=format&fit=crop",
      icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
    },
    {
      title: "Sangeet Night",
      date: "Dec 13th",
      time: "07:30 PM",
      venue: "Royal Ballroom",
      description: "Put on your dancing shoes for a glamorous night of music, performances, and celebration.",
      imageUrl: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?q=80&w=800&auto=format&fit=crop",
      icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
    },
    {
      title: "The Wedding",
      date: "Dec 14th",
      time: "06:00 PM",
      venue: "Zenana Mahal",
      description: "The sacred union under the starlit sky as we take our seven vows surrounded by loved ones.",
      imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
      icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
    }
  ];

  return (
    <section ref={containerRef} className="py-32 px-6 bg-navy-800 relative">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 space-y-4">
          <span className="font-cinzel text-gold-400/60 text-xs tracking-[0.8em] uppercase block">Royal Celebrations</span>
          <h2 className="font-script text-6xl md:text-7xl text-gold-100 drop-shadow-lg">The Events</h2>
          <div className="flex items-center justify-center gap-4 opacity-50">
             <div className="h-[1px] w-12 bg-gold-400"></div>
             <div className="w-2 h-2 rounded-full bg-gold-400"></div>
             <div className="h-[1px] w-12 bg-gold-400"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
          {events.map((event, idx) => (
            <EventCard key={idx} {...event} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;