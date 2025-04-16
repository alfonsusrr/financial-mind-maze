import React from 'react';
import { EventScene } from '../../types/games';
import SceneContainer from '../ui/SceneContainer';
import GameButton from '../ui/GameButton';
import { BsArrowRightCircle, BsGraphDown, BsGraphUp } from 'react-icons/bs';
import { FaChartLine, FaRegSmile, FaRegSadTear } from 'react-icons/fa';

interface EventSceneProps {
  scene: EventScene;
  onNext: () => void;
}

const EventSceneComponent: React.FC<EventSceneProps> = ({ scene, onNext }) => {
  // Helper function to render badges for portfolio changes
  const renderPortfolioBadge = () => {
    if (!scene.outcome) return null;
    
    const badges = [];
    
    // Portfolio value change badge
    if (scene.outcome.portfolioValueChange) {
      const isPositive = String(scene.outcome.portfolioValueChange).includes('+');
      badges.push(
        <div 
          key="portfolio-change" 
          className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ml-2 ${
            isPositive 
              ? 'bg-green-900/40 text-green-300 border border-green-500/30' 
              : 'bg-red-900/40 text-red-300 border border-red-500/30'
          }`}
        >
          {isPositive ? <BsGraphUp /> : <BsGraphDown />} {scene.outcome.portfolioValueChange}
        </div>
      );
    }
    
    // ROI potential badge
    if (scene.outcome.roiPotential) {
      const roiColorMap = {
        low: 'bg-orange-900/40 text-orange-300 border border-orange-500/30',
        moderate: 'bg-blue-900/40 text-blue-300 border border-blue-500/30',
        high: 'bg-purple-900/40 text-purple-300 border border-purple-500/30'
      };
      
      badges.push(
        <div 
          key="roi-potential" 
          className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ml-2 ${roiColorMap[scene.outcome.roiPotential]}`}
        >
          <FaChartLine /> ROI: {scene.outcome.roiPotential.charAt(0).toUpperCase() + scene.outcome.roiPotential.slice(1)}
        </div>
      );
    }
    
    // Well-being change
    if (typeof scene.outcome.wellBeingChange === 'number') {
      const isPositive = scene.outcome.wellBeingChange > 0;
      const isNegative = scene.outcome.wellBeingChange < 0;
      
      if (isPositive || isNegative) {
        badges.push(
          <div 
            key="wellbeing-change" 
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ml-2 ${
              isPositive 
                ? 'bg-green-900/40 text-green-300 border border-green-500/30' 
                : 'bg-red-900/40 text-red-300 border border-red-500/30'
            }`}
          >
            {isPositive ? <FaRegSmile /> : <FaRegSadTear />} {isPositive ? '+' : ''}{scene.outcome.wellBeingChange}
          </div>
        );
      }
    }
    
    return badges.length > 0 ? <div className="flex flex-wrap gap-1 mt-2">{badges}</div> : null;
  };

  return (
    <SceneContainer 
      background={scene.background}
      videoBackground={scene.background.replace('.png', '.mp4')}
    >
      <div className="flex flex-col h-full justify-between">
        <div className="flex-grow"></div>
        
        <div className="scene-info bg-black/75 p-6 rounded-lg border-2 border-yellow-400 mt-auto animate-fade-in-up">
          <div className="flex flex-col items-center mb-2">
            <h2 className="scene-title text-3xl font-game text-yellow-400 text-shadow-lg shadow-yellow-600/50 animate-float">
              {scene.title}
            </h2>
            {renderPortfolioBadge()}
          </div>
          
          <div className="scene-description bg-black/40 p-4 rounded-md border border-yellow-200/30 shadow-inner mt-4">
            <p className="text-yellow-100 font-game leading-relaxed text-lg tracking-wide" style={{ whiteSpace: 'pre-wrap' }}>
              {scene.description}
            </p>
          </div>
          
          {scene.outcome?.qualitativeNote && (
            <div className="mt-4 bg-black/60 p-3 rounded-md border border-yellow-200/20">
              <p className="text-yellow-100/80 font-game italic text-base">
                {scene.outcome.qualitativeNote}
              </p>
            </div>
          )}
          
          <div className="mt-6 flex justify-center">
            <GameButton 
              onClick={onNext}
              variant="action"
              fullWidth
              className="animate-pulse hover:animate-none flex items-center justify-center gap-2"
            >
              Continue <BsArrowRightCircle className="text-xl" />
            </GameButton>
          </div>
        </div>
      </div>
    </SceneContainer>
  );
};

export default EventSceneComponent;