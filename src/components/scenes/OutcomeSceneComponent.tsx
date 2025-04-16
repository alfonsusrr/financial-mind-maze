import React, { useEffect, useState } from 'react';
import { OutcomeScene } from '../../types/games';
import SceneContainer from '../ui/SceneContainer';
import GameButton from '../ui/GameButton';
import { BsArrowRight, BsStars } from 'react-icons/bs';
import { FaChartLine, FaRegSmile, FaBrain } from 'react-icons/fa';
import { BiMoney } from 'react-icons/bi';

interface OutcomeSceneProps {
  scene: OutcomeScene;
  onNext: () => void;
}

const OutcomeSceneComponent: React.FC<OutcomeSceneProps> = ({ scene, onNext }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(true), 400);
    const statsTimer = setTimeout(() => setShowStats(true), 1500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(statsTimer);
    };
  }, []);

  const renderStatChange = (value: string | number | undefined, label: string, icon: React.ReactNode) => {
    if (typeof value !== 'number') return null;
    
    const isStress = label === 'Stress';
    const isPositive = isStress ? value < 0 : value > 0;
    const isNegative = isStress ? value > 0 : value < 0;
    
    const colorClass = isPositive ? 'text-green-400' : isNegative ? 'text-red-400' : 'text-gray-400';
    const bgClass = isPositive ? 'bg-green-900/30' : isNegative ? 'bg-red-900/30' : 'bg-gray-900/30';
    const borderClass = isPositive ? 'border-green-500/50' : isNegative ? 'border-red-500/50' : 'border-gray-500/50';
    const sign = value > 0 ? '+' : '';

    return (
      <div className={`flex items-center gap-2 p-2 rounded-lg ${bgClass} border ${borderClass}`}>
        <div className="text-xl">{icon}</div>
        <div>
          <div className="text-gray-300 text-xs">{label}</div>
          <div className={`text-base font-bold ${colorClass}`}>{sign}{value}</div>
        </div>
      </div>
    );
  };

  const renderROIPotential = (roi?: 'low' | 'moderate' | 'high') => {
    if (!roi) return null;
    
    const colorMap = {
      low: 'border-orange-500/50 bg-orange-900/20 text-orange-400',
      moderate: 'border-blue-500/50 bg-blue-900/20 text-blue-400',
      high: 'border-purple-500/50 bg-purple-900/20 text-purple-400'
    };
    
    return (
      <div className={`inline-block py-1 px-2 rounded-full border ${colorMap[roi]} text-xs font-semibold`}>
        ROI: {roi.charAt(0).toUpperCase() + roi.slice(1)}
      </div>
    );
  };

  return (
    <SceneContainer 
      background={scene.background} 
      videoBackground={scene.background.replace('.png', '.mp4')}
    >
      <div className="flex items-center justify-center h-full pt-20">
        <div className={`scene-info w-full max-w-2xl bg-black/75 p-6 rounded-lg border-2 border-yellow-400/50 transform transition-all duration-700 flex flex-col ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} max-h-[calc(100vh-120px)] overflow-y-auto backdrop-blur-sm`}>
          <h2 className="scene-title text-2xl font-game text-yellow-400 text-shadow-lg shadow-yellow-600/50 mb-3 animate-float flex items-center gap-2 justify-center">
            <BsStars className="text-yellow-300 text-lg" />
            {scene.title}
            <BsStars className="text-yellow-300 text-lg" />
          </h2>
          
          <div className="scene-description bg-black/30 p-3 rounded-md border border-yellow-200/20 shadow-inner mb-3">
            <p className="text-yellow-100 font-game leading-relaxed text-base tracking-wide text-center" style={{ whiteSpace: 'pre-wrap' }}>
              {scene.description}
            </p>
          </div>
          
          {scene.outcome && showStats && (
            <div className={`outcome-results bg-black/50 p-4 rounded-lg border border-yellow-500/20 mb-3 transform transition-all duration-700 animate-fade-in`} style={{ animationDelay: '0.5s' }}>
              <h3 className="text-lg text-yellow-300 font-game mb-3 flex items-center gap-2 justify-center">
                <FaChartLine className="text-yellow-400 text-base" /> Outcome Results
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {renderStatChange(scene.outcome.cashChange, 'Cash', <BiMoney className="text-xl" />)}
                {renderStatChange(scene.outcome.debtChange, 'Debt', <BiMoney className="text-xl" />)}
                {renderStatChange(scene.outcome.wellBeingChange, 'Well-Being', <FaRegSmile className="text-xl" />)}
                {renderStatChange(scene.outcome.incomeChange, 'Income', <BiMoney className="text-xl" />)}
              </div>
              
              <div className="mt-3 flex justify-center gap-2">
                {renderROIPotential(scene.outcome.roiPotential)}
              </div>
              
              {scene.outcome.qualitativeNote && (
                <div className="mt-3 p-3 bg-gradient-to-r from-yellow-900/10 to-transparent border-l-2 border-yellow-500/50">
                  <div className="flex gap-3 items-start">
                    <FaBrain className="text-yellow-400 text-base mt-1 w-8" />
                    <p className="text-yellow-100 italic text-sm w-full">{scene.outcome.qualitativeNote}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-4">
            <div className="flex justify-center">
              <GameButton 
                onClick={onNext} 
                variant="action"
                className="animate-pulse hover:animate-none flex items-center justify-center gap-2 px-6 py-2 text-base"
              >
                Continue <BsArrowRight className="text-lg" />
              </GameButton>
            </div>
          </div>
        </div>
      </div>
    </SceneContainer>
  );
};

export default OutcomeSceneComponent;