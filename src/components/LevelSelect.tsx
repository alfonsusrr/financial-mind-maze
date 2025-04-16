'use client';

import React from 'react';
import { FaGraduationCap, FaPiggyBank, FaChartLine, FaCoins, FaGlobe, FaLock } from 'react-icons/fa';
import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi';
import { useGame } from './GameEngine';

interface LevelInfo {
  id: number;
  title: string;
  description: string;
  available: boolean;
  background?: string;
  icon: React.ReactNode;
}

// Sample level data - in a real app, this might come from an API or config file
const LEVELS: LevelInfo[] = [
  {
    id: 1,
    title: "Career Path Decision",
    description: "Make key early career decisions about education, job, and career opportunities that will impact your financial future.",
    background: "/level1/s1_start.mp4",
    available: true,
    icon: <FaGraduationCap className="text-2xl" />
  },
  {
    id: 2,
    title: "The 401(k) & Insurance Choices",
    description: "Navigate retirement planning with 401(k) and personal insurance options.",
    background: "/level2/s1_start.mp4",
    available: true,
    icon: <FaPiggyBank className="text-2xl" />
  },
  {
    id: 3,
    title: "Long-Term Investment Strategy",
    description: "Build emotional resilience during market declines and make rational investment decisions under pressure.",
    background: "/level3/l3_intro.mp4",
    available: true,
    icon: <FaChartLine className="text-2xl" />
  },
  {
    id: 4,
    title: "The Hot IPO Decision",
    description: "Resist hype and FOMO while evaluating IPO investments, learning about lock-up periods and anchoring bias.",
    background: "/level4/l4_intro.mp4",
    available: true,
    icon: <GiReceiveMoney className="text-2xl" />
  },
  {
    id: 5,
    title: "The Crypto Frontier",
    description: "Navigate cryptocurrency investing with its extreme volatility, FOMO, and market cycles while avoiding common psychological traps.",
    background: "/level5/s1_start.mp4",
    available: true,
    icon: <FaCoins className="text-2xl" />
  },
  {
    id: 6,
    title: "Investor in Market Turbulence",
    description: "Navigate complex global markets and geopolitical risks as an established investor with a diversified portfolio.",
    background: "/level6/s1_start.mp4",
    available: true,
    icon: <FaGlobe className="text-2xl" />
  }
];

interface LevelCardProps {
  level: LevelInfo;
  onSelect: () => void;
}

export default function LevelSelect() {
  const { startGame, resetGame } = useGame();
  
  // const startLevel = (levelId: number) => {
  //   startGame(levelId);
  // };
  
  const availableLevels = LEVELS;

  return (
    <div className="h-screen overflow-auto bg-gradient-to-br from-gray-950 to-black py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-game mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
            FINANCIAL MIND MAZE
          </h1>
          <p className="text-yellow-100 text-lg max-w-2xl mx-auto">
            Choose a level to challenge your financial knowledge and decision-making skills
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
          {availableLevels.map((level) => (
            <LevelCard
              key={level.id}
              level={level}
              onSelect={() => startGame(level.id)}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button
            className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold text-xl font-game rounded-lg hover:shadow-[0_0_20px_rgba(250,204,21,0.6)] transform transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            onClick={() => startGame(1)}
          >
            <FaGraduationCap /> START WITH LEVEL 1
          </button>
          
          <button
            className="px-8 py-4 bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold text-xl font-game rounded-lg hover:bg-yellow-400/20 transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(250,204,21,0.4)] flex items-center justify-center gap-2"
            onClick={resetGame}
          >
            <GiPayMoney /> BACK TO INTRO
          </button>
        </div>
      </div>
    </div>
  );
}

function LevelCard({ level, onSelect }: LevelCardProps) {
  const isVideo = level.background?.endsWith('.mp4') || level.background?.endsWith('.webm');
  
  const bgStyle = !isVideo && level.background 
    ? { 
        backgroundImage: `url(${level.background})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : {};
    
  return (
    <div 
      className={`relative overflow-hidden rounded-2xl border-2 ${
        level.available 
          ? 'border-yellow-400/30 hover:border-yellow-400/70' 
          : 'border-gray-700/30 opacity-70'
      } transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(250,204,21,0.3)] group min-h-[280px]`}
      style={bgStyle}
    >
      {isVideo && level.background && (
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={level.background} type={level.background.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
        </video>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>
      
      <div className="relative p-6 flex flex-col h-full min-h-[280px]">
        <div className="flex items-center mb-4">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-400 text-black font-bold text-xl">
            {level.icon}
          </span>
          <h3 className="ml-4 text-2xl font-bold font-game text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]">
            {level.title}
          </h3>
        </div>
        
        <p className="text-yellow-100/90 mb-6 flex-grow drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">{level.description}</p>
        
        <div className="mt-auto">
          {level.available ? (
            <button
              onClick={onSelect}
              className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold font-game rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(250,204,21,0.5)] hover:scale-105 group-hover:animate-pulse flex items-center justify-center gap-2"
            >
              <FaChartLine /> PLAY NOW
            </button>
          ) : (
            <div className="flex items-center justify-center gap-2 text-gray-400 py-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <FaLock />
              LOCKED
            </div>
          )}
        </div>
      </div>
    </div>
  );
}