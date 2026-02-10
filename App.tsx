import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import EventsSection from './components/EventsSection';
import CountdownSection from './components/CountdownSection';
import AudioPlayer from './components/AudioPlayer';
import { FloatingIcons, Sparkles, MandalaPattern, DecorativeCorner, FloatingMandalas } from './components/DesignElements';

const App: React.FC = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const doorContainerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const entryContentRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Lock scroll when on entry screen
  useEffect(() => {
    document.body.style.overflow = hasEntered ? 'unset' : 'hidden';
  }, [hasEntered]);

  const handleOpen = () => {
    const tl = gsap.timeline({
      onComplete: () => setHasEntered(true)
    });

    // 1. Fade out the entry text/button
    tl.to(entryContentRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: "power2.in"
    });

    // 2. Scale the door container slightly for anticipation (Zoom effect)
    tl.to(doorContainerRef.current, {
      scale: 1.05,
      duration: 1.2,
      ease: "power2.inOut"
    }, "-=0.4");

    // 3. Open Doors with 3D Rotation
    tl.to([leftDoorRef.current, rightDoorRef.current], {
      rotateY: (index) => index === 0 ? -110 : 110, 
      xPercent: (index) => index === 0 ? -20 : 20, // Slide out slightly as they rotate
      duration: 2.5,
      ease: "power2.inOut",
      transformOrigin: (index) => index === 0 ? "left center" : "right center"
    }, "-=0.8");

    // 4. Fade out container
    tl.to(doorContainerRef.current, {
      opacity: 0,
      duration: 1,
      delay: 0.2,
      onComplete: () => {
         if(doorContainerRef.current) doorContainerRef.current.style.display = 'none';
      }
    }, "-=1.5");
  };

  return (
    <div className="relative bg-navy-900 min-h-screen selection:bg-gold-400 selection:text-navy-950 font-garamond overflow-x-hidden">
      
      {/* --- ENTRY SCREEN (DOORS) --- */}
      <div 
        ref={doorContainerRef}
        className="fixed inset-0 z-[100] bg-navy-900 perspective-2000 overflow-hidden flex items-center justify-center"
        style={{ perspective: '2000px' }}
      >
        {/* Background texture behind doors */}
        <div className="absolute inset-0 bg-navy-950"></div>

        {/* LEFT DOOR */}
        <div 
            ref={leftDoorRef}
            className="absolute top-0 left-0 w-1/2 h-full bg-navy-900 z-20 border-r border-gold-400/30 shadow-[10px_0_50px_rgba(0,0,0,0.8)] origin-left flex items-center justify-end"
        >
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
            <div className="absolute inset-4 border border-gold-400/20"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <MandalaPattern className="w-[120%] h-auto text-gold-400 -translate-x-1/4 animate-spin-slow" />
            </div>
             
             {/* Handle */}
             <div className="mr-4 lg:mr-8 w-10 lg:w-16 h-32 lg:h-64 border-2 border-gold-400/30 rounded-l-full flex items-center justify-end pr-3 bg-navy-950/80 backdrop-blur-sm shadow-2xl">
                <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-gold-400 shadow-[0_0_15px_#d4af37]"></div>
             </div>
        </div>

        {/* RIGHT DOOR */}
        <div 
            ref={rightDoorRef}
            className="absolute top-0 right-0 w-1/2 h-full bg-navy-900 z-20 border-l border-gold-400/30 shadow-[-10px_0_50px_rgba(0,0,0,0.8)] origin-right flex items-center justify-start"
        >
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
             <div className="absolute inset-4 border border-gold-400/20"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <MandalaPattern className="w-[120%] h-auto text-gold-400 translate-x-1/4 animate-spin-slow" />
            </div>

            {/* Handle */}
            <div className="ml-4 lg:ml-8 w-10 lg:w-16 h-32 lg:h-64 border-2 border-gold-400/30 rounded-r-full flex items-center justify-start pl-3 bg-navy-950/80 backdrop-blur-sm shadow-2xl">
               <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-gold-400 shadow-[0_0_15px_#d4af37]"></div>
            </div>
        </div>

        {/* ENTRY CONTENT */}
        <div ref={entryContentRef} className="relative z-30 flex flex-col items-center justify-center text-center px-4 w-full max-w-lg mx-auto">
           <div className="mb-6 lg:mb-10 animate-pulse-slow">
              <span className="text-4xl lg:text-6xl text-gold-400 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">🕉️</span>
           </div>
           
           <p className="font-cinzel text-gold-300 text-sm lg:text-xl tracking-[0.4em] mb-4 font-bold uppercase drop-shadow-lg">
             The Wedding Of
           </p>

           <h1 className="font-cinzel text-4xl lg:text-7xl text-gold-100 font-bold mb-10 lg:mb-16 tracking-wider drop-shadow-2xl">
              Arpit <span className="text-gold-400 font-script mx-2 font-thin text-5xl lg:text-8xl">&</span> Jyoti
           </h1>
            
           <button
              onClick={handleOpen}
              className="group relative px-10 py-3 lg:px-14 lg:py-5 overflow-hidden rounded-sm border border-gold-400/40 bg-navy-950/40 backdrop-blur-sm text-gold-200 font-cinzel tracking-[0.3em] text-[10px] lg:text-xs uppercase transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:border-gold-400 hover:text-white"
            >
              <span className="relative z-10">Enter Celebration</span>
              <div className="absolute inset-0 bg-gold-400/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-700 ease-out"></div>
            </button>
            
            <div className="fixed inset-0 pointer-events-none w-full h-full">
                <DecorativeCorner position="tl" />
                <DecorativeCorner position="tr" />
                <DecorativeCorner position="bl" />
                <DecorativeCorner position="br" />
            </div>
        </div>
        
        <Sparkles count={30} />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div 
        ref={mainContentRef}
        className={`main-wrapper relative transition-opacity duration-1000 ${hasEntered ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Floating Background Elements Layer */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <FloatingMandalas />
            <FloatingIcons />
            <Sparkles count={15} />
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-navy-900 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-navy-900 to-transparent"></div>
        </div>

        <AudioPlayer />
        
        <main className="relative z-10">
          <HeroSection />
          <StorySection />
          <EventsSection /> 
          <CountdownSection />
        </main>
        
        <footer className="py-24 text-center bg-gradient-to-t from-navy-950 to-navy-900 relative z-20 border-t border-gold-400/10">
          <div className="mb-8 text-gold-400/20 flex justify-center">
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
          </div>
          <p className="font-script text-5xl md:text-7xl text-gold-400 mb-8 drop-shadow-lg">Thank You</p>
          <p className="font-cinzel text-xs md:text-sm text-gold-200 tracking-[0.4em] uppercase opacity-60">The Sharma & Verma Families</p>
        </footer>
      </div>
    </div>
  );
};

export default App;