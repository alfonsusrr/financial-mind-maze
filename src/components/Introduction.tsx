'use client';

import { useGame } from './GameEngine';
import { useState, useEffect, useRef } from 'react';

export function Introduction() {
  const { startGame } = useGame();
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Animate text appearance
    const textTimer = setTimeout(() => setShowText(true), 0);
    // Animate button appearance
    const buttonTimer = setTimeout(() => setShowButton(true), 0);
    
    // Play video
    if (videoRef.current) {
      videoRef.current.play();
    }
    
    return () => {
      clearTimeout(textTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <div className="introduction w-full h-full relative overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        <source src="opening.mp4"/>
        Your browser does not support the video tag.
      </video>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <div className="game-title-container mb-12">
          <h1 
            className="text-6xl font-bold text-yellow-400 font-game tracking-wider text-shadow-lg shadow-yellow-600/50"
            style={{
              opacity: showText ? 1 : 0,
              transform: showText ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'all 0.8s ease-out'
            }}
          >
            FINANCIAL MIND MAZE
          </h1>
        </div>

        <div 
          className="game-intro-text max-w-2xl text-center bg-black/75 p-8 rounded-lg border-2 border-yellow-400"
          style={{
            opacity: showText ? 1 : 0,
            transform: showText ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-out 0.3s'
          }}
        >
          <p className="mb-6 text-xl text-yellow-100 font-game leading-relaxed">
            <span className="text-yellow-400 font-bold">Welcome, Adventurer!</span> Embark on a thrilling journey through the complex world of financial decision-making. This isn&apos;t just a game - it&apos;s a quest to uncover hidden psychological traps that can sabotage your financial future.
          </p>
          <p className="text-xl text-yellow-100 font-game leading-relaxed">
            Navigate challenging scenarios, confront your biases, and discover powerful strategies to master your money mindset. Will you conquer the maze and emerge financially wiser?
          </p>
        </div>

        <div 
          className="mt-12 flex flex-col sm:flex-row items-center gap-4" 
          style={{
            opacity: showButton ? 1 : 0,
            transform: showButton ? 'scale(1)' : 'scale(0.8)',
            transition: 'all 0.5s ease-out'
          }}
        >
          <button
            className="px-8 py-4 bg-yellow-400 text-black font-bold text-2xl font-game rounded-lg hover:bg-yellow-300 transform transition-all duration-300 shadow-lg hover:shadow-yellow-400/50"
            style={{
              cursor: showButton ? 'pointer' : 'default'
            }}
            onClick={() => startGame(1)}
            disabled={!showButton}
          >
            START YOUR JOURNEY
          </button>
          
          <button
            className="px-8 py-4 bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold text-2xl font-game rounded-lg hover:bg-yellow-400/10 transform transition-all duration-300 shadow-lg"
            style={{
              cursor: showButton ? 'pointer' : 'default'
            }}
            onClick={() => startGame(-1)}
            disabled={!showButton}
          >
            SELECT LEVEL
          </button>
        </div>
      </div>
    </div>
  );
}
