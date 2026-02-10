import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("User interaction needed for audio"));
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = 0.3;
    }
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-4">
       <div className={`transition-all duration-700 overflow-hidden ${isPlaying ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'}`}>
        <span className="font-cinzel text-[10px] tracking-widest text-gold-400 uppercase bg-navy-950/80 px-3 py-1 rounded-full border border-gold-400/20 backdrop-blur-md whitespace-nowrap">
            ♪ Wedding Shehnai
        </span>
      </div>

      <button 
        onClick={togglePlay}
        className="relative w-12 h-12 rounded-full border border-gold-400/30 bg-navy-950/80 text-gold-400 flex items-center justify-center backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all hover:scale-105 hover:border-gold-400 group"
      >
        <audio 
            ref={audioRef} 
            loop 
            src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Shehnai_music.ogg" 
        />
        
        {isPlaying ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
        
        {/* Animated Rings */}
        {isPlaying && (
          <>
            <div className="absolute inset-0 rounded-full border border-gold-400/40 animate-ping" style={{ animationDuration: '2s' }}></div>
            <div className="absolute inset-0 rounded-full border border-gold-400/20 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.6s' }}></div>
          </>
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;